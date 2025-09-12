import express from "express";
import resumeUpload from "../middleware/resumeUpload.middleware.js";
import { analyseResume } from "../controllers/ats.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router=express.Router()

router.post('/analyze',requireAuth,resumeUpload.single("resume"),analyseResume)

export default router