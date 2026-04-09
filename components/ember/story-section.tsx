"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-32 md:py-48 bg-transparent"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 50%, rgba(255, 77, 0, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(201, 168, 76, 0.02) 0%, transparent 40%)
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column - Text */}
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8 }}
              className="inline-block font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C]"
            >
              Our Story
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-[1.1]"
            >
              Born from
              <br />
              <span className="italic text-[#FF4D00]">flame</span> and
              <br />
              tradition
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.2 }}
              className="font-sans text-base md:text-lg text-[#F5F0E8]/60 leading-relaxed max-w-md"
            >
              In the heart of Manhattan, where ambition meets artistry, EMBER
              ignites a culinary revolution. Our open kitchen is our stage, fire
              is our medium, and every dish tells a story of passion inherited
              through generations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.3 }}
              className="font-sans text-base md:text-lg text-[#F5F0E8]/60 leading-relaxed max-w-md"
            >
              Chef Elena Vasquez brings three decades of mastery, transforming
              the primal element of fire into an orchestra of flavors that dance
              between tradition and innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.4 }}
              className="pt-4"
            >
              <span className="font-serif text-3xl italic text-[#C9A84C]">
                {"— Est. 2019"}
              </span>
            </motion.div>
          </div>

          {/* Right column - Image placeholder with ember border */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1, delay: 0.3 }}
            className="relative"
          >
            {/* Ember glow border effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#FF4D00]/30 via-[#C9A84C]/20 to-[#FF4D00]/30 blur-sm" />
            
            {/* Main image container */}
            <div className="relative aspect-[4/5] bg-[#0f0f0f] border border-[#FF4D00]/30 overflow-hidden group">
              <motion.img
                src="/epic_fire_kitchen.png"
                alt="Chef in open fire kitchen"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1.5 }}
              />
              
              {/* Dark overlay for mood */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>

            {/* Corner accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[#C9A84C]/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
