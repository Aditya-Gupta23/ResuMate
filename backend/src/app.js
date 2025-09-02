import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import "./config/passport.js";
import path from 'path';
import { fileURLToPath } from 'url';
import resumeRoutes from './routes/resume.routes.js'

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const app=express()

app.use(cors({
    origin:process.env.CLIENT_URL||"http://localhost:5173",
    credentials:true
}))
// app.use(cors())

// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none"); // safe for dev
//   next();
// });

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/v1/auth",authRoutes);
app.use("/api/resume",resumeRoutes);

app.use('/uploads',
  express.static(path.join(__dirname,'uploads'),{
    setHeaders:(res,_path)=>{
      res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL||"http://localhost:5173")
    }
  })
)

app.get("/api/v1/health", (req, res) => {
  res.json({ ok: true, service: "ResuMate backend", time: new Date().toISOString() });
});

export default app