import User from "../model/User.model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import generateToken from "../utils/jwtConfig.js";
import { successResponse, errorResponse } from "../utils/response.js";

const signUp = asyncErrorHandler(async (req, res) => {
  console.log("sdfsdfsf")
  const { name, dateOfBirth, email, password } = req.body;
  console.log(req.file);
  const profilePicture = req.file ? req.file.path : "";
  console.log(profilePicture)

  if (!(name || dateOfBirth || email || password)) {
    return errorResponse(res, null, "All Fields required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, null, "User already exists", 400);
  }

  const newUser = await User.create({
    name,
    dateOfBirth,
    email,
    password,
    profilePicture,
  });

  if (!newUser) {
    return errorResponse(res, null, "Failed to create user", 500);
  }
  console.log(newUser)
  const token = generateToken(newUser._id);
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  return successResponse(res, token, "User created successfully", 201);
});

const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, null, "User not found", 201);
  }

  const isValidPassword = await user.verifyPassword(password);

  if (!isValidPassword) {
    return errorResponse(res, null, "Invalied Password", 400);
  }

  const token = generateToken(user._id);
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  return successResponse(res, token, "Login successfully", 201);
});


const logout  = asyncErrorHandler(async(req,res)=>{
       res.clearCookie('jwt');
       return successResponse(res, null, "Logout successful", 200);     
})

export { signUp, login, logout };
