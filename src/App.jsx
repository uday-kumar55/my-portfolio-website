import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Sandbox from "./components/Sandbox";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import BackgroundCursorAnimation from "./components/BackgroundCursorAnimation";

export default function App() {
  return (
    <div className="min-h-screen bg-transparent font-sans antialiased text-ink-700 relative overflow-hidden">
      {/* Interactive Cursor Background Canvas & Dynamic Parallax Glass Nodes */}
      <BackgroundCursorAnimation />

      {/* Primary Components Blocks */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Hero />
          <Skills />
          <Education />
          <Projects />
          <Credentials />
          <Resume />
          <About />
          <Sandbox />
          <Contact />
        </main>
      </div>
    </div>
  );
}
