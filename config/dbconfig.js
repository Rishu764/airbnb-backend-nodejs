import mongoose from "mongoose";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const connectDb = asyncErrorHandler(async function () {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("mongodb connected");
});

export default connectDb;
