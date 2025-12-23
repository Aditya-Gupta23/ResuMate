import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is a resume checker?",
    answer: `A resume checker evaluates and improves resumes for formatting, relevant keywords, grammar, and ATS compliance. It helps ensure your resume meets professional standards and stands out to recruiters.`,
  },
  {
    question: "How do I check my resume score?",
    answer:
      "Upload your file to our Resume Analyzer. The system evaluates it for formatting, keywords, grammar, and overall ATS compatibility.",
  },
  {
    question: "How do I improve my resume score?",
    answer:
      "Fix grammar errors, use strong action verbs, add relevant keywords, and maintain consistent formatting across sections.",
  },
  {
    question: "How do I know if my resume is ATS compliant?",
    answer:
      "An ATS-compliant resume uses standard fonts, avoids images or tables for text, and includes relevant keywords from the job description.",
  },
  {
    question: "What is a good ATS score?",
    answer:
      "A score above 80 indicates your resume is highly optimized for applicant tracking systems.",
  },
  {
    question: "Can an ATS read PDFs?",
    answer:
      "Yes, most modern ATS tools can read text-based PDFs. Avoid scanned images or graphical text.",
  },
  {
    question: "Should I review my resume after writing it?",
    answer:
      "Absolutely! Reviewing your resume multiple times helps refine phrasing, formatting, and clarity.",
  },
  {
    question: "Can I create a personal resume checklist?",
    answer:
      "Yes! Include sections like contact info, education, experience, skills, and a formatting check to ensure ATS readability.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (index) => setActiveIndex(index === activeIndex ? null : index);

  return (
    <motion.div
      className="max-w-6xl w-full bg-white backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* HEADER */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <HelpCircle className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          Answers to your most common questions about our Resume Analyzer
        </p>
      </div>

      {/* FAQ ITEMS */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              activeIndex === index
                ? "bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-indigo-300 shadow-lg"
                : "bg-white border-gray-200 hover:shadow-md"
            }`}
            whileHover={{ scale: 1.01 }}
          >
            {/* QUESTION */}
            <button
              onClick={() => toggle(index)}
              className="flex justify-between items-center w-full px-6 py-5 text-left"
            >
              <span
                className={`text-lg font-semibold ${
                  activeIndex === index
                    ? "text-indigo-700"
                    : "text-gray-800 hover:text-indigo-600"
                }`}
              >
                {faq.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="w-6 h-6 text-indigo-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>

            {/* ANSWER */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                activeIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-5 text-gray-700 text-base leading-relaxed border-t border-gray-200">
                {faq.answer}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
