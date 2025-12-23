import mongoose from "mongoose"

const jobAlertSchema=new mongoose.Schema({
    externalID:{
        type:String,
        unique:true
    },
    title:String,
    company:String,
    location:String,
    url:String,
    source:String,
    postedAt: Date,
    savedAt: { type: Date, default: Date.now }
})

export default mongoose.model("JobAlert",jobAlertSchema);