"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavigationBar } from "@/components/NavigationBar";
import { 
  MessageSquare, 
  Quote, 
  Terminal, 
  Scale, 
  Zap,
  ArrowRight,
  ShieldCheck,
  Award,
  AlertTriangle,
  Activity,
  User,
  Cpu
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function DebatePage() {
  return (
    <main className="dossier-bg min-h-screen text-white pb-32">
      <NavigationBar currentPage="about" />

      <div className="mx-auto max-w-7xl px-6 pt-32">
        {/* Header Section */}
        <div className="mb-24 space-y-10">
          <div className="flex items-center gap-4 text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
            <ShieldCheck className="h-4 w-4" />
            System Protocol v1.4.2 [Conflict Logs]
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase">
            The Logic <br/><span className="text-red-500 outline-text">Debate</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="dossier-card p-10 border-red-500/20 bg-red-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                <Scale className="h-20 w-20 text-red-500" />
                </div>
                <p className="text-sm md:text-xl text-white/70 font-medium leading-relaxed relative z-10 italic">
                "Economics vs. Experience. Human Value vs. Hard Math. Every minute is an asset and every rupee is a vote. This is the System's POV."
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center font-black text-[10px]">M</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Moderated by Moses Sam Paul</div>
                </div>
            </div>
            <div className="space-y-4 pb-2">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Conflict Resolution Threshold</div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "88%" }}
                        className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/30 uppercase">
                    <span>Baseline Logic</span>
                    <span>88% Sync [Active Friction]</span>
                </div>
            </div>
          </div>
        </div>

        {/* Debate Rounds */}
        <div className="space-y-56">
          {/* Round 1 */}
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 sticky top-32 space-y-6">
              <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em]">Round 01</div>
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">The Core Math <br/> vs Hook</h2>
              <p className="text-xs text-white/30 uppercase font-mono leading-relaxed">
                Topic: Marginal Utility vs Viral Aesthetics. <br/>
                The battle between defensive math and product hype.
              </p>
              <div className="dossier-stamp border-red-500/20 text-red-500/60 uppercase">Protocol: High Tension</div>
            </div>
            
            <div className="lg:col-span-8 space-y-8">
              <DebateBubble 
                author="Dr. Amartya"
                role="Welfare Econ"
                initial="A"
                quote="Is the 700 baseline universally defensible? We are missing the Marginal Utility of well-being. If a user starts in crisis, the movie's relative impact is massive."
                highlight="Marginal Utility"
              />
              <div className="flex justify-center h-12 w-px bg-red-500/20 mx-auto" />
              <DebateBubble 
                author="Elena"
                role="Viral PM"
                initial="E"
                quote="Users don't care about curves. They care if the 'Battery' looks cool. It needs to be a 'Vibe Check'. But the logic must be airtight."
                highlight="Vibe Check"
                isRight
              />
              <div className="flex justify-center h-12 w-px bg-red-500/20 mx-auto" />
              <DebateBubble 
                author="Dr. Lucas"
                role="Macro Guru"
                initial="L"
                quote="The Expenditure vs. Income lens reconciliation is brilliant—it matches SNA standards. We should highlight the 'Discrepancy' as a feature, not a footnote."
                highlight="Signal of Informal Value"
              />
            </div>
          </div>

          {/* Round 2 */}
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 lg:order-last sticky top-32 space-y-6">
              <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em]">Round 02</div>
              </div>
              <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">Victory vs <br/> Loss Condition</h2>
              <p className="text-xs text-white/30 uppercase font-mono leading-relaxed">
                Topic: Loss Aversion in Leisure. <br/>
                The psychological cost of seeing a 'Defeat' result.
              </p>
              <div className="dossier-stamp border-red-500/20 text-red-500/60 uppercase">Status: Implemented [Weighted]</div>
            </div>
            
            <div className="lg:col-span-8 space-y-8">
              <DebateBubble 
                author="Dr. Thaler"
                role="Behavioral Scientist"
                initial="T"
                quote="The 'Loss' screen is too punishing. This is Loss Aversion at play. We should frame 'Losses' as 'Investments in Memory'."
                highlight="Loss Aversion"
              />
              <div className="flex justify-center h-12 w-px bg-red-500/20 mx-auto" />
              <DebateBubble 
                author="Julian"
                role="Cinematic UX"
                initial="J"
                quote="The 'Poster' result is amazing, but it says 'DEFEAT' in giant letters. It should say 'CINEMATIC SACRIFICE' or 'WORTH EVERY PENNY'."
                highlight="Contextual Framing"
                isRight
              />
            </div>
          </div>

          {/* Round 3: The Pivot */}
          <div className="pt-20">
             <div className="dossier-card border-white/10 bg-black/80 p-16 space-y-12 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)] pointer-events-none" />
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Terminal size={200} />
                </div>

                <div className="space-y-4 max-w-4xl relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="h-1 w-12 bg-red-500" />
                        <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">The 2026 Shift [Moses Sam Paul]</div>
                    </div>
                    <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                        Moving past <br/><span className="text-red-500 italic">engagement</span> into <span className="underline decoration-red-500">accuracy</span>.
                    </h3>
                    <p className="text-xl text-white/60 font-medium leading-relaxed pt-6">
                        "If the math shows you lost ₹1,502 in wellbeing-adjusted value because you sat for too long and scrolled too much, then the system must be brutally honest. That honesty is what makes the victory sweet."
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 pt-12">
                        <VerdictCard icon={<Cpu />} title="Diagnostic" desc="DEFEAT is a data point, not a punishment." />
                        <VerdictCard icon={<Activity />} title="Authentic" desc="We track Assets, not Vibes." />
                        <VerdictCard icon={<User />} title="Sovereign" desc="The user is a Micro-Firm of one." />
                    </div>
                </div>
             </div>
          </div>

          {/* Final Call to Action */}
          <div className="flex flex-col items-center gap-12 text-center pt-20">
             <div className="space-y-4">
                <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em]">System Intelligence Open</div>
                <h4 className="text-4xl font-black uppercase tracking-tighter">Ready to Verify?</h4>
             </div>
             <div className="flex flex-wrap justify-center gap-6">
                <Link href="/individual">
                    <Button className="h-16 px-12 bg-white text-black font-black uppercase tracking-[0.4em] text-[11px] hover:bg-red-500 transition-all rounded-xl">
                        Verify Individual Ledger
                    </Button>
                </Link>
                <Link href="/macro">
                    <Button variant="outline" className="h-16 px-12 border-white/10 text-white/40 uppercase tracking-[0.4em] text-[11px] hover:bg-white/5 hover:text-white transition-all rounded-xl">
                        Scan Macro Footprint
                    </Button>
                </Link>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function DebateBubble({ author, role, initial, quote, highlight, isRight = false }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: isRight ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn("flex gap-8 group", isRight ? "flex-row-reverse text-right" : "")}
        >
            <div className="flex-shrink-0 w-16 h-16 rounded-[2rem] bg-white/5 flex items-center justify-center font-black text-white border border-white/10 group-hover:border-red-500/50 group-hover:scale-110 transition-all duration-500">
                {initial}
            </div>
            <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-3 overflow-hidden text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
                    {!isRight && <div className="h-px w-8 bg-white/10" />}
                    <span className="text-white/60">{author}</span> 
                    <span className="text-white/20">—</span> 
                    <span>{role}</span>
                    {isRight && <div className="h-px w-8 bg-white/10" />}
                </div>
                <p className="text-2xl text-white/80 font-medium leading-tight italic group-hover:text-white transition-colors duration-500">
                    "{quote.split(highlight).map((part: string, i: number, arr: string[]) => (
                        <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">{highlight}</span>}
                        </React.Fragment>
                    ))}"
                </p>
            </div>
        </motion.div>
    );
}

function VerdictCard({ icon, title, desc }: any) {
    return (
        <div className="border border-white/5 p-8 rounded-3xl bg-white/[0.02] space-y-4 hover:bg-red-500/5 transition-colors group">
            <div className="h-10 w-10 text-white/20 group-hover:text-red-500 transition-colors">
                {icon}
            </div>
            <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-widest text-white">{title}</div>
                <div className="text-[10px] text-white/30 font-mono uppercase leading-relaxed">{desc}</div>
            </div>
        </div>
    );
}

// Utility to merge classes
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
