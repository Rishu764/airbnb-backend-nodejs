import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'; // Import path explicitly for using path.join()

import authrouter from "./routes/auth.routes.js";
import profilerouter from './routes/profile.routes.js';
import CustomError from "./middleware/customError.js";
import connectDb from "./config/dbconfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();
connectDb();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1/auth", authrouter);
app.use('/api/v1/profile', profilerouter);

app.use(CustomError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
