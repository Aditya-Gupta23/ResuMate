import "dotenv/config";
import app from "./app.js"
import { connectDB } from "./lib/db.js";
import "./config/passport.js";
import { startAlertCron } from "./utils/alerts.cron.js";

startAlertCron();

async function start(){
    const PORT = process.env.PORT || 5050;
    await connectDB()
    app.listen(PORT,()=>{
        console.log(`Server listening on http://localhost:${PORT}`)
    })
}

start()