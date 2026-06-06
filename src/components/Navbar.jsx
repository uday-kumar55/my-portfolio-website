import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Sun, Moon, ArrowRight, FileText } from 'lucide-react';
import { personalInfo } from '../data';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#credentials' },
  { label: 'Resume', href: '#resume' },
  { label: 'About', href: '#about' },
  { label: 'Sandbox', href: '#sandbox' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setIsScrolled(window.scrollY > 20);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 50) {
        setVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY.current;
        // Scroll down threshold of 10px to hide
        if (diff > 10 && !isOpen) {
          setVisible(false);
        } 
        // Scroll up threshold of 10px to show
        else if (diff < -10) {
          setVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-navbar-bg backdrop-blur-md border-b border-paper-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with clean editorial display style */}
          <div className="flex items-center">
            <motion.a
               href="#"
               id="nav-logo"
               whileHover={{ scale: 1.01 }}
               whileTap={{ scale: 0.99 }}
               className="flex items-center space-x-2 font-display font-medium text-ink-950 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 bg-gold-600 rounded-full mr-1.5" />
              <span className="font-semibold text-base sm:text-lg tracking-[0.25em]">{personalInfo.name.toUpperCase()}</span>
            </motion.a>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    whileHover={{ y: -1 }}
                    className="text-[10px] font-mono font-medium tracking-widest text-ink-500 hover:text-ink-950 uppercase transition-colors relative py-2 group cursor-pointer inline-block"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-600 transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                </li>
               ))}
            </ul>

            <div className="h-4 w-[1px] bg-paper-300" />

            <div className="flex items-center space-x-4">
              {/* Luxury Dynamic Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 12 }}
                whileTap={{ scale: 0.95 }}
                id="desktop-theme-toggle"
                className="text-ink-500 hover:text-ink-950 transition-colors cursor-pointer p-1.5 rounded-lg border border-transparent hover:border-paper-200 hover:bg-paper-100/50 flex items-center justify-center"
                aria-label="Toggle visual theme"
              >
                {isDark ? <Sun size={15} className="text-gold-500" /> : <Moon size={15} />}
              </motion.button>

              <div className="h-4 w-[1px] bg-paper-300" />

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                id="navbar-github-link"
                whileHover={{ scale: 1.1, y: -1, color: "#141619" }}
                whileTap={{ scale: 0.9 }}
                className="text-ink-500 transition-colors p-1 cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                id="navbar-linkedin-link"
                whileHover={{ scale: 1.1, y: -1, color: "#AC8645" }}
                whileTap={{ scale: 0.9 }}
                className="text-ink-500 transition-colors p-1 cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
              </motion.a>

              <div className="h-4 w-[1px] bg-paper-300" />

              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                id="navbar-resume-download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2.5 py-1.5 border border-gold-600/30 text-gold-700 hover:text-ink-950 bg-gold-600/10 hover:bg-gold-600/15 text-[8.5px] font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer rounded-md flex items-center space-x-1"
                aria-label="View Resume document"
              >
                <FileText size={11} className="text-gold-600" />
                <span>Resume PDF</span>
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="text-ink-500 hover:text-ink-950 transition-colors p-2 cursor-pointer border border-paper-200 bg-paper-100"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            id="mobile-navigation-panel"
            className="md:hidden bg-navbar-bg/98 backdrop-blur-md border-b border-paper-200"
          >
            <div className="px-6 py-5 space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  id={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setIsOpen(false)}
                  whileTap={{ x: 2 }}
                  className="block text-xs font-mono tracking-widest uppercase text-ink-700 hover:text-ink-950 transition-colors py-2 cursor-pointer"
                >
                  <span className="text-gold-600 mr-2">/</span>{item.label}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-paper-200 flex items-center justify-between">
                <div className="flex space-x-4">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    id="mobile-github-link"
                    className="text-ink-500 hover:text-ink-950 transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <Github size={14} />
                    <span className="text-[10px] font-mono tracking-wider uppercase">GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    id="mobile-linkedin-link"
                    className="text-ink-500 hover:text-ink-950 transition-colors flex items-center space-x-2 cursor-pointer"
                  >
                    <Linkedin size={14} />
                    <span className="text-[10px] font-mono tracking-wider uppercase">LinkedIn</span>
                  </a>
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    id="mobile-resume-link"
                    className="text-gold-700 hover:text-gold-900 transition-colors flex items-center space-x-2 cursor-pointer font-bold"
                  >
                    <FileText size={14} />
                    <span className="text-[10px] font-mono tracking-wider uppercase">Resume PDF</span>
                  </a>
                </div>

                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.95 }}
                  id="mobile-theme-toggle"
                  className="text-ink-500 hover:text-ink-950 transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-paper-200 bg-paper-100 flex items-center space-x-1.5 text-[10px] font-mono tracking-wider uppercase"
                >
                  {isDark ? (
                    <>
                      <Sun size={12} className="text-gold-500" />
                      <span>LIGHT</span>
                    </>
                  ) : (
                    <>
                      <Moon size={12} />
                      <span>DARK</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}