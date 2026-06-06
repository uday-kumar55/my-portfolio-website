import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Award, Briefcase, GraduationCap, Code, CheckCircle, Copy, Check } from 'lucide-react';
import { personalInfo, skillsData, educationData, projectsData, certificationsData, awardsData } from '../data';

export default function Resume() {
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);

  const handleCopyContact = () => {
    const contactInfo = `
UDAY KUMAR
Frontend Developer
Phone: ${personalInfo.phone}
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
    `.trim();

    navigator.clipboard.writeText(contactInfo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sections config
  const tabs = [
    { id: 'all', label: 'Complete CV' },
    { id: 'skills', label: 'Core Skills' },
    { id: 'projects', label: 'Key Projects' },
    { id: 'education', label: 'Academic timeline' },
  ];

  return (
    <section id="resume" className="relative py-24 px-6 sm:px-8 lg:px-12 bg-paper-50 border-b border-paper-200">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[350px] h-[350px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Symmetrical Header */}
        <div className="text-center mb-16 max-w-xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-3 font-mono font-bold">
            05 / CURRICULUM VITAE
          </span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-display font-medium text-ink-950 mb-3 tracking-tight"
          >
            My Resume.
          </motion.h3>
          <p className="text-xs sm:text-sm font-sans text-ink-700 font-light leading-relaxed">
            Explore a digital summary of my credentials, academic timelines, and project works, or access the authentic print-ready PDF format.
          </p>
        </div>

        {/* Tab Controls & Primary Download CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-paper-200" id="resume-controls">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-ink-950 text-paper-50 shadow-sm border border-transparent'
                    : 'bg-paper-100 hover:bg-paper-200 text-ink-600 hover:text-ink-950 border border-paper-250/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleCopyContact}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-paper-100 hover:bg-paper-200 border border-paper-250 text-ink-900 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-colors"
              title="Copy contact card to clipboard"
            >
              {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
              <span>{copied ? 'Copied!' : 'Copy Contact'}</span>
            </button>

            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-gold-600 hover:bg-gold-700 text-ink-950 font-mono font-bold text-[10px] tracking-widest uppercase rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gold-500/20"
            >
              <Download size={13} />
              <span>Official Resume PDF</span>
              <ExternalLink size={10} className="opacity-70" />
            </motion.a>
          </div>
        </div>

        {/* Live Digital Document Preview Container */}
        <motion.div
          layout
          className="bg-paper-100 border border-paper-250/90 rounded-2xl shadow-xl overflow-hidden relative"
          id="digital-resume-canvas"
        >
          {/* Double Elegant Gold Borders */}
          <div className="absolute inset-2 border border-gold-500/10 rounded-xl pointer-events-none z-0" />

          <div className="p-8 sm:p-12 md:p-16 relative z-10 space-y-10">
            
            {/* Header Column: Title and Contacts */}
            <div className="border-b border-paper-300 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h4 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-950 tracking-tight leading-none">
                  {personalInfo.name.toUpperCase()}
                </h4>
                <p className="text-xs sm:text-sm font-mono text-gold-700 font-bold tracking-[0.2em] uppercase mt-2">
                  Frontend Architect & Developer
                </p>
                <p className="text-[11px] font-sans text-ink-500 italic mt-3 max-w-xl font-light">
                  &ldquo;Passionate about creating secured, highly optimized user interfaces, resolving client states, and providing pristine interface layouts.&rdquo;
                </p>
              </div>

              {/* Dynamic Compact Details Grid */}
              <div className="text-[10px] font-mono font-medium text-ink-700 space-y-1.5 md:text-right w-full md:w-auto border-t md:border-t-0 border-paper-250 pt-4 md:pt-0">
                <div className="flex items-center md:justify-end gap-2">
                  <span className="text-ink-500">+{personalInfo.phone}</span>
                  <Phone size={11} className="text-gold-600 order-first md:order-last" />
                </div>
                <div className="flex items-center md:justify-end gap-2">
                  <span className="text-ink-500">{personalInfo.email}</span>
                  <Mail size={11} className="text-gold-600 order-first md:order-last" />
                </div>
                <div className="flex items-center md:justify-end gap-2">
                  <span className="text-ink-500">{personalInfo.location}</span>
                  <MapPin size={11} className="text-gold-600 order-first md:order-last" />
                </div>
                <div className="flex items-center md:justify-end gap-3 pt-1">
                  <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gold-700 hover:text-ink-950 transition-colors">
                    <Github size={13} />
                  </a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gold-700 hover:text-ink-905 transition-colors">
                    <Linkedin size={13} />
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Body */}
            <AnimatePresence mode="wait">
              {activeTab === 'all' && (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10 focus:outline-none"
                >
                  {/* Summary / Profile Statement */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase flex items-center gap-2">
                      <Briefcase size={12} /> Executive Summary
                    </h5>
                    <p className="text-xs sm:text-sm font-sans text-ink-800 font-light leading-relaxed">
                      {personalInfo.summary}
                    </p>
                  </div>

                  {/* Core Technical Highlights */}
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase flex items-center gap-2">
                      <Code size={12} /> Technical Capabilities
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {skillsData.map((category) => (
                        <div key={category.title} className="bg-paper-50 p-4 border border-paper-200 rounded-xl">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-900 block mb-2.5 pb-1 border-b border-paper-200">
                            {category.title}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {category.skills.map((skill) => (
                              <span key={skill} className="text-[9px] font-mono text-ink-700 bg-paper-100 border border-paper-200 px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Major Projects Showcase */}
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase flex items-center gap-2">
                      <Award size={12} /> Key Project Systems
                    </h5>
                    <div className="space-y-4">
                      {projectsData.map((project) => (
                        <div key={project.id} className="p-5 bg-paper-50 border border-paper-200 rounded-xl relative hover:border-gold-500/30 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-display font-bold text-ink-950">
                              {project.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] font-mono bg-amber-500/10 text-amber-800 border border-amber-600/10 px-2 py-0.5 rounded font-bold uppercase">
                                Verified System
                              </span>
                              <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-[8.5px] font-mono text-gold-700 hover:text-gold-900 font-bold flex items-center gap-0.5 underline">
                                Live Demo <ExternalLink size={9} />
                              </a>
                            </div>
                          </div>
                          
                          {/* Tech List */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.techStack.map((tech) => (
                              <span key={tech} className="text-[8.5px] font-mono text-gold-600 bg-gold-600/5 px-1.5 py-0.2 rounded border border-gold-600/5">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <p className="text-[11px] font-sans text-ink-700 leading-relaxed mb-3">
                            {project.description}
                          </p>

                          <ul className="space-y-1.5 text-[10.5px] font-sans text-ink-600 pl-4 list-disc marker:text-gold-650">
                            {project.detailedPoints.map((pt, idx) => (
                              <li key={idx} className="font-light leading-relaxed">{pt}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chronology Grid: Education & Accolades */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                    {/* Academic Degrees */}
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase flex items-center gap-2">
                        <GraduationCap size={13} /> Educational Chronology
                      </h5>
                      <div className="space-y-3">
                        {educationData.map((edu, idx) => (
                          <div key={idx} className="p-4 bg-paper-50 border border-paper-200 rounded-xl relative">
                            <span className="text-[8.5px] font-mono text-gold-700 absolute top-4 right-4 bg-paper-100 border border-paper-250 py-0.5 px-2 rounded">
                              {edu.period}
                            </span>
                            <span className="block text-[11px] font-mono font-bold text-ink-950">{edu.degree}</span>
                            <span className="block text-[10px] font-sans text-ink-500 font-medium mt-0.5">{edu.institution}</span>
                            {edu.cgpa && (
                              <span className="inline-block text-[9px] font-mono bg-paper-200/60 text-ink-800 px-2 py-0.5 rounded mt-2">
                                CGPA: {edu.cgpa}
                              </span>
                            )}
                            {edu.percentage && (
                              <span className="inline-block text-[9px] font-mono bg-paper-200/60 text-ink-800 px-2 py-0.5 rounded mt-2">
                                Percentage: {edu.percentage}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certs & Honors */}
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase flex items-center gap-2">
                        <CheckCircle size={12} /> Achievements & Certs
                      </h5>
                      <div className="space-y-3">
                        {/* Certs */}
                        {certificationsData.map((cert, idx) => (
                          <div key={`c-${idx}`} className="p-4 bg-paper-50 border border-paper-200 rounded-xl flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[8px] font-mono uppercase bg-gold-600/10 text-gold-700 border border-gold-600/15 py-0.5 px-1.5 rounded font-bold">
                                NPTEL certified
                              </span>
                              <span className="block text-[10.5px] font-mono font-bold text-ink-950 mt-1.5">{cert.title}</span>
                              <span className="block text-[9.5px] font-sans text-ink-500 font-medium mt-0.5">{cert.issuer}</span>
                            </div>
                            <a href={cert.link} target="_blank" rel="noreferrer" className="text-[9px] font-mono text-gold-700 hover:text-gold-900 border-b border-gold-700 flex items-center gap-0.5 py-0.5">
                              Verify <ExternalLink size={8} />
                            </a>
                          </div>
                        ))}

                        {/* Awards */}
                        {awardsData.map((award, idx) => (
                          <div key={`a-${idx}`} className="p-4 bg-paper-50 border border-paper-200 rounded-xl">
                            <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-gold-700 uppercase bg-gold-600/10 border border-gold-600/15 py-0.5 px-2 rounded w-fit mb-2">
                              Hackathon Rank #3
                            </div>
                            <span className="block text-[10.5px] font-mono font-extrabold text-ink-950">{award.title}</span>
                            <p className="text-[10px] font-sans text-ink-650 leading-relaxed mt-1">{award.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 min-h-[300px]"
                >
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase">Technical Frameworks</h5>
                    <p className="text-xs text-ink-500 font-light">Categorized skillset matrices focusing on web interfaces and cyber elements.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillsData.map((category) => (
                      <div key={category.title} className="p-6 bg-paper-50 border border-paper-200 rounded-xl space-y-4">
                        <span className="text-xs font-mono font-bold uppercase text-ink-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                          {category.title}
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {category.skills.map((skill) => (
                            <div key={skill} className="p-3 bg-paper-100 border border-paper-200/80 rounded-lg flex items-center space-x-2">
                              <CheckCircle size={10} className="text-gold-600 flex-shrink-0" />
                              <span className="text-[10px] font-mono text-ink-800">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 min-h-[300px]"
                >
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase">Strategic Web Projects</h5>
                    <p className="text-xs text-ink-500 font-light">A summary of the core development projects deployed and verified.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {projectsData.map((project) => (
                      <div key={project.id} className="p-6 bg-paper-50 border border-paper-200 rounded-xl relative">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div>
                            <span className="text-xs font-mono font-extrabold text-ink-950 uppercase">{project.title}</span>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {project.techStack.map((tech) => (
                                <span key={tech} className="text-[8px] font-mono text-gold-750 bg-gold-600/5 px-2 py-0.5 rounded border border-gold-600/10">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-[9px] font-mono font-bold text-gold-700 hover:text-gold-900 bg-paper-100 hover:bg-paper-200 py-1.5 px-3 border border-paper-250 rounded-lg flex items-center gap-1 whitespace-nowrap">
                            Live Demo <ExternalLink size={9} />
                          </a>
                        </div>
                        <p className="text-[11px] font-sans text-ink-700 leading-relaxed mb-4">{project.description}</p>
                        <div className="bg-paper-100 p-4 rounded-lg border border-paper-200">
                          <span className="text-[8.5px] font-mono font-bold text-gold-700 uppercase tracking-wider block mb-2">Technical Bulletins</span>
                          <ul className="space-y-2 text-[10.5px] font-sans text-ink-650 pl-4 list-disc marker:text-gold-600">
                            {project.detailedPoints.map((pt, idx) => (
                              <li key={idx} className="font-light leading-relaxed">{pt}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 min-h-[300px]"
                >
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-mono tracking-[0.25em] text-gold-700 font-bold uppercase">Academic Portfolios</h5>
                    <p className="text-xs text-ink-500 font-light">Timeline progression indicating degrees, certifications, and high rewards.</p>
                  </div>

                  <div className="relative border-l border-gold-600/20 pl-6 ml-4 space-y-8 py-3">
                    {educationData.map((edu, idx) => (
                      <div key={idx} className="relative">
                        {/* Bullet */}
                        <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-600 border border-paper-50 shadow-[0_0_0_4px_rgba(198,161,71,0.15)]" />
                        
                        <div className="bg-paper-50 p-5 border border-paper-200 rounded-xl relative max-w-xl">
                          <span className="text-[9px] font-mono font-bold text-gold-700 block mb-1">
                            {edu.period}
                          </span>
                          <span className="block text-xs font-display font-bold text-ink-950 uppercase">{edu.degree}</span>
                          <span className="block text-[11px] font-sans text-ink-500 font-medium leading-normal mt-1">{edu.institution} &bull; {edu.location}</span>
                          {edu.cgpa && (
                            <span className="inline-block text-[9px] font-mono bg-paper-100 text-ink-850 px-2 py-0.5 rounded border border-paper-200 mt-2.5">
                              Cumulative CGPA: {edu.cgpa}
                            </span>
                          )}
                          {edu.percentage && (
                            <span className="inline-block text-[9px] font-mono bg-paper-100 text-ink-850 px-2 py-0.5 rounded border border-paper-200 mt-2.5">
                              Percentage: {edu.percentage}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* Informative Disclaimer */}
        <div className="text-center mt-6 text-[9.5px] font-mono tracking-wider text-ink-400">
          * Dynamic representation of Uday Kumar&apos;s credentials. Synchronized with the verified Google Cloud index system.
        </div>
      </div>
    </section>
  );
}
