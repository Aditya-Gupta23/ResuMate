import { extractResumeText } from "../utils/fileExtract.js";
import { calculateATSScore } from "../utils/geminiClient.js";
import path from "path";
import fs from "fs";


export const analyseResume=async (req,res)=>{
    req.setTimeout(15000);
    console.log('HI')
    try{
        const {jobDesc}=req.body;
        const resumeFile=req.file;
        if(!resumeFile){
            return res.status(400).json({ message: "Resume file is required" });
        }
        // const filePath=path.join(process.cwd(),resumeFile.path);
        const filePath = resumeFile.path;

        console.log("Reading resume from:", filePath);

            if (!fs.existsSync(filePath)) {
    console.error("File not found at:", filePath);
    }
        const resumeText=await extractResumeText(filePath);
        const atsResult=await calculateATSScore(resumeText,jobDesc);
        return res.status(200).json({ atsResult });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "ATS analysis failed" });
    }
};