import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileCheck, Sparkles } from "lucide-react";
import atsImage from "../assets/ResumeCheckerHeader.svg";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ResumeAnalyzer = () => {
  const inputRef = useRef(null);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [atsResult, setAtsResult] = useState("");
  const [showLoader,setShowLoader]=useState(false)


  function handleClick() {
    inputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsResumeUploaded(true);
    }
  }

  async function analyzeResume() {
  if (!selectedFile) return alert("Please upload a resume first!");
  console.log("Analyzing:", selectedFile.name);
  setShowLoader(true);

  const formData = new FormData();
  formData.append("resume", selectedFile); // 👈 matches .single("resume")
  formData.append("jobDesc", jobDescription || "Software Engineer"); // optional

  try {
    const response = await axiosInstance.post(
      API_PATHS.analyzer.ANALYZE_RESUME,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          //Authorization: `Bearer ${token}`,
        },
      }
    );
    const atsResult = response.data.atsResult;
    console.log("Ats Result:", response.data);
    setAtsResult(atsResult || "");
    setShowLoader(false)
  } catch (error) {
    console.error("Error analyzing resume:", error);
    alert(error.response?.data?.message || "Failed to analyze resume.");
    setShowLoader(false)

  }
}


  return (
    <motion.div
        className="bg-white backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-gray-200 max-w-6xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-14">
            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-6 text-gray-800 w-full md:w-1/2">
                <h1 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    Resume <br /> Analyzer
                </h1>

                <p className="text-gray-600 italic text-lg">
                    “Your resume is your story — make sure it’s worth reading.”
                </p>

                {/* UPLOAD AREA */}
                <motion.div
                    className="h-full border-2 border-dashed border-violet-500 rounded-2xl p-6 cursor-pointer hover:shadow-cyan-500/40 hover:border-cyan-400 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white transition-all"
                >
                {!isResumeUploaded ? (
                    <div className="text-center flex flex-col items-center gap-3">
                        <Upload className="w-10 h-10 text-indigo-500" />
                        <p className="text-gray-700 font-medium">
                            Drop your resume here or choose a file
                        </p>
                        <p className="text-sm text-gray-500">
                            Supports PDF & DOCX (Max 2MB)
                        </p>
                    </div>
                ) : (
                    <div className="text-center flex flex-col items-center gap-3">
                        <FileCheck className="w-10 h-10 text-green-500" />
                        <p className="text-gray-800 font-medium">
                            {selectedFile?.name}
                        </p>
                        <p className="text-sm text-gray-500">Ready to analyze!</p>
                    </div>
                )}

                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
                </motion.div>

                <div className="mt-4 w-full">
                    <label className="block mb-2 text-gray-700 font-medium">
                        Job Description (optional)
                    </label>
                <textarea
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                    rows={4}
                />
                </div>


                {/* BUTTONS */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <button
                        onClick={handleClick}
                        className="group relative px-10 py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white font-bold rounded-2xl overflow-hidden shadow-md hover:scale-105 hover:shadow-cyan-500/50 transition-all"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span className="relative flex items-center gap-3">
                            <Upload className="w-5 h-5" />
                            Upload Resume
                        </span>
                    </button>


                    {isResumeUploaded && (
                        <motion.button
                            onClick={analyzeResume}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 border-2 border-violet-400/40 text-violet-700 font-semibold rounded-2xl hover:border-violet-400 hover:bg-violet-50 shadow-sm hover:shadow-lg transition-all flex items-center gap-3"
                        >
                            <Sparkles className="w-5 h-5 text-violet-500" />
                            Analyze Resume
                        </motion.button>

                    )}
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <motion.div
                className="w-full md:w-1/2 flex justify-center"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
                <img
                src={atsImage}
                alt="ATS Resume"
                className="w-80 md:w-96 object-contain drop-shadow-2xl"
                />
            </motion.div>
        </div>
        {showLoader && 
            <div className="flex items-center justify-center p-5">
                <div
                    className="
                        w-32 h-32              /* Big size */
                        rounded-full           /* Perfect circle */
                        border-8               /* Thick border */
                        border-t-4             /* Thinner colored top border for visual contrast */
                        border-t-indigo-500    /* Distinct color for the spinning part */
                        border-gray-200        /* Background border color */
                        animate-spin           /* The spinning animation */
                        shadow-xl              /* Add some depth */
                    "
                    role="status"
                    aria-label="loading"
                >
                    {/* Screen reader text for accessibility */}
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }
        {atsResult && (
            <motion.div
                className="mt-8 w-full p-8 border border-violet-300 rounded-2xl bg-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-3xl font-extrabold text-violet-700 mb-6">
                ATS Analysis Result
                </h2>
                <div className="prose prose-violet prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-800 prose-li:marker:text-violet-600 prose-a:text-violet-600 prose-a:underline leading-relaxed space-y-6 max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                            strong: (props) => (
                                <strong className="text-violet-700 font-semibold" {...props} />
                            ),
                            h2: (props) => (
                                <h2 className="mt-8 mb-3 border-b border-violet-200 pb-1" {...props} />
                            ),
                            ul: (props) => (
                                <ul className="list-disc ml-6 space-y-2" {...props} />
                            ),
                            ol: (props) => (
                                <ol className="list-decimal ml-6 space-y-2" {...props} />
                            )
                            }}
                        >
                            {atsResult}
                        </ReactMarkdown>
                    </div>
            </motion.div>
        )}

    </motion.div>    
  );
};

export default ResumeAnalyzer;
