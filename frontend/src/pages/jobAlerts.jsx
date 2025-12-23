import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import DashBoardLayout from "../components/DashboardLayout";
import Footer from "../components/Footer";
import { landingPageStyles } from "../assets/dummystyle";
import { API_PATHS } from "../utils/apiPaths";

export default function JobAlerts() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.jobs.GET_ALL);
            setJobs(res.data || []);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    };

    fetchJobs();
  }, []);


  return (
    <div>
        <DashBoardLayout>
            <div className="min-h-screen py-20 px-6">  
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                    Job Alerts
                </h1>
                <p className="text-gray-400 text-lg">
                    Jobs curated automatically based on your profile preferences
                </p>
                </motion.div>

                {/* Loader */}
                {loading && (
                <div className="flex justify-center mt-20">
                    <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
                )}

                {/* Jobs Grid */}
                {!loading && (
                <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job, idx) => (
                    <motion.a
                        key={idx}
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -6 }}
                        className="block bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition"
                    >
                        <h3 className="text-xl font-semibold text-violet-400 mb-2">
                            {job.title}
                        </h3>
                        <p className="text-slate-300 max-w-full break-words">{job.company}</p>
                        <p className="text-sm text-slate-400 mt-1">
                        📍 {job.location}
                        </p>
                        <p className="text-xs text-slate-500 mt-4">
                            Posted {job.postedAt && new Date(job.postedAt).toLocaleDateString()}
                        </p>
                    </motion.a>
                    ))}
                </div>
                )}

                {!loading && jobs.length === 0 && (
                <p className="text-center text-slate-400 mt-20">
                    No job alerts found. Enable alerts in your profile.
                </p>
                )}
            </div>
        </DashBoardLayout>
        <footer className={landingPageStyles.footer}>
            <Footer />
        </footer>
    </div>
  );
}
