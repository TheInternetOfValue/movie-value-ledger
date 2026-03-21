"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, Heart, BarChart3, HelpCircle } from "lucide-react";

export default function PropagandaGatePage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center p-6 text-center dossier-bg">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Image 
          src="/dhurandhar/part-1-poster.jpg" 
          alt="Cinematic Background" 
          fill 
          className="object-cover opacity-30 mix-blend-screen scale-110 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/90 via-[#0c0c0c]/60 to-[#0c0c0c]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-6xl space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.8em" }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-3xl md:text-4xl font-black uppercase text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.7)]"
          >
            Dhurandhar
          </motion.div>
          
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-[11rem] font-black tracking-[calc(-0.06em)] text-white leading-[0.85] uppercase drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              PROPAGANDA?
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="h-[6px] bg-red-600 mx-auto mt-6 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.8)]" 
            />
          </div>

          <p className="text-base md:text-xl uppercase tracking-[0.5em] text-white/40 font-bold max-w-3xl mx-auto pt-8">
            The interrogation of a cinematic intervention
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Path: YES */}
          <Link href="/propaganda-yes" className="group h-full">
            <div className="h-full border border-red-500/30 bg-red-950/20 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 group-hover:bg-red-900/40 group-hover:border-red-500/60 group-hover:-translate-y-2 flex flex-col items-center text-center">
              <ShieldAlert className="h-10 w-10 text-red-500 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold mb-2 text-red-100 uppercase tracking-widest">YES</h2>
              <p className="text-sm text-red-200/50 leading-relaxed font-medium">
                "It's a calculated agenda."
              </p>
            </div>
          </Link>

          {/* Path: NO */}
          <Link href="/propaganda-no" className="group h-full">
            <div className="h-full border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 group-hover:bg-emerald-900/40 group-hover:border-emerald-500/60 group-hover:-translate-y-2 flex flex-col items-center text-center">
              <Heart className="h-10 w-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold mb-2 text-emerald-100 uppercase tracking-widest">NO</h2>
              <p className="text-sm text-emerald-200/50 leading-relaxed font-medium">
                "It's pure entertainment."
              </p>
            </div>
          </Link>

          {/* Path: MAYBE */}
          <Link href="/propaganda-maybe" className="group h-full">
            <div className="h-full border border-sky-500/30 bg-sky-950/20 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 group-hover:bg-sky-900/40 group-hover:border-sky-500/60 group-hover:-translate-y-2 flex flex-col items-center text-center">
              <HelpCircle className="h-10 w-10 text-sky-500 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-bold mb-2 text-sky-100 uppercase tracking-widest">MAYBE</h2>
              <p className="text-sm text-sky-200/50 leading-relaxed font-medium italic">
                "Nuanced reality."
              </p>
            </div>
          </Link>

          {/* Path: SYSTEMS POV */}
          <Link href="/systems-pov" className="group h-full text-left">
            <div className="h-full border border-amber-500/30 bg-amber-950/20 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 group-hover:bg-amber-900/40 group-hover:border-amber-500/60 group-hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col items-center text-center">
              <BarChart3 className="h-10 w-10 text-amber-500 mb-6 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold mb-2 text-amber-100 leading-tight uppercase tracking-tight">Systems POV</h2>
              <p className="text-sm text-amber-200/50 leading-relaxed font-medium italic">
                The objective math of impact.
              </p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="md:pt-12 mt-auto"
        >
          <div className="flex flex-col items-center justify-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-white/30 font-bold mb-8">
            <span className="opacity-50 italic">A Systems POV Explainer by</span>
            <a 
              href="https://theinternetofvalue.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-all duration-300 border-b border-white/10 hover:border-red-500/50 pb-1 pointer-events-auto"
            >
              The Internet of Value
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
