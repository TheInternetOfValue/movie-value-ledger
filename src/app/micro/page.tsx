"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Calendar,
  Film,
  Music,
  Users,
  Building,
  Globe,
  Play,
  Tv,
  Radio,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const perspectives = [
  { id: "macro", name: "Macro", path: "/macro" },
  { id: "micro", name: "Micro", path: "/micro" },
  { id: "community", name: "Community", path: "/community" },
  { id: "individual", name: "Individual", path: "/individual" }
];

function NavigationBar({ currentPage }: { currentPage: string }) {
  const currentIndex = perspectives.findIndex(p => p.id === currentPage);
  const prevPage = currentIndex > 0 ? perspectives[currentIndex - 1] : null;
  const nextPage = currentIndex < perspectives.length - 1 ? perspectives[currentIndex + 1] : null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              {perspectives.map((perspective, index) => (
                <Link key={perspective.id} href={perspective.path}>
                  <Button
                    variant={perspective.id === currentPage ? "default" : "ghost"}
                    size="sm"
                    className={`text-xs px-3 py-1 ${
                      perspective.id === currentPage
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {perspective.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {prevPage && (
              <Link href={prevPage.path}>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {prevPage.name}
                </Button>
              </Link>
            )}
            {nextPage && (
              <Link href={nextPage.path}>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                  {nextPage.name}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MicroPage() {
  const [actorCosts, setActorCosts] = useState([150]);
  const [directorCosts, setDirectorCosts] = useState([50]);
  const [musicCosts, setMusicCosts] = useState([30]);
  const [belowLineCosts, setBelowLineCosts] = useState([80]);
  const [pandACosts, setPandACosts] = useState([200]);
  const [financingCosts, setFinancingCosts] = useState([40]);

  const [indiaTheatrical, setIndiaTheatrical] = useState([300]);
  const [overseasRevenue, setOverseasRevenue] = useState([150]);
  const [ottRevenue, setOttRevenue] = useState([200]);
  const [satelliteRevenue, setSatelliteRevenue] = useState([100]);
  const [musicRevenue, setMusicRevenue] = useState([50]);
  const [otherRevenue, setOtherRevenue] = useState([30]);

  const totalCosts = actorCosts[0] + directorCosts[0] + musicCosts[0] + belowLineCosts[0] + pandACosts[0] + financingCosts[0];
  const totalRevenue = indiaTheatrical[0] + overseasRevenue[0] + ottRevenue[0] + satelliteRevenue[0] + musicRevenue[0] + otherRevenue[0];
  const profit = totalRevenue - totalCosts;
  const roi = totalCosts > 0 ? ((profit / totalCosts) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <NavigationBar currentPage="micro" />

      <div className="pt-20 px-4 py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm uppercase tracking-[0.3em] text-amber-600 font-semibold">Micro Business Analysis</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Movie as Business Investment</h1>
            <p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
              The high-stakes gamble of movie production: massive upfront costs versus uncertain future revenues across multiple platforms and markets.
            </p>
          </motion.div>

        {/* Cost Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <TrendingDown className="h-8 w-8 text-gray-600" />
                Cost Stack: The Investment Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Movie production is a capital-intensive business. Every major film requires significant upfront investment
                across creative talent, production infrastructure, and marketing before any revenue is generated.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Actors & Cast</span>
                  </div>
                  <Slider
                    value={actorCosts}
                    onValueChange={setActorCosts}
                    max={300}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{actorCosts[0]} Cr</div>
                  <p className="text-sm text-gray-600">Lead actors, supporting cast</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Film className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Director & Creative</span>
                  </div>
                  <Slider
                    value={directorCosts}
                    onValueChange={setDirectorCosts}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{directorCosts[0]} Cr</div>
                  <p className="text-sm text-gray-600">Director, writers, producers</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Music & Sound</span>
                  </div>
                  <Slider
                    value={musicCosts}
                    onValueChange={setMusicCosts}
                    max={60}
                    min={0}
                    step={2}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{musicCosts[0]} Cr</div>
                  <p className="text-sm text-gray-600">Composers, singers, mixing</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Below-the-Line</span>
                  </div>
                  <Slider
                    value={belowLineCosts}
                    onValueChange={setBelowLineCosts}
                    max={150}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{belowLineCosts[0]} Cr</div>
                  <p className="text-sm text-gray-600">Crew, equipment, locations</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">P&A (Print & Advertising)</span>
                  </div>
                  <Slider
                    value={pandACosts}
                    onValueChange={setPandACosts}
                    max={400}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-700">₹{pandACosts[0]} Cr</div>
                  <p className="text-sm text-gray-600">Marketing, distribution, promotion</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-slate-600" />
                    <span className="font-semibold text-slate-800">Financing & Interest</span>
                  </div>
                  <Slider
                    value={financingCosts}
                    onValueChange={setFinancingCosts}
                    max={80}
                    min={0}
                    step={2}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-slate-700">₹{financingCosts[0]} Cr</div>
                  <p className="text-sm text-slate-600">Bank loans, interest payments</p>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-amber-600 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold mb-2">Total Investment Required</div>
                <div className="text-5xl font-bold">₹{totalCosts} Cr</div>
                <p className="mt-2 opacity-90">All costs must be covered before any revenue is earned</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <TrendingUp className="h-8 w-8 text-gray-600" />
                Revenue Stack: Multiple Revenue Streams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Successful movies generate revenue across multiple platforms and geographies over many years.
                Each revenue stream has different timelines, risks, and profit margins.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Film className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">India Theatrical</span>
                  </div>
                  <Slider
                    value={indiaTheatrical}
                    onValueChange={setIndiaTheatrical}
                    max={600}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{indiaTheatrical[0]} Cr</div>
                  <p className="text-sm text-gray-600">Box office, first 4-6 weeks</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Overseas Markets</span>
                  </div>
                  <Slider
                    value={overseasRevenue}
                    onValueChange={setOverseasRevenue}
                    max={400}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{overseasRevenue[0]} Cr</div>
                  <p className="text-sm text-gray-600">International box office, diaspora</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">OTT Platforms</span>
                  </div>
                  <Slider
                    value={ottRevenue}
                    onValueChange={setOttRevenue}
                    max={300}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{ottRevenue[0]} Cr</div>
                  <p className="text-sm text-gray-600">Netflix, Amazon, Disney+, 2-3 years</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Tv className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Satellite & TV</span>
                  </div>
                  <Slider
                    value={satelliteRevenue}
                    onValueChange={setSatelliteRevenue}
                    max={200}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{satelliteRevenue[0]} Cr</div>
                  <p className="text-sm text-gray-600">Cable TV, DTH, long-term licensing</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Music & Audio</span>
                  </div>
                  <Slider
                    value={musicRevenue}
                    onValueChange={setMusicRevenue}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-gray-900">₹{musicRevenue[0]} Cr</div>
                  <p className="text-sm text-gray-600">Digital downloads, streaming, concerts</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Radio className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-slate-800">Other Revenue</span>
                  </div>
                  <Slider
                    value={otherRevenue}
                    onValueChange={setOtherRevenue}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-slate-700">₹{otherRevenue[0]} Cr</div>
                  <p className="text-sm text-slate-600">Merchandise, games, books</p>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-amber-600 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold mb-2">Total Revenue Potential</div>
                <div className="text-5xl font-bold">₹{totalRevenue} Cr</div>
                <p className="mt-2 opacity-90">Revenue across all platforms and time periods</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profit Analysis & Risk */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Profit Calculation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border border-gray-200 bg-white shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <DollarSign className="h-8 w-8 text-amber-600" />
                  Profit Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">Total Costs</span>
                    <span className="text-2xl font-bold text-gray-700">₹{totalCosts} Cr</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">Total Revenue</span>
                    <span className="text-2xl font-bold text-gray-700">₹{totalRevenue} Cr</span>
                  </div>
                  <div className={`flex justify-between items-center p-6 rounded-lg border ${
                    profit >= 0
                      ? "bg-gray-50 border-gray-200"
                      : "bg-gray-50 border-gray-200"
                  }`}>
                    <span className="text-xl font-bold">Net Profit</span>
                    <span className={`text-3xl font-bold ${
                      profit >= 0 ? "text-gray-700" : "text-gray-700"
                    }`}>
                      {profit >= 0 ? "+" : ""}₹{profit} Cr
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-lg font-semibold text-gray-800">ROI</span>
                    <span className="text-2xl font-bold text-gray-700">{roi.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${
                    profit >= 0 ? "text-gray-600" : "text-gray-600"
                  }`}>
                    {profit >= 0 ? "💰 PROFITABLE" : "⚠️ LOSS"}
                  </div>
                  <p className="text-gray-600">
                    {profit >= 0
                      ? "This movie investment generates positive returns"
                      : "This movie investment results in a financial loss"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Risk Exposure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border border-gray-200 bg-white shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                  Risk Exposure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <motion.div
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="h-5 w-5 text-gray-600" />
                      <span className="font-bold text-gray-800">Box Office Failure</span>
                    </div>
                    <p className="text-sm text-gray-700">70% of movies lose money. Poor opening weekend can doom a film.</p>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-amber-50 rounded-lg border-2 border-amber-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span className="font-bold text-gray-800">Timing Risk</span>
                    </div>
                    <p className="text-sm text-gray-700">Competition from other releases, festivals, or external events.</p>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="h-5 w-5 text-amber-600" />
                      <span className="font-bold text-gray-900">Market Risk</span>
                    </div>
                    <p className="text-sm text-gray-600">Cultural differences, censorship, or changing audience preferences.</p>
                  </motion.div>

                  <motion.div
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                      <span className="font-bold text-gray-900">Technology Risk</span>
                    </div>
                    <p className="text-sm text-gray-600">Streaming platforms changing terms, piracy, or new entertainment formats.</p>
                  </motion.div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 mb-2">Success Rate</div>
                    <div className="text-3xl font-bold text-gray-700">~15%</div>
                    <p className="text-sm text-gray-600 mt-1">Only 15% of movies break even or make profit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Cash Flow Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="border-2 border-gray-200 bg-gray-50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calendar className="h-8 w-8 text-gray-600" />
                Cash Flow Timeline: The Long Road to Profit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Movie investments have extremely long payback periods. Money goes out first, revenue comes in slowly over years across different platforms.
              </p>

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold mb-2">Pre</div>
                    <div className="text-sm font-semibold">Pre-Production</div>
                    <div className="text-xs text-gray-600">6-12 months</div>
                    <div className="text-lg font-bold text-gray-600 mt-1">-₹{Math.round(totalCosts * 0.3)} Cr</div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold mb-2">Prod</div>
                    <div className="text-sm font-semibold">Production</div>
                    <div className="text-xs text-gray-600">2-6 months</div>
                    <div className="text-lg font-bold text-amber-600 mt-1">-₹{Math.round(totalCosts * 0.4)} Cr</div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold mb-2">Post</div>
                    <div className="text-sm font-semibold">Post-Production</div>
                    <div className="text-xs text-gray-600">3-6 months</div>
                    <div className="text-lg font-bold text-gray-600 mt-1">-₹{Math.round(totalCosts * 0.2)} Cr</div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold mb-2">P&A</div>
                    <div className="text-sm font-semibold">P&A Release</div>
                    <div className="text-xs text-gray-600">1-3 months</div>
                    <div className="text-lg font-bold text-amber-600 mt-1">-₹{Math.round(totalCosts * 0.1)} Cr</div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold mb-2">After</div>
                    <div className="text-sm font-semibold">Aftermarket</div>
                    <div className="text-xs text-gray-600">Years</div>
                    <div className="text-lg font-bold text-gray-600 mt-1">+₹{Math.round(totalRevenue * 0.8)} Cr</div>
                  </div>
                </div>

                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gray-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>Investment Phase (18-27 months)</span>
                  <span>Return Phase (Years 2-5+)</span>
                </div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-amber-600 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl font-bold mb-2">Cash Flow Reality</div>
                <div className="text-lg mb-2">Break-even typically takes 2-3 years</div>
                <p className="opacity-90">Most movies operate at a loss for their first 24-36 months before turning profitable</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
}