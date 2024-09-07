import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const verifyToken = asyncErrorHandler(async(req, res, next) => {
  const token = req.cookies ? req.cookies.jwt : null;
  if (!token) {
    return errorResponse(res, null, "access denied", 404);
  }

  const verified = await jwt.verify(token, process.env.JWT_KEY);
  req.authData = verified.userId;
  next();
});

export default verifyToken;
