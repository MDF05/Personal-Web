import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

import "@/css/hero.social-icon.css";

export default function SocialIcons() {
  const socials = [
    { Icon: Github, href: "#", color: "#ffffff", label: "Github" },
    { Icon: Linkedin, href: "#", color: "#ffffff", label: "Linkedin" },
    { Icon: Mail, href: "mailto:", color: "#ffffff", label: "Email" },
    {
      Icon: Phone,
      href: "https://wa.me/",
      color: "#ffff",
      label: "WhatsApp",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % socials.length);
    }, 2000); // ganti icon tiap 2 detik
    return () => clearInterval(interval);
  }, [socials.length]);

  return (
    <div className="flex justify-center md:justify-start gap-4 pt-4">
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.href}
          className={`flex items-center justify-center gap-2 p-2 rounded-full bg-gray-900/60 backdrop-blur-md transition-all group social-glow w-[900px]  ${
            activeIndex === i ? "active" : ""
          }`}
          style={{ color: social.color }}
        >
          <social.Icon
            className="h-8 w-8 transition-all duration-300"
            style={{
              color: social.color,
              filter: `drop-shadow(0 0 8px ${social.color}AA)`,
              stroke: social.color,
              strokeWidth: "1px",
            }}
          />

          {/* teks hanya muncul kalau active */}
          <span
            className={`text-xl font-medium transition-all duration-500 overflow-hidden whitespace-nowrap items-center
            ${
              activeIndex === i
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 w-0"
            }`}
            style={{ color: social.color }}
          >
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
}
