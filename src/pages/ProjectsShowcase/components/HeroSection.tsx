import { useMemo } from "react";
import { motion } from "framer-motion";
import { Printer, Share2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects.data";
import { cn } from "@/lib/utils";
import profileImage from "@/assets/hero/5.png";
import { profileData } from "@/data/profile.data";
import { certificationsData } from "@/data/certifications.data";
import { alltechUsed } from "@/data/technologies.data";

import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineMail,
  AiFillInstagram,
  AiFillFacebook,
  AiFillYoutube,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { FaTiktok, FaWhatsapp, FaTelegram, FaDiscord } from "react-icons/fa";

const icons: Record<string, JSX.Element> = {
  email: <AiOutlineMail size={28} />,
  whatsapp: <FaWhatsapp size={28} />,
  linkedin: <AiFillLinkedin size={28} />,
  github: <AiFillGithub size={28} />,
  instagram: <AiFillInstagram size={28} />,
  facebook: <AiFillFacebook size={28} />,
  youtube: <AiFillYoutube size={28} />,
  tiktok: <FaTiktok size={28} />,
  twitterOrX: <AiFillTwitterCircle size={28} />,
  telegram: <FaTelegram size={28} />,
  discord: <FaDiscord size={28} />,
  threads: <AiFillInstagram size={28} />, // threads belum ada, pakai ig icon
};

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

export const HeroSection = ({
  typedHeroText,
  cursorVisible,
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

  const thisYear = new Date().getFullYear();

  return (
    <section ref={heroRef} className="cyber-hero relative pt-24 w-screen">
      {/* Row 7: Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full ">
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
          className="magnetic-button border-cyan-500/40 text-cyan-300 hover:white "
          onClick={onShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="magnetic-button text-purple-300 border border-purple-200 hover:white"
          onClick={onCustomPdf}
        >
          <FileDown className="h-5 w-5" />
          Custom PDF
        </Button>
      </div>

      {/* Binary Particles */}
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

      {/* MAIN WRAPPER */}
      <div className="relative z-10 mx-auto py-12 flex w-full justify-center">
        <div className="project-card rounded-3xl border px-6 py-10 shadow-xl ">
          <div className="flex flex-col items-center gap-8">
            {/* Header */}
            <div className="text-center flex w-full flex-col items-center justify-center gap-2">
              <p className="flex w-full items-center justify-center text-center text-3xl uppercase tracking-[1.2em] text-cyan-400 drop-shadow-[0_0_12px_rgba(0,243,255,0.9)]">
                MY PORTFOLIO
              </p>

              <a
                href={profileData.currentUrl}
                className="flex w-full items-center justify-center text-center text-xl tracking-[.5em] text-gray-400 drop-shadow-[0_0_12px_rgba(0,243,255,0.9)]"
              >
                {profileData.currentUrl}
              </a>
            </div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="tech-frame h-[500px] w-[300px] overflow-hidden rounded-2xl">
                <img
                  src={profileImage}
                  alt="Muhammad Dava Fahreza"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Name + Role */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-orbitron font-bold text-white text-5xl"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-300 bg-clip-text text-transparent">
                  Muhammad Dava Fahreza
                </span>
              </motion.h1>

              <div className="mt-3 text-4xl font-semibold text-cyan-200">
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

            {/* Description */}
            <div className="w-full mt-6 glow-box rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,255,0.12)]">
              <p className="text-xl  text-pretty text-justify text-white/90 leading-relaxed tracking-wide drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]">
                “ {profileData.description} ”
              </p>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-5 text-gray-300 text-lg">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md">
                <p className="text-cyan-300 font-semibold text-xl">
                  {thisYear - profileData.experience.getFullYear()}+ Years
                </p>
                <p className="text-gray-400 text-sm">Of experience</p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md">
                <p className="text-cyan-300 font-semibold text-xl">
                  {totalProjects}
                </p>
                <p className="text-gray-400 text-sm">Completed projects</p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md">
                <p className="text-cyan-300 font-semibold text-xl">
                  {certificationsData.length - 4}++
                </p>
                <p className="text-gray-400 text-sm">Certificates earned</p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-md">
                <p className="text-cyan-300 font-semibold text-xl">
                  {alltechUsed.length - 20}++
                </p>
                <p className="text-gray-400 text-sm">Tech stack used</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {Object.entries(profileData.socialMedia ?? {}).map(
                ([key, social]) => (
                  <a
                    key={key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-white transition transform hover:scale-125"
                  >
                    {icons[key]}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
