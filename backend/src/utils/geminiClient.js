import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
export const geminiModel=genAI.getGenerativeModel({model:"gemini-flash"})

export async function calculateATSScore(resumeText,jobDesc)
{
    const prompt=`
You are an ATS scoring system.
Compare the following RESUME against the JOB DESCRIPTION and return:
1. ATS Score (0-100)
2. Key strengths
3. Missing keywords
4. Suggestions for improvement

Resume:
${resumeText}

Job Description:
${jobDescription}
`;
  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}