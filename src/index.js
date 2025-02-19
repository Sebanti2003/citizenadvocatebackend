import { configDotenv } from "dotenv";
import { connectDB } from "./db/index.js";
import { server, app } from "./app.js";
configDotenv();
const port = process.env.PORT;
connectDB();
server.listen(port, () => {
  console.log(`Server is up running on port ${port}`);
});
