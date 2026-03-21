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
  { id: "macro", name: "Macro", path: "/macro" },
  { id: "micro", name: "Micro", path: "/micro" },
  { id: "community", name: "Community", path: "/community" },
  { id: "individual", name: "Individual", path: "/individual" },
  { id: "faq", name: "FAQ", path: "/faq" },
];

function NavigationBar() {
  return (
    <motion.div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Landmark className="h-4 w-4 mr-2" />Home
            </Button>
          </Link>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            {perspectivesNav.map((p) => (
              <Link key={p.id} href={p.path}>
                <Button variant="ghost" size="sm" className="text-xs px-3 py-1 text-gray-600 hover:text-gray-900">
                  {p.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500">Dhurandhar / Economics of a Movie</div>
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

const tickerItems = ["Macro", "Micro", "Community", "Individual"];

export default function HomePage() {
  const [revealed, setRevealed] = React.useState(false);

  return (
  <div className="min-h-screen bg-white text-black px-3 py-4 lg:py-6 overflow-hidden">
  <NavigationBar />
      {/* Background pattern - subtle */}
  <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)`,
          backgroundSize: '400px 400px'
        }} />
      </div>

  <div className="mx-auto w-full max-w-none space-y-6 lg:space-y-8 relative z-10 px-0 lg:px-4 xl:px-6 pt-16">
        {/* Hero Section */}
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Economics of a Movie
            </h1>
              <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Country, Company, Community, and Individual — all the ways a movie creates / destroys value.
            </p>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white/85 backdrop-blur-sm shadow-sm">
            <motion.div
              className="flex w-max items-center gap-6 px-4 py-3"
              animate={{ x: [0, -360] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                      {['Country', 'Company', 'Community', 'Individual'][index % 4]}
                  </span>
                  <span className="text-gray-300">•</span>
                </div>
              ))}
            </motion.div>
          </div>

          {!revealed ? (
            <div className="w-full space-y-3 text-left">
              <div className="text-xs lg:text-sm uppercase tracking-[0.35em] text-amber-600 font-semibold">Case Study</div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
                {dhurandharHomeData.posters.map((poster) => (
                  <motion.div
                    key={poster.label}
                    className="overflow-hidden rounded-[1.25rem] border border-gray-200 bg-white shadow-sm"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative aspect-[3/4] w-full bg-gray-100 max-h-[46vh]">
                      <Image src={poster.src} alt={poster.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="rounded-[1.25rem] border border-gray-200 bg-white p-3 shadow-sm w-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="text-xs uppercase tracking-[0.35em] text-amber-600 font-semibold">Buzz counter</div>
                </div>
                <div className="grid gap-2 md:grid-cols-4">
                  {dhurandharHomeData.buzz.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-3 min-h-[110px]">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs lg:text-sm font-semibold text-gray-700">{item.label}</div>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", item.confidence === "sourced" && "bg-emerald-50 text-emerald-700", item.confidence === "estimated" && "bg-amber-50 text-amber-700", item.confidence === "inferred" && "bg-sky-50 text-sky-700", item.confidence === "unavailable" && "bg-gray-100 text-gray-500")}>{item.confidence}</span>
                      </div>
                      <div className="mt-1 text-base lg:text-lg font-bold text-gray-900">{item.value}</div>
                      <div className="mt-1 text-xs text-gray-500">{item.note}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex justify-center">
                <Button
                  onClick={() => setRevealed(true)}
                  className="px-8 py-3 text-base rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Explore perspectives
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              id="perspectives"
              className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              {perspectives.map((perspective) => (
                <motion.div key={perspective.id} layout className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="p-4 lg:p-5 flex flex-col gap-3 h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-amber-50 text-amber-500 border border-amber-100">
                        <perspective.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900">{perspective.title}</h3>
                        <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">{perspective.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm lg:text-base text-gray-700 leading-relaxed">{perspective.description}</p>
                    <Button asChild className="mt-auto w-full px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300">
                      <Link href={`/${perspective.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        Explore {perspective.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Footer removed to keep the home story cleaner */}
      </div>
      <div className="relative z-50 mt-auto">
        <Footer />
      </div>
    </div>
  );
}