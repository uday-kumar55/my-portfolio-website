import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  CheckCircle,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import {
  personalInfo,
  skillsData,
  educationData,
  projectsData,
  certificationsData,
  awardsData,
} from "../data";

export default function Resume() {
  const [activeTab, setActiveTab] = useState("all");
  const [copied, setCopied] = useState(false);

  const handleCopyContact = () => {
    const contactInfo = `
UDAY KUMAR
Hyderabad, Telangana
Phone: ${personalInfo.phone}
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}
    `.trim();

    navigator.clipboard.writeText(contactInfo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "all", label: "Complete Resume" },
    { id: "skills", label: "Technical Skills" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education & Certifications" },
  ];

  return (
    <section
      id="resume"
      className="relative py-24 px-6 sm:px-8 lg:px-12 bg-paper-50 border-b border-paper-200"
    >
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
            Directly synchronized with my official resume document. Explore the
            interactive breakdown or view the original PDF.
          </p>
        </div>

        {/* Tab Controls & Primary Download CTA */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-paper-200"
          id="resume-controls"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-ink-950 text-paper-50 shadow-sm border border-transparent"
                    : "bg-paper-100 hover:bg-paper-200 text-ink-600 hover:text-ink-950 border border-paper-250/50"
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
              {copied ? (
                <Check size={12} className="text-emerald-600" />
              ) : (
                <Copy size={12} />
              )}
              <span>{copied ? "Copied Contact!" : "Copy Info"}</span>
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

          <div className="p-8 sm:p-12 md:p-14 relative z-10 space-y-9">
            {/* Header: Title and Contacts */}
            <div className="border-b border-paper-300 pb-7 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
              <div>
                <h4 className="text-3xl sm:text-4xl font-display font-extrabold text-ink-950 tracking-tight leading-tight">
                  {personalInfo.name.toUpperCase()}
                </h4>
                <p className="text-xs font-mono text-gold-700 font-bold tracking-[0.2em] uppercase mt-1">
                  {personalInfo.location}
                </p>
              </div>

              {/* Dynamic Compact Details */}
              <div className="text-[10px] font-mono font-medium text-ink-700 space-y-1.5 md:text-right">
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <span className="text-ink-600">{personalInfo.phone}</span>
                  <Phone size={11} className="text-gold-600 hidden md:block" />
                </div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-ink-600 hover:text-gold-700 underline md:no-underline"
                  >
                    {personalInfo.email}
                  </a>
                  <Mail size={11} className="text-gold-600 hidden md:block" />
                </div>
                <div className="flex items-center justify-center md:justify-end gap-3 pt-1">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold-700 hover:text-ink-950 transition-colors flex items-center gap-1"
                  >
                    <Linkedin size={12} />
                    <span>linkedin.com/in/uday-kumar55</span>
                  </a>
                  <span className="text-paper-300">&bull;</span>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold-700 hover:text-ink-950 transition-colors flex items-center gap-1"
                  >
                    <Github size={12} />
                    <span>github.com/uday-kumar55</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Resume Body */}
            <AnimatePresence mode="wait">
              {activeTab === "all" && (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-9 focus:outline-none"
                >
                  {/* Summary */}
                  <div className="space-y-2.5">
                    <h5 className="text-[11px] font-display font-bold tracking-wider text-ink-950 uppercase border-b border-paper-250 pb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                      Summary
                    </h5>
                    <p className="text-xs sm:text-sm font-sans text-ink-800 font-light leading-relaxed">
                      {personalInfo.summary}
                    </p>
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <h5 className="text-[11px] font-display font-bold tracking-wider text-ink-950 uppercase border-b border-paper-250 pb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                      Education
                    </h5>
                    <div className="space-y-3">
                      {educationData.map((edu, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-left bg-paper-50 p-3.5 rounded-lg border border-paper-200"
                        >
                          <div>
                            <span className="block text-xs font-sans font-bold text-ink-950">
                              {edu.institution}
                            </span>
                            <span className="block text-[11px] font-sans text-ink-700 mt-0.5">
                              {edu.degree}
                              {edu.cgpa ? `, CGPA: ${edu.cgpa}` : ""}
                              {edu.percentage
                                ? `, Percentage: ${edu.percentage}`
                                : ""}
                            </span>
                          </div>
                          <div className="text-left sm:text-right mt-1 sm:mt-0">
                            <span className="text-[10px] font-mono text-gold-700 font-semibold block">
                              {edu.period}
                            </span>
                            <span className="text-[10px] font-sans text-ink-500 block">
                              {edu.location}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-4">
                    <h5 className="text-[11px] font-display font-bold tracking-wider text-ink-950 uppercase border-b border-paper-250 pb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                      Projects
                    </h5>
                    <div className="space-y-5">
                      {projectsData.map((project) => (
                        <div
                          key={project.id}
                          className="p-4 bg-paper-50 border border-paper-200 rounded-xl relative hover:border-gold-500/30 transition-colors space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-sans font-bold text-ink-950">
                                {project.title}
                              </span>
                            </div>
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-mono text-gold-700 hover:text-gold-900 font-bold flex items-center gap-1 underline w-fit"
                            >
                              {project.type || "Live Demo"}{" "}
                              <ExternalLink size={10} />
                            </a>
                          </div>

                          {/* Tech Stack line */}
                          <div className="text-[10.5px] font-sans text-ink-700 italic">
                            <strong className="not-italic font-mono text-ink-900 font-semibold">
                              Tech Stack:
                            </strong>{" "}
                            {project.techStack.join(", ")}
                          </div>

                          <ul className="space-y-1.5 text-[11px] font-sans text-ink-700 pl-4 list-disc marker:text-gold-600 pt-1">
                            {project.detailedPoints.map((pt, idx) => (
                              <li
                                key={idx}
                                className="font-light leading-relaxed"
                              >
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Skills */}
                  <div className="space-y-3">
                    <h5 className="text-[11px] font-display font-bold tracking-wider text-ink-950 uppercase border-b border-paper-250 pb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                      Technical Skills
                    </h5>
                    <div className="space-y-2 text-xs font-sans text-ink-800 bg-paper-50 p-4 rounded-xl border border-paper-200">
                      {skillsData.map((category) => (
                        <div
                          key={category.title}
                          className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-1 border-b border-paper-150 last:border-0"
                        >
                          <strong className="font-sans font-bold text-ink-950 min-w-[190px] text-xs">
                            {category.title}:
                          </strong>
                          <span className="text-ink-700 font-light text-xs">
                            {category.skills.join(", ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications & Achievements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Certifications */}
                    <div className="space-y-3">
                      <h5 className="text-[11px] font-display font-bold tracking-wider text-ink-950 uppercase border-b border-paper-250 pb-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                        Certifications
                      </h5>
                      <div className="space-y-2">
                        {certificationsData.map((cert, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-paper-50 border border-paper-200 rounded-xl flex items-center justify-between gap-3"
                          >
                            <span className="text-xs font-sans font-bold text-ink-950">
                              {cert.title}
                            </span>
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-mono text-gold-700 hover:text-gold-900 font-bold flex items-center gap-1 underline whitespace-nowrap"
                            >
                              View Certificate <ExternalLink size={9} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h5 className="text-[11px] font-display font-bold tracking-wider text-ink-950 uppercase border-b border-paper-250 pb-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                        Achievements
                      </h5>
                      <div className="p-3 bg-paper-50 border border-paper-200 rounded-xl space-y-1">
                        {awardsData.map((award, idx) => (
                          <div
                            key={idx}
                            className="text-xs font-sans text-ink-800 leading-relaxed"
                          >
                            &bull; {award.detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 min-h-[300px]"
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-display font-bold uppercase tracking-wider text-ink-950">
                      Technical Matrix
                    </h5>
                    <p className="text-xs text-ink-500 font-light">
                      Categorized skillset matrices directly transcribed from
                      the resume.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillsData.map((category) => (
                      <div
                        key={category.title}
                        className="p-5 bg-paper-50 border border-paper-200 rounded-xl space-y-3"
                      >
                        <span className="text-xs font-mono font-bold uppercase text-ink-900 flex items-center gap-2">
                          <span className="w-2 h-2 bg-gold-600 rounded-full" />
                          {category.title}
                        </span>

                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <div
                              key={skill}
                              className="px-3 py-1.5 bg-paper-100 border border-paper-200 rounded-lg flex items-center space-x-1.5"
                            >
                              <CheckCircle
                                size={10}
                                className="text-gold-600 flex-shrink-0"
                              />
                              <span className="text-xs font-sans font-medium text-ink-800">
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 min-h-[300px]"
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-display font-bold uppercase tracking-wider text-ink-950">
                      Projects Showcase
                    </h5>
                    <p className="text-xs text-ink-500 font-light">
                      All 3 key projects detailed with full descriptions and
                      verified repositories/demos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {projectsData.map((project) => (
                      <div
                        key={project.id}
                        className="p-5 bg-paper-50 border border-paper-200 rounded-xl relative space-y-3"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-sm font-sans font-bold text-ink-950">
                              {project.title}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {project.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[9px] font-mono text-gold-750 bg-gold-600/5 px-2 py-0.5 rounded border border-gold-600/10 font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-mono font-bold text-gold-700 hover:text-gold-900 bg-paper-100 hover:bg-paper-200 py-1.5 px-3 border border-paper-250 rounded-lg flex items-center gap-1 whitespace-nowrap"
                          >
                            {project.type || "Live Demo"}{" "}
                            <ExternalLink size={9} />
                          </a>
                        </div>
                        <ul className="space-y-1.5 text-xs font-sans text-ink-700 pl-4 list-disc marker:text-gold-600 pt-1">
                          {project.detailedPoints.map((pt, idx) => (
                            <li
                              key={idx}
                              className="font-light leading-relaxed"
                            >
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 min-h-[300px]"
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-display font-bold uppercase tracking-wider text-ink-950">
                      Academic Chronology & Certifications
                    </h5>
                    <p className="text-xs text-ink-500 font-light">
                      Institutional timeline and accredited certifications.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {educationData.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-paper-50 border border-paper-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <span className="block text-xs font-sans font-bold text-ink-950">
                            {edu.institution}
                          </span>
                          <span className="block text-[11px] font-sans text-ink-600 mt-0.5">
                            {edu.degree} &bull; {edu.location}
                          </span>
                          {edu.cgpa && (
                            <span className="inline-block text-[9px] font-mono bg-paper-100 text-ink-850 px-2 py-0.5 rounded border border-paper-200 mt-2 font-bold">
                              CGPA: {edu.cgpa}
                            </span>
                          )}
                          {edu.percentage && (
                            <span className="inline-block text-[9px] font-mono bg-paper-100 text-ink-850 px-2 py-0.5 rounded border border-paper-200 mt-2 font-bold">
                              Percentage: {edu.percentage}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-gold-700 bg-gold-600/10 px-2.5 py-1 rounded border border-gold-600/20 w-fit">
                          {edu.period}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Certifications Block */}
                  <div className="pt-4 border-t border-paper-200">
                    <span className="text-xs font-mono font-bold text-ink-950 uppercase tracking-wider block mb-3">
                      Accredited Certifications
                    </span>
                    {certificationsData.map((cert, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-paper-50 border border-paper-200 rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <span className="text-xs font-sans font-bold text-ink-950 block">
                            {cert.title}
                          </span>
                          <span className="text-[10px] font-sans text-ink-500 block mt-0.5">
                            {cert.issuer}
                          </span>
                        </div>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono font-bold text-gold-700 hover:text-gold-900 underline flex items-center gap-1"
                        >
                          View Certificate <ExternalLink size={9} />
                        </a>
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
          * Synchronized with Uday Kumar&apos;s verified curriculum vitae.
        </div>
      </div>
    </section>
  );
}
