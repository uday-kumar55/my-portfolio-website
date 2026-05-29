import { motion } from 'motion/react';
import { Code2, Wrench, Shield } from 'lucide-react';
import { skillsData } from '../data';

const iconMap = {
  Code2: Code2,
  Wrench: Wrench,
  Shield: Shield,
};

const meterValues = {
  "HTML5": 95,
  "CSS3": 90,
  "JavaScript (ES6+)": 88,
  "React.js": 85,
  "Responsive Web Design": 92,
  "Tailwind CSS": 94,
  "Git": 80,
  "GitHub": 85,
  "VS Code": 90,
  "Vercel": 75,
  "GitHub Pages": 80,
  "SQL": 70,
  "REST APIs": 80,
  "Cyber Security Foundations": 82,
  "Network Security": 75
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-paper-50 px-6 sm:px-8 lg:px-12 border-b border-paper-200 relative overflow-hidden"
    >
      {/* Subtle classical backing patterns */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Symmetrical Luxury Section Header */}
        <div className="text-center mb-16 max-w-xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-3 font-mono font-bold">
            01 / TECHNICAL MATRIX
          </span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            id="skills-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-ink-950 mb-3 tracking-tight"
          >
            My Skills.
          </motion.h3>
          <div className="w-16 h-[1.5px] bg-gold-600/40 my-3" />
          <p className="text-xs sm:text-sm font-sans text-ink-700 font-light leading-relaxed max-w-md">
            A comprehensive directory of my technical competencies, specialized tools, and fundamental principles in clear and elegant row listings.
          </p>
        </div>

        {/* Clean, Simple Row-based Flow */}
        <div className="space-y-6">
          {skillsData.map((category, index) => {
            const IconComponent = iconMap[category.iconName] || Code2;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 bg-paper-100 border border-paper-200/70 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                id={`skill-row-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Left Category Info: md:col-span-4 */}
                <div className="md:col-span-4 flex md:flex-col items-start gap-4 border-b md:border-b-0 md:border-r border-paper-200 pb-4 md:pb-0 md:pr-6">
                  <div className="p-3 bg-paper-50 text-gold-700 border border-gold-600/10 rounded-xl">
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold tracking-wider text-ink-950 uppercase">
                      {category.title}
                    </h4>
                    <p className="text-[11px] text-ink-500 font-sans font-light mt-1 md:block hidden">
                      {category.title === "Frontend" 
                        ? "Core rendering libraries and responsive web styling mechanisms." 
                        : category.title === "Tools & Platforms" 
                        ? "Primary software environments, deployment networks, and systems control." 
                        : "Data management schemas, query protocols, and digital security standards."}
                    </p>
                  </div>
                </div>

                {/* Right Skills Tags Row: md:col-span-8 */}
                <div className="md:col-span-8 flex flex-wrap gap-2.5 items-center justify-start self-center">
                  {category.skills.map((skill) => {
                    return (
                      <div
                        key={skill}
                        className="px-4 py-2.5 bg-paper-50 hover:bg-gold-500/5 border border-paper-200 hover:border-gold-600/20 text-ink-850 hover:text-ink-950 rounded-lg text-xs font-sans font-medium transition-all group duration-250 flex items-center shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                      >
                        <span className="font-sans text-ink-800 group-hover:text-ink-950 font-normal">
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
