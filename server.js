import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CookieParser from 'cookie-parser';

import authrouter from "./routes/auth.routes.js";
import CustomError from "./middleware/customError.js";
import connectDb from "./config/dbconfig.js";

const app = express();
dotenv.config();
connectDb();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(CookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/v1/auth", authrouter);


app.use(CustomError);

app.listen(3000, () => {
  console.log("serve is running");
});
