import { motion } from "framer-motion";
import microsoft_logo from '../assets/Microsoft.svg';
import adobe_logo from '../assets/adobe-logo.svg';
import google_logo from '../assets/google_logo.svg';
import meta_logo from '../assets/meta_logo.svg';
import netflix_logo from '../assets/netflix_logo.svg';

const companies = [
  { name: "Microsoft", logo: microsoft_logo },
  { name: "Adobe", logo: adobe_logo },
  { name: "Google", logo: google_logo },
  { name: "Meta", logo: meta_logo },
  { name: "Netflix", logo: netflix_logo },
];

export default function TrustedBy() {
  return (
    <section className="w-full py-16 relative bg-[#f0eeeb] overflow-hidden">
        {/* Dotted background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)] [background-size:10px_10px]"></div>

        <div className="relative text-center mb-12 z-10">
            <h2 className="text-3xl font-bold text-gray-900">
            Trusted by job seekers who've landed at top companies
            </h2>
            <p className="text-gray-600 mt-3">
                secure positions at industry-leading companies
            </p>
        </div>

        {/* Scrolling logos */}
        <div className="overflow-hidden relative w-full z-10">
            <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
            {/* Logos duplicated for seamless scroll */}
            {[...companies, ...companies].map((c, i) => (
                <div key={i} className="flex-shrink-0 mx-16">
                    <img
                        src={c.logo}
                        alt={c.name}
                        className="h-12 w-auto object-contain p-2.5"
                    />
                </div>
            ))}
            </motion.div>
        </div>
    </section>

  );
}
