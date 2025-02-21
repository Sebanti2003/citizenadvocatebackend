import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { configDotenv } from "dotenv";
import userrouter from "./routes/user.route.js";
import ministryrouter from "./routes/ministry.route.js";
import complaintrouter from "./routes/complaints.route.js";
import notificationrouter from "./routes/notifications.route.js";
import http from "http";
import { Server } from "socket.io";

configDotenv();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const userSockets = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);


  socket.on("register", (userId) => {
    userSockets.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });


  socket.on("disconnect", () => {
    for (let [userId, socketId] of userSockets) {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});


app.set("socketio", io);
app.set("userSockets", userSockets);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5000",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    },
  })
);


app.use("/api/v1/user", userrouter);
app.use("/api/v1/ministry", ministryrouter);
app.use("/api/v1/complaints", complaintrouter);
app.use("/api/v1", notificationrouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});


export { app, server };
