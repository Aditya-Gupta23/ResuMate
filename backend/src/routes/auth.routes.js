import express from "express";
import { signup,verifyOtp,resendOtp,login,me,googleLogin,refreshToken,logout} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router=express.Router();
router.post('/signup',signup);
router.post('/verify-otp',verifyOtp);
router.post('/resend-otp',resendOtp);
router.post('/login',login);
router.post('/logout',logout)

router.post("/refresh", refreshToken);
router.get("/me", requireAuth, me);

router.post('/google',googleLogin)

export default router