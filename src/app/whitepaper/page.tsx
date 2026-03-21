"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationBar } from "@/components/NavigationBar";
import { 
  BookOpen, 
  FileText, 
  ArrowRight, 
  Layers, 
  User, 
  Briefcase, 
  Globe, 
  Users,
  Target,
  Zap,
  ChevronRight,
  ShieldCheck,
  Search
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "abstract",
    title: "Abstract",
    icon: <Target className="h-4 w-4" />,
    content: `Modern economic systems are precise at measuring what is easy, and weak at measuring what people actually live through. They count price, revenue, and volume. They rarely capture what a movie does to the body, mood, mind, habits, or future time.`
  },
  {
    id: "individual",
    title: "Individual Layer",
    icon: <User className="h-4 w-4" />,
    stats: { nodes: 6, focus: "Subjective ROI" },
    content: `The individual layer is where the movie’s effect becomes personal. The questions check whether the viewer’s body, mood, thinking, habits, and next actions changed after the film.`
  },
  {
    id: "micro",
    title: "Micro Layer",
    icon: <Briefcase className="h-4 w-4" />,
    stats: { metric: "Capital Risk", focus: "Firm Solvency" },
    content: `From the perspective of the firm, a film is a structured deployment of capital under uncertainty. A single large-budget film can represent a significant fraction of a firm’s deployable capital.`
  },
  {
    id: "macro",
    title: "Macro Layer",
    icon: <Globe className="h-4 w-4" />,
    stats: { formula: "GDP(E)", focus: "National Footprint" },
    content: `At the macro level, films behave as temporary but dense clusters of economic activity. GDP = C + I + G + (X - M).`
  },
  {
    id: "community",
    title: "Community Layer",
    icon: <Users className="h-4 w-4" />,
    stats: { metric: "Attention", focus: "Collective Identity" },
    content: `The community layer looks at shared excitement, fan reaction, hashtag momentum, and language-based identity.`
  }
];

export default function WhitepaperPage() {
  const [activeTab, setActiveTab] = useState("abstract");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
      <NavigationBar currentPage="about" />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
        <header className="mb-24 space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-amber-500" />
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">Protocol Specification</div>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            The White<br/><span className="text-white/10 outline-text">paper</span>
          </h1>
          <p className="text-2xl text-white/40 font-medium max-w-2xl leading-tight border-l-2 border-white/10 pl-8">
            A movie-first front end for the Internet of Value (IoV). Translating cinematic experience into human capital.
          </p>
        </header>

        <div className="grid lg:grid-cols-[350px_1fr] gap-20">
          {/* Interactive TOC Sidebar */}
          <aside>
            <div className="sticky top-32 space-y-12">
              <div className="space-y-4">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest px-4">System Nodes</div>
                <div className="flex flex-col gap-2">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(s.id)}
                      className={cn(
                        "group flex items-center gap-4 p-4 rounded-2xl transition-all text-left border",
                        activeTab === s.id 
                          ? "bg-white/10 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                          : "bg-transparent border-transparent hover:bg-white/5"
                      )}
                    >
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                        activeTab === s.id ? "bg-amber-500 text-black scale-110" : "bg-white/5 text-white/40 group-hover:text-white"
                      )}>
                        {s.icon}
                      </div>
                      <div className="flex-grow">
                        <div className={cn(
                          "text-xs font-black uppercase tracking-widest",
                          activeTab === s.id ? "text-white" : "text-white/40 group-hover:text-white"
                        )}>{s.title}</div>
                        {activeTab === s.id && (
                          <motion.div layoutId="dot" className="h-1 w-1 bg-amber-500 rounded-full mt-1" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="dossier-card p-8 bg-amber-500/5 border-amber-500/10 space-y-4">
                <div className="flex items-center gap-2 text-amber-500">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified</span>
                </div>
                <p className="text-[11px] text-white/40 italic leading-relaxed uppercase font-mono">
                  Base Equation: VC = W × Vcom<br/>
                  Internal Model Baseline: 1.0 (Normalized)
                </p>
              </div>
            </div>
          </aside>

          {/* Dynamic Content Area */}
          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Active Section Headline */}
                <div className="space-y-6">
                  <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">
                    Segment::{activeTab.toUpperCase()}
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                    {sections.find(s => s.id === activeTab)?.title}
                  </h2>
                </div>

                {/* Section Specific Layouts */}
                <div className="prose prose-invert prose-amber max-w-none">
                  <p className="text-2xl text-white/70 font-medium leading-relaxed mb-12">
                    {sections.find(s => s.id === activeTab)?.content}
                  </p>
                  
                  {activeTab === "abstract" && (
                    <div className="grid md:grid-cols-2 gap-8 pt-8">
                       <ImpactNode title="Front-End Layer" desc="Movie-first interface optimized for relatable subjective data entry." />
                       <ImpactNode title="Protocol Layer" desc="Grounded in canonical IoV variables (W, Vcom, Identity)." />
                    </div>
                  )}

                  {activeTab === "individual" && (
                    <div className="space-y-12">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["Physiology", "Emotion", "Thought", "Habit", "Performance"].map(node => (
                          <div key={node} className="dossier-card p-6 bg-white/5 border-white/10 text-center">
                            <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">{node}</div>
                            <div className="text-[9px] text-white/30 uppercase font-mono tracking-tighter">Diagnostic Sensor</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-amber-500/5 p-8 border-l-4 border-amber-500 rounded-r-3xl italic text-white/60 text-lg">
                        "The app is not trying to sound academic. It is trying to translate the backend into a fun, relatable movie-led experience."
                      </div>
                    </div>
                  )}

                  {activeTab === "micro" && (
                    <div className="space-y-10">
                       <div className="dossier-card p-10 bg-white/[0.02] border-white/5 overflow-hidden relative">
                          <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-6">Risk Exposure Model</div>
                          <div className="text-5xl font-black text-amber-500 dossier-number mb-4">∏ = R - C</div>
                          <p className="text-sm text-white/40 uppercase font-mono leading-relaxed">
                            Films are capital concentration events with nonlinear payoff distributions. The ledger links these returns to downsteam well-being.
                          </p>
                       </div>
                    </div>
                  )}

                  {activeTab === "macro" && (
                    <div className="space-y-8">
                       <div className="dossier-card p-10 bg-white/[0.02] border-white/5">
                          <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-6">Identity Framework</div>
                          <div className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">GDP = C + I + G + (X - M)</div>
                          <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">C :: Consumption</div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">I :: Investment</div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">G :: Government</div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">X-M :: Net Exports</div>
                          </div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Navigation Button */}
                <div className="pt-20 border-t border-white/5 flex items-center justify-between">
                   <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Next Protocol Phase</div>
                   <Button 
                    onClick={() => setActiveTab(sections[(sections.findIndex(s => s.id === activeTab) + 1) % sections.length].id)}
                    className="h-16 px-10 bg-white text-black hover:bg-amber-500 font-black uppercase tracking-[0.4em] text-[10px] transition-all rounded-xl group"
                   >
                     Continue Reading <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                   </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function ImpactNode({ title, desc }: any) {
  return (
    <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
      <div className="h-2 w-2 rounded-full bg-amber-500 mb-6 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all" />
      <div className="text-xs font-black uppercase tracking-widest text-white mb-2">{title}</div>
      <div className="text-[11px] text-white/40 uppercase font-mono leading-relaxed">{desc}</div>
    </div>
  );
}
