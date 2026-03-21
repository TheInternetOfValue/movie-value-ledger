"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Landmark, Users, ArrowRight, Play, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { dhurandharHomeData } from "@/data/dhurandhar";
import { cn } from "@/lib/utils";

const perspectivesNav = [
  { id: "systems-pov" as const, name: "Systems Home", path: "/systems-pov" },
  { id: "macro" as const, name: "Macro", path: "/macro" },
  { id: "micro" as const, name: "Micro", path: "/micro" },
  { id: "community" as const, name: "Community", path: "/community" },
  { id: "individual" as const, name: "Individual", path: "/individual" },
];

function NavigationBar() {
  return (
    <motion.div className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <div className="flex items-center gap-3 group">
              <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white group-hover:text-amber-500 transition-colors">
                Systemic Ledger
              </span>
            </div>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1">
            {perspectivesNav.map((p) => (
              <Link key={p.id} href={p.path}>
                <Button variant="ghost" size="sm" className="text-[10px] font-black tracking-[0.3em] uppercase px-4 text-white/40 hover:text-white hover:bg-white/5 transition-all">
                  {p.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-[9px] font-mono text-white/20 tracking-widest uppercase">Status: Protocol Active</div>
           <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500" 
                animate={{ width: ["20%", "80%", "40%"] }} 
                transition={{ duration: 4, repeat: Infinity }}
              />
           </div>
        </div>
      </div>
    </motion.div>
  );
}

const perspectives = [
  {
    id: "macro",
    title: "Macro Perspective",
    subtitle: "Country level",
    description: "How movies move GDP, jobs, and cultural exports.",
    icon: Landmark,
    path: "/macro",
  },
  {
    id: "micro",
    title: "Micro Perspective",
    subtitle: "Business level",
    description: "How production costs, revenue, and ROI stack up.",
    icon: TrendingUp,
    path: "/micro",
  },
  {
    id: "community",
    title: "Community Perspective",
    subtitle: "Community level",
    description: "How attention, feeling, and collective identity spread.",
    icon: Users,
    path: "/community",
  },
  {
    id: "individual",
    title: "Individual Perspective",
    subtitle: "Personal level",
    description: "How a movie changes your body, mood, mind, habits, and time.",
    icon: Heart,
    path: "/individual",
  },
];

const tickerItems = [
  { label: "Country", path: "/macro" },
  { label: "Company", path: "/micro" },
  { label: "Community", path: "/community" },
  { label: "Individual", path: "/individual" },
];

export default function HomePage() {
  const [revealed, setRevealed] = React.useState(false);

  return (
    <div className="min-h-screen dossier-bg text-white flex flex-col overflow-x-hidden pt-12">
      <NavigationBar />
      
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08)_0%,transparent_50%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-20 filter contrast-150 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col gap-24">
        {/* Hero Section */}
        <motion.div
           className="space-y-12 text-center"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
        >
          <div className="space-y-6">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.9] uppercase">
              Systems POV <br/><span className="text-white/10 outline-text">Of a Movie</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed font-mono tracking-tight uppercase">
              Sensing the hidden flows of value across Country, Company, Community, and Individual.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            <motion.div
              className="flex w-max items-center gap-12 px-10 py-5"
              animate={{ x: [0, -400] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-12 whitespace-nowrap">
                  <Link href={item.path}>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 hover:text-amber-500 transition-colors pointer-events-auto cursor-pointer">
                        {item.label}
                    </span>
                  </Link>
                  <span className="text-white/10 text-xs font-light tracking-widest">//</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {!revealed ? (
          <div className="w-full space-y-24">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="text-[11px] uppercase tracking-[0.6em] text-amber-500 font-black">Case File: Dhurandhar</div>
                <div className="text-[11px] uppercase tracking-[0.6em] text-white/10 font-black">Systemic Breakdown</div>
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                {dhurandharHomeData.posters.map((poster, idx) => (
                  <motion.div
                    key={poster.label}
                    className="group relative overflow-hidden rounded-[3rem] border border-white/5 shadow-2xl transition-all hover:border-amber-500/40"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                  >
                    <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
                      <Image 
                        src={poster.src} 
                        alt={poster.alt} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 opacity-40 group-hover:opacity-100" 
                        priority 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute bottom-10 left-10">
                         <div className="text-[11px] font-black uppercase tracking-[0.6em] text-amber-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">Access Granted</div>
                         <div className="text-2xl font-black text-white tracking-[0.2em] uppercase">{poster.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="dossier-card p-10 md:p-16 relative overflow-hidden ring-1 ring-white/5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                <TrendingUp className="h-64 w-64 text-amber-500" />
              </div>
              
              <div className="relative z-10 space-y-16">
                <div className="flex items-center gap-8">
                  <div className="h-[1px] flex-grow bg-white/5" />
                  <div className="text-[11px] uppercase tracking-[0.7em] text-amber-600 font-black">Pulse: Unified Signals</div>
                  <div className="h-[1px] flex-grow bg-white/5" />
                </div>

                <div className="grid gap-16 md:grid-cols-4">
                  {dhurandharHomeData.buzz.map((item, idx) => (
                    <motion.div 
                      key={item.label} 
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase">{item.label}</div>
                        <span className={cn(
                          "dossier-stamp text-[8px]", 
                          item.confidence === "sourced" && "border-emerald-500/20 text-emerald-400 bg-emerald-500/5", 
                          item.confidence === "estimated" && "border-amber-500/20 text-amber-400 bg-amber-500/5", 
                          item.confidence === "inferred" && "border-sky-500/20 text-sky-400 bg-sky-500/5"
                        )}>
                          {item.confidence}
                        </span>
                      </div>
                      <div className="text-5xl dossier-number text-white font-black tracking-tighter">{item.value}</div>
                      <div className="text-[11px] text-white/30 leading-relaxed font-mono uppercase tracking-[0.1em]">{item.note}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-10 pt-8 pb-12">
              <Button
                onClick={() => setRevealed(true)}
                className="group relative h-24 px-16 text-xl rounded-2xl bg-white text-black hover:bg-white/90 font-black uppercase tracking-[0.5em] shadow-[0_0_80px_rgba(255,255,255,0.05)] transition-all hover:-translate-y-2 hover:shadow-[0_0_100px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10">Select Perspective Layer</span>
                <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
              </Button>
              <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.6em] text-white/10">
                 <div className="h-px w-20 bg-white/10" />
                 Decrypting Systemic Flow
                 <div className="h-px w-20 bg-white/10" />
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            id="perspectives"
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {perspectives.map((perspective, idx) => (
              <motion.div 
                key={perspective.id} 
                className="group dossier-card p-12 flex flex-col transition-all hover:bg-white/[0.03] hover:border-amber-500/40 relative overflow-hidden"
                whileHover={{ y: -16 }}
              >
                <div className="absolute top-0 right-0 p-6 text-[40px] font-black text-white/[0.02] select-none uppercase tracking-tighter">0{idx + 1}</div>
                
                <div className="mb-12 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/5 text-white/20 ring-1 ring-white/10 transition-all group-hover:bg-amber-500 group-hover:text-black group-hover:ring-amber-500 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                  <perspective.icon className="h-12 w-12 stroke-[1.5]" />
                </div>
                
                <h3 className="mb-3 text-3xl font-black tracking-tighter text-white uppercase">{perspective.title}</h3>
                <p className="mb-8 text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/80">{perspective.subtitle}</p>
                <p className="mb-14 text-base text-white/30 leading-relaxed font-mono tracking-tight">{perspective.description}</p>
                
                <Button asChild className="mt-auto h-16 w-full rounded-xl bg-white text-black font-black uppercase tracking-[0.4em] text-xs transition-all hover:bg-amber-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <Link href={perspective.path}>
                    Initialize Layer
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}