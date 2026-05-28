import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { educationData } from '../data';

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 bg-paper-100 px-6 sm:px-8 lg:px-12 border-b border-paper-200"
    >
      <div className="max-w-4xl mx-auto text-left">
        
        {/* Academic section descriptor */}
        <div className="text-center mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-2 font-mono font-bold">
            03 / CHRONOLOGY & DEGREES
          </h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="education-title"
            className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2"
          >
            Education.
          </motion.h3>
          <p className="mt-2 text-xs sm:text-sm font-sans text-ink-700 max-w-lg mx-auto text-center leading-relaxed font-light">
            My academic journey, coursework focus points, and certified technical milestones.
          </p>
        </div>

        {/* Visual Timeline thread */}
        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-24 pl-8 md:pl-12 space-y-10">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 13, delay: index * 0.1 }}
              className="relative"
              id={`edu-item-${edu.degree.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            >
              {/* Timeline marker with visual gold ring */}
              <motion.span 
                whileHover={{ 
                  scale: 1.15,
                  backgroundColor: "var(--color-gold-600)", 
                  borderColor: "var(--color-gold-600)",
                  color: "#ffffff"
                }}
                className="absolute -left-[45px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-paper-100 border-2 border-gold-600 text-gold-700 z-20 cursor-pointer transition-all duration-300 shadow-sm"
              >
                <GraduationCap size={14} />
              </motion.span>

              {/* Education block container */}
              <motion.div 
                whileHover={{ 
                  y: -2,
                  borderColor: "var(--color-gold-500)",
                }}
                className="bg-paper-100 border border-paper-200 p-6 sm:p-8 rounded-xl relative cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Year tag layout */}
                <div className="flex items-center space-x-1.5 text-[8.5px] font-mono font-bold text-gold-700 uppercase md:absolute md:top-6 md:right-8 bg-gold-600/10 py-1.5 px-3 border border-gold-600/15 mb-3 md:mb-0 rounded-md">
                  <Calendar size={11} />
                  <span>{edu.period}</span>
                </div>

                <div className="mb-4 text-left">
                  <h3 className="text-xl sm:text-2xl font-sans font-bold text-ink-950 mb-1 leading-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-ink-500">
                    {edu.institution}
                  </div>
                </div>

                {/* Grid ratings metrics */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] font-mono text-ink-700">
                  <div className="flex items-center space-x-1">
                    <MapPin size={11} className="text-gold-600 block" />
                    <span className="font-semibold">{edu.location}</span>
                  </div>

                  {edu.cgpa && (
                    <div className="flex items-center space-x-1.5 bg-paper-50 text-ink-950 py-1 px-2.5 border border-paper-200 rounded-md">
                      <span className="font-mono text-ink-500 text-[8.5px] tracking-widest uppercase font-bold">CGPA:</span>
                      <strong className="font-bold text-[11px] text-gold-700">{edu.cgpa}</strong>
                    </div>
                  )}

                  {edu.percentage && (
                    <div className="flex items-center space-x-1.5 bg-paper-50 text-ink-950 py-1 px-2.5 border border-paper-200 rounded-md">
                      <span className="font-mono text-ink-500 text-[8.5px] tracking-widest uppercase font-bold">PERCENTAGE:</span>
                      <strong className="font-bold text-[11px] text-gold-700">{edu.percentage}</strong>
                    </div>
                  )}
                </div>

                {/* Custom Coursework context */}
                {edu.degree.includes("Cyber Security") && (
                  <div className="mt-6 pt-4 border-t border-paper-200 text-xs text-ink-700 font-sans leading-relaxed space-y-2 font-light">
                    <p>Undergraduate coursework in Computer Science, Systems Engineering, and Security architecture, featuring:</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Data Structures", "Secure Coding Principles", "Cryptography", "Database Schema Design"].map((course) => (
                        <span key={course} className="text-[9px] font-mono bg-paper-50 px-2.5 py-1 text-ink-700 border border-paper-200 rounded-md font-semibold">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
