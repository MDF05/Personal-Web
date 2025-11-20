import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Printer, Share2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects.data";
import { cn } from "@/lib/utils";
import { getTechIcon } from "../utils/getTechIcon";
import profileImage from "@/assets/hero/5.png";

type HeroSectionProps = {
  typedHeroText: string;
  cursorVisible: boolean;
  activeProject: (typeof projects)[number];
  activeSlugIndex: number;
  totalProjects: number;
  onPrint: () => void;
  onShare: () => void;
  onCustomPdf: () => void;
  heroRef: React.RefObject<HTMLElement>;
};

const heroSocials = [
  {
    label: "GitHub",
    href: "https://github.com/MDF05",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-dava-fahreza/",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/",
  },
];

export const HeroSection = ({
  typedHeroText,
  cursorVisible,
  activeProject,
  activeSlugIndex,
  totalProjects,
  onPrint,
  onShare,
  onCustomPdf,
  heroRef,
}: HeroSectionProps) => {
  const binaryParticles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: `bit-${index}`,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        value: Math.random() > 0.5 ? "0101" : "1010",
      })),
    []
  );

  return (
    <section ref={heroRef} className="cyber-hero relative">
      <div className="binary-stream">
        {binaryParticles.map((particle) => (
          <span
            key={particle.id}
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          >
            {particle.value}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        <div className="project-card rounded-3xl border px-6 py-10 shadow-xl">
          <div className="flex flex-col items-center gap-8">
            {/* Row 1: MY PORTFOLIO */}
            <div className="text-center">
              <p className="text-sm uppercase tracking-[1.2em] text-cyan-400 drop-shadow-[0_0_12px_rgba(0,243,255,0.9)]">
                MY PORTFOLIO
              </p>
            </div>

            {/* Row 2: Profile Image - Centered, Larger Size */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="tech-frame h-96 w-80 overflow-hidden rounded-2xl md:h-[28rem] md:w-[22rem]">
                <img
                  src={profileImage}
                  alt="Muhammad Dava Fahreza"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Row 3: Name and Title */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-orbitron text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-300 bg-clip-text text-transparent">
                  Muhammad Dava Fahreza
                </span>
              </motion.h1>
              <div className="mt-3 text-lg font-semibold text-cyan-200">
                <span>{typedHeroText}</span>
                <span
                  className={cn(
                    "ml-2 text-cyan-400",
                    cursorVisible ? "opacity-100" : "opacity-0"
                  )}
                >
                  |
                </span>
              </div>
            </div>

            {/* Row 4: Email */}
            <div className="text-center">
              <a
                href="mailto:mdavafahreza05@gmail.com"
                className="inline-flex items-center gap-2 text-base text-cyan-300 transition hover:text-cyan-100"
              >
                <Mail className="h-5 w-5" />
                mdavafahreza05@gmail.com
              </a>
            </div>

            {/* Row 5: Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {heroSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hologram-icon rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>

            {/* Row 6: Active Project Info */}
            <div className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs text-white/50">Proyek Aktif</p>
              <p className="mt-1 text-xl font-semibold text-white">
                {activeProject.title}
              </p>
              <p className="mt-1 text-sm text-cyan-200">
                {activeSlugIndex + 1} / {totalProjects}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {activeProject.technologies.slice(0, 4).map((tech) => {
                  const TechIcon = getTechIcon(tech);
                  return (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 px-3 py-1.5 text-xs text-cyan-100"
                    >
                      {TechIcon && <TechIcon className="h-3.5 w-3.5" />}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Row 7: Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={onPrint}
                size="lg"
                className="magnetic-button bg-cyan-500 text-black shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:bg-cyan-400"
              >
                <Printer className="h-5 w-5" />
                CETAK PDF
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="magnetic-button border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10"
                onClick={onShare}
              >
                <Share2 className="h-5 w-5" />
                Bagikan
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="magnetic-button text-purple-300 hover:bg-purple-500/10"
                onClick={onCustomPdf}
              >
                <FileDown className="h-5 w-5" />
                Custom PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

