import ResumeAnalyzer from "../components/ResumeAnalyzer";
import AnalyzerCard from "../components/AnalyzerCard";
import FAQ from "../components/FAQ";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import DashBoardLayout from "../components/DashboardLayout";
import { landingPageStyles } from "../assets/dummystyle";

const AtsScoreChecker = () => {
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
                    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 text-transparent bg-clip-text mb-4">
                    ATS Score Checker
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Instantly analyze your resume for ATS compatibility, formatting, and keyword optimization. 
                    Make your resume recruiter-ready in minutes!
                    </p>
                </motion.section>

                {/* RESUME ANALYZER */}
                <section className="flex justify-center">
                    <ResumeAnalyzer />
                </section>

                {/* CHECKLIST / FEATURES */}
                <section className="flex justify-center">
                    <AnalyzerCard />
                </section>

                {/* FAQ SECTION */}
                <section className="flex justify-center">
                    <FAQ />
                </section>
            </div>
        </DashBoardLayout>

        {/* Footer Section */}
        <div className="">
            <footer className={landingPageStyles.footer}>
                <Footer />
            </footer>
        </div>
    </div>
  );
};

export default AtsScoreChecker;
