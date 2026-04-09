"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  x: number;
  y: number;
  id: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const trailId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail
      trailId.current += 1;
      setTrails((prev) => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: trailId.current },
      ]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.hover === "true"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(-6));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Trail effect */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
              width: 8,
              height: 8,
              background: `radial-gradient(circle, rgba(255, 77, 0, ${0.3 - index * 0.03}) 0%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 10),
          y: mousePosition.y - (isHovering ? 20 : 10),
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ${
            isHovering ? "w-10 h-10" : "w-5 h-5"
          }`}
          style={{
            background: isHovering
              ? "radial-gradient(circle, #FF4D00 0%, #FF4D00 40%, transparent 70%)"
              : "radial-gradient(circle, #FF4D00 0%, #FF4D00 50%, rgba(255, 77, 0, 0.5) 70%, transparent 100%)",
            boxShadow: "0 0 20px rgba(255, 77, 0, 0.8), 0 0 40px rgba(255, 77, 0, 0.4)",
          }}
        />
      </motion.div>

      {/* Outer ring for hover */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full border border-[#FF4D00]/50"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            x: mousePosition.x - 30,
            y: mousePosition.y - 30,
            scale: 1,
            opacity: 1,
          }}
          transition={{ ease: [0.25, 0.1, 0.25, 1],
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          style={{
            width: 60,
            height: 60,
          }}
        />
      )}
    </>
  );
}
