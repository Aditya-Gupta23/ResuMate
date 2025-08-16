import jwt from "jsonwebtoken";

export const requireAuth=(req,res,next)=>{
    const auth=req.headers.authorization||"";
    const parts=auth.split(" ");
    const token=parts.length===2 && parts[0]==="Bearer" ? parts[1]:null;
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.id;
        return next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
