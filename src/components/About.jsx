import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import { personalInfo } from "../data";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-transparent px-6 sm:px-8 lg:px-12 border-b border-paper-200/40 relative overflow-hidden"
    >
      {/* Decorative ambient gold luxury blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Symmetrical Luxury Section Header */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-3 font-mono font-bold">
            05 / PORTRAIT PROFILE
          </span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            id="about-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-ink-950 mb-3 tracking-tight"
          >
            About Me.
          </motion.h3>
          <div className="w-16 h-[1.5px] bg-gold-600/40 my-3" />
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink-500 font-bold">
            Frontend Engineer &amp; Cyber Security Student
          </p>
        </div>

        {/* Narrative & Visual Alignment (Symmetric & Centered) */}
        <div className="space-y-12">
          {/* Main Statement Box */}
          <div className="bg-paper-100/65 backdrop-blur-xl border border-paper-200/80 p-8 sm:p-14 rounded-3xl text-center shadow-lg relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-8 max-w-2xl mx-auto flex flex-col items-center">
              <div className="flex items-center space-x-2 justify-center">
                <Sparkles className="text-gold-600" size={13} />
                <span className="text-[9px] uppercase font-mono tracking-widest text-gold-700 font-bold">
                  My Design Creed
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl text-ink-950 font-display italic font-medium leading-relaxed"
                id="about-summary-p1"
              >
                "I synthesize intuitive visual interfaces with clean
                state-driven architectures, building secure and responsive
                frontend applications."
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs sm:text-sm text-ink-700 font-sans leading-relaxed font-light"
                id="about-summary-p2"
              >
                Currently completing my Computer Science BTech degree with a
                core specialization in Cybersecurity at{" "}
                <span className="text-ink-950 font-semibold">
                  MLR Institute of Technology
                </span>{" "}
                in Hyderabad, I merge web programming models with network
                defense principles. This teaches me to compose web code that is
                structurally organized, fast-loading, highly accessible, and
                aligned with standard security guidelines.
              </motion.p>
            </div>

            {/* Centered Symmetric Information Block Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-paper-200/80 mt-12 text-center">
              {[
                {
                  icon: MapPin,
                  label: "LOCATION",
                  text: personalInfo.location,
                },
                {
                  icon: Mail,
                  label: "EMAIL ADDRESS",
                  text: personalInfo.email,
                  isEmail: true,
                },
                {
                  icon: Phone,
                  label: "PHONE NUMBER",
                  text: personalInfo.phone,
                  isPhone: true,
                },
                {
                  icon: Layers,
                  label: "PRIMARY STACK",
                  text: "React DOM & REST APIs",
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="flex flex-col items-center space-y-4 text-ink-700 cursor-pointer p-6 sm:p-7 bg-paper-100/50 backdrop-blur-md border border-paper-200 hover:border-gold-600/30 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md group"
                    id={`about-info-card-${idx}`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-gold-600/10 text-gold-700 rounded-xl border border-gold-600/10 group-hover:bg-gold-600/15 group-hover:scale-105 transition-all duration-300">
                      <IconComponent size={20} />
                    </div>

                    <div className="space-y-1 w-full text-center">
                      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-gold-700 font-bold block mb-1">
                        {item.label}
                      </span>
                      {item.isEmail ? (
                        <a
                          href={`mailto:${item.text}`}
                          className="text-xs sm:text-sm font-sans font-medium text-ink-950 break-all hover:text-gold-600 transition-colors leading-tight"
                        >
                          {item.text}
                        </a>
                      ) : item.isPhone ? (
                        <a
                          href={`tel:${item.text}`}
                          className="text-xs sm:text-sm font-sans font-medium text-ink-950 hover:text-gold-600 transition-colors leading-tight"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-xs sm:text-sm font-sans font-medium text-ink-950 leading-tight">
                          {item.text}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Symmetrical Dual Badges Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Cybersecurity Specialization Badge */}
            <motion.div
              whileHover={{ y: -4, borderColor: "var(--color-gold-500)" }}
              className="bg-paper-100 border border-paper-200 p-8 rounded-xl relative overflow-hidden group transition-all duration-300 cursor-pointer flex flex-col justify-between items-center text-center shadow-sm"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 -mr-6 -mt-6 rounded-full group-hover:scale-125 transition-transform duration-300" />

              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-gold-600/10 text-gold-700 border border-gold-600/20 rounded-full">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-[9px] font-mono tracking-widest text-gold-700 uppercase font-bold mb-1">
                    SECURITY PRACTICE
                  </h4>
                  <h3 className="text-lg font-sans font-bold text-ink-950 mb-2 leading-snug">
                    Secure Credentials
                  </h3>
                  <p className="text-xs text-ink-700 font-sans leading-relaxed font-light max-w-xs">
                    Managing secure client routes, validating input fields
                    against scripting flaws, and audit-testing token caches.
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-mono text-ink-500 uppercase tracking-widest mt-6 font-semibold border-t border-paper-200 w-full pt-3">
                Client Shield Standards
              </div>
            </motion.div>

            {/* Hackathon Ranks Badge */}
            <motion.div
              whileHover={{ y: -4, borderColor: "var(--color-gold-500)" }}
              className="bg-paper-100 border border-paper-200 p-8 rounded-xl relative overflow-hidden group transition-all duration-300 cursor-pointer flex flex-col justify-between items-center text-center shadow-sm"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 -mr-6 -mt-6 rounded-full group-hover:scale-125 transition-transform duration-300" />

              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-gold-600/10 text-gold-700 border border-gold-600/20 rounded-full">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-[9px] font-mono tracking-widest text-gold-700 uppercase font-bold mb-1">
                    COMPETITIONS
                  </h4>
                  <h3 className="text-lg font-sans font-bold text-ink-950 mb-2 leading-snug">
                    Hackathon Awardee
                  </h3>
                  <p className="text-xs text-ink-700 font-sans leading-relaxed font-light max-w-xs">
                    Captured{" "}
                    <span className="text-ink-950 font-semibold">
                      3rd Place
                    </span>{" "}
                    among 60+ engineering teams at the MLRIT App Fiesta.
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-mono text-ink-500 uppercase tracking-widest mt-6 font-semibold border-t border-paper-200 w-full pt-3">
                Validated Project Delivery
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
