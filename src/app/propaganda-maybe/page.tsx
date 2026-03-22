"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HelpCircle, ArrowLeft, Instagram } from "lucide-react";
import { InstagramEmbed, SocialScripts } from "@/components/SocialEmbeds";

const nuancedVoices = [
  {
    platform: "Instagram",
    icon: Instagram,
    user: "cinematic_philosophy",
    content: "The film isn't just one thing. It's a mirror of our current political climate, and yet, it's also a technical masterpiece. We have to look at both.",
    color: "text-pink-500"
  }
];

const instaUrls = [
  "https://www.instagram.com/p/DWITMrFjvWD/"
];

export default function PropagandaMaybePage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8 md:p-16 flex flex-col items-center">
      <SocialScripts />
      <div className="w-full max-w-6xl space-y-8 sm:space-y-12">
        <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors gap-2 uppercase text-[10px] sm:text-xs tracking-widest font-bold">
          <ArrowLeft className="h-4 w-4" /> Back to Interrogation
        </Link>

        <header className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <HelpCircle className="h-10 w-10 sm:h-12 sm:l-12 text-sky-500" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase text-sky-500">MAYBE</h1>
          </div>
          <p className="text-lg sm:text-xl text-sky-200/60 max-w-2xl leading-relaxed italic">
            "The truth is rarely pure and never simple."
          </p>
        </header>

        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Nuance */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4">A Nuanced Reality</h2>
            <div className="p-6 sm:p-8 border border-sky-500/30 rounded-[1.5rem] sm:rounded-[2rem] bg-sky-950/10 space-y-4 sm:space-y-6">
               <p className="text-base sm:text-lg text-white/80 leading-relaxed font-serif">
                Is it possible for a film to be <span className="text-red-400 font-bold">systemic intervention</span> and <span className="text-emerald-400 font-bold">artistic soul</span> at the exact same time?
               </p>
               <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                The "Maybe" perspective acknowledges that the impact of a movie cannot be reduced to a binary. It's an economy of attention, emotion, and capital.
               </p>
            </div>

            {nuancedVoices.map((voice, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-sky-950/5 border border-white/5 p-6 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                    <voice.icon className={`h-4 w-4 ${voice.color}`} />
                    <span className="font-bold text-xs tracking-tight">{voice.user}</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed italic">"{voice.content}"</p>
              </motion.div>
            ))}
          </div>

          {/* Column 2 & 3: Embeds */}
          <div className="md:col-span-1 lg:col-span-2 space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4">Exploring the In-Between (Live)</h2>
            <div className="grid gap-6">
               {instaUrls.map((url, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2 max-w-md"
                >
                  <InstagramEmbed url={url} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center">
          <p className="text-sm text-white/40 mb-6 uppercase tracking-widest text-sky-400/60 font-black decoration-sky-500/30">
            Interrogation Complete. Access the Systems Ledger.
          </p>
          <Link href="/systems-pov" className="inline-flex items-center gap-4 bg-amber-500 text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-amber-400 transition-all hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.4)]">
            Open the Systems Home <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
