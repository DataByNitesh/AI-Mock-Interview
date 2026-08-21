import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/DB.js";
import routes from "./Routes/UserRoutes.js";
import interviewRoutes from "./Routes/InterviewRoutes.js";

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

connectDB();

app.use("/auth",routes)
app.use("/interview", interviewRoutes);

app.listen(process.env.port, () => {
  console.log(`Backend is Running on:${process.env.port}`);
});
