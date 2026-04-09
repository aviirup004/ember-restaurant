"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative py-20 bg-transparent">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Logo & tagline */}
          <div className="space-y-4">
            <motion.a
              href="#"
              className="inline-block font-serif text-3xl tracking-[0.2em] text-[#F5F0E8] hover:text-[#FF4D00] transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              data-hover="true"
            >
              EMBER
            </motion.a>
            <p className="font-serif italic text-sm text-[#F5F0E8]/40">
              Where Fire Meets Flavor
            </p>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A84C]">
              Visit Us
            </h4>
            <address className="not-italic font-sans text-sm text-[#F5F0E8]/50 leading-relaxed">
              127 East 57th Street
              <br />
              New York, NY 10022
              <br />
              <a
                href="tel:+12125551234"
                className="hover:text-[#FF4D00] transition-colors duration-300 mt-2 inline-block"
                data-hover="true"
              >
                (212) 555-1234
              </a>
            </address>
          </div>

          {/* Social links */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A84C]">
              Follow
            </h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-[#F5F0E8]/50 hover:text-[#FF4D00] transition-colors duration-300"
                    data-hover="true"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-[#F5F0E8]/30">
            © {new Date().getFullYear()} EMBER NYC. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="font-sans text-xs text-[#F5F0E8]/30 hover:text-[#C9A84C] transition-colors duration-300"
              data-hover="true"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-xs text-[#F5F0E8]/30 hover:text-[#C9A84C] transition-colors duration-300"
              data-hover="true"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Decorative ember */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#FF4D00]"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
              boxShadow: "0 0 20px rgba(255, 77, 0, 0.5)",
            }}
          />
        </div>
      </div>
    </footer>
  );
}
