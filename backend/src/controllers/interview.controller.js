import {geminiModel} from "../utils/geminiClient.js"

export const generateInterviewQuestions= async(req,res)=>{
    try{
        const {profile,subjects}=req.body;
        if (!profile || !subjects || subjects.length === 0) {
            return res.status(400).json({ error: "Profile and subjects are required" });
        }
        const prompt=`You are an expert technical interviewer.
        Generate 5 unique and realistic interview questions for a ${profile}.
        Focus on these subjects: ${subjects.join(", ")}.
        Number and format them clearly like:
        1. ...
        2. ...
        `;
        const result=await geminiModel.generateContent(prompt);
        const questions=result.response.text();
        res.status(200).json({questions});
        
    }catch(err){
        console.log("Error getting the questions for the user",err)
        res.status(500).json({ error: "Failed to generate questions" });
    }
}

export const evaluateAnswer=async(req,res)=>{
    try{
        const {question,answer}=req.body;
        if (!question || !answer) {
             return res.status(400).json({ error: "Question and answer are required" });
        }
        const prompt = `
        You are an experienced interviewer evaluating a candidate's answer.

        Question: ${question}
        Answer: ${answer}

        Provide:
        1. Score out of 10
        2. Detailed feedback (short but clear)
        3. How the candidate could improve
        `;
        const result=await geminiModel.generateContent(prompt);
        const feedback=result.text();
        res.status(200).json({ feedback });
    }catch(err){
        console.error("Error evaluating answer:", err);
        res.status(500).json({ error: "Failed to evaluate answer" });
    }
}