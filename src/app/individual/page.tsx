"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Brain,
  Repeat,
  Wallet,
  Clock3,
  Sparkles,
  Activity,
  Share2,
  Copy,
  MessageCircle,
  Zap,
  Film,
  Landmark,
  Users,
  BarChart3,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

const INR = "₹";
const BASE_W = 700;
const MIN_W = 400;
const MAX_W = 1000;

type LedgerState = {
  salary: number;
  hoursPerMonth: number;
  money: { ticket: number; snacks: number; travel: number; parking: number };
  time: { pre: number; commute: number; movie: number; post: number; discussion: number };
  physiology: { calm: number; movement: number };
  emotions: { joy: number; safety: number; connection: number };
  thoughts: { perspective: number; inspiration: number };
  habits: { awareness: number; choice: number };
};

const initialState: LedgerState = {
  salary: 40000,
  hoursPerMonth: 170,
  money: { ticket: 180, snacks: 150, travel: 120, parking: 60 },
  time: { pre: 35, commute: 45, movie: 170, post: 40, discussion: 20 },
  physiology: { calm: 0, movement: 0 },
  emotions: { joy: 0, safety: 0, connection: 0 },
  thoughts: { perspective: 0, inspiration: 0 },
  habits: { awareness: 0, choice: 0 },
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function formatInr(value: number): string {
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

function formatInrCompact(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

function computeW(state: LedgerState) {
  const phys = state.physiology.calm + state.physiology.movement;
  const emo = state.emotions.joy + state.emotions.safety + state.emotions.connection;
  const thought = state.thoughts.perspective + state.thoughts.inspiration;
  const habit = state.habits.awareness + state.habits.choice;
  const delta = phys * 0.5 + emo * 0.42 + thought * 0.5 + habit * 0.42;
  return clamp(Math.round(BASE_W + delta), MIN_W, MAX_W);
}

function computeDerived(state: LedgerState) {
  const w = computeW(state);
  const baseHourly = state.salary / state.hoursPerMonth;
  const effectiveHourly = baseHourly * (w / BASE_W);
  const totalMoney = Object.values(state.money).reduce((a, b) => a + b, 0);
  const totalHours = Object.values(state.time).reduce((a, b) => a + b, 0) / 60;
  const baselineVC = BASE_W * totalHours * baseHourly;
  const actualVC = w * totalHours * effectiveHourly;
  const net = actualVC - baselineVC - totalMoney;
  return { w, baseHourly, effectiveHourly, totalMoney, totalHours, baselineVC, actualVC, net };
}

function Battery({ w }: { w: number }) {
  const pct = (w / MAX_W) * 100;
  const color = w >= 800 ? "bg-gray-500" : w >= 680 ? "bg-amber-600" : "bg-gray-500";
  const glow = w >= 800 ? "shadow-gray-500/50" : w >= 680 ? "shadow-amber-600/50" : "shadow-gray-500/50";

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-900">Well-being Battery</span>
        <span className="font-bold text-lg text-gray-900">{w}/1000</span>
      </div>
      <div className="h-6 overflow-hidden rounded-full bg-gradient-to-r from-gray-200 to-gray-300 shadow-inner border-2 border-white/50">
        <div className={`h-full ${color} transition-all duration-700 ease-out shadow-lg ${glow}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
    </div>
  );
}

function StatBar({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  const pct = clamp(value, 0, 100);
  const color = pct >= 75 ? "bg-gray-500" : pct >= 50 ? "bg-amber-600" : "bg-gray-500";
  const glow = pct >= 75 ? "shadow-gray-500/30" : pct >= 50 ? "shadow-amber-600/30" : "shadow-gray-500/30";

  return (
    <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg border border-white/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-600 text-white shadow-lg">
            {icon}
          </div>
          <span className="font-semibold text-gray-800">{label}</span>
        </div>
        <span className="font-bold text-xl text-gray-900">{Math.round(pct)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200 shadow-inner border border-white/50">
        <div className={`h-full ${color} transition-all duration-700 ease-out shadow-lg ${glow}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Tile({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-3xl p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-4 mb-3">
  <div className="p-3 rounded-2xl bg-amber-100 text-amber-600 shadow-sm group-hover:shadow-md transition-shadow duration-300">
          {icon}
        </div>
        <div className="text-lg font-bold text-gray-800">{title}</div>
      </div>
      <div className="text-sm text-gray-600 leading-relaxed">{text}</div>
    </motion.div>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <motion.div
          className="text-6xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          🎬
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to Your Movie Ledger
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          This isn't a review or rating. This is a personal value audit. We'll examine whether this movie experience
          was worth your finite time and money in the context of your entire life.
        </motion.p>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Tile
          title="Physiology"
          text="How did this experience affect your body's natural rhythms and physical well-being?"
          icon={<Activity className="h-6 w-6" />}
        />
        <Tile
          title="Emotions"
          text="What emotional states did this movie evoke and how did they impact your inner balance?"
          icon={<Heart className="h-6 w-6" />}
        />
        <Tile
          title="Thoughts"
          text="Did this experience expand your perspective or inspire new ways of thinking?"
          icon={<Brain className="h-6 w-6" />}
        />
        <Tile
          title="Habits"
          text="How did this influence your daily patterns and conscious life choices?"
          icon={<Repeat className="h-6 w-6" />}
        />
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <Button
          onClick={onNext}
          className="px-8 py-4 text-lg rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Begin Your Audit
        </Button>
      </motion.div>
    </div>
  );
}

function PhysiologyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <motion.div
          className="text-5xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          🫁
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800">Physiology</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          How did this movie experience affect your body's natural state? Consider breathing, heart rate, muscle tension, and overall physical comfort.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">😌</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Calm & Relaxation</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience help you feel more relaxed, centered, or at peace?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less calm</span>
              <span className="font-bold text-gray-700">+{state.physiology.calm}</span>
              <span>More calm</span>
            </div>
            <Slider
              value={[state.physiology.calm]}
              onValueChange={([value]) => setState({ ...state, physiology: { ...state.physiology, calm: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🏃‍♂️</div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">Movement & Energy</h3>
            <p className="text-sm text-amber-700 mb-6">Did this experience make you feel more energized, motivated to move, or physically activated?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less energy</span>
              <span className="font-bold text-amber-700">+{state.physiology.movement}</span>
              <span>More energy</span>
            </div>
            <Slider
              value={[state.physiology.movement]}
              onValueChange={([value]) => setState({ ...state, physiology: { ...state.physiology, movement: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
          ← Back
        </Button>
  <Button onClick={onNext} className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
          Next →
        </Button>
      </div>
    </div>
  );
}

function EmotionScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <motion.div
          className="text-5xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          ❤️
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800">Emotions</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          What emotional states did this movie evoke? Consider joy, safety, connection, and how these feelings influenced your overall emotional well-being.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">😊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Joy & Happiness</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience bring genuine joy, laughter, or happiness?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less joy</span>
              <span className="font-bold text-gray-700">+{state.emotions.joy}</span>
              <span>More joy</span>
            </div>
            <Slider
              value={[state.emotions.joy]}
              onValueChange={([value]) => setState({ ...state, emotions: { ...state.emotions, joy: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Safety & Security</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience make you feel safe, secure, or emotionally protected?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less safe</span>
              <span className="font-bold text-gray-700">+{state.emotions.safety}</span>
              <span>More safe</span>
            </div>
            <Slider
              value={[state.emotions.safety]}
              onValueChange={([value]) => setState({ ...state, emotions: { ...state.emotions, safety: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Connection & Belonging</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience foster a sense of connection with others or the world?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less connected</span>
              <span className="font-bold text-gray-700">+{state.emotions.connection}</span>
              <span>More connected</span>
            </div>
            <Slider
              value={[state.emotions.connection]}
              onValueChange={([value]) => setState({ ...state, emotions: { ...state.emotions, connection: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
          ← Back
        </Button>
  <Button onClick={onNext} className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
          Next →
        </Button>
      </div>
    </div>
  );
}

function ThoughtsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <motion.div
          className="text-5xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          🧠
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800">Thoughts</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          How did this movie influence your thinking? Consider new perspectives, inspiration, and mental stimulation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">👁️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Perspective & Insight</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience offer new ways of seeing the world or understanding life?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less insight</span>
              <span className="font-bold text-gray-700">+{state.thoughts.perspective}</span>
              <span>More insight</span>
            </div>
            <Slider
              value={[state.thoughts.perspective]}
              onValueChange={([value]) => setState({ ...state, thoughts: { ...state.thoughts, perspective: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Inspiration & Creativity</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience spark new ideas, creativity, or motivation in your own life?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less inspired</span>
              <span className="font-bold text-gray-700">+{state.thoughts.inspiration}</span>
              <span>More inspired</span>
            </div>
            <Slider
              value={[state.thoughts.inspiration]}
              onValueChange={([value]) => setState({ ...state, thoughts: { ...state.thoughts, inspiration: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
          ← Back
        </Button>
  <Button onClick={onNext} className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
          Next →
        </Button>
      </div>
    </div>
  );
}

function HabitsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <motion.div
          className="text-5xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          🔄
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800">Habits</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          How did this experience influence your daily patterns and life choices? Consider awareness and conscious decision-making.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">👀</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Awareness & Mindfulness</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience increase your awareness of yourself, others, or the world around you?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less aware</span>
              <span className="font-bold text-gray-700">+{state.habits.awareness}</span>
              <span>More aware</span>
            </div>
            <Slider
              value={[state.habits.awareness]}
              onValueChange={([value]) => setState({ ...state, habits: { ...state.habits, awareness: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6 p-6 rounded-3xl bg-gray-50 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Choice & Agency</h3>
            <p className="text-sm text-gray-700 mb-6">Did this experience empower you to make more conscious choices in your life?</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Less choice</span>
              <span className="font-bold text-gray-700">+{state.habits.choice}</span>
              <span>More choice</span>
            </div>
            <Slider
              value={[state.habits.choice]}
              onValueChange={([value]) => setState({ ...state, habits: { ...state.habits, choice: value } })}
              max={100}
              min={-100}
              step={5}
              className="w-full"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
          ← Back
        </Button>
        <Button onClick={onNext} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
          Next →
        </Button>
      </div>
    </div>
  );
}

function TimeMoneyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  const totalTime = Object.values(state.time).reduce((a, b) => a + b, 0);
  const totalMoney = Object.values(state.money).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <motion.div
          className="text-5xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          💰
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">Time & Money</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Let's quantify the actual investment you made. Every minute and rupee has an opportunity cost.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">Time Investment (minutes)</h3>

          <div className="space-y-4">
            {Object.entries(state.time).map(([key, value], index) => (
              <motion.div
                key={key}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg border border-white/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 text-white flex items-center justify-center font-bold text-sm">
                  {key.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-semibold text-gray-800 capitalize">{key}</Label>
                  <Slider
                    value={[value]}
                    onValueChange={([newValue]) => setState({ ...state, time: { ...state.time, [key]: newValue } })}
                    max={key === 'movie' ? 300 : 120}
                    min={0}
                    step={5}
                    className="mt-2"
                  />
                </div>
                <div className="text-lg font-bold text-gray-700 w-16 text-right">{value}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-white text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-2xl font-bold">Total Time</div>
            <div className="text-4xl font-bold">{totalTime} minutes</div>
            <div className="text-sm opacity-90">({(totalTime / 60).toFixed(1)} hours)</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">Money Investment (₹)</h3>

          <div className="space-y-4">
            {Object.entries(state.money).map(([key, value], index) => (
              <motion.div
                key={key}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg border border-white/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 text-white flex items-center justify-center font-bold text-sm">
                  {key.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-semibold text-gray-800 capitalize">{key}</Label>
                  <Slider
                    value={[value]}
                    onValueChange={([newValue]) => setState({ ...state, money: { ...state.money, [key]: newValue } })}
                    max={key === 'ticket' ? 500 : 200}
                    min={0}
                    step={10}
                    className="mt-2"
                  />
                </div>
                <div className="text-lg font-bold text-gray-700 w-20 text-right">₹{value}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="p-6 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-white text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-2xl font-bold">Total Money</div>
            <div className="text-4xl font-bold">₹{totalMoney}</div>
            <div className="text-sm opacity-90">Direct cash investment</div>
          </motion.div>
        </motion.div>
      </div>

      <div className="text-center space-y-6">
        <motion.div
          className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl border-2 border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Personal Economics</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="text-center">
              <Label className="text-sm text-gray-600">Monthly Salary</Label>
              <div className="text-2xl font-bold text-gray-700">₹{state.salary.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <Label className="text-sm text-gray-600">Working Hours/Month</Label>
              <div className="text-2xl font-bold text-gray-700">{state.hoursPerMonth}</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-lg font-semibold text-gray-700">Hourly Rate: ₹{Math.round(state.salary / state.hoursPerMonth)}</div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
          ← Back
        </Button>
        <Button onClick={onNext} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
          Calculate →
        </Button>
      </div>
    </div>
  );
}

function StepShell({ title, subtitle, onBack, onNext, nextLabel = "Next", children }: { title: string; subtitle: string; onBack?: () => void; onNext?: () => void; nextLabel?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {children}

      {onBack && onNext && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200">
            ← Back
          </Button>
          <Button onClick={onNext} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            {nextLabel} →
          </Button>
        </div>
      )}
    </div>
  );
}

function FinalScreen({ state, onBack, onReset }: { state: LedgerState; onBack: () => void; onReset: () => void }) {
  const d = computeDerived(state);
  const positive = d.net >= 0;
  const filmName = "Dhurandhar";
  const shareCardTitle = positive ? "Time Well Spent" : "Life Drain";
  const shareText = `${filmName} | My Movie Ledger\nW: 700 → ${d.w}\nTime: ${d.totalHours.toFixed(2)} hrs\nNet impact: ${positive ? "+" : ""}${formatInrCompact(d.net)}\nThis movie ${positive ? "added to" : "drained"} my life-value.\n\n#${filmName} #MovieLedger`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;

  const handleCopy = async () => {
    try {
  await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
  alert("Copied share text and link.");
    } catch {
      alert("Could not copy. You can still select the text manually.");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
  await navigator.share({ title: `${filmName} Movie Ledger`, text: shareText, url: shareUrl });
      } else {
        await handleCopy();
      }
    } catch {
      // no-op
    }
  };

  return (
  <StepShell title="Final Truth" subtitle={`Here is the trade you actually made for ${filmName}.`} onBack={onBack} onNext={onReset} nextLabel="Start Over">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        {/* Value Comparison Cards */}
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Your baseline productivity value: 700 (neutral wellbeing) × time × base hourly rate from salary input. This represents what you would have earned working instead."
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">Baseline Value</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">{formatInrCompact(d.baselineVC)}</div>
            <div className="text-xs text-gray-600 mt-2">700 × time × base hourly</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Your actual productivity value: New wellbeing score (from your ratings) × time × adjusted hourly rate. Higher wellbeing = higher productivity = higher effective hourly rate."
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">Actual Value</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">{formatInrCompact(d.actualVC)}</div>
            <div className="text-xs text-gray-600 mt-2">New W × time × effective hourly</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Total money spent on this experience: ticket price + food/drinks + travel costs + parking. Entered in the Time + Money screen."
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">Cash Spent</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">{formatInr(d.totalMoney)}</div>
            <div className="text-xs text-gray-600 mt-2">Ticket + food + travel + parking</div>
          </motion.div>
        </motion.div>

        {/* Net Impact */}
        <motion.div
          className={`rounded-3xl border-2 p-8 text-center shadow-2xl ${positive ? "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100" : "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100"}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          title={`True cost/benefit calculation: (Actual productivity value) - (Baseline productivity value) - (Cash spent). Positive = experience added value to your life. Negative = experience cost you more than it gave back. Based on your wellbeing changes from ratings and time/money inputs.`}
        >
          <div className="text-lg font-semibold text-gray-700 mb-4">Net Personal Impact</div>
          <motion.div
            className={`text-6xl font-bold mb-4 ${positive ? "bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent" : "bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent"}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            {positive ? "+" : ""}{formatInrCompact(d.net)}
          </motion.div>
          <div className={`text-xl font-semibold ${positive ? "text-gray-700" : "text-gray-700"}`}>
            {positive ? "This experience added to your life-value! 🎉" : "This experience cost you life-value 💔"}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Wellbeing Score: Calculated from your ratings across Physiology (calm + movement), Emotions (joy + safety + connection), Thoughts (perspective + inspiration), and Habits (awareness + choice). 700 = neutral baseline. Higher = better wellbeing, lower = worse.`}
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">W Score</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">700 → {d.w}</div>
            <div className="text-xs text-gray-600 mt-2">Wellbeing shift</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Total time invested: Sum of all time components from Time + Money screen (preparation + commute + movie duration + post-movie time + discussions). Converted from minutes to hours.`}
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">Time Spent</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">{d.totalHours.toFixed(2)} hrs</div>
            <div className="text-xs text-gray-600 mt-2">Total title-related time</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Productivity Impact: Base hourly rate (salary ÷ monthly hours) adjusted by wellbeing. Higher wellbeing = higher productivity = higher effective hourly rate. Shows how your mental state affects work performance.`}
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">Hour Value</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">{formatInr(d.baseHourly)} → {formatInr(d.effectiveHourly)}</div>
            <div className="text-xs text-gray-600 mt-2">Performance from wellbeing</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Final Assessment: Based on net impact calculation. Positive net impact = Time Well Spent (experience added value). Negative net impact = Life Drain (experience cost more than it gave).`}
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">Verdict</div>
            <div className={`text-2xl font-bold mb-2 ${positive ? "bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent" : "bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent"}`}>
              {positive ? "Time Well Spent ✨" : "Life Drain ⚠️"}
            </div>
            <div className="text-xs text-gray-600 mt-2">Share this result</div>
          </motion.div>
        </motion.div>

        {/* Methodology Explanation */}
        <motion.div
          className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="text-lg font-bold bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent mb-4">How This Works</div>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-gray-700 leading-relaxed">
            <div>
              <div className="font-semibold text-gray-800 mb-2">Wellbeing → Productivity</div>
              <div>Your ratings across physiology, emotions, thoughts, and habits create a wellbeing score (W). This score directly affects your productivity - higher wellbeing means you work more effectively, earning more per hour.</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800 mb-2">Time = Money</div>
              <div>Every hour spent on this experience has an opportunity cost. Your salary and work hours determine your base hourly rate. The experience either enhances or diminishes your wellbeing, changing your future earning potential.</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800 mb-2">True Cost Calculation</div>
              <div>Net impact = (Productivity value with new wellbeing) - (Productivity value at baseline) - (Cash spent). This shows if the experience genuinely added value to your life or drained your life-value.</div>
            </div>
            <div>
              <div className="font-semibold text-gray-800 mb-2">Why It Matters</div>
              <div>Most experiences are evaluated by immediate enjoyment or cost. This ledger reveals the long-term impact on your wellbeing and productivity - the true measure of whether something was worth your limited time.</div>
            </div>
          </div>
        </motion.div>

        {/* Share Section */}
        <motion.div
          className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 via-gray-100 to-white p-6 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent mb-2">Share to complete the loop</div>
                <p className="text-sm text-gray-600 max-w-2xl">One-tap sharing makes the result easy to post, quote, and compare — which is what drives replays.</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="rounded-full bg-gray-100 px-3 py-1">Copy + link</span>
                <span className="rounded-full bg-gray-100 px-3 py-1">Native share</span>
                <span className="rounded-full bg-gray-100 px-3 py-1">X / WhatsApp</span>
              </div>
            </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-amber-600 font-semibold">Share card</div>
                    <div className="text-2xl font-bold text-gray-900">{filmName}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Verdict: <span className="font-semibold text-gray-900">{shareCardTitle}</span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="text-xs text-gray-500">W score</div>
                    <div className="text-2xl font-bold text-gray-900">700 → {d.w}</div>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="text-xs text-gray-500">Time</div>
                    <div className="text-2xl font-bold text-gray-900">{d.totalHours.toFixed(2)}h</div>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="text-xs text-gray-500">Impact</div>
                    <div className="text-2xl font-bold text-gray-900">{positive ? "+" : ""}{formatInrCompact(d.net)}</div>
                  </div>
                </div>
              </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="bg-white/90 p-4 rounded-2xl border border-gray-200 font-mono text-sm text-gray-700 whitespace-pre-line shadow-inner">
                {shareText}
              </div>
              <div className="space-y-3">
                <Button variant="outline" onClick={handleCopy} className="w-full px-6 py-3 rounded-2xl border-2 border-gray-500 hover:border-gray-600 hover:bg-gray-50 transition-all duration-200 font-semibold">
                  <Copy className="mr-2 h-4 w-4" />Copy text + link
                </Button>
                <Button asChild className="w-full px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  <Link href={xShareUrl} target="_blank" rel="noreferrer">
                    <Share2 className="mr-2 h-4 w-4" />Share on X
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full px-6 py-3 rounded-2xl border-2 border-gray-500 hover:border-gray-600 hover:bg-gray-50 transition-all duration-200 font-semibold">
                  <Link href={whatsappShareUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />Share on WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </StepShell>
  );
}

function StepManager() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<LedgerState>(initialState);
  const stepLabels = ["Intro", "Physiology", "Emotions", "Thoughts", "Habits", "Time + Money", "Final"];
  const progress = ((step + 1) / stepLabels.length) * 100;

  return (
    <div className="space-y-8">
      <AvatarInsane state={state} />

      {/* Progress Bar */}
      <motion.div
        className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">Your Journey</span>
          <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{step + 1} of {stepLabels.length}</span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-gray-200 shadow-inner">
          <motion.div
            className="h-full bg-orange-500 shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {stepLabels.map((label, idx) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
            >
              <motion.div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 px-3 text-sm font-bold transition-all duration-300 shadow-lg ${
                  idx < step ? "border-gray-500 bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-gray-500/50" :
                  idx === step ? "border-orange-500 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-500/50 animate-pulse" :
                  "border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 shadow-gray-200/50"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {idx < step ? "✓" : idx + 1}
              </motion.div>
              <div className={`text-xs font-semibold text-center transition-colors duration-300 ${
                idx <= step ? "text-gray-800" : "text-gray-400"
              }`}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {step === 0 && <IntroScreen onNext={() => setStep(1)} />}
          {step === 1 && <PhysiologyScreen state={state} setState={setState} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
          {step === 2 && <EmotionScreen state={state} setState={setState} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <ThoughtsScreen state={state} setState={setState} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
          {step === 4 && <HabitsScreen state={state} setState={setState} onBack={() => setStep(3)} onNext={() => setStep(5)} />}
          {step === 5 && <TimeMoneyScreen state={state} setState={setState} onBack={() => setStep(4)} onNext={() => setStep(6)} />}
          {step === 6 && <FinalScreen state={state} onBack={() => setStep(5)} onReset={() => { setState(initialState); setStep(0); }} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AvatarInsane({ state }: { state: LedgerState }) {
  const w = computeW(state);
  const performance = clamp((w / BASE_W) * 50 + 25, 0, 100);

  return (
    <motion.div
      className="flex items-center justify-center gap-8 p-6 rounded-3xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl border-2 border-white/50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="text-6xl mb-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          👤
        </motion.div>
        <div className="text-sm text-gray-600">You</div>
      </div>

      <div className="flex-1 max-w-md">
        <Battery w={w} />
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold mb-2">{Math.round(performance)}%</div>
        <div className="text-sm text-gray-600">Performance</div>
        <div className="w-24 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
            initial={{ width: 0 }}
            animate={{ width: `${performance}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function IndividualPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <NavigationBar currentPage="individual" />

      <div className="pt-20 px-4 py-8">
        <div className="mx-auto max-w-7xl space-y-8 relative z-10">
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm uppercase tracking-[0.3em] text-orange-600 font-semibold">Personal Assessment</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">The Individual Ledger</h1>
            <p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
              A personal value audit of experience. Not a review. Not a rating. Just one uncomfortable question:
              <span className="font-bold text-gray-900"> was this worth your life-time?</span>
            </p>
          </motion.div>

          <StepManager />
        </div>
      </div>
    </div>
  );
}