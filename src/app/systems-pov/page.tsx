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
    <motion.div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="text-red-600 bg-red-50 hover:bg-red-100 font-black tracking-widest uppercase text-[10px] border-red-200 px-4">
              Interrogate
            </Button>
          </Link>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            {perspectivesNav.map((p) => (
              <Link key={p.id} href={p.path}>
                <Button variant="ghost" size="sm" className="text-[11px] font-black tracking-widest uppercase px-4 py-2 text-gray-400 hover:text-gray-900 transition-colors">
                  {p.name}
                </Button>
              </Link>
            ))}
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
    <div className="min-h-screen bg-white text-black flex flex-col overflow-x-hidden pt-12">
      <NavigationBar />
      
      {/* Background pattern - subtle */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)`,
          backgroundSize: '400px 400px'
        }} />
      </div>

      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 pt-24 pb-24 relative z-10 flex flex-col gap-16">
        {/* Hero Section */}
        <motion.div
           className="space-y-8 text-center"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]">
              A systems POV <br/><span className="text-gray-400">of a Movie</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Every cinematic choice triggers a cascade of value across the country, company, and your own body.
            </p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-full border border-gray-100 bg-gray-50/50 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.02)]">
            <motion.div
              className="flex w-max items-center gap-10 px-8 py-4"
              animate={{ x: [0, -400] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-10 whitespace-nowrap">
                  <Link href={item.path}>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-amber-600 transition-colors pointer-events-auto cursor-pointer">
                        {item.label}
                    </span>
                  </Link>
                  <span className="text-gray-200 text-xs font-light tracking-widest">/</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {!revealed ? (
          <div className="w-full space-y-16">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="text-[10px] uppercase tracking-[0.4em] text-amber-600 font-black">Case Study: Dhurandhar</div>
                <div className="text-[10px] uppercase tracking-[0.4em] text-gray-300 font-black">Visual Ledger Entry</div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {dhurandharHomeData.posters.map((poster, idx) => (
                  <motion.div
                    key={poster.label}
                    className="group overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.01] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                  >
                    <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                      <Image 
                        src={poster.src} 
                        alt={poster.alt} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                        priority 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="rounded-[2.5rem] bg-gray-900 p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp className="h-32 w-32" />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-grow bg-white/10" />
                  <div className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-black">Global Buzz Counter</div>
                  <div className="h-px flex-grow bg-white/10" />
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                  {dhurandharHomeData.buzz.map((item, idx) => (
                    <motion.div 
                      key={item.label} 
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black text-white/30 tracking-widest uppercase">{item.label}</div>
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-widest", 
                          item.confidence === "sourced" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", 
                          item.confidence === "estimated" && "bg-amber-500/10 text-amber-400 border border-amber-500/20", 
                          item.confidence === "inferred" && "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                        )}>
                          {item.confidence}
                        </span>
                      </div>
                      <div className="text-3xl font-black">{item.value}</div>
                      <div className="text-[11px] text-white/40 leading-relaxed max-w-[140px] font-medium">{item.note}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-6 pt-8">
              <Button
                onClick={() => setRevealed(true)}
                className="group relative h-20 px-12 text-lg rounded-full bg-amber-500 hover:bg-amber-600 text-white font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(245,158,11,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(245,158,11,0.4)] overflow-hidden"
              >
                <span className="relative z-10">Explore Perspectives</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
              </Button>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Choose your lens of impact</p>
            </div>
          </div>
        ) : (
          <motion.div
            id="perspectives"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {perspectives.map((perspective, idx) => (
              <motion.div 
                key={perspective.id} 
                className="group relative h-full flex flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 transition-all hover:border-amber-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
                whileHover={{ y: -8 }}
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                  <perspective.icon className="h-8 w-8" />
                </div>
                
                <h3 className="mb-2 text-2xl font-black tracking-tight text-gray-900">{perspective.title}</h3>
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-amber-600/60">{perspective.subtitle}</p>
                <p className="mb-8 text-base text-gray-500 leading-relaxed font-medium">{perspective.description}</p>
                
                <Button asChild className="mt-auto h-12 w-full rounded-2xl bg-gray-900 px-6 font-black uppercase tracking-widest text-white transition-all hover:bg-amber-500 hover:shadow-lg">
                  <Link href={perspective.path}>
                    Enter Lens
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