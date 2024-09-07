import User from "../model/User.model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { errorResponse, successResponse } from "../utils/response.js";

const getProfile = asyncErrorHandler(async (req, res) => {
  const userId = await req.authData;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    return errorResponse(res, null, "User not found", 404);
  }
  return successResponse(res, user, "User fetched successfully");
});

export { getProfile };
