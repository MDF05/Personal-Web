"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import ManAndRobot from "@/assets/man-and-robots.gif";
import HelloRobot from "@/assets/hello-robot.gif";

export default function HeroAstronaut() {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      {/* Cahaya nebula */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl"
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Stars */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 3 + Math.random() * 3,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Planet kecil */}
      <motion.div
        className="absolute left-[20%] top-[30%] w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-700 shadow-[0_0_30px_#06b6d4]"
        animate={{ y: [0, -20, 0], rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[15%] bottom-[25%] w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-800 shadow-[0_0_40px_#a855f7]"
        animate={{ y: [0, 25, 0], rotate: [360, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* GIF kiri */}
      <motion.div
        className="absolute left-1 top-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.4)] backdrop-blur-md bg-white/5 p-2"
        animate={{ y: [-15, 15, -15], rotate: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={ManAndRobot}
          alt="Man and Robot"
          className="w-[320px] h-auto rounded-lg"
        />
      </motion.div>

      {/* GIF kanan */}
      <motion.div
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.4)] backdrop-blur-md bg-white/5 p-2"
        animate={{ y: [15, -15, 15], rotate: [3, -3, 3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={HelloRobot}
          alt="Hello Robot"
          className="w-[340px] h-auto rounded-lg"
        />
      </motion.div>

      {/* Percikan listrik */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-14 bg-gradient-to-b from-cyan-200 via-blue-400 to-transparent rounded-full"
          style={{
            left: `${45 + i * 2}%`,
            top: `${48 + (i % 2) * 4}%`,
          }}
          animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
          transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
        />
      ))}

      {/* Sinar sweep lembut */}
      <motion.div
        className="absolute top-0 left-0 w-[180%] h-full bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent"
        animate={{ x: ["-40%", "40%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
