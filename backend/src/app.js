import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import "./config/passport.js";


const app=express()

// app.use(cors({
//     origin:process.env.CLIENT_URL||"http://localhost:5173",
//     credentials:true
// }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/v1/auth",authRoutes);

app.get("/api/v1/health", (req, res) => {
  res.json({ ok: true, service: "ResuMate backend", time: new Date().toISOString() });
});

export default app