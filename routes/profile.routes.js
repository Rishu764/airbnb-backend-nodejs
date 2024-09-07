import express from "express";
import { getProfile } from "../controller/profile.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();


router.get('/', verifyToken , getProfile);


export default router;