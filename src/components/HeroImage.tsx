import React, { useState, useEffect } from "react";

// Daftar foto akan dioper dari Hero.jsx
const HeroImage = ({ imagePaths, interval = 4500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [glitchStyle, setGlitchStyle] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);

      // 1. Pemicu Glitch (Hanya berlangsung 200ms)
      setGlitchStyle({
        // Efek pergeseran horizontal cepat (glitch)
        transform: `translateX(${Math.random() * 20 - 10}px)`,
        opacity: Math.random() < 0.5 ? 0.9 : 0.7,
        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)", // Efek seperti layar terbelah
      });

      // 2. Ganti foto saat Glitch selesai (200ms)
      setTimeout(() => {
        setGlitchStyle({
          opacity: 0,
          transform: "translateX(0)",
          clipPath: "none",
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
      }, 200);

      // 3. Foto baru muncul (Transisi selesai 300ms setelah ganti foto)
      setTimeout(() => {
        setIsTransitioning(false);
        setGlitchStyle({}); // Reset
      }, 500); // 200ms (glitch) + 300ms (fade-in)
    }, interval);

    return () => clearInterval(timer);
  }, [interval, imagePaths.length]);

  const currentImage = imagePaths[currentIndex];

  return (
    // Container untuk foto potrait tinggi
    // h-screen-72 = h layar dikurangi margin/padding, agar terlihat tinggi
    <div
      className="relative w-full max-w-sm h-[calc(100vh-180px)]"
      style={{ minHeight: "500px", maxHeight: "700px" }}
    >
      {/* Frame Futuristik (Opsional: Garis Neon Border) */}
      <div className="absolute inset-0 border-2 border-primary/50 rounded-lg shadow-2xl shadow-primary/30" />

      {/* Elemen Foto Utama */}
      <img
        src={currentImage}
        alt="Profile Image"
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300`}
        // Opacity dikelola oleh isTransitioning
        style={{ opacity: isTransitioning ? 0 : 1 }}
      />

      {/* Overlay Glitch/Efek Transisi di atas foto */}
      <div
        className={`absolute inset-0 rounded-lg bg-black/50 transition-all duration-200`}
        style={glitchStyle}
      >
        {/* Tambahkan elemen visual futuristik, misal garis scanline */}
        <div className="absolute inset-0 scanline-overlay" />
      </div>
    </div>
  );
};

export default HeroImage;
