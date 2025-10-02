import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import heroBackground from "@/assets/man-and-robots.gif";
import HeroBackground from "./HeroBackground";
import HeroImage1 from "@/assets/hero/1.png";
import HeroImage2 from "@/assets/hero/2.png";
import HeroImage3 from "@/assets/hero/3.png";
import HeroImage4 from "@/assets/hero/4.png";
import HeroImage5 from "@/assets/hero/5.png";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, []);

  setTimeout(() => {
    setIsVisible(true);
  }, 1000);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-auto pt-12">
      <HeroBackground />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Particle background overlay */}
      {/* <div className="absolute inset-0 particle-bg" /> */}

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 holographic-bg opacity-10" />

      {/* Content */}
      <div className="relative z-10 text-center w-full mx-auto px-6 flex h-screen justify-center items-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Greeting */}
          <div className="mb-8 animate-fade-in">
            <span className="text-accent text-xl md:text-2xl lg:text-4xl font-orbitron font-medium tracking-wider">
              Hello, I'm
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-orbitron font-black mb-6 animate-scale-in">
            <span className="fade-up">MUHAMMAD DAVA FAHREZA</span> <br />
            <span className="gradient-glow-text text-shadow-glow text-3xl md:text-6xl lg:text-8xl font-extrabold">
              FULLSTACK Developer
            </span>
            {/* <span className="text-foreground"> {`DEVELOPER`}</span> */}
          </h1>

          {/* Subtitle */}
          <div className="mb-8 animate-slide-in-left delay-300">
            <p className="text-lg md:text-2xl text-muted-foreground font-rajdhani font-medium max-w-3xl mx-auto leading-relaxed">
              Specialized in{" "}
              {[
                { name: "Frontend" },
                { name: "Backend" },
                { name: "Mobile" },
                { name: "WordPress" },
                { name: "Machine Learning" },
                { name: " and Fullstack", color: "text-green-500" },
              ].map((skill, i, arr) => (
                <span
                  key={skill.name}
                  className={`${skill.color ?? "text-primary"} font-semibold`}
                >
                  {skill.name}
                  {i < arr.length - 1 ? ", " : " "}
                </span>
              ))}
              Versatile Developer crafting innovative solutions and continuously
              evolving with emerging technologies
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-right delay-500">
            <Button
              size="lg"
              className="neon-border bg-gradient-primary hover:bg-gradient-glow text-primary-foreground font-orbitron font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 glow-effect"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="neon-border-accent border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground font-orbitron font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              View Portfolio
            </Button>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 animate-fade-in delay-700">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:", label: "Email" },
              { icon: Phone, href: "https://wa.me/", label: "WhatsApp" },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className="group p-4 rounded-full neon-border bg-card/10 backdrop-blur-sm hover:bg-primary/20 transition-all duration-300 hover:scale-110 glow-effect"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <social.icon className="h-6 w-6 text-primary group-hover:text-primary-glow transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
        <div style={{ height: "200px" }} className=""></div>
      </div>
    </section>
  );
};

export default Hero;
