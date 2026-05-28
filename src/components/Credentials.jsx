import { motion } from 'motion/react';
import { Award, ExternalLink, Cpu } from 'lucide-react';
import { certificationsData, awardsData } from '../data';

export default function Credentials() {
  return (
    <section
      id="credentials"
      className="py-24 bg-paper-100 px-6 sm:px-8 lg:px-12 border-b border-paper-200"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Editorial Section Headers */}
        <div className="text-center mb-16 max-w-xl mx-auto border-b border-paper-200 pb-6">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-2 font-mono font-bold">
            06 / AWARDS & CERTIFICATIONS
          </h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="credentials-title"
            className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2"
          >
            Certifications & Honors.
          </motion.h3>
          <p className="mt-2 text-xs sm:text-sm font-sans text-ink-700 leading-relaxed font-light">
            Verified academic accomplishments, competitive milestones, and cloud virtualization assessments.
          </p>
        </div>

        {/* Matrix grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
          
          {/* Certificate Module */}
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 90, damping: 13 }}
              whileHover={{ 
                y: -4, 
                borderColor: "var(--color-gold-500)",
              }}
              className="bg-paper-50 border border-paper-200 p-8 rounded-xl flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-sm"
              id="certificate-card"
            >
              {/* background layout subtle lines */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 -mr-6 -mt-6 rounded-full group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
              
              <div>
                <div className="flex items-center space-x-3.5 mb-6">
                  <div className="p-2.5 bg-gold-600/10 text-gold-700 border border-gold-600/15 rounded-lg">
                    <Cpu size={18} />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-mono font-bold text-gold-750 tracking-widest uppercase block mb-0.5">IIT NPTEL SYLLABUS</span>
                    <h3 className="text-base font-sans font-bold text-ink-950 leading-snug">{cert.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-ink-700 leading-relaxed font-sans mb-6 font-light">
                  Completed rigorous academic curriculum issued by NPTEL / IIT centering around core Cloud Computing models, virtualized systems, distributed systems architecture, and scalable storage foundations.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-[9px] font-mono px-2.5 py-1 bg-paper-100 border border-paper-200 text-ink-750 uppercase rounded font-bold">Cloud Computing</span>
                  <span className="text-[9px] font-mono px-2.5 py-1 bg-paper-100 border border-paper-200 text-ink-750 uppercase rounded font-semibold">Academic Credential</span>
                </div>
              </div>

              <motion.a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                id="credential-cert-file-link"
                whileHover={{ 
                  scale: 1.01,
                  backgroundColor: "var(--color-ink-950)",
                  color: "#FAF8F5"
                }}
                className="w-full py-3 border border-slate-300 text-[10px] text-ink-950 bg-paper-100 uppercase tracking-widest font-mono font-bold text-center flex items-center justify-center space-x-2 cursor-pointer transition-colors rounded-lg"
              >
                <span>View Drive Verification</span>
                <ExternalLink size={12} className="text-gold-700 border-none font-bold" />
              </motion.a>
            </motion.div>
          ))}

          {/* Awards Module */}
          {awardsData.map((award) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 90, damping: 13, delay: 0.1 }}
              whileHover={{ 
                y: -4, 
                borderColor: "var(--color-gold-500)",
              }}
              className="bg-paper-50 border border-paper-200 p-8 rounded-xl flex flex-col justify-between hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-sm"
              id="award-card"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 -mr-6 -mt-6 rounded-full group-hover:scale-125 transition-transform duration-300 pointer-events-none" />
              
              <div>
                <div className="flex items-center space-x-3.5 mb-6">
                  <div className="p-2.5 bg-gold-600/10 text-gold-700 border border-gold-600/15 rounded-lg animate-none">
                    <Award size={18} />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-mono font-bold text-gold-750 tracking-widest uppercase block mb-0.5">COMPETITIVE HONOR</span>
                    <h3 className="text-base font-sans font-bold text-ink-950 leading-snug">{award.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-ink-700 leading-relaxed font-sans mb-6 font-light">
                  {award.detail} Solidified web development design standards by delivering live, operational project components under strict hackathon timelines.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-[9px] font-mono px-2.5 py-1 bg-paper-100 border border-paper-200 text-ink-750 uppercase rounded">MLRIT App Fiesta</span>
                  <span className="text-[9px] font-mono px-2.5 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-700 uppercase rounded font-bold">Rank #3</span>
                </div>
              </div>

              <div className="p-3 bg-paper-100 border border-paper-200 rounded-lg flex items-center justify-between text-[10px] font-mono text-ink-700">
                <span className="uppercase font-bold text-[8.5px]">Solution Scope:</span>
                <span className="font-bold text-gold-705 uppercase">Operational Web Embed</span>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
