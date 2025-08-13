import "dotenv/config";
import app from "./app.js"
import { connectDB } from "./lib/db.js";

async function start(){
    const PORT = process.env.PORT || 5050;
    await connectDB()
    app.listen(PORT,()=>{
        console.log(`Server listening on http://localhost:${PORT}`)
    })
}

start()