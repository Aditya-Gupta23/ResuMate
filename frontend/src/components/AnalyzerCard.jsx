import { motion } from "framer-motion";
import { FileText, Layout, Brain, ListChecks, Palette } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-10 h-10 text-indigo-600" />,
    title: "Content",
    points: [
      "ATS parse rate",
      "Repetition of words and phrases",
      "Spelling and grammar",
    ],
    colors: "from-indigo-50 via-white to-indigo-100",
  },
  {
    icon: <Layout className="w-10 h-10 text-pink-600" />,
    title: "Format",
    points: [
      "File format and size",
      "Resume length",
      "Long bullet points with suggestions",
    ],
    colors: "from-pink-50 via-white to-pink-100",
  },
  {
    icon: <Brain className="w-10 h-10 text-purple-600" />,
    title: "Suggest Skills",
    points: ["Hard skills", "Soft skills"],
    colors: "from-purple-50 via-white to-purple-100",
  },
  {
    icon: <ListChecks className="w-10 h-10 text-green-600" />,
    title: "Resume Sections",
    points: [
      "Contact information",
      "Essential sections",
      "Personality showcase with tips",
    ],
    colors: "from-green-50 via-white to-green-100",
  },
  {
    icon: <Palette className="w-10 h-10 text-yellow-600" />,
    title: "Resume Design",
    points: [
      "Email address clarity",
      "Usage of active voice",
      "Avoid buzzwords & clichés",
    ],
    colors: "from-yellow-50 via-white to-yellow-100",
  },
];

const AnalyzerCard = () => {
  return (
    <motion.div
        className="max-w-6xl w-full bg-white backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-2xl p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-transparent bg-clip-text">
            Resume Optimization Checklist
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
            We evaluate your resume across{" "}
            <span className="font-semibold text-indigo-700">
              5 major categories
            </span>{" "}
            — Content, Format, Skills, Sections, and Design — ensuring it’s
            polished, professional, and impactful.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className={`flex flex-col items-start gap-4 border border-gray-200 rounded-2xl bg-gradient-to-br ${f.colors} p-6 shadow-md hover:shadow-xl transition-all duration-300`}
            >
              {/* ICON + TITLE */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-inner">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {f.title}
                </h3>
              </div>

              {/* POINTS */}
              <ul className="space-y-2 text-gray-700 mt-2">
                {f.points.map((pt, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
    </motion.div>
  );
};

export default AnalyzerCard;
