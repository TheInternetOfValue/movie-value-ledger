"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Building, 
  Users, 
  Globe, 
  ChevronDown, 
  ArrowRight,
  Shield,
  Zap,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const perspectives = [
  { id: "macro", name: "Macro", path: "/macro", icon: Globe, desc: "National Economic Footprint" },
  { id: "micro", name: "Micro", path: "/micro", icon: Building, desc: "Project & Studio Economics" },
  { id: "community", name: "Community", path: "/community", icon: Users, desc: "Collective Scale & Shared Signal" },
  { id: "individual", name: "Individual", path: "/individual", icon: Activity, desc: "Personal Value & Wellbeing" },
];

export function NavigationBar({ currentPage }: { currentPage: string }) {
  const [isScrubberOpen, setIsScrubberOpen] = useState(false);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/50 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-8 min-w-0">
            <Link href="/systems-pov" className="shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 group">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse shrink-0" />
                <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-white/90 group-hover:text-white transition-colors truncate max-w-[80px] sm:max-w-none">
                  Systemic Ledger
                </span>
              </div>
            </Link>
            
            <div className="h-4 w-px bg-white/10 hidden sm:block shrink-0" />
            
            <button 
              onClick={() => setIsScrubberOpen(!isScrubberOpen)}
              className="group flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shrink-0"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-amber-500">
                  {currentPage}
                </span>
                <ChevronDown className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3 text-white/40 transition-transform duration-300", isScrubberOpen && "rotate-180")} />
              </div>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1 shrink-0">
            {perspectives.map((p) => (
              <Link key={p.id} href={p.path}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "text-[10px] font-black tracking-[0.33em] uppercase px-4 transition-all duration-300",
                    p.id === currentPage 
                      ? "text-amber-500 bg-amber-500/5" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  {p.name}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group cursor-pointer hover:border-amber-500/50 transition-all">
                <LayoutGrid className="h-4 w-4 text-white/40 group-hover:text-amber-500" />
             </div>
          </div>
        </div>
      </motion.div>

      {/* The Scrubber Overlay */}
      <AnimatePresence>
        {isScrubberOpen && (
          <>
            <motion.div 
              className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScrubberOpen(false)}
            />
            <motion.div 
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl z-[110] px-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="dossier-card overflow-hidden bg-[#0a0a0a] border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <h3 className="text-xs font-black text-amber-500 uppercase tracking-[0.4em]">Systems Scrubber</h3>
                       <p className="text-sm text-white/40 leading-relaxed font-medium">Interrogate the cinematic intervention across multiple scales of reality.</p>
                    </div>
                    
                    <div className="grid gap-3">
                      {perspectives.map((p) => (
                        <Link 
                          key={p.id} 
                          href={p.path}
                          onClick={() => setIsScrubberOpen(false)}
                          className={cn(
                            "group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                            p.id === currentPage 
                              ? "bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/20" 
                              : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                              p.id === currentPage ? "bg-amber-500 text-black" : "bg-white/5 text-white/40 group-hover:text-white"
                            )}>
                              <p.icon className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                              <div className={cn("text-xs font-black uppercase tracking-widest", p.id === currentPage ? "text-white" : "text-white/60")}>{p.name}</div>
                              <div className="text-[10px] text-white/30 font-medium">{p.desc}</div>
                            </div>
                          </div>
                          <ArrowRight className={cn("h-4 w-4 transition-all", p.id === currentPage ? "text-amber-500 opacity-100 translate-x-0" : "text-white/20 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-[2rem] p-8 space-y-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Live Analytics Layer</span>
                      </div>
                      <div className="space-y-6">
                         <div className="space-y-1">
                            <div className="text-[9px] text-white/20 uppercase tracking-widest">Total Economic Velocity</div>
                            <div className="text-3xl font-black text-white dossier-number">₹3,412.80<span className="text-xs ml-1 opacity-30 italic">cr</span></div>
                         </div>
                         <div className="space-y-1">
                            <div className="text-[9px] text-white/20 uppercase tracking-widest">Aggregate Community Signal</div>
                            <div className="text-3xl font-black text-amber-500 dossier-number">84.2<span className="text-xs ml-1 opacity-30 italic">pts</span></div>
                         </div>
                         <div className="space-y-1">
                            <div className="text-[9px] text-white/20 uppercase tracking-widest">Individual Value Captured</div>
                            <div className="text-3xl font-black text-emerald-500 dossier-number">+₹2,480<span className="text-xs ml-1 opacity-30 italic">/avg</span></div>
                         </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <Button className="w-full bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] py-6 rounded-xl hover:bg-amber-400 transition-colors">
                            Generate Full Audit
                        </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
