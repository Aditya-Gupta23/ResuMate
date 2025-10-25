// import multer from "multer";
// import path from "path";

// // Storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/resumes/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// // File filter for resumes (PDF/DOCX only)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF and DOCX resumes are allowed"), false);
//   }
// };

// const resumeUpload = multer({ storage, fileFilter });

// export default resumeUpload;

import multer from "multer";
import path from "path";
import fs from "fs";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads", "resumes");

    // Ensure directory exists
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for resumes (PDF/DOCX only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX resumes are allowed"), false);
  }
};

const resumeUpload = multer({ storage, fileFilter });

export default resumeUpload;
