import { useContext, useState } from "react";
import { landingPageStyles } from "../assets/dummystyle";
import { LayoutTemplate, X, Menu, ArrowRight, Zap, Download, LogIn } from 'lucide-react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import TrustedBy from "../components/TrustedBy";
import resumeSectionImage from "../assets/section_1.webp"
import Footer from "../components/Footer";
import FeaturesSection from "../components/FeaturesSection";
import Navbar from "../components/Navbar";

export default function LandingPage() {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleCTA = (whichButton) => {
        if(!user) {
            setOpenAuthModal(true);
        } else {
            whichButton == "buildResumeButton" && navigate('/dashboard');
            whichButton == "atsScoreButton" && navigate('/ats-checker');
        }
    }

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2; // distance from center
        const y = event.clientY - rect.top - rect.height / 2; // distance from center
        const rotateX = (y / rect.height) * 60;
        const rotateY = -(x / rect.width) * 60;
        const rotateZ = (x / rect.width) * 30;
        setRotation({ x: rotateX, y: rotateY, z: rotateZ });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 }); // reset when cursor leaves
    };


    return (
        <div className={landingPageStyles.container}>
            {/* Header */}
            <Navbar user={user} setOpenAuthModal={setOpenAuthModal} />

            {/* Main Content */}
            <main className={landingPageStyles.main}>
                <section className={landingPageStyles.heroSection}>
                    <div className={landingPageStyles.heroGrid}>
                        {/* Left Content */}
                        <div className={landingPageStyles.heroLeft}>
                            <div className={landingPageStyles.tagline}>
                                Professional Resume Builder
                            </div>

                            <h1 className={landingPageStyles.heading}>
                                <span className={landingPageStyles.headingText}>Boost</span>
                                <span className={landingPageStyles.headingGradient}>Employability</span>
                                <span className={landingPageStyles.headingText}>Today</span>
                            </h1>

                            <p className={landingPageStyles.description}>
                                Create job-winning resumes with expertly designed templates.
                                ATS-friendly, recruiter-approved and tailored to your carrer goals.
                            </p>

                            <div className={landingPageStyles.ctaButtons}>
                                <button className={landingPageStyles.primaryButton} onClick={() => handleCTA("buildResumeButton")}>
                                    <div className={landingPageStyles.primaryButtonOverlay}></div>
                                    <span className={landingPageStyles.primaryButtonContent}>
                                        Start Building
                                        <ArrowRight className={landingPageStyles.primaryButtonIcon} size={18} />
                                    </span>
                                </button>
                                <button className={landingPageStyles.secondaryButton} onClick={() => handleCTA("atsScoreButton")}>
                                    Get Your Ats Score
                                </button>
                            </div>

                            {/* Stats Grid */}
                            <div className={landingPageStyles.statsContainer}>
                                {[
                                    { value: '50K+', label: 'Resumes Created', gradient: 'from-violet-600 to-fuchsia-600' },
                                    { value: '4.9★', label: 'User Rating', gradient: 'from-orange-500 to-red-500' },
                                    { value: '5 Min', label: 'Build Time', gradient: 'from-emerald-500 to-teal-500' }
                                ].map((stat, idx) => (
                                    <div className={landingPageStyles.statItem} key={idx}>
                                        <div className={`${landingPageStyles.statNumber} ${stat.gradient}`}>
                                            {stat.value}
                                        </div>
                                        <div className={landingPageStyles.statLabel}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>    
                        </div>

                        {/* Right Content */}
                        <div className={landingPageStyles.heroIllustration}>
                            <div className={landingPageStyles.heroIllustrationBg}></div>
                            <div className={landingPageStyles.heroIllustrationContainer}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                                    transition: "transform 0.1s ease-out",
                                    perspective: "1000px",
                                }}
                            >
                                <svg
                                    viewBox="0 0 400 500"
                                    className={landingPageStyles.svgContainer}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Background */}
                                    <defs>
                                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#d946ef" />
                                        </linearGradient>
                                        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" />
                                            <stop offset="100%" stopColor="#f8fafc" />
                                        </linearGradient>
                                    </defs>

                                    {/* SVG elements */}
                                    <rect x="50" y="50" width="300" height="400" rx="20" className={landingPageStyles.svgRect} />
                                    <circle cx="120" cy="120" r="25" className={landingPageStyles.svgCircle} />
                                    <rect x="160" y="105" width="120" height="8" rx="4" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="160" y="120" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="170" width="260" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="185" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="200" width="240" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="230" width="60" height="6" rx="3" className={landingPageStyles.svgRectPrimary} />
                                    <rect x="70" y="250" width="40" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="120" y="250" width="50" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="180" y="250" width="45" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                                    <rect x="70" y="290" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                                    <rect x="70" y="310" width="180" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="325" width="150" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                                    <rect x="70" y="340" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />

                                    {/* Animated elements */}
                                    <circle cx="320" cy="100" r="15" className={landingPageStyles.svgAnimatedCircle}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 0,-10; 0,0"
                                            dur="3s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                    <rect x="30" y="300" width="12" height="12" rx="6" className={landingPageStyles.svgAnimatedRect}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="translate"
                                            values="0,0; 5,0; 0,0"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </rect>
                                    <polygon points="360,200 370,220 350,220" className={landingPageStyles.svgAnimatedPolygon}>
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            values="0 360 210; 360 360 210; 0 360 210"
                                            dur="4s"
                                            repeatCount="indefinite"
                                        />
                                    </polygon>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                <TrustedBy />

                <section className="w-full py-16 bg-[#f0eeeb]">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                        
                        <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Build a Resume That Stands Out
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Showcase your professional experience and skills with a modern, 
                            clean resume. Our tools and templates help you highlight your 
                            achievements, making your application more attractive to top companies.
                        </p><br/>
                        <ul className="text-gray-700 space-y-2 mb-6">
                            <li>✔ Professionally designed templates</li>
                            <li>✔ Easy customization and editing</li>
                            <li>✔ Optimize your resume for recruiters and ATS systems</li>
                        </ul>
                        
                        </div>

                        <div className="md:w-1/2">
                        <img
                            src={resumeSectionImage}
                            alt="Resume example and personal branding"
                            className="w-full rounded-xl shadow-lg"
                        />
                        </div>

                    </div>
                </section>
                
                {/* Features Section */}
                <FeaturesSection />
                <section className={landingPageStyles.featuresSection}>
                    <div className={landingPageStyles.featuresContainer}>
                        <div className={landingPageStyles.featuresHeader}>
                            <h2 className={landingPageStyles.featuresTitle}>
                                Why Choose <span className={landingPageStyles.featuresTitleGradient}>
                                    ResuMate?
                                </span>
                            </h2>
                            <p className={landingPageStyles.featuresDescription}>
                                Everything you need to create a professional resume that stands out
                            </p>
                        </div>
                        <div className={landingPageStyles.featuresGrid}>
                            {[
                                {
                                    icon: <Zap className={landingPageStyles.featureIcon} />,
                                    title: "Lightning Fast",
                                    description: "Create professional resumes in under 5 minutes with our streamlined process",
                                    gradient: landingPageStyles.featureIconViolet,
                                    bg: landingPageStyles.featureCardViolet
                                },
                                {
                                    icon: <LayoutTemplate className={landingPageStyles.featureIcon} />,
                                    title: "Pro Templates",
                                    description: "Choose from dozens of recruiter-approved, industry-specific templates",
                                    gradient: landingPageStyles.featureIconFuchsia,
                                    bg: landingPageStyles.featureCardFuchsia
                                },
                                {
                                    icon: <Download className={landingPageStyles.featureIcon} />,
                                    title: "Instant Export",
                                    description: "Download high-quality PDFs instantly with perfect formatting",
                                    gradient: landingPageStyles.featureIconOrange,
                                    bg: landingPageStyles.featureCardOrange
                                }
                            ].map((feature, idx) => (
                                <div key={idx} className={landingPageStyles.featureCard}>
                                    <div className={landingPageStyles.featureCardHover}></div>
                                    <div className={`${landingPageStyles.featureCardContent} ${feature.bg}`}>
                                        <div className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className={landingPageStyles.featureTitle}>
                                            {feature.title}
                                        </h3>
                                        <p className={landingPageStyles.featureDescription}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={landingPageStyles.ctaSection}>
                    <div className={landingPageStyles.ctaContainer}>
                        <div className={landingPageStyles.ctaCard}>
                            <div className={landingPageStyles.ctaCardBg}></div>
                            <div className={landingPageStyles.ctaCardContent}>
                                <h2 className={landingPageStyles.ctaTitle}>
                                    Ready to Build Your <span className={landingPageStyles.ctaTitleGradient}>
                                        Standout Resume?
                                    </span>
                                </h2>
                                <p className={landingPageStyles.ctaDescription}>
                                    Join thousands of professionals who landed their dream jobs with our platform
                                </p>
                                <button className={landingPageStyles.ctaButton} onClick={() => handleCTA("buildResumeButton")}>
                                    <div className={landingPageStyles.ctaButtonOverlay}></div>
                                    <span className={landingPageStyles.ctaButtonText}>
                                        Start Building Now
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Section */}
            <footer className={landingPageStyles.footer}>
                <Footer />
            </footer>

            {/* Modal For login and Signup */}
            <Modal isOpen={openAuthModal} onClose={() => {
                setOpenAuthModal(false);
                setCurrentPage("login");
            }} hideHeader>
                <div>
                    {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
                    {currentPage === 'signup' && <SignUp setCurrentPage={setCurrentPage} />}
                </div>
            </Modal>
        </div>
    );
}