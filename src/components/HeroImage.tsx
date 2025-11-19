import { useEffect, useState } from "react";
import "@/css/heroImage.css";

// Mengganti HeroImage (dengan efek Glitch Wipe)
export const HeroImage = ({ imagePaths, interval = 4500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [glitchStyle, setGlitchStyle] = useState({});

  useEffect(() => {
    if (!imagePaths || imagePaths.length === 0) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);

      setGlitchStyle({
        transform: `translateX(${Math.random() * 15 - 7.5}px)`,
        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        opacity: 0.8,
      });

      setTimeout(() => {
        setGlitchStyle({});
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
      }, 200);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, imagePaths]);

  const currentImage = imagePaths[currentIndex];

  return (
    // Container untuk foto potrait tinggi
    <div className="relative w-full h-[90%] flex justify-center items-center">
      {/* Frame Futuristik (Neon Border dan Glow) */}
      <div
        className="absolute inset-0 rounded-lg border-2 border-cyan-400 shadow-2xl shadow-cyan-400/40 glitch-frame-animation"
        style={{ animationDelay: `${Math.random() * 10}s` }}
      />

      {/* Elemen Foto Utama */}
      <img
        src={currentImage}
        alt="Profile Image"
        // Transisi opacity di sini untuk fade-in foto baru
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300`}
        style={{ opacity: isTransitioning ? 0 : 1 }}
      />

      {/* Overlay Glitch/Efek Transisi */}
      <div
        className={`absolute inset-0 rounded-lg bg-black/50 transition-all duration-200 pointer-events-none`}
        style={glitchStyle}
      >
        <div className="absolute inset-0 scanline-overlay" />
      </div>
    </div>
  );
};
