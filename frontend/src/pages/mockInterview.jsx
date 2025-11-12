import { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { motion } from "framer-motion";
import DashBoardLayout from "../components/DashboardLayout";
import Footer from "../components/Footer";
import { landingPageStyles } from "../assets/dummystyle";
import { Pause, Play } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MockInterview() {
  const [profile, setProfile] = useState("");
  const [subjects, setSubjects] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(null);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);


  // Generate interview questions
  const handleGenerate = async () => {
    if (!profile || !subjects) {
      alert("Please fill both fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        API_PATHS.interview.GENERATE,
        {
          profile,
          subjects: subjects.split(",").map((s) => s.trim()),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      if (data.questions) {
        // Cleanly parse numbered questions (ignore intro line)
        const lines = data.questions.split("\n").map((l) => l.trim()).filter((l) => l);
        const questions = [];
        let currentQuestion = "";

        for (let line of lines) {
          if (/^\d+\./.test(line)) {
            if (currentQuestion) questions.push(currentQuestion.trim());
            currentQuestion = line;
          } else if (!/^Okay/i.test(line)) {
            currentQuestion += " " + line;
          }
        }
        if (currentQuestion) questions.push(currentQuestion.trim());

        setQuestions(questions);
        setAnswers({});
        setFeedback({});

        // Start timer (e.g., 10 minutes = 600 seconds)
        setTimeLeft(600);
        setIsPaused(false);
      }
    } catch (err) {
      console.error("Error generating questions:", err);
      alert("Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  // Timer logic
  useEffect(() => {
    if (questions.length === 0) return; // only start if questions exist
    if (isPaused) return; // pause

    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      alert("Time's up! Please submit your answers.");
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft, isPaused, questions]);

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  // Evaluate individual answers
  const handleEvaluate = async (q) => {
    if (!answers[q]) {
      alert("Please type your answer before evaluation.");
      return;
    }
    try {
      setEvaluating(q); // start loader for this question
      const response = await axiosInstance.post(
        API_PATHS.interview.EVALUATE,
        { question: q, answer: answers[q] },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;
      if (data.feedback)
        setFeedback((prev) => ({ ...prev, [q]: data.feedback }));
    } catch (err) {
      console.error("Error evaluating answer:", err);
      alert("Error evaluating answer.");
    } finally {
        setEvaluating(null); // stop loader
    }
  };

  // Format timer display mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div>
      <DashBoardLayout>
        <div className="flex flex-col gap-16 bg-gradient-to-br from-slate-900 via-indigo-1000 to-slate-900 min-h-screen py-20 md:px-16">
          {/* HEADER SECTION */}
          <motion.section
            className="text-center max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
              Mock Interview Practice
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Generate realistic interview questions based on your profile and subjects,
              answer them, and instantly get AI-powered feedback for improvement.
            </p>
          </motion.section>

          {/* INPUT SECTION */}
          <motion.section
            className="max-w-3xl mx-auto bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm mb-2 text-gray-300">Profile</label>
                <input
                  type="text"
                  placeholder="e.g., Frontend Developer"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Subjects (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., React, JavaScript, NodeJS"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 font-bold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 text-white font-semibold py-3 rounded-xl transition-all shadow-lg"
            >
              {loading ? "Starting Mock interview..." : "Generate Questions"}
            </button>
          </motion.section>

          {/* TIMER */}
          {questions.length > 0 && (
            <div className="max-w-4xl mx-auto mt-6 flex justify-between items-center bg-slate-700/70 p-4 rounded-xl border border-slate-600">
                <button
                    onClick={handlePauseResume}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 mx-2 rounded-lg font-medium"
                >
                    {isPaused 
                        ? <Play className="w-10 h-10 text-green-500" /> 
                        : <Pause className="w-10 h-10 text-green-500" />
                    }
                </button>
                <span className="text-white font-bold text-lg">
                Time Left: {formatTime(timeLeft)}
                </span>
            </div>
          )}

          {/* QUESTIONS SECTION */}
          {questions.length > 0 && (
            <motion.section
              className="max-w-4xl mx-auto space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {questions.map((q, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="font-semibold text-lg mb-4 text-indigo-300">{q}</h2>
                  <textarea
                    placeholder="Type your answer here..."
                    value={answers[q] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q]: e.target.value }))
                    }
                    className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-3 min-h-[300px] mb-3 focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleEvaluate(q)}
                    disabled={evaluating === q}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 px-4 rounded-lg font-medium shadow-md"
                  >
                    {evaluating === q ? (
                        <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Evaluating...
                        </div>
                    ) : (
                        "Evaluate Your Answer"
                    )}
                  </button>
                  

                  {feedback[q] && (
                    <div className="bg-white px-4 py-1 mt-8 prose prose-violet prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-800 prose-li:marker:text-violet-600 prose-a:text-violet-600 prose-a:underline rounded-[10px] leading-relaxed space-y-6 max-w-none">
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
                        {feedback[q]}
                    </ReactMarkdown>
                  </div>
                  )}
                  
                </div>
              ))}
            </motion.section>
          )}

          {/* LOADER (Like ATS) */}
          {loading && (
            <motion.div
              className="mt-8 w-full max-w-2xl mx-auto p-8 border border-violet-300 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-extrabold text-violet-400 mb-4">
                Generating Interview Questions...
              </h2>
              <div className="flex justify-center space-x-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-4 h-4 bg-violet-500 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </DashBoardLayout>

      {/* Footer Section */}
      <footer className={landingPageStyles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
