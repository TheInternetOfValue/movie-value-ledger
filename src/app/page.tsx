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
    subtitle: "National Economic Impact",
    description: "How movies contribute to GDP, employment, and cultural exports. See the big picture of cinema as an economic engine.",
    icon: Landmark,
  },
  {
    id: "micro",
    title: "Micro Perspective",
    subtitle: "Business Investment Analysis",
    description: "Break down production costs, revenue streams, and ROI. Understand the financial mechanics of filmmaking as a business.",
    icon: TrendingUp,
  },
  {
    id: "community",
    title: "Community Perspective",
    subtitle: "Labor vs Attention Asymmetry",
    description: "Explore the human cost of creation versus audience consumption. Examine collective identity and cultural impact.",
    icon: Users,
  },
  {
    id: "individual",
    title: "Individual Perspective",
    subtitle: "Personal Value Assessment",
    description: "Audit your personal investment in movie experiences. Calculate if entertainment truly adds value to your finite time and money.",
    icon: Heart,
  },
];

export default function HomePage() {
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
              through four interconnected perspectives: economic, business, social, and personal.
            </p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 text-lg"
            >
              <Link href="#perspectives">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Perspectives
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Media Buzz Counters */}
        <motion.div
          className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-amber-600 font-semibold">Buzz counters</div>
              <h2 className="text-2xl font-bold text-gray-900">Dhurandhar, Dhurandhar 2, and Dhurandhar: The Revenge</h2>
              <p className="text-gray-600 mt-2 max-w-3xl">Hook these counters to the main source thread from X to show how the conversation spreads across YouTube, tweets, reels, and other relevant mentions.</p>
            </div>
            <div className="text-sm text-gray-500">Source: Taran Adarsh post</div>
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

        {/* Perspectives Grid */}
        <motion.div
          id="perspectives"
          className="grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {perspectives.map((perspective, index) => (
            <motion.div
              key={perspective.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              <Card className="h-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4">
                      <div className="p-4 rounded-2xl bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors duration-300">
                        <perspective.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {perspective.title}
                        </h3>
                        <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                          {perspective.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">
                      {perspective.description}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button
                        asChild
                        className="w-full px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105"
                      >
                        <Link href={`/${perspective.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Explore {perspective.title}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center space-y-4 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-gray-600">
            A comprehensive framework for understanding cinema's multifaceted impact on society and individuals.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>🎯 Economic Analysis</span>
            <span>📊 Business Metrics</span>
            <span>🤝 Social Dynamics</span>
            <span>💝 Personal Value</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-xs text-gray-500 pt-2">
            <Link href="/about" className="hover:text-gray-800 transition-colors">About</Link>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="http://author.theinternetofvalue.xyz/" target="_blank" rel="noreferrer" className="hover:text-gray-800 transition-colors">MosesSamPaul J.</a>
              <a href="https://theinternetofvalue.xyz/" target="_blank" rel="noreferrer" className="hover:text-gray-800 transition-colors">The Internet of Value</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}