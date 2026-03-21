"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ChevronLeft, 
  MessageSquare, 
  Quote, 
  Terminal, 
  Scale, 
  Zap,
  ArrowRight
} from "lucide-react";
import { Footer } from "@/components/Footer";

export default function DebatePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/about">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5">
              <ChevronLeft className="h-4 w-4 mr-2" /> Back to About
            </Button>
          </Link>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500/60">
            System Protocol v1.4.2 [Internal Logs]
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <motion.div 
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              The Logic & Beauty <span className="text-red-600">Debate</span>
            </h1>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">
              Economics vs. Experience • Human Value vs. Hard Math
            </p>
          </motion.div>

          <div className="grid gap-16">
            {/* Round 1 */}
            <motion.section 
              className="space-y-6 border-l-2 border-blue-500/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-400">Round 1: The Core Math vs Emotional Hook</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-blue-400">Dr. Amartya:</span> "Is the 700 baseline universally defensible? We are missing the <span className="text-white underline decoration-blue-500/50">Marginal Utility of well-being</span>. If a user starts in crisis, the movie's relative impact is massive."</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-bold text-purple-400">Elena (PM):</span> "Users don't care about curves. They care if the 'Battery' looks cool. It needs to be a 'Vibe Check'. But the logic must be airtight."</p>
                </div>
              </div>
            </motion.section>

            {/* Round 2 */}
            <motion.section 
              className="space-y-6 border-l-2 border-emerald-500/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-400">Round 2: The Victory vs Loss Condition</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-amber-500">Dr. Thaler:</span> "The 'Loss' screen is too punishing. This is <span className="italic text-white">Loss Aversion</span> at play. We should frame 'Losses' as 'Investments in Memory'."</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-bold text-emerald-500">Julian (UX):</span> "Exactly! But the 'Poster' result is amazing. Maybe we rename it to 'Cinematic Sacrifice'?"</p>
                </div>
              </div>
            </motion.section>

            {/* Round 3: Macro Visibility */}
            <motion.section 
              className="space-y-6 border-l-2 border-amber-500/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-500">Round 3: Hidden Macro Identities</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-amber-600">Dr. Lucas (Macro):</span> "Why is the discrepancy hidden? In a real economy, discrepancy is a signal of informal 'under-the-table' value like piracy. It's a feature, not a footnote."</p>
                </div>
              </div>
            </motion.section>

            {/* Round 4: Navigation and Flow */}
            <motion.section 
              className="space-y-6 border-l-2 border-purple-500/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-purple-400">Round 4: Command Center Navigation</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-purple-400">Sarah (UX):</span> "The navigation is inconsistent. We need a 'Command Center' feel. 8 steps are too many—we need a 'Quick Mode' for the ADHD generation."</p>
                </div>
              </div>
            </motion.section>

            {/* Moses Sam Paul's Critical Pivot */}
            <motion.section 
              className="relative space-y-8 rounded-[3rem] border border-red-900/30 bg-red-950/10 p-10 md:p-16 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Quote className="absolute -top-6 -left-6 h-32 w-32 text-red-600/10" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-red-600/20">
                  <Zap className="h-3 w-3 fill-white" /> Moses Sam Paul&apos;s POV
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase italic leading-tight">
                  "WE ARE MOVING AWAY FROM <span className="text-red-500">SOFT CORPORATE LANGUAGE</span>."
                </h2>
                <div className="space-y-6 text-xl text-white/90 leading-relaxed font-medium">
                  <p>
                    "When we say <strong className="text-red-600 underline decoration-2 underline-offset-8 uppercase tracking-widest">DEFEAT</strong>, it&apos;s not a punishment; it&apos;s a <strong>System Diagnostic</strong>. In the Internet of Value, every minute is an asset."
                  </p>
                  <p className="text-white/60 italic border-l-2 border-red-600 pl-6">
                    "Honesty is what makes victory sweet. We aren&apos;t here to make people feel good; we&apos;re here to make them aware of value."
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Round 5: Identity Explained */}
            <motion.section 
              className="space-y-6 border-l-2 border-cyan-500/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-400">Round 5: Language vs State Identity</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-cyan-400">Sarah (UX):</span> "Users don't know what 'Language Identity' actually means for the economy. We need to show: 'Increasing this adds ₹20Cr to export value'."</p>
                </div>
              </div>
            </motion.section>

            {/* Round 6: Community vs Labor */}
            <motion.section 
              className="space-y-6 border-l-2 border-indigo-500/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400">Round 6: The Attention Multiplier</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-indigo-400">Dr. Amartya:</span> "The 'Attention Multiplier'—the ratio of Audience Hours to Labor Hours—is a proxy for Social Capital. We are underselling our most original economic insight!"</p>
                </div>
              </div>
            </motion.section>

            {/* Round 7: Performance vs Extraction */}
            <motion.section 
              className="space-y-6 border-l-2 border-rose-500/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-rose-400">Round 7: Extraction vs Flourishing</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-rose-400">Dr. Lucas:</span> "Your math treats 'movie time' as consumption. But if it inspires a kid to write a script, it's <span className="italic text-white underline decoration-rose-500/50 underline-offset-4">Capital Formation</span>. We are missing the future-value component."</p>
                </div>
                <div className="space-y-2">
                  <p><span className="font-bold text-purple-400">Elena (PM):</span> "That's why we added the <span className="text-white">Performance Node</span> (Learning, Earning, Skill). We are tracking the transformation of leisure into capacity."</p>
                </div>
              </div>
            </motion.section>

            {/* Round 8: The Aesthetic Frontier */}
            <motion.section 
              className="space-y-6 border-l-2 border-white/30 pl-8 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] border-4 border-black" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white">Round 8: High-Fidelity over High-Precision</h2>
              <div className="grid gap-6 text-lg text-white/80 leading-relaxed max-w-3xl">
                <div className="space-y-2">
                  <p><span className="font-bold text-white">Julian (UX):</span> "Precision is for spreadsheets. Fidelity is for humans. 701.45 is a number; a <span className="text-amber-400">glowing amber battery</span> is a feeling. Let's build for the feeling."</p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
