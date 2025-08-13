import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name is required"],
         trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        minlength:6,
        select:false
    },
    googleId:{
        type: String,
        default: null,
    },
    otp:{
        type:Date,
        default: null,
    },
    otpExpiry: {
        type: Date,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

export const User=mongoose.model("User",userSchema)

