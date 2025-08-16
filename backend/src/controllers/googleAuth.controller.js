// import { OAuth2Client } from "google-auth-library";
// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// export const googleLogin=async(req,res)=>{
//     try {
//         const { id_token } = req.body; 

//         const ticket=await client.verifyIdToken({
//             idToken: id_token,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         })
//         const payload=ticket.getPayload();
//         const { sub, email, name, picture } = payload;
//         let {user}=await User.findOne({email});
//         if(!user){
//             user=await User.create({
//                 name,
//                 email,
//                 isVerified:true,
//                 provider:"google",
//                 picture,
//             })
//         }

//         const token=jwt.sign(
//             {_id:user._id},
//             process.env.JWT_SECRET,
//             {expiresIn:'7d'}
//         );

//         return res.json({
//             message:"Login successful",
//             token,
//             user:{
//                 id:user._id,
//                 name:user.name,
//                 email:user.email,
//                 picture: user.picture,
//             }
//         })

//     } catch (error) {
//         console.error("Google login error:", err);
//         return res.status(500).json({ message: "Google login failed" });
//     }
// }