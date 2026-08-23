import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { projectsData } from "../data";

const projectScreenshots = {
  "book-hub": "/bookhub.png",
  "student-management": "/student-management.png",
  "luxury-fashion": "/fashion.png",
  "foodhub-munch": "/foodhub.png",
};

function ProjectItem({ project, index }) {
  const screenshotSrc = projectScreenshots[project.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
      id={`project-${project.id}`}
    >
      {/* Product Image Frame (Col Span 5) */}
      <div
        className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-last" : ""}`}
      >
        <div className="relative">
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.015,
              y: -2,
            }}
            className="block relative aspect-video bg-paper-100 border border-paper-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 shadow-sm group"
          >
            {screenshotSrc ? (
              <img
                src={screenshotSrc}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 bg-paper-100 text-center text-ink-500 text-xs font-mono">
                {project.imageFallbackText || project.title}
              </div>
            )}
            {/* Symmetrical Elegant Link Badge Overlay */}
            <div className="absolute inset-0 bg-ink-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="bg-white/95 backdrop-blur-sm text-ink-950 text-[8px] font-mono font-bold uppercase tracking-widest py-2 px-3.5 rounded-lg border border-paper-200 shadow-sm flex items-center space-x-1">
                <span>
                  {project.type === "GitHub Repo"
                    ? "View Python Project"
                    : "Launch Live Site"}
                </span>
                <ExternalLink size={9} className="text-gold-600 font-bold" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Core Descriptions Details (Col Span 7) */}
      <div className="lg:col-span-7 space-y-5">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-gold-700 font-bold uppercase tracking-widest flex items-center space-x-1.5 animate-none">
            <span>APPLICATION MODULE 0{index + 1}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink-950 tracking-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans font-light">
          {project.description}
        </p>

        {/* Bullets detailing work highlights */}
        <ul className="space-y-2.5 pl-4 border-l border-slate-200 text-xs text-ink-700 list-disc list-outside leading-relaxed font-light">
          {project.detailedPoints.map((pt, i) => (
            <motion.li
              key={i}
              whileHover={{ x: 2, color: "var(--color-ink-950)" }}
              className="cursor-pointer transition-colors"
            >
              {pt}
            </motion.li>
          ))}
        </ul>

        {/* Technical badge index listing */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono font-bold tracking-tight px-3 py-1 bg-paper-100 text-ink-700 border border-paper-200 select-none uppercase rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Practical links */}
        <div className="pt-4 flex items-center space-x-6 border-t border-paper-200">
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            id={`project-action-demo-${project.id}`}
            whileHover={{ x: 2 }}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-gold-700 hover:text-gold-600 transition-colors cursor-pointer"
          >
            <span>
              {project.type === "GitHub Repo"
                ? "View Python Project"
                : "Launch Live Web Application"}
            </span>
            <ExternalLink size={12} className="text-gold-700 font-bold" />
          </motion.a>
          <motion.a
            href={project.githubLink || "https://github.com/uday-kumar55"}
            target="_blank"
            rel="noreferrer"
            id={`project-action-github-${project.id}`}
            whileHover={{ x: 2 }}
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-ink-500 hover:text-ink-950 transition-colors cursor-pointer"
          >
            <span>View Repository</span>
            <Github size={12} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 bg-paper-50 px-6 sm:px-8 lg:px-12 border-b border-paper-200"
    >
      <div className="max-w-6xl mx-auto">
        {/* Showcase Header */}
        <div className="text-center mb-20">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-2 font-mono font-bold flex items-center justify-center gap-2">
            03 / EXPERIMENTAL WORKS
          </h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 85, damping: 15 }}
            id="projects-title"
            className="text-4xl sm:text-5xl font-display font-bold text-ink-950 mb-2"
          >
            My Projects.
          </motion.h3>
          <p className="mt-2 text-xs sm:text-sm font-sans text-ink-700 max-w-lg mx-auto leading-relaxed font-light">
            Realized web applications focusing on robust React state engines,
            modular client-side assets management, and fluid responsive styling.
          </p>
        </div>

        {/* Project Lists */}
        <div className="space-y-24">
          {projectsData.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
