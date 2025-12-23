import express from "express"
import{
    generateInterviewQuestions,
    evaluateAnswer,
}from "../controllers/interview.controller.js";

const router=express.Router();
router.post("/generate",generateInterviewQuestions)
router.post("/evaluate",evaluateAnswer)

export default router;