// import { readFile } from "fs/promises";
// import pdf from "pdf-parse";
// import mammoth from "mammoth";
// import path from "path";

// export async function extractResumeText(filePath)
// {
//     if(filePath.endsWith(".pdf")){
//         const dataBuffer=await fs.readFile(filePath);
//         const data=await pdf(dataBuffer)
//         return data.text;
//     }else if(filePath.endsWith(".docx")){
//         const result=await mammoth.extractRawText({path:filePath});
//         return result.value;
//     }else{
//         throw Error("Unsupported file type");
//     }
// }

import { readFile } from "fs/promises";
import path from "path";
import pdf from "pdf-parse";
import mammoth from "mammoth";



export async function extractResumeText(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const dataBuffer = await readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } else if (ext === ".docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else {
    throw new Error("Unsupported file type. Please upload PDF or DOCX.");
  }
}
