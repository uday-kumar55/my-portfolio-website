import { motion } from "motion/react";
import { ArrowDown, Laptop } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 sm:px-8 lg:px-12 bg-paper-50 overflow-hidden custom-grid-pattern border-b border-paper-200"
    >
      {/* Soft Modern Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center justify-center space-y-10 w-full text-center">
        {/* Editorial Introduction Block */}
        <div className="space-y-8 flex flex-col items-center text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 border-b border-gold-600/20 pb-1.5 text-[9px] font-mono tracking-widest text-gold-600 uppercase font-bold"
            id="hero-badge"
          >
            <Laptop size={11} className="text-gold-600" />
            <span>PORTFOLIO & WORK SAMPLES</span>
          </motion.div>

          <div className="space-y-6 flex flex-col items-center w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                delay: 0.1,
              }}
              id="hero-name"
              className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight text-ink-950 leading-tight text-center"
            >
              Uday <span className="text-gold-600">Kumar.</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                delay: 0.2,
              }}
              className="text-xl sm:text-2xl font-display font-medium text-ink-900 tracking-tight leading-relaxed max-w-2xl text-center"
            >
              Designing{" "}
              <span className="text-gold-600 font-semibold">
                secure web applications
              </span>{" "}
              &{" "}
              <span className="text-gold-600 font-semibold">
                highly interactive
              </span>{" "}
              user experiences.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                delay: 0.3,
              }}
              id="hero-headline"
              className="text-xs sm:text-sm font-sans text-ink-700 max-w-xl leading-relaxed font-light text-center"
            >
              I engineer high-performance, bulletproof frontend templates.
              Blending robust React programming with core web security
              foundations, I establish clean state isolation and accessible user
              flows.
            </motion.p>
          </div>

          {/* Standard Modern Column Metrics */}
          <div
            className="grid grid-cols-3 gap-6 pt-8 border-t border-paper-200/60 w-full max-w-xl text-center"
            id="hero-stats"
          >
            {[
              {
                value: "03",
                label: "PROJECTS INSTALLED",
                note: "DEPLOYED & LIVE",
              },
              {
                value: "01",
                label: "HACKATHON PRIZE",
                note: "MLRIT APP FIESTA #3",
              },
              {
                value: "IIT",
                label: "NPTEL CLOUD GRAD",
                note: "CLOUD COMPUTING",
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 14,
                  delay: 0.4 + idx * 0.1,
                }}
                className="relative overflow-hidden group py-1 text-center flex flex-col items-center"
              >
                <span className="block text-2.5xl font-display font-bold text-ink-950 tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-[8px] text-ink-950 uppercase tracking-widest block mt-1.5 font-bold leading-none">
                  {stat.label}
                </span>
                <span className="text-[7.5px] text-ink-500 tracking-wider block mt-1 font-mono font-medium">
                  {stat.note}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Callouts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.7,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full"
            id="hero-cta-group"
          >
            <motion.a
              href="#projects"
              id="hero-cta-projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 bg-ink-950 text-paper-50 text-[10px] uppercase tracking-widest font-mono font-bold text-center hover:bg-gold-600 transition-colors cursor-pointer shadow-sm rounded-lg"
            >
              View Selected Projects
            </motion.a>
            <motion.a
              href="#contact"
              id="hero-cta-contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 border border-paper-200 bg-paper-100 text-ink-950 text-[10px] uppercase tracking-widest font-mono font-bold text-center hover:bg-paper-200 transition-all cursor-pointer rounded-lg"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Floating scroll down helper */}
      <div className="absolute bottom-6 left-1/2 -ml-3 cursor-pointer z-10 hidden sm:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <a
            href="#about"
            aria-label="Scroll down to About Section"
            className="text-ink-500 hover:text-gold-600 transition-colors font-sans"
          >
            <ArrowDown size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
