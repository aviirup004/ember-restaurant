"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const menuItems = [
  {
    name: "Smoked Wagyu Tartare",
    description: "Hand-cut A5 wagyu, charred shallot emulsion, ember-kissed egg yolk, gold leaf",
    price: 68,
  },
  {
    name: "Fire-Roasted Scallops",
    description: "Hokkaido diver scallops, burnt butter, hazelnut praline, citrus ash",
    price: 54,
  },
  {
    name: "Charred Octopus",
    description: "Spanish octopus, romesco velvet, smoked paprika oil, crispy capers",
    price: 48,
  },
  {
    name: "Ember Ribeye",
    description: "45-day dry-aged prime ribeye, bone marrow crust, black garlic jus",
    price: 145,
  },
  {
    name: "Flame-Licked Duck",
    description: "Moulard duck breast, cherry reduction, charred endive, foie gras dust",
    price: 72,
  },
  {
    name: "Volcanic Chocolate",
    description: "Molten dark chocolate, smoked salt caramel, gold-dusted ice cream",
    price: 28,
  },
];

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [containerHeight, setContainerHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(menuItems.length - 1) * 100 / menuItems.length}%`]
  );

  useEffect(() => {
    if (containerRef.current) {
      // Calculate the total width needed for horizontal scroll
      const cardWidth = 400; // approximate card width
      const gap = 48; // gap between cards
      const totalWidth = (cardWidth + gap) * menuItems.length;
      const viewportWidth = window.innerWidth;
      const scrollDistance = totalWidth - viewportWidth + 200;
      // Set section height to create enough scroll space
      setContainerHeight(scrollDistance + window.innerHeight);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative bg-transparent"
      style={{ height: containerHeight || "300vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Background effects */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 0% 50%, rgba(255, 77, 0, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 50%, rgba(201, 168, 76, 0.03) 0%, transparent 50%)
            `,
          }}
        />

        {/* Section header */}
        <div className="relative px-6 lg:px-12 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8 }}
            className="block font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4"
          >
            The Menu
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8]"
          >
            Curated by <span className="italic text-[#FF4D00]">fire</span>
          </motion.h2>
        </div>

        {/* Horizontal scroll container */}
        <div ref={containerRef} className="relative overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-8 lg:gap-12 px-6 lg:px-12"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="relative flex-shrink-0 w-[340px] md:w-[400px] group"
              >
                {/* Card */}
                <div className="relative p-8 bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-[#2a2a2a] transition-all duration-500 group-hover:border-[#FF4D00]/50">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255, 77, 0, 0.1) 0%, transparent 50%)
                        `,
                      }}
                    />
                  </div>

                  {/* Card number */}
                  <span className="block font-serif text-6xl text-[#2a2a2a] group-hover:text-[#FF4D00]/20 transition-colors duration-500 mb-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Dish name */}
                  <h3 className="font-serif text-2xl md:text-3xl text-[#F5F0E8] mb-4 group-hover:text-[#FF4D00] transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-[#F5F0E8]/50 leading-relaxed mb-8 min-h-[60px]">
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-6">
                    <span className="font-serif text-2xl text-[#C9A84C]">
                      ${item.price}
                    </span>
                    <motion.span
                      className="font-sans text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/30 group-hover:text-[#FF4D00] transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      View →
                    </motion.span>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C9A84C]/0 group-hover:border-[#C9A84C]/50 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#C9A84C]/0 group-hover:border-[#C9A84C]/50 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], delay: 1.5, duration: 1 }}
          className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4"
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/30">
            Scroll to explore
          </span>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 1.5, repeat: Infinity }}
            className="w-8 h-px bg-[#C9A84C]"
          />
        </motion.div>
      </div>
    </section>
  );
}
