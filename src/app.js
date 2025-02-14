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
configDotenv();
// console.log('====================================');
// console.log(process.env.MONGO_URL);
// console.log('====================================');

const app = express();

const allowedOrigins = [
  "http://localhost:5174", // for local development
  "http://localhost:5173",
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
      secure: process.env.NODE_ENV === "production", // for local development
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    },
  })
);

app.use("/api/v1/user", userrouter);
app.use("/api/v1/ministry", ministryrouter);
app.use("/api/v1/complaints", complaintrouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

export default app;
