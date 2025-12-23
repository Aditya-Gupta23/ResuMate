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
    otpHash:{
        type:String,
        default: null,
        select:false
    },
    otpExpiry: {
        type: Date,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    jobAlert:{
        enabled: { type: Boolean, default: false },
        keywords: { type: String, default: "" },     
        location: { type: String, default: "" },     
        lastAlert: { type: Date }
    }
},{timestamps:true});

export const User=mongoose.model("User",userSchema)

