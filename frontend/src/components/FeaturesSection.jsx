import Lottie from "lottie-react";
import coverLetterAnim from "../assets/animation2.json";
import trackerAnim from "../assets/animation.json";
import chooseTemp from "../assets/chooseTemp.json";

const FeaturesSection = () => {
  const features = [
    {
      title: "Choose Templates for Your Resume",
      desc: "Pick from a wide range of modern, ATS-friendly templates to make your resume stand out.",
      animation: chooseTemp,
    },
    {
      title: "Create Stunning Cover Letters",
      desc: "Craft personalized cover letters that match your resume style and increase your chances.",
      animation: coverLetterAnim,
    },
    {
      title: "Track Your Job Applications",
      desc: "Take off to your dream job. Stay on top of your applications and manage everything from one dashboard.",
      animation: trackerAnim,
    },
  ];

  return (
    <section className="w-full relative py-16 bg-[#f0eeeb]">
      {/* Dotted background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)] [background-size:10px_10px]"></div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl text-gray-900 md:text-4xl font-bold text-center mb-12">
          Everything You Need to Land Your Dream Job
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="h-50 flex justify-center items-center">
                <Lottie animationData={feature.animation} loop={true} />
              </div>
              <h3 className="text-xl font-semibold mt-6">{feature.title}</h3>
              <p className="text-gray-600 mt-auto">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
