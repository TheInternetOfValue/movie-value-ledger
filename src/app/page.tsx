"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Film,
  Landmark,
  Users,
  BarChart3,
  Sparkles,
  ArrowRight,
  Play,
  TrendingUp,
  Heart,
} from "lucide-react";
import Link from "next/link";

const mediaCounters = [
  { label: "YouTube videos", count: "—" },
  { label: "X posts", count: "—" },
  { label: "Instagram reels", count: "—" },
  { label: "Short-form mentions", count: "—" },
];

const perspectives = [
  {
    id: "macro",
    title: "Macro Perspective",
    subtitle: "Country level",
    description: "How movies move GDP, jobs, and cultural exports.",
    icon: Landmark,
  },
  {
    id: "micro",
    title: "Micro Perspective",
    subtitle: "Business level",
    description: "How production costs, revenue, and ROI stack up.",
    icon: TrendingUp,
  },
  {
    id: "community",
    title: "Community Perspective",
    subtitle: "Community level",
    description: "How attention, feeling, and collective identity spread.",
    icon: Users,
  },
  {
    id: "individual",
    title: "Individual Perspective",
    subtitle: "Personal level",
    description: "How a movie changes your body, mood, mind, habits, and time.",
    icon: Heart,
  },
];

export default function HomePage() {
  const [title, setTitle] = React.useState("Dhurandhar");
  const [revealed, setRevealed] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-black px-4 py-12">
      {/* Background pattern - subtle */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)`,
          backgroundSize: '400px 400px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl space-y-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-8xl mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            🎬
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Movie Time Value
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Beyond reviews and ratings. A comprehensive analysis of cinema's true value
              through four connected perspectives: country, business, community, and personal.
            </p>
          </div>

          <motion.div
            className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-left space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-amber-600 font-semibold mb-2">Start here</div>
                <p className="text-sm text-gray-600">Type a movie name, then reveal the buzz counters.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Dhurandhar"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition-all focus:border-amber-400 focus:bg-white"
                />
                <Button
                  onClick={() => setRevealed(true)}
                  className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Explore perspectives
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {revealed && (
          <motion.div
            className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-amber-600 font-semibold">Buzz counters</div>
                <h2 className="text-2xl font-bold text-gray-900">{title || "Dhurandhar"}</h2>
                <p className="text-gray-600 mt-2 max-w-3xl">A quick pulse read on how the conversation spreads across YouTube, X, reels, and other mentions.</p>
              </div>
              <div className="text-sm text-gray-500">Live pulse</div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {mediaCounters.map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-sm font-semibold text-gray-600">{item.label}</div>
                  <div className="mt-2 text-3xl font-bold text-gray-900">{item.count}</div>
                  <div className="mt-1 text-xs text-gray-500">Awaiting live data feed</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <div className="text-center text-sm uppercase tracking-[0.3em] text-gray-500">Pick one view</div>
          <motion.div
            id="perspectives"
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {perspectives.map((perspective, index) => (
              <motion.div key={perspective.id} layout className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <button
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-2xl bg-amber-50 text-amber-500 border border-amber-100">
                      <perspective.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{perspective.title}</h3>
                      <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">{perspective.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-500">{openIndex === index ? "Close" : "Open"}</div>
                </button>
                {openIndex === index && (
                  <motion.div className="px-6 pb-6" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.25 }}>
                    <div className="rounded-2xl bg-gray-50 p-5 border border-gray-200 space-y-4">
                      <p className="text-gray-700 leading-relaxed">{perspective.description}</p>
                      <Button asChild className="w-full px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300">
                        <Link href={`/${perspective.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Explore {perspective.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer removed to keep the home story cleaner */}
      </div>
    </div>
  );
}