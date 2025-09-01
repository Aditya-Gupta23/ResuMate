// import jwt from "jsonwebtoken";
// import { User } from "./user.model.js";

// export const requireAuth=(req,res,next)=>{
//     const auth=req.headers.authorization||"";
//     const parts=auth.split(" ");
//     const token=parts.length===2 && parts[0]==="Bearer" ? parts[1]:null;
//     if (!token) return res.status(401).json({ message: "No access token provided" });
//     try {
//         const decoded=jwt.verify(token,process.env.JWT_SECRET)
//         req.userId=decoded.id;
//         return next();

//     } catch (err) {
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// }

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const requireAuth = async (req, res, next) => {
    try {
        const auth = req.headers.authorization || "";
        const parts = auth.split(" ");
        const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
        console.log("User:",token)

        if (!token) return res.status(401).json({ message: "No access token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user from DB
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user; // attach full user object
        next();
    } catch (err) {
        console.error("Auth Error:", err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

