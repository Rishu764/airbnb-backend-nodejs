import express from "express";
import { signUp , login, logout} from "../controller/auth.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

router.post('/register',upload.single('profilePicture'), signUp);
router.post('/login', login);
router.post('/logout', logout);

export default router;