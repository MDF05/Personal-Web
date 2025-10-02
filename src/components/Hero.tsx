import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import heroBackground from "@/assets/man-and-robots.gif";
import HeroBackground from "./HeroBackground";

import "@/css/heroImage.css"; // Pastikan file CSS diimpor
import HeroImage from "./HeroImage";
import HeroImage1 from "@/assets/hero/1.png";
import HeroImage2 from "@/assets/hero/2.png";
import HeroImage3 from "@/assets/hero/3.png";
import HeroImage4 from "@/assets/hero/4.png";
import HeroImage5 from "@/assets/hero/5.png";

// Daftar foto yang sudah Anda import di Hero.jsx
const photos = [
  HeroImage1, // Asumsi Anda akan mengoper ini sebagai props
  HeroImage2,
  HeroImage3,
  HeroImage4,
  HeroImage5,
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, []);

  setTimeout(() => {
    setIsVisible(true);
  }, 1000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />

      {/* Background Gif */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 holographic-bg opacity-10" />

      <div className="relative z-10 w-full h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-20">
        {/* Left side (Text) */}
        <div
          className={`space-y-6 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div>
            <span className="text-accent text-2xl md:text-4xl font-orbitron tracking-wider">
              Hello, I'm
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-black">
            MUHAMMAD DAVA FAHREZA <br />
            <span className="gradient-glow-text text-3xl md:text-5xl lg:text-6xl font-extrabold">
              FULLSTACK Developer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-rajdhani leading-relaxed max-w-xl">
            Specialized in{" "}
            <span className="text-primary font-semibold">Frontend</span>,{" "}
            <span className="text-primary font-semibold">Backend</span>,{" "}
            <span className="text-primary font-semibold">Mobile</span>,{" "}
            <span className="text-primary font-semibold">WordPress</span>,{" "}
            <span className="text-primary font-semibold">Machine Learning</span>{" "}
            and more. Always evolving with emerging technologies 🚀
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="neon-border bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron px-8 py-6 text-lg hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="neon-border-accent border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground font-orbitron px-8 py-6 text-lg hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              View Portfolio
            </Button>
          </div>

          {/* Social */}
          <div className="flex gap-6 mt-4">
            {[Github, Linkedin, Mail, Phone].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-4 rounded-full neon-border bg-card/10 backdrop-blur-sm hover:bg-primary/20 transition-all hover:scale-110"
              >
                <Icon className="h-6 w-6 text-primary" />
              </a>
            ))}
          </div>
        </div>

        {/* Right side (Image Full Body) */}
        <div className="flex justify-center items-end h-full">
          <HeroImage imagePaths={photos} interval={4000} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
