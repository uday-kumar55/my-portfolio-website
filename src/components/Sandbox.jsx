import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Layers, Lock, Unlock, Settings } from "lucide-react";

export default function Sandbox() {
  const [activeTab, setActiveTab] = useState("live-react");

  // React State Simulator
  const [counter, setCounter] = useState(4);
  const [accentId, setAccentId] = useState("gold");

  // Security Sandbox state
  const [referrerStrict, setReferrerStrict] = useState(true);
  const [xssCheck, setXssCheck] = useState(true);
  const [jwtHttpOnly, setJwtHttpOnly] = useState(true);

  // Compute live security rating
  const securityScore =
    (referrerStrict ? 35 : 0) + (xssCheck ? 35 : 0) + (jwtHttpOnly ? 30 : 0);

  return (
    <section
      id="sandbox"
      className="py-24 bg-paper-100 px-6 sm:px-8 lg:px-12 border-b border-paper-200 relative overflow-hidden"
    >
      {/* Soft Decorative Luxury Glows */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Symmetrical Header */}
        <div className="text-center mb-16 max-w-xl mx-auto flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 mb-3 font-mono font-bold">
            06 / INTERACTIVE PLAYGROUND
          </span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-display font-medium text-ink-950 mb-3 tracking-tight"
          >
            Developer Sandbox.
          </motion.h3>
          <div className="w-16 h-[1.5px] bg-gold-600/40 my-3" />
          <p className="text-xs sm:text-sm font-sans text-ink-700 font-light leading-relaxed">
            Test real-time client state cycles, switch responsive accents, and
            toggle security shield presets live in the interface.
          </p>
        </div>

        {/* Central Terminal Simulator Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 85, damping: 14 }}
          className="w-full bg-paper-100 border-2 border-gold-600/20 shadow-[0_15px_45px_rgba(198,161,71,0.03)] relative overflow-hidden rounded-xl mx-auto"
          id="sandbox-interactive-terminal"
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-paper-200 border-b border-paper-200">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            </div>
            <div className="flex items-center space-x-2 text-[8.5px] font-mono text-ink-550 uppercase tracking-widest font-bold">
              <Settings size={11} className="text-gold-600 animate-spin-slow" />
              <span>Reactive Core Simulation Lab</span>
            </div>
            <span className="text-[7.5px] font-mono text-gold-700 bg-gold-500/10 border border-gold-600/15 px-2.5 py-0.5 uppercase font-bold tracking-wider rounded-md">
              STATUS: LIVE
            </span>
          </div>

          {/* Symmetrical Window Inner Navigation Tabs */}
          <div className="flex border-b border-paper-200 bg-paper-100 text-[9px] font-mono uppercase tracking-[0.15em] font-bold">
            <button
              onClick={() => setActiveTab("live-react")}
              id="terminal-tab-react"
              className={`flex-1 py-4.5 transition-all cursor-pointer flex items-center justify-center space-x-2 border-r border-paper-200 ${
                activeTab === "live-react"
                  ? "bg-paper-100 text-ink-950 border-t-2 border-t-gold-600 font-bold"
                  : "text-ink-500 hover:text-ink-950 hover:bg-gold-500/5"
              }`}
            >
              <Layers size={11} className="text-gold-600" />
              <span>React State Engine</span>
            </button>
            <button
              onClick={() => setActiveTab("sec-headers")}
              id="terminal-tab-sec"
              className={`flex-1 py-4.5 transition-all cursor-pointer flex items-center justify-center space-x-2 ${
                activeTab === "sec-headers"
                  ? "bg-paper-100 text-ink-950 border-t-2 border-t-gold-600 font-bold"
                  : "text-ink-500 hover:text-ink-950 hover:bg-gold-500/5"
              }`}
            >
              <Shield size={11} className="text-gold-600" />
              <span>Cyber Isolation Vault</span>
            </button>
          </div>

          {/* Dynamic Content Display Panel */}
          <div className="p-6 sm:p-10 text-left min-h-[320px] flex flex-col justify-between bg-paper-100">
            <AnimatePresence mode="wait">
              {activeTab === "live-react" ? (
                <motion.div
                  key="live-react-content"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-6 flex-grow flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[8px] font-mono uppercase text-gold-700 block mb-0.5 font-bold tracking-widest">
                      LOCAL DATA FLUX
                    </span>
                    <h4 className="text-base font-sans font-bold text-ink-950 mb-1.5 uppercase tracking-wide">
                      Interactive Slate Counter
                    </h4>
                    <p className="text-xs text-ink-700 leading-relaxed mb-6 font-light font-sans">
                      Test reactive parameters rendering immediately on click.
                      The parent application layout isolates this atomic hook
                      state from affecting top-level rendering threads.
                    </p>

                    {/* Active Interactive Dashboard Unit */}
                    <div className="bg-paper-50 p-5 sm:p-6 border border-paper-200 rounded-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
                      {/* Interactive Gold Left Edge Accent Tag */}
                      <div
                        className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                          accentId === "gold"
                            ? "bg-gold-600"
                            : accentId === "espresso"
                              ? "bg-ink-950"
                              : "bg-gold-500"
                        }`}
                      />

                      <div className="space-y-1 text-left sm:flex-1 pl-3 w-full">
                        <div className="text-[8px] font-mono text-ink-500 uppercase tracking-widest font-bold">
                          REACTIVE REGISTRY
                        </div>
                        <h5 className="text-[11px] font-sans font-semibold text-ink-950 uppercase tracking-wider">
                          LOCAL ACCENT CODENAME
                        </h5>
                        <div className="text-[10px] font-mono text-ink-700 mt-0.5">
                          Sandbox Value:{" "}
                          <strong className="text-gold-700 font-bold">
                            {counter}
                          </strong>
                        </div>
                      </div>

                      {/* Control Symmetrical Button Actions */}
                      <div className="flex flex-wrap items-center gap-2.5 justify-end w-full sm:w-auto">
                        <button
                          onClick={() => setCounter((prev) => prev + 1)}
                          className="px-4 py-2 bg-paper-100 border border-paper-300 hover:border-gold-500 text-ink-950 text-[9.5px] font-mono uppercase tracking-wider cursor-pointer active:scale-95 transition-all font-bold rounded-md"
                        >
                          + Increment State
                        </button>
                        <button
                          onClick={() => setCounter(0)}
                          className="px-4 py-2 bg-paper-200 hover:bg-gold-500/10 border border-paper-200 text-ink-950 text-[9.5px] font-mono uppercase tracking-wider cursor-pointer active:scale-95 transition-all rounded-md font-bold"
                        >
                          Reset Scope
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Swatch Controls Footer Panel */}
                  <div className="pt-5 border-t border-paper-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-[8.5px] font-mono text-ink-500 uppercase font-bold tracking-wider">
                        ACCENT STYLE:
                      </span>
                      <div className="flex space-x-2">
                        {["gold", "espresso", "champagne"].map((color) => (
                          <button
                            key={color}
                            onClick={() => setAccentId(color)}
                            className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                              color === "gold"
                                ? "bg-gold-600"
                                : color === "espresso"
                                  ? "bg-ink-950"
                                  : "bg-gold-500"
                            } ${accentId === color ? "border-ink-950 ring-2 ring-gold-500 scale-115 shadow-sm" : "border-transparent hover:scale-110"}`}
                            aria-label={`Select ${color} Accent`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Console state registry hex */}
                    <span className="font-mono text-[9px] text-gold-700 font-bold bg-gold-600/10 py-1.5 px-3 border border-gold-600/20 uppercase tracking-widest rounded-md">
                      State Index Hex: 0x{counter.toString(16).toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="sec-headers-content"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-6 flex-grow flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[8px] font-mono uppercase text-gold-700 block mb-0.5 font-bold tracking-widest">
                      SECURITY ENVIRONMENT
                    </span>
                    <h4 className="text-base font-sans font-bold text-ink-950 mb-1.5 uppercase tracking-wide">
                      Client Isolation Safeguards
                    </h4>
                    <p className="text-xs text-ink-700 leading-relaxed mb-6 font-light font-sans">
                      Toggle active security shield presets below. Testing how
                      isolation parameters and strict client security protocols
                      block potential data leaks under standard audits.
                    </p>

                    {/* Option Selection Panel Grid */}
                    <div className="space-y-2.5">
                      {/* Header 1 */}
                      <div className="flex items-center justify-between p-3.5 hover:bg-gold-500/5 transition-colors border border-paper-200 rounded-lg">
                        <div className="text-left">
                          <h5 className="text-[10px] font-mono font-bold text-ink-950 uppercase tracking-wider">
                            Referrer-Policy: 'no-referrer'
                          </h5>
                          <p className="text-[8px] text-ink-500 mt-0.5 font-sans leading-none">
                            Omit original request headers on external
                            navigations
                          </p>
                        </div>
                        <button
                          onClick={() => setReferrerStrict(!referrerStrict)}
                          className={`w-9 h-5 p-0.5 rounded-full transition-colors cursor-pointer relative ${
                            referrerStrict ? "bg-gold-600" : "bg-slate-300"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-paper-100 shadow-sm transition-transform ${
                              referrerStrict
                                ? "translate-x-[16px]"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Header 2 */}
                      <div className="flex items-center justify-between p-3.5 hover:bg-gold-500/5 transition-colors border border-paper-200 rounded-lg">
                        <div className="text-left">
                          <h5 className="text-[10px] font-mono font-bold text-ink-950 uppercase tracking-wider">
                            XSS Script Block Rule
                          </h5>
                          <p className="text-[8px] text-ink-500 mt-0.5 font-sans leading-none">
                            Filters client components markup against injected
                            script strings
                          </p>
                        </div>
                        <button
                          onClick={() => setXssCheck(!xssCheck)}
                          className={`w-9 h-5 p-0.5 rounded-full transition-colors cursor-pointer relative ${
                            xssCheck ? "bg-gold-600" : "bg-slate-300"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-paper-100 shadow-sm transition-transform ${
                              xssCheck ? "translate-x-[16px]" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Header 3 */}
                      <div className="flex items-center justify-between p-3.5 hover:bg-gold-500/5 transition-colors border border-paper-200 rounded-lg">
                        <div className="text-left">
                          <h5 className="text-[10px] font-mono font-bold text-ink-950 uppercase tracking-wider">
                            Cookie HttpOnly Parameter
                          </h5>
                          <p className="text-[8px] text-ink-500 mt-0.5 font-sans leading-none">
                            Prevents JavaScript processes from extracting
                            session credentials
                          </p>
                        </div>
                        <button
                          onClick={() => setJwtHttpOnly(!jwtHttpOnly)}
                          className={`w-9 h-5 p-0.5 rounded-full transition-colors cursor-pointer relative ${
                            jwtHttpOnly ? "bg-gold-600" : "bg-slate-300"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-paper-100 shadow-sm transition-transform ${
                              jwtHttpOnly
                                ? "translate-x-[16px]"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Rating Output Footer Footer */}
                  <div className="pt-5 border-t border-paper-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-[10px]">
                      {securityScore === 100 ? (
                        <Unlock
                          className="text-gold-600 animate-pulse"
                          size={12}
                        />
                      ) : (
                        <Unlock className="text-ink-500" size={12} />
                      )}
                      <span className="font-mono text-ink-950 text-[9px] uppercase tracking-wider font-bold">
                        VULNERABILITY RATIO:{" "}
                        <span
                          className={
                            securityScore === 100
                              ? "text-gold-600 font-bold"
                              : "text-amber-600 font-bold"
                          }
                        >
                          {100 - securityScore}% RISK
                        </span>
                      </span>
                    </div>

                    <span className="text-[9px] font-mono text-ink-500 uppercase font-bold bg-paper-50 px-2 py-0.5 border border-paper-200 rounded-md">
                      {securityScore === 100
                        ? "100% AUDIT CLEARED"
                        : "NEEDS ATTENTION"}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
