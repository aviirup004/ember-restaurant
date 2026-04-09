"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function CraftSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const word = "CRAFT";
  const letters = word.split("");

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col justify-center bg-transparent mt-[-20vh] md:mt-[-30vh] pt-0 pb-24 md:pb-32 overflow-hidden pl-6 md:pl-16 lg:pl-24 z-10"
    >
      {/* Thin vertical orange line on far left edge */}
      <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#FF4D00] h-full" />

      <div className="relative z-10 w-full">
        {/* Line 1: FIRE IS OUR */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8 }}
          className="font-serif font-bold text-[#F5F0E8] whitespace-nowrap"
          style={{ fontSize: "15vw", lineHeight: 0.85, letterSpacing: "-0.02em" }}
        >
          FIRE IS OUR
        </motion.div>

        {/* Line 2: CRAFT */}
        <div 
          className="font-serif font-bold text-[#F5F0E8] flex overflow-hidden mt-4"
          style={{ fontSize: "15vw", lineHeight: 0.85, letterSpacing: "-0.02em" }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.1,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Horizontal rule in orange */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-[2px] bg-[#FF4D00] mt-16 md:mt-24 mb-10 origin-left max-w-[85vw]"
        />

        {/* 3 stats in a row */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-16 lg:gap-32 w-full max-w-[85vw] text-[#F5F0E8]">
          {[
            "12 — Courses",
            "38°C — Grill Temperature",
            "1 — Night to Remember",
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.6, delay: 1 + i * 0.2 }}
              className="font-sans text-xs md:text-sm tracking-[0.25em] md:tracking-[0.4em] uppercase text-[#F5F0E8]/70 whitespace-nowrap"
            >
              {stat}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
