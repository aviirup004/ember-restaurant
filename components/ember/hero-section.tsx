"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-transparent">
      {/* Smoky gradient background with ember glow from below */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 120%, rgba(255, 77, 0, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 50% 110%, rgba(255, 77, 0, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 30% 80%, rgba(201, 168, 76, 0.05) 0%, transparent 30%),
            radial-gradient(circle at 70% 90%, rgba(255, 77, 0, 0.08) 0%, transparent 25%)
          `,
        }}
      />

      {/* Animated smoke particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-[0.03]"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              left: `${15 + i * 12}%`,
              bottom: "-20%",
              background: `radial-gradient(circle, ${i % 2 === 0 ? "#FF4D00" : "#C9A84C"} 0%, transparent 70%)`,
            }}
            animate={{
              y: [-100, -400],
              x: [0, (i % 2 === 0 ? 50 : -50)],
              opacity: [0.03, 0],
              scale: [1, 1.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </div>

      {/* Parallax grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1, delay: 0.2 }}
          className="font-sans text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-8"
        >
          New York City
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1.2, delay: 0.4 }}
          className="font-serif text-[clamp(4rem,15vw,12rem)] font-light tracking-[0.2em] text-[#F5F0E8] leading-none flex justify-center"
          style={{
            textShadow: `
              0 0 80px rgba(255, 77, 0, 0.3),
              0 0 120px rgba(255, 77, 0, 0.2),
              0 0 200px rgba(255, 77, 0, 0.1)
            `,
          }}
        >
          {"EMBER".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-200 hover:text-[#CC2200] hover:scale-[1.2] hover:-translate-y-[8px] hover:[text-shadow:0_0_20px_#FF4D00,_0_0_40px_#CC2200]"
            >
              {letter}
            </span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1, delay: 0.8 }}
          className="font-serif text-xl md:text-2xl italic text-[#F5F0E8]/60 mt-8 tracking-wide"
        >
          Where Fire Meets Flavor
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1.5, delay: 1.2 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-12"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: [0.25, 0.1, 0.25, 1], delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#F5F0E8]/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent"
        />
      </motion.div>

      {/* Ambient corner accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-[#FF4D00]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-[#C9A84C]/5 to-transparent pointer-events-none" />
    </section>
  );
}
