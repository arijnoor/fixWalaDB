import cors from "cors";
import express from "express";
import connectDB from "./dataBase.js";
import dotenv from "dotenv";

dotenv.config();
import userRoute from "./routes/userRoute.js";
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/upload", express.static("upload"));

connectDB();

app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log("Server running on 5000 port");
});