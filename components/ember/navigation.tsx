"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

const navLinks = [
  { name: "Story", href: "#story" },
  { name: "Menu", href: "#menu" },
  { name: "Experience", href: "#experience" },
  { name: "Reservations", href: "#reservations" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/50 backdrop-blur-lg border-b border-[#2a2a2a]/50"
          : "bg-transparent"
      }`}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF4D00] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="font-serif text-2xl tracking-[0.3em] text-[#F5F0E8] hover:text-[#FF4D00] transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          data-hover="true"
        >
          EMBER
        </motion.a>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-12">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: [0.25, 0.1, 0.25, 1], delay: 0.1 * index, duration: 0.5 }}
            >
              <a
                href={link.href}
                className="relative font-sans text-sm tracking-[0.15em] uppercase text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors duration-300 group"
                data-hover="true"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF4D00] transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="#reservations"
          className="hidden md:block px-6 py-3 border border-[#C9A84C] text-[#C9A84C] font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#C9A84C] hover:text-[#080808] transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-hover="true"
        >
          Reserve
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
          data-hover="true"
        >
          <span className="w-6 h-px bg-[#F5F0E8]" />
          <span className="w-6 h-px bg-[#F5F0E8]" />
          <span className="w-4 h-px bg-[#F5F0E8]" />
        </button>
      </nav>
    </motion.header>
  );
}
