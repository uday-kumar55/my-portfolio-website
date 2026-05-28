import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Sandbox from './components/Sandbox';
import Projects from './components/Projects';
import Credentials from './components/Credentials';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-transparent font-sans antialiased text-ink-700 relative overflow-hidden">
      
      {/* Dynamic Drifting Golden & Alabaster Glass Nodes in Backend */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Sphere 1 - Top Left Champagne */}
        <div className="absolute top-[5%] left-[-10%] sm:left-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-gold-500/15 to-paper-300/10 blur-[130px] animate-float-1" />
        
        {/* Sphere 2 - Mid Right Luxury Bronze */}
        <div className="absolute top-[30%] right-[-15%] sm:right-[5%] w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-gold-600/10 to-amber-500/5 blur-[150px] animate-float-2" />
        
        {/* Sphere 3 - Lower Mid Left Platinum Cream */}
        <div className="absolute top-[55%] left-[-15%] sm:left-[-5%] w-[480px] h-[480px] rounded-full bg-gradient-to-r from-paper-400/20 to-gold-500/8 blur-[120px] animate-float-3" />
        
        {/* Sphere 4 - Lower Right Deep Luxury Gold */}
        <div className="absolute bottom-[10%] right-[-10%] sm:right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gold-700/10 to-paper-300/5 blur-[140px] animate-float-1" />
        
        {/* Sphere 5 - Bottom Left Champagne Glow */}
        <div className="absolute bottom-[-10%] left-[15%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gold-500/12 to-white/10 blur-[110px] animate-float-2" />
      </div>

      {/* Primary Components Blocks */}
      <div className="relative z-10 flex flex-col min-h-screen backdrop-blur-[6px]">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Education />
          <Projects />
          <Credentials />
          <Sandbox />
          <Contact />
        </main>
      </div>
    </div>
  );
}
