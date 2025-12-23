import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
export const geminiModel = genAI.getGenerativeModel({ model:"gemini-2.0-flash" })

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
${jobDesc}
`;
  const result = await geminiModel.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
}