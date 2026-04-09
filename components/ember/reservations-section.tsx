"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export function ReservationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // Please replace these with your actual EmailJS credentials
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          user_name: formData.name,
          reservation_date: formData.date,
          reservation_time: formData.time,
          reservation_guests: formData.guests,
          reply_to: "no-reply@ember.restaurant" // Adjust as needed
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      setStatus("success");
      setFormData({ name: "", date: "", time: "", guests: "" });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("Failed to send email via EmailJS:", error);
      setStatus("error");
      setErrorMessage(
        error?.text || error?.message || "Verify your .env.local keys and restart the server."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full bg-transparent border border-[#C9A84C]/30 px-5 py-4
    font-sans text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/30
    focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20
    transition-all duration-300
  `;

  return (
    <section
      ref={sectionRef}
      id="reservations"
      className="relative py-32 md:py-48 bg-transparent"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255, 77, 0, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 20%, rgba(201, 168, 76, 0.03) 0%, transparent 40%)
          `,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8 }}
            className="block font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4"
          >
            Reservations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8]"
          >
            Secure your <span className="italic text-[#FF4D00]">moment</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.2 }}
            className="font-sans text-[#F5F0E8]/50 mt-6 max-w-xl mx-auto"
          >
            Reserve your table and prepare for an evening that will linger in
            your memory long after the last ember fades.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="relative"
        >
          {/* Form glow effect */}
          <div className="absolute -inset-px bg-gradient-to-br from-[#C9A84C]/20 via-transparent to-[#FF4D00]/20 blur-xl opacity-50" />

          <div className="relative bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#2a2a2a] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block font-sans text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/50 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClasses}
                  required
                  data-hover="true"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block font-sans text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/50 mb-3">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className={`${inputClasses} [color-scheme:dark]`}
                  required
                  data-hover="true"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block font-sans text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/50 mb-3">
                  Preferred Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%23C9A84C%22%20d%3d%22M6%208L1%203h10z%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_1rem_center]`}
                  required
                  data-hover="true"
                >
                  <option value="" disabled>
                    Select time
                  </option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="21:30">9:30 PM</option>
                </select>
              </div>

              {/* Party Size */}
              <div className="md:col-span-2">
                <label className="block font-sans text-xs tracking-[0.2em] uppercase text-[#F5F0E8]/50 mb-3">
                  Party Size
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%23C9A84C%22%20d%3d%22M6%208L1%203h10z%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_1rem_center]`}
                  required
                  data-hover="true"
                >
                  <option value="" disabled>
                    Number of guests
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                  <option value="private">Private Event (9+)</option>
                </select>
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full mt-10 py-5 bg-transparent overflow-hidden group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              data-hover="true"
            >
              {/* Button background glow */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] via-[#FF6B2B] to-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 40px rgba(255, 77, 0, 0.4)",
                }}
              />

              {/* Button border */}
              <div className="absolute inset-0 border border-[#FF4D00] group-hover:border-transparent transition-colors duration-500" />

              {/* Button content */}
              <span className="relative font-sans text-sm tracking-[0.3em] uppercase text-[#FF4D00] group-hover:text-[#080808] transition-colors duration-500">
                {isSubmitting ? "Reserving..." : "Reserve Your Table"}
              </span>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-center"
                >
                  <p className="font-serif text-[#C9A84C]">Reservation Received</p>
                  <p className="font-sans text-xs text-[#F5F0E8]/70 mt-1">
                    We look forward to hosting you. A confirmation email is on its way!
                  </p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 border border-[#FF4D00]/40 bg-[#FF4D00]/10 text-center"
                >
                  <p className="font-serif text-[#FF4D00]">Transmission Failed</p>
                  <p className="font-sans text-xs text-[#F5F0E8]/70 mt-1">
                    Please try again or contact us directly via phone.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional info */}
            <p className="text-center font-sans text-xs text-[#F5F0E8]/30 mt-6 md:mt-8">
              For parties larger than 8, please contact us directly at{" "}
              <a
                href="tel:+12125551234"
                className="text-[#C9A84C] hover:text-[#FF4D00] transition-colors duration-300"
                data-hover="true"
              >
                (212) 555-1234
              </a>
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
