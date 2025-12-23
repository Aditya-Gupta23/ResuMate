import express from "express";
import { triggerJobAlerts } from "../controllers/alerts.controller.js"

const router =express.Router();
router.post('/send',triggerJobAlerts);
export default router;