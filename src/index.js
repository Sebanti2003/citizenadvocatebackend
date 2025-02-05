import { configDotenv } from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/index.js";
configDotenv();
const port=process.env.PORT;
connectDB();
app.listen(port,()=>{
    console.log(`Server is up running on port ${port}`);
});