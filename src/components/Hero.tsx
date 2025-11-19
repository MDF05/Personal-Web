import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FolderOpen } from "lucide-react";
import heroBackground from "@/assets/man-and-robots.gif";
import HeroBackground from "./HeroBackground";

// Pastikan file CSS diimpor
import { HeroImage } from "./HeroImage";
import HeroImage2 from "@/assets/hero/2.png";
// import HeroImage3 from "@/assets/hero/3.png";
// import HeroImage4 from "@/assets/hero/4.png";
import HeroImage5 from "@/assets/hero/5.png";
import SocialIcons from "./SocialIcon";

// Daftar foto yang sudah Anda import di Hero.jsx
const photos = [
  // HeroImage1, // Asumsi Anda akan mengoper ini sebagai props
  HeroImage2,
  // HeroImage3,
  // HeroImage4,
  HeroImage5,
];

// --- KOMPONEN UTAMA HERO ---
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Timeout dipindahkan ke useEffect untuk kontrol yang lebih baik
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 text-white ">
      <HeroBackground />

      {/* //! Background GIF Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 holographic-bg opacity-10" />

      {/* Content Container (Responsive two-column layout) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between min-h-[85vh] pt-10 pb-12">
        {/* //! Right side (Image Full Body) - Ditaruh di atas di Mobile */}
        <div className="w-full md:w-[35%] h-[100vh] flex justify-center items-center p-4">
          <HeroImage imagePaths={photos} interval={4000} />
        </div>

        {/* //! Left side (Text Content & CTA) - Ditaruh di bawah di Mobile */}
        <div
          className={`text-center md:text-left w-full md:w-[60%] space-y-6 lg:space-y-8 p-4 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
          }`}
        >
          {/* // ! Greeting */}
          <div className="mb-4">
            <span className="text-green-400 text-2xl md:text-3xl font-orbitron font-medium tracking-wider">
              Hello, I'm
            </span>
          </div>

          {/* // ! Main Name & Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-black leading-tight">
            <span className="block text-white mb-2">MUHAMMAD DAVA FAHREZA</span>
            <span
              className="block text-cyan-400 text-3xl md:text-4xl lg:text-5xl font-extrabold"
              style={{
                textShadow:
                  "0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.4)",
              }}
            >
              FULLSTACK Developer
            </span>
          </h1>

          {/* // !  Subtitle / Description  penjelasan diri deskripsi diri */}
          <p className="text-xl md:text-2xl text-gray-400 font-rajdhani max-w-xl mx-auto md:mx-0 leading-relaxed pt-2">
            Specialized in{" "}
            <span className="text-blue-400 font-semibold">Frontend</span>,{" "}
            <span className="text-blue-400 font-semibold">Backend</span>,{" "}
            <span className="text-blue-400 font-semibold">Mobile</span>,{" "}
            <span className="text-blue-400 font-semibold">WordPress</span>,{" "}
            <span className="text-blue-400 font-semibold">
              Machine Learning
            </span>{" "}
            and more. Versatile Developer Crafting Innovative Solutions and
            Always evolving with emerging technologies 🚀
          </p>

          {/* // ! Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6">
            <Button
              size="lg"
              className="w-full button-hero-download sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-orbitron font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-[1.05] rounded-xl relative overflow-hidden"
              style={{ boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)" }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full button-hero-download sm:w-auto border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 font-orbitron font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-[1.05] rounded-xl relative overflow-hidden hover:text-white"
              style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
            >
              <FolderOpen className="mr-2 h-5 w-5" />
              View Portfolio
            </Button>
          </div>

          <SocialIcons></SocialIcons>
        </div>
      </div>
    </section>
  );
};

export default Hero;
