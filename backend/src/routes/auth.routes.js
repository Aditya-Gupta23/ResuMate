import express from "express";
import { signup,verifyOtp,resendOtp,login,me,googleLogin} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import passport from "passport";

const router=express.Router();
router.post('/signup',signup);
router.post('/verify-otp',verifyOtp);
router.post('/resend-otp',resendOtp);
router.post('/login',login);

router.get("/me", requireAuth, me);

router.post('/google',googleLogin)

export default router