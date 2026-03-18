"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Users,
  Heart,
  Globe,
  MapPin,
  Languages,
  Eye,
  Clock,
  DollarSign,
  Zap,
  Building,
  Home,
  MessageCircle,
  Star,
  TrendingUp,
  Play,
  Film,
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

export default function CommunityPage() {
  const [laborHours, setLaborHours] = useState([50000]);
  const [wagePool, setWagePool] = useState([200]);

  const [rumorsHours, setRumorsHours] = useState([100000]);
  const [announcementHours, setAnnouncementHours] = useState([500000]);
  const [teaserHours, setTeaserHours] = useState([2000000]);
  const [releaseHours, setReleaseHours] = useState([10000000]);
  const [reviewsHours, setReviewsHours] = useState([3000000]);

  const [globalReach, setGlobalReach] = useState([50]);
  const [nationalIdentity, setNationalIdentity] = useState([80]);
  const [stateIdentity, setStateIdentity] = useState([60]);
  const [languageIdentity, setLanguageIdentity] = useState([70]);

  const totalAudienceHours = rumorsHours[0] + announcementHours[0] + teaserHours[0] + releaseHours[0] + reviewsHours[0];
  const attentionMultiplier = laborHours[0] > 0 ? (totalAudienceHours / laborHours[0]) : 0;

  const averageHourlyWage = laborHours[0] > 0 ? (wagePool[0] * 10000000) / laborHours[0] : 0; // Convert Cr to rupees

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <NavigationBar currentPage="community" />

      <div className="pt-20 px-4 py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm uppercase tracking-[0.3em] text-amber-600 font-semibold">Community Impact</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Beyond Business: Collective Identity & Cultural Value</h1>
            <p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
              Movies don't just make money - they shape who we are as communities, nations, and global citizens. The real value lies in the attention economy and cultural identity formation.
            </p>
          </motion.div>

        {/* Labor vs Attention Asymmetry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Eye className="h-8 w-8 text-amber-600" />
                The Attention Asymmetry: Paid Labor vs. Unpaid Audience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                For every hour of paid creative work, how many hours of unpaid audience attention does a movie generate?
                This shows the massive gap between what creators are compensated for versus the cultural impact they create.
              </p>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Labor Side */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-amber-800 flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Paid Labor Investment
                  </h3>

                  <motion.div
                    className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-gray-900">Total Labor Hours</span>
                    </div>
                    <Slider
                      value={laborHours}
                      onValueChange={setLaborHours}
                      max={200000}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="text-2xl font-bold text-gray-900">{laborHours[0].toLocaleString()} hours</div>
                    <p className="text-sm text-gray-600">Cast, crew, writers, directors, producers</p>
                  </motion.div>

                  <motion.div
                    className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-gray-900">Total Wage Pool</span>
                    </div>
                    <Slider
                      value={wagePool}
                      onValueChange={setWagePool}
                      max={500}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                    <div className="text-2xl font-bold text-gray-900">₹{wagePool[0]} Cr</div>
                    <p className="text-sm text-gray-600">All salaries and compensation paid</p>
                  </motion.div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 mb-1">Average Hourly Wage</div>
                      <div className="text-2xl font-bold text-gray-900">₹{Math.round(averageHourlyWage)}</div>
                      <p className="text-sm text-gray-600">Per labor hour compensated</p>
                    </div>
                  </div>
                </div>

                {/* Attention Side */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Eye className="h-6 w-6" />
                    Unpaid Audience Attention
                  </h3>

                  <motion.div
                    className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-gray-900">Rumors & Buzz</span>
                    </div>
                    <Slider
                      value={rumorsHours}
                      onValueChange={setRumorsHours}
                      max={500000}
                      min={50000}
                      step={25000}
                      className="w-full"
                    />
                    <div className="text-2xl font-bold text-gray-900">{rumorsHours[0].toLocaleString()} hours</div>
                    <p className="text-sm text-gray-600">Pre-announcement discussions</p>
                  </motion.div>

                  <motion.div
                    className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-gray-900">Announcement & Hype</span>
                    </div>
                    <Slider
                      value={announcementHours}
                      onValueChange={setAnnouncementHours}
                      max={2000000}
                      min={100000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="text-2xl font-bold text-gray-900">{announcementHours[0].toLocaleString()} hours</div>
                    <p className="text-sm text-gray-600">Cast reveals, first looks</p>
                  </motion.div>

                  <motion.div
                    className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-gray-900">Teasers & Trailers</span>
                    </div>
                    <Slider
                      value={teaserHours}
                      onValueChange={setTeaserHours}
                      max={10000000}
                      min={500000}
                      step={250000}
                      className="w-full"
                    />
                    <div className="text-2xl font-bold text-gray-900">{teaserHours[0].toLocaleString()} hours</div>
                    <p className="text-sm text-gray-600">Trailer views, social media buzz</p>
                  </motion.div>

                  <motion.div
                    className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <Film className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-gray-900">Release & Consumption</span>
                    </div>
                    <Slider
                      value={releaseHours}
                      onValueChange={setReleaseHours}
                      max={50000000}
                      min={1000000}
                      step={1000000}
                      className="w-full"
                    />
                    <div className="text-2xl font-bold text-gray-900">{releaseHours[0].toLocaleString()} hours</div>
                    <p className="text-sm text-gray-600">Actual movie watching time</p>
                  </motion.div>

                  <motion.div
                    className="space-y-4 p-4 rounded-xl bg-white border border-gray-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-amber-600" />
                      <span className="font-semibold text-gray-900">Reviews & UGC</span>
                    </div>
                    <Slider
                      value={reviewsHours}
                      onValueChange={setReviewsHours}
                      max={10000000}
                      min={500000}
                      step={250000}
                      className="w-full"
                    />
                    <div className="text-2xl font-bold text-gray-900">{reviewsHours[0].toLocaleString()} hours</div>
                    <p className="text-sm text-gray-600">Critiques, fan discussions, memes</p>
                  </motion.div>
                </div>
              </div>

              {/* Attention Multiplier */}
              <motion.div
                className="mt-8 p-8 rounded-2xl bg-amber-600 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold mb-4">Civilizational Signal Multiplier</div>
                <div className="text-6xl font-bold mb-4">{attentionMultiplier.toFixed(1)}×</div>
                <p className="text-lg opacity-90">
                  For every 1 hour of paid labor, this movie generates {attentionMultiplier.toFixed(1)} hours of audience attention
                </p>
                <p className="text-sm opacity-75 mt-2">
                  This attention creates cultural value, community bonds, and collective identity far beyond monetary compensation
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Collective Identity Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="h-8 w-8 text-orange-600" />
                Collective Identity Formation: Beyond Individual Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Movies don't just employ skilled workers - they shape how communities see themselves and each other.
                They create shared experiences that build collective identity at multiple levels.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  className="space-y-4 p-6 rounded-xl bg-gray-50 border-2 border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-800">Global Identity</h3>
                  </div>
                  <Slider
                    value={globalReach}
                    onValueChange={setGlobalReach}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full mb-4"
                  />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{globalReach[0]}%</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    How much does this movie contribute to global cultural conversations?
                    International festivals, diaspora connections, universal themes that transcend borders.
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-6 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Building className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900">National Identity</h3>
                  </div>
                  <Slider
                    value={nationalIdentity}
                    onValueChange={setNationalIdentity}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full mb-4"
                  />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{nationalIdentity[0]}%</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Does this movie strengthen national pride and cultural representation?
                    National symbols, historical narratives, shared values that unite citizens.
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-6 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900">State/Regional Identity</h3>
                  </div>
                  <Slider
                    value={stateIdentity}
                    onValueChange={setStateIdentity}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full mb-4"
                  />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stateIdentity[0]}%</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    How does this movie represent specific states, cities, or regions?
                    Local dialects, regional culture, community stories that build sub-national identity.
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-6 rounded-xl bg-white border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Languages className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900">Language-Based Identity</h3>
                  </div>
                  <Slider
                    value={languageIdentity}
                    onValueChange={setLanguageIdentity}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full mb-4"
                  />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{languageIdentity[0]}%</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Does this movie preserve or evolve linguistic heritage?
                    Language preservation, dialect representation, multilingual narratives that connect language communities.
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-orange-500 text-white"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-4">Collective Identity Score</div>
                  <div className="text-4xl font-bold mb-4">
                    {Math.round((globalReach[0] + nationalIdentity[0] + stateIdentity[0] + languageIdentity[0]) / 4)}%
                  </div>
                  <p className="opacity-90">
                    Average contribution to collective identity across all levels.
                    High scores indicate movies that strengthen communal bonds and cultural continuity.
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Communal Value Creation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-2 border-gray-200 bg-gray-50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Users className="h-8 w-8 text-gray-600" />
                Communal Value Creation: The Social Multiplier Effect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Beyond individual consumption, movies create communal value through shared experiences,
                conversations, and cultural reference points that strengthen community bonds.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <motion.div
                  className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Social Conversations</h3>
                  <p className="text-sm text-gray-600">
                    Movies spark discussions in families, workplaces, and social groups,
                    creating shared cultural experiences and strengthening relationships.
                  </p>
                </motion.div>

                <motion.div
                  className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Cultural Reference Points</h3>
                  <p className="text-sm text-gray-600">
                    Iconic scenes, dialogues, and characters become part of collective memory,
                    providing common ground for future generations.
                  </p>
                </motion.div>

                <motion.div
                  className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Community Building</h3>
                  <p className="text-sm text-gray-600">
                    Fan communities, festivals, and shared viewing experiences create
                    lasting social connections and collective identities.
                  </p>
                </motion.div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-orange-500 text-white">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-4">The True Value Equation</div>
                  <div className="text-lg mb-4">
                    Business Value + Cultural Value + Social Value = Total Societal Impact
                  </div>
                  <p className="opacity-90">
                    While business metrics focus on revenue and costs, the real societal value includes
                    the communal bonds, shared identities, and cultural continuity that movies create.
                    These intangible benefits often exceed the measurable economic impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cultural Signal Amplification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-2 border-gray-200 bg-gray-50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Zap className="h-8 w-8 text-gray-600" />
                Cultural Signal Amplification: From Individual to Collective
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                A movie starts as an individual creative act but becomes a powerful cultural signal amplified
                through audience attention. This creates feedback loops that shape collective behavior and values.
              </p>

              <div className="relative">
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg">
                      🎬
                    </div>
                    <div className="text-sm font-semibold text-gray-700">Individual Creation</div>
                    <div className="text-xs text-gray-500">Director's vision, writer's story</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-lg">
                      👥
                    </div>
                    <div className="text-sm font-semibold text-gray-700">Team Production</div>
                    <div className="text-xs text-gray-500">Cast, crew collaboration</div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-lg">
                      📢
                    </div>
                    <div className="text-sm font-semibold text-gray-700">Marketing</div>
                    <div className="text-xs text-gray-500">Building anticipation</div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-sm mb-2 shadow-lg">
                      🎭
                    </div>
                    <div className="text-sm font-semibold text-gray-700">Theatrical Release</div>
                    <div className="text-xs text-gray-500">Shared experience</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs mb-2 shadow-lg">
                      💬
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Word of Mouth</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-xs mb-2 shadow-lg">
                      📱
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Social Media</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs mb-2 shadow-lg">
                      📰
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Media Coverage</div>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-xs mb-2 shadow-lg">
                      🎉
                    </div>
                    <div className="text-xs font-semibold text-gray-700">Cultural Events</div>
                  </div>
                </div>

                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xl mb-4 shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌍
                  </motion.div>
                  <div className="text-lg font-bold text-gray-800 mb-2">Collective Cultural Impact</div>
                  <div className="text-sm text-gray-600 max-w-md mx-auto">
                    The individual creative act becomes a cultural phenomenon that shapes collective identity,
                    influences social norms, and creates shared reference points for entire communities.
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-orange-500 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl font-bold mb-4">The Amplification Effect</div>
                <div className="text-lg mb-4">
                  1 Creative Act × {attentionMultiplier.toFixed(0)} Attention Hours × Community Multipliers = Cultural Movement
                </div>
                <p className="opacity-90">
                  Movies are not just entertainment products - they are cultural catalysts that amplify individual
                  creativity into collective identity formation and social change.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
}