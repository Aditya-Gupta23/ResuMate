import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { landingPageStyles } from "../assets/dummystyle";
import { LayoutTemplate } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-indigo-1000 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Logo & Description */}
          <div className="w-250 mr-5 flex flex-col gap-5">
            <div className={landingPageStyles.logoContainer}>
                <div className={landingPageStyles.logoIcon}>
                    <LayoutTemplate className={landingPageStyles.logoIconInner} />
                </div>
                <span className={landingPageStyles.logoText}>
                    ResuMate
                </span>
            </div>
            <p className="max-w-md 2xl:max-w-lg text-base leading-[1.4rem] md:text-lg md:leading-7">
                Your career, your way. 
                Take the next step in your career with ResuMate. 
                Craft resumes that impress employers and help you land interviews faster.
            </p>
            {/* Social Icons */}
            <p className="flex items-center text-lg font-bold">Tell your friends about us</p>
            <div className="flex space-x-4 md:w-1/3">
                <a href="#" className="bg-violet-600 p-3 rounded-full hover:bg-violet-500 transition">
                <FaFacebookF />
                </a>
                <a href="#" className="bg-cyan-500 p-3 rounded-full hover:bg-cyan-400 transition">
                <FaTwitter />
                </a>
                <a href="#" className="bg-pink-500 p-3 rounded-full hover:bg-pink-400 transition">
                <FaInstagram />
                </a>
                <a href="#" className="bg-blue-700 p-3 rounded-full hover:bg-blue-600 transition">
                <FaLinkedinIn />
                </a>
            </div>
          </div>

          
          {/* Links */}
          <nav className="w-full flex gap-10 text-sm md:text-[15px] lg:text-base 2xl:text-lg mt-8 lg:w-[45%] lg:mt-0 md:mt-10">
            <div>
                <div className="text-white font-bold uppercase tracking-[0.5px]">Resources</div>
                <div className="flex flex-col gap-2 lg:gap-2.5 mt-3 lg:mt-5 w-[160px] xs:w-[180px] sm:w-[200px] lg:w-[240px] 2xl:w-[300px]">
                <a href="#">Blog</a>
                <a href="#">Help Center</a>
                <a href="#">Privacy Policy</a>
                </div>
            </div>
            <div>
                <div className="text-white font-bold uppercase tracking-[0.5px]">Company</div>
                <div className="flex flex-col gap-2 mt-3 lg:mt-5 lg:gap-2.5">
                <a href="#">About Us</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
                <a href="#">Terms of Service</a>
                <a href="#">Privacy Policy</a>
                </div>
            </div>
        </nav>

        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ResuMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
