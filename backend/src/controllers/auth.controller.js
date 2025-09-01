import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const signAccessToken=(userId)=>{
  return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'15m'})
}

const signRefreshToken=(userId)=>{
  return jwt.sign({id:userId},process.env.JWT_REFRESH_SECRET,{expiresIn:'7d'})
}

const sendTokens=(res,user)=>{
  const accessToken=signAccessToken(user._id)
  const refreshToken=signRefreshToken(user._id)

  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  return accessToken;
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: (process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendOtpEmail = async (to, otp) => {
    const from = process.env.SMTP_FROM || `ResuMate <${process.env.SMTP_USER}>`;
    await transporter.sendMail({
        from,
        to,
        subject: "Verify your email for ResuMate",
        text: `Your OTP is ${otp}. It expires in 10 minutes.`,
        html: `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #2e86de; border-radius: 8px 8px 0 0;">
              <h2 style="color: #ffffff; margin: 0;">ResuMate</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333333;">
              <p style="font-size: 16px; margin-bottom: 20px;">
                Hello,
              </p>
              <p style="font-size: 16px; margin-bottom: 30px;">
                Your One-Time Password (OTP) to verify your email is:
              </p>
              <p style="font-size: 28px; font-weight: bold; color: #2e86de; margin: 0 0 30px 0; letter-spacing: 4px;">
                ${otp}
              </p>
              <p style="font-size: 14px; color: #555555;">
                This OTP will expire in <strong>10 minutes</strong>. If you did not request this, please ignore this email.
              </p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eeeeee;" />
              <p style="font-size: 12px; color: #999999; text-align: center;">
                &copy; ${new Date().getFullYear()} ResuMate. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `,
    });
}

const generateOtp = () => {
   return Math.floor(100000 + Math.random() * 900000).toString();
}


export const signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();
        const otpHash = await bcrypt.hash(otp, 10);
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const user = await User.create({
            name, email, password: hashedPassword,
            isVerified: false, otpHash, otpExpiry
        });

        try {
            await sendOtpEmail(email, otp)
        } catch (error) {
            await User.findByIdAndDelete(user._id);
            console.error("Mailer error:", error);
            return res.status(500).json({ message: "Could not send verification email. Try again." })
        }

        // const token = jwt.sign(
        //     { id: user._id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "7d" }
        // );
        
        // const token=signJwt(user._id)
        return res.status(201).json({
            message: "User registered successfully. Please verify your email.",
            email: user.email
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const verifyOtp=async (req,res)=>{
    try {
        const {email,otp}=req.body;
        const user=await User.findOne({email}).select("+otpHash");
        if(!user) return res.status(400).json({message:"User not found"});
        if (user.isVerified) return res.status(400).json({ message: "User already verified" });
        if (!user.otpHash || !user.otpExpiry)return res.status(400).json({ message: "No OTP requested" });
        if (Date.now() > new Date(user.otpExpiry).getTime()){
            return res.status(400).json({ message: "OTP expired" });
        }
        const ok=await bcrypt.compare(otp,user.otpHash)
        if(!ok) return res.status(400).json({ message: "Invalid OTP" });
        user.isVerified = true;
        user.otpHash = null;
        user.otpExpiry = null;
        await user.save()

        const accessToken=sendTokens(res,user)

        return res.json({
            message: "Email verified successfully",
            accessToken,
            user:{
                id:user._id,
                name:user.name,
                email:email
            }
        })
    } catch (error) {
         console.error("Verify OTP Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const resendOtp=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email}).select("+otpHash")
        if(!user) return res.status(400).json({message:"User not found"});
        const otp=generateOtp();
        user.otpHash=await bcrypt.hash(otp,10);
        user.otpExpiry=new Date(Date.now()+10*60*1000);
        
        await user.save();

        try {
            await sendOtpEmail(email,otp)
        } catch (error) {
            return res
            .status(500)
            .json({ message: "Could not send verification email" });
        }
        return res.json({ message: "OTP resent" });

    } catch (error) {
        console.error("Resend OTP Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const login=async (req,res)=>{
  try {
    const {email,password}=req.body;
    if(!email||!password) return res.status(400).json({message:"all credintials required"});
    const user=await User.findOne({email}).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.isVerified)
      return res.status(400).json({ message: "Email not verified" });
    const matched=await bcrypt.compare(password,user.password)
    if(!matched) return res.status(400).json({message:"Invalid credentials"})

    const accessToken=sendTokens(res,user);
    return res.json({
      messsage:"login successful",
      accessToken,
      user:{
        id: user._id, name: user.name, email: user.email
      }
    });
    
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" })
  }
}

export const me=async(req,res)=>{
  console.log("Req.User",req.user)
  try {
    const user=await User.findById(req.user._id).select("_id name email isVerified createdAt updatedAt");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (error) {
    console.error("Me Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const googleAuthCallback = (req, res) => {
  const user = req.user;

  const accessToken = sendTokens(res,user);
  return res.json({
    message: "Google login successful",
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin=async(req,res)=>{
    try {
        const { id_token } = req.body; 

        const ticket=await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        const payload=ticket.getPayload();
        const { sub, email, name, picture } = payload;
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({
                name,
                email,
                googleId: sub,
                isVerified:true,
                provider:"google",
                picture,
            })
        }

        const accessToken = sendTokens(res, user);

        return res.json({
            message:"Login successful",
            accessToken,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                picture: user.picture,
            }
        })

    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({ message: "Google login failed" });
    }
}

export const refreshToken=async(req,res)=>{
  try {
    const token=req.cookies.refreshToken;
    if(!token) return res.status(401).json({message:"Refresh Token not found"});
    
    jwt.verify(token,process.env.JWT_REFRESH_SECRET,(err,decoded)=>{
      if (err) return res.status(403).json({ message: "Invalid refresh token" });
      const accessToken=signAccessToken(decoded.id);
      return res.json({accessToken})
    })

  } catch (error) {
      console.error("Refresh Token Error:", error);
      return res.status(500).json({ message: "Server error" });
  }
}

export const logout=async(req,res)=>{
  res.clearCookie("refreshToken",{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  return res.json({ message: "Logged out successfully" });
}
