"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        {/* Rich gradient background simulating atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 150% 100% at 50% 100%, rgba(255, 77, 0, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 100% 80% at 30% 20%, rgba(201, 168, 76, 0.08) 0%, transparent 40%),
              radial-gradient(ellipse 80% 60% at 70% 80%, rgba(255, 77, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.4) 0%, transparent 100%)
            `,
          }}
        />

        {/* Animated ember particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + (i * 4.5)}%`,
              bottom: "0%",
              background: i % 3 === 0 ? "#FF4D00" : "#C9A84C",
              boxShadow: `0 0 ${4 + (i % 3) * 2}px ${i % 3 === 0 ? "#FF4D00" : "#C9A84C"}`,
            }}
            animate={{
              y: [-50, -400 - (i * 20)],
              x: [0, (i % 2 === 0 ? 30 : -30)],
              opacity: [0.8, 0],
              scale: [1, 0.3],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}

        {/* Subtle smoke layers */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(255, 77, 0, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 30%, rgba(201, 168, 76, 0.08) 0%, transparent 40%)
            `,
            backgroundSize: "200% 200%",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* Pre-text */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8 }}
          className="block font-sans text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-8"
        >
          The Experience
        </motion.span>

        {/* Main quote */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F5F0E8] leading-[1.1] mb-8"
          style={{
            textShadow: `
              0 0 60px rgba(255, 77, 0, 0.2),
              0 0 100px rgba(255, 77, 0, 0.1)
            `,
          }}
        >
          Every meal is a
          <br />
          <span className="italic text-[#FF4D00]">memory.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.4 }}
          className="font-sans text-lg md:text-xl text-[#F5F0E8]/50 max-w-2xl mx-auto leading-relaxed"
        >
          Step into a realm where culinary artistry transcends the ordinary.
          Each visit to EMBER is not merely a dinner — it is an encounter with
          the extraordinary, a moment suspended in time.
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1.5, delay: 0.6 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-16"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.8 }}
          className="flex justify-center gap-16 md:gap-24 mt-16"
        >
          {[
            { number: "3", label: "Michelin Stars" },
            { number: "15", label: "Years of Excellence" },
            { number: "∞", label: "Memories Created" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.5, delay: 1 + index * 0.1 }}
                className="block font-serif text-4xl md:text-5xl text-[#FF4D00]"
              >
                {stat.number}
              </motion.span>
              <span className="block font-sans text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/40 mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Side decorative lines */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#2a2a2a] to-transparent" />
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#2a2a2a] to-transparent" />
      </div>
    </section>
  );
}
