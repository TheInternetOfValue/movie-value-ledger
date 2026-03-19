"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Brain,
  Repeat,
  Activity,
  Sparkles,
  Copy,
  MessageCircle,
  Zap,
  Film,
  Landmark,
  Users,
  BarChart3,
  Home,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const perspectives = [
  { id: "macro", name: "Macro", path: "/macro" },
  { id: "micro", name: "Micro", path: "/micro" },
  { id: "community", name: "Community", path: "/community" },
  { id: "individual", name: "Individual", path: "/individual" },
];

function NavigationBar({ currentPage }: { currentPage: string }) {
  const currentIndex = perspectives.findIndex((p) => p.id === currentPage);
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
              {perspectives.map((perspective) => (
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
const MODEL_W_BASE = 1;
const DISPLAY_W_BASE = 1.0;
const MIN_W = 0.4;
const MAX_W = 1.0;

type LedgerState = {
  salary: number;
  money: { ticket: number; snacks: number; travel: number; parking: number };
  time: { pre: number; commute: number; movie: number; post: number; discussion: number };
  physiology: { calm: number; movement: number };
  emotions: { joy: number; safety: number; connection: number };
  thoughts: { perspective: number; inspiration: number };
  habits: { awareness: number; choice: number };
};

type VisualBatteryState = {
  level: number;
};

const initialState: LedgerState = {
  salary: 40000,
  money: { ticket: 180, snacks: 150, travel: 120, parking: 60 },
  time: { pre: 35, commute: 45, movie: 170, post: 40, discussion: 20 },
  physiology: { calm: 0, movement: 0 },
  emotions: { joy: 0, safety: 0, connection: 0 },
  thoughts: { perspective: 0, inspiration: 0 },
  habits: { awareness: 0, choice: 0 },
};

const initialVisualBattery: VisualBatteryState = {
  level: 700,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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
  const delta = phys * 0.0015 + emo * 0.00126 + thought * 0.0015 + habit * 0.00126;
  return clamp(MODEL_W_BASE + delta, MIN_W, MAX_W);
}

function computeDerived(state: LedgerState) {
  const w = computeW(state);
  const assumedWorkHoursPerDay = 8;
  const assumedWorkDaysPerMonth = 22;
  const hoursPerMonth = assumedWorkHoursPerDay * assumedWorkDaysPerMonth;
  const baseHourly = state.salary / hoursPerMonth;
  const effectiveHourly = baseHourly * w;
  const totalMoney = Object.values(state.money).reduce((a, b) => a + b, 0);
  const totalHours = Object.values(state.time).reduce((a, b) => a + b, 0) / 60;
  const baselineVC = MODEL_W_BASE * totalHours * baseHourly;
  const actualVC = w * totalHours * effectiveHourly;
  const net = actualVC - baselineVC - totalMoney;
  return { w, baseHourly, effectiveHourly, totalMoney, totalHours, baselineVC, actualVC, net };
}

function Battery({ level }: { level: number }) {
  const visualBattery = Math.round(clamp(level, 0, 1000));
  const pct = (visualBattery / 1000) * 100;
  const color = visualBattery >= 800 ? "bg-emerald-500" : visualBattery >= 700 ? "bg-amber-600" : "bg-gray-500";
  const glow = visualBattery >= 800 ? "shadow-emerald-500/50" : visualBattery >= 700 ? "shadow-amber-600/50" : "shadow-gray-500/50";

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-900">Visual Well-being Battery</span>
        <div className="text-right">
          <div className="font-bold text-lg text-gray-900">{visualBattery}/1000</div>
          <div className="text-xs text-gray-500">story scale from 700 → 1000</div>
        </div>
      </div>
      <div className="h-6 overflow-hidden rounded-full bg-gradient-to-r from-gray-200 to-gray-300 shadow-inner border-2 border-white/50">
        <div className={`h-full ${color} transition-all duration-700 ease-out shadow-lg ${glow}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
    </div>
  );
}

function LiveWPreview({ state }: { state: LedgerState }) {
  const w = useMemo(() => computeW(state), [state]);
  const delta = (w - DISPLAY_W_BASE).toFixed(2);
  const mood = w > 1.02 ? "rising" : w < 0.98 ? "falling" : "steady";
  const layerScores = [
    { label: "Body", value: ((state.physiology.calm + state.physiology.movement) * 0.0015).toFixed(2) },
    { label: "Mood", value: ((state.emotions.joy + state.emotions.safety + state.emotions.connection) * 0.00126).toFixed(2) },
    { label: "Mind", value: ((state.thoughts.perspective + state.thoughts.inspiration) * 0.0015).toFixed(2) },
    { label: "Habits", value: ((state.habits.awareness + state.habits.choice) * 0.00126).toFixed(2) },
  ];

  return (
    <motion.div className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-slate-50 via-gray-50 to-white p-5 shadow-lg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-1">Normalized wellbeing score</div>
          <div className="text-2xl font-bold text-gray-900">{w.toFixed(2)}</div>
          <div className="text-xs text-gray-500">math value used in calculations</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-700">{mood === "rising" ? "Up" : mood === "falling" ? "Down" : "Steady"}</div>
          <div className="text-xs text-gray-500">{delta} vs neutral</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-600 leading-relaxed">
        This updates live as you move any body, mood, mind, or habit slider. The top card is the visual battery, and this card is the normalized math value. The battery opens around 700/1000 and moves up or down from there.
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {layerScores.map((layer) => (
          <div key={layer.label} className="rounded-2xl bg-white/80 border border-gray-200 px-3 py-2 shadow-sm">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{layer.label}</div>
            <div className="text-sm font-semibold text-gray-900">+{layer.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
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
          <div className="p-2 rounded-xl bg-gray-100 text-gray-700">{icon}</div>
          <span className="font-semibold text-gray-700">{label}</span>
        </div>
        <span className="font-bold text-gray-900">{Math.round(pct)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-200 shadow-inner">
        <div className={`h-full ${color} shadow-lg ${glow}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Tile({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <motion.div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm" whileHover={{ y: -4, rotate: -0.5 }} transition={{ duration: 0.2 }}>
      <div className="mb-3 text-gray-700">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </motion.div>
  );
}

function StepShell({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Next",
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>
      {children}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={onBack} disabled={!onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!onNext} className="bg-amber-600 hover:bg-amber-700 text-white">
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <StepShell title="Welcome to the Movie Game" subtitle="A playful post-movie run. Not a review. Not a rating. Just a few fun prompts to see what the film did to your body, mood, mind, and next move." onNext={onNext} nextLabel="Start the Game">
      <div className="grid gap-4 md:grid-cols-2">
        <Tile title="Physiology" text="Did the film hit your body — ringing ears, restless legs, breathing shifts, cravings, or the need to move?" icon={<Activity className="h-6 w-6" />} />
        <Tile title="Emotion + Feeling" text="What emotional weather did the movie leave behind — calm, heavy, hyped, unsettled, or moved?" icon={<Heart className="h-6 w-6" />} />
        <Tile title="Thought" text="Did the film change an opinion, crack a mental model, or shift how you see an issue?" icon={<Brain className="h-6 w-6" />} />
        <Tile title="Habits" text="Did it change what you wanted to do next — post, talk, rewatch, snack, or go straight home?" icon={<Repeat className="h-6 w-6" />} />
      </div>
    </StepShell>
  );
}

function PhysiologyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  return (
    <StepShell title="Body Check" subtitle="Let’s see what the film did to your body — ears, eyes, breathing, restlessness, cravings, and movement." onBack={onBack} onNext={onNext}>
      <Card><CardContent className="p-6 space-y-6">
        <StatBar label="Calm" value={state.physiology.calm} icon={<Sparkles className="h-4 w-4" />} />
        <StatBar label="Movement" value={state.physiology.movement} icon={<Activity className="h-4 w-4" />} />
        <Slider value={[state.physiology.calm]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, physiology: { ...state.physiology, calm: v } })} />
        <Slider value={[state.physiology.movement]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, physiology: { ...state.physiology, movement: v } })} />
      </CardContent></Card>
    </StepShell>
  );
}

function EmotionScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  return (
    <StepShell title="Mood Check" subtitle="What emotional weather did this movie leave behind? Keep it simple: calm, moved, unsettled, fired up, heavy, or hopeful." onBack={onBack} onNext={onNext}>
      <Card><CardContent className="p-6 space-y-6">
        <StatBar label="Joy" value={state.emotions.joy} icon={<Heart className="h-4 w-4" />} />
        <StatBar label="Safety" value={state.emotions.safety} icon={<Sparkles className="h-4 w-4" />} />
        <StatBar label="Connection" value={state.emotions.connection} icon={<Users className="h-4 w-4" />} />
        <Slider value={[state.emotions.joy]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, emotions: { ...state.emotions, joy: v } })} />
        <Slider value={[state.emotions.safety]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, emotions: { ...state.emotions, safety: v } })} />
        <Slider value={[state.emotions.connection]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, emotions: { ...state.emotions, connection: v } })} />
      </CardContent></Card>
    </StepShell>
  );
}

function ThoughtsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  return (
    <StepShell title="Mind Check" subtitle="Did the film change what you think, what you trust, or how you see a bigger issue?" onBack={onBack} onNext={onNext}>
      <Card><CardContent className="p-6 space-y-6">
        <StatBar label="Perspective" value={state.thoughts.perspective} icon={<Brain className="h-4 w-4" />} />
        <StatBar label="Inspiration" value={state.thoughts.inspiration} icon={<Zap className="h-4 w-4" />} />
        <Slider value={[state.thoughts.perspective]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, thoughts: { ...state.thoughts, perspective: v } })} />
        <Slider value={[state.thoughts.inspiration]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, thoughts: { ...state.thoughts, inspiration: v } })} />
      </CardContent></Card>
    </StepShell>
  );
}

function HabitsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  return (
    <StepShell title="Next Move" subtitle="Did the movie change what you wanted to do next — post, talk, snack, rewatch, or just sit with it?" onBack={onBack} onNext={onNext}>
      <Card><CardContent className="p-6 space-y-6">
        <StatBar label="Awareness" value={state.habits.awareness} icon={<Eye className="h-4 w-4" />} />
        <StatBar label="Choice" value={state.habits.choice} icon={<CheckCircle2 className="h-4 w-4" />} />
        <Slider value={[state.habits.awareness]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, habits: { ...state.habits, awareness: v } })} />
        <Slider value={[state.habits.choice]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, habits: { ...state.habits, choice: v } })} />
      </CardContent></Card>
    </StepShell>
  );
}

function TimeMoneyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  return (
    <StepShell title="Time + Money Run" subtitle="Let’s count the real spend — minutes, rupees, and the hidden cost of your attention." onBack={onBack} onNext={onNext}>
      <Card><CardContent className="p-6 space-y-6">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-4"><Label>Monthly Salary</Label><div className="text-2xl font-bold text-gray-900">₹{state.salary.toLocaleString()}</div></div>
          <div className="rounded-2xl bg-gray-50 p-4"><Label>Workday Assumption</Label><div className="text-2xl font-bold text-gray-900">8 hours/day</div></div>
        </div>
        <div className="space-y-3 rounded-2xl bg-white/80 border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between"><Label className="text-sm text-gray-600">Adjust Salary</Label><div className="text-sm font-semibold text-gray-700">₹{state.salary.toLocaleString()}</div></div>
          <Slider value={[state.salary]} min={10000} max={200000} step={5000} onValueChange={([value]) => setState({ ...state, salary: value })} />
        </div>
        <div className="text-center"><div className="text-lg font-semibold text-gray-700">Hourly Rate: ₹{Math.round(state.salary / (8 * 22))}</div><div className="text-xs text-gray-500 mt-1">assumes 8 hours/day × 22 working days/month</div></div>
      </CardContent></Card>
    </StepShell>
  );
}

function getFaceMood(state: LedgerState) {
  const w = computeW(state);
  const emotionalLift = state.emotions.joy + state.emotions.safety + state.emotions.connection;
  const mentalLift = state.thoughts.perspective + state.thoughts.inspiration;
  const bodyLoad = state.physiology.calm + state.physiology.movement;
  const habitLift = state.habits.awareness + state.habits.choice;
  const score = (w - 1) * 120 + (emotionalLift + mentalLift + habitLift) / 6 - bodyLoad / 8;

  if (score > 8) return "upbeat";
  if (score < -6) return "worn";
  return "steady";
}

function FaceAvatar({ state }: { state: LedgerState }) {
  const mood = getFaceMood(state);
  const face =
    mood === "upbeat"
      ? { eyes: "◕‿◕", mouth: "⌣", tint: "from-amber-100/90 to-white/80", sweat: false, grin: true }
      : mood === "worn"
        ? { eyes: "-_-", mouth: "﹏", tint: "from-gray-200/90 to-white/80", sweat: true, grin: false }
        : { eyes: "•‿•", mouth: "▁", tint: "from-gray-100/90 to-white/80", sweat: false, grin: false };

  return (
    <div className={`rounded-3xl border border-gray-200 bg-gradient-to-br ${face.tint} p-4 shadow-inner`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Avatar Mood</div>
          <div className="flex items-center gap-4">
            <div className="relative text-5xl leading-none">
              <motion.div
                animate={{ opacity: [1, 1, 0.15, 1, 1], y: [0, 0, 0.5, 0, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, repeatDelay: mood === "worn" ? 1.2 : 2.4, ease: "easeInOut" }}
              >
                {face.eyes}
              </motion.div>
              {face.sweat && (
                <motion.div
                  className="absolute -right-2 -top-2 text-sm"
                  animate={{ y: [0, -2, 0], opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  💧
                </motion.div>
              )}
            </div>
            <motion.div
              className="text-4xl leading-none"
              animate={face.grin ? { scale: [1, 1.08, 1] } : { scale: [1, 1, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {face.mouth}
            </motion.div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-700">
            {mood === "upbeat" ? "Charged" : mood === "worn" ? "Worn out" : "Steady"}
          </div>
          <div className="text-xs text-gray-500">from your current run</div>
        </div>
      </div>
    </div>
  );
}

function FinalScreen({ state, onBack, onReset }: { state: LedgerState; onBack: () => void; onReset: () => void }) {
  const d = computeDerived(state);
  const positive = d.net >= 0;
  const filmName = "Dhurandhar";
  const title = positive ? "YOU WON" : "YOU SURVIVED";
  const subtitle = positive
    ? "Victory unlocked. The movie gave more than it took."
    : "Defeat screen. The movie drained more than it paid back.";
  const verdictTone = positive ? "from-emerald-500 to-amber-500" : "from-gray-700 to-gray-900";
  const posterBattery = positive ? 910 : 560;
  const posterFaceMood = positive ? "◕‿◕" : "-_-";
  const posterMouth = positive ? "⌣" : "﹏";
  const shareText = `${filmName} | ${positive ? "I WON" : "I SURVIVED"}\nW: 1.0 → ${d.w}\nBattery: ${posterBattery}/1000\nNet impact: ${positive ? "+" : ""}${formatInrCompact(d.net)}\n${positive ? "Victory screen." : "Defeat screen."}\n\n#${filmName} #MovieLedger`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const xShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;

  return (
    <div className="space-y-6">
      <motion.div
        className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl ${positive ? "border-emerald-200 bg-gradient-to-br from-emerald-500 via-amber-400 to-white" : "border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"}`}
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.15),transparent_28%)]" />
        <div className="relative grid gap-6 xl:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-4 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white" />
              {positive ? "Victory Screen" : "Defeat Screen"}
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">{filmName}</div>
              <h2 className="mt-2 text-5xl font-black leading-none md:text-7xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">{subtitle}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">Battery</div>
                <div className="mt-1 text-2xl font-bold">{posterBattery}/1000</div>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">W Score</div>
                <div className="mt-1 text-2xl font-bold">1.0 → {d.w}</div>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/70">Result</div>
                <div className="mt-1 text-2xl font-bold">{positive ? "+" : ""}{formatInrCompact(d.net)}</div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-white/20 bg-white/18 p-6 backdrop-blur-md shadow-inner">
              <div className="flex items-center justify-between text-white/80 text-xs uppercase tracking-[0.3em]">
                <span>Hero Card</span>
                <span>{positive ? "Win" : "Lose"}</span>
              </div>
              <div className="mt-4 rounded-[1.5rem] border border-white/20 bg-black/20 p-5 text-center text-white shadow-lg">
                <div className="text-6xl leading-none">{posterFaceMood}</div>
                <div className="text-5xl leading-none mt-2">{posterMouth}</div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-bold uppercase tracking-[0.2em]">
                  <div className="rounded-2xl bg-white/15 px-3 py-2">{d.totalHours.toFixed(1)}h</div>
                  <div className="rounded-2xl bg-white/15 px-3 py-2">{positive ? "boost" : "drain"}</div>
                  <div className="rounded-2xl bg-white/15 px-3 py-2">{positive ? "+" : ""}{formatInrCompact(d.net)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl">
          <div className="text-sm font-semibold text-gray-700 mb-2">Baseline Value</div>
          <div className="text-3xl font-bold text-gray-900">{formatInrCompact(d.baselineVC)}</div>
          <div className="text-xs text-gray-600 mt-2">1.0 × time × base hourly</div>
        </div>
        <div className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl">
          <div className="text-sm font-semibold text-gray-700 mb-2">Power Meter</div>
          <div className="text-2xl font-bold text-gray-900">1.0 → {d.w}</div>
          <div className="text-xs text-gray-600 mt-2">Wellbeing shift</div>
        </div>
        <div className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl">
          <div className="text-sm font-semibold text-gray-700 mb-2">Verdict</div>
          <div className="text-2xl font-bold text-gray-900">{positive ? "Blockbuster Energy ✨" : "Plot Twist Drain ⚠️"}</div>
          <div className="text-xs text-gray-600 mt-2">Share this result</div>
        </div>
        <div className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-xl">
          <div className="text-sm font-semibold text-gray-700 mb-2">Net Game Result</div>
          <div className="text-6xl font-bold text-gray-900">{positive ? "+" : ""}{formatInrCompact(d.net)}</div>
          <div className="text-xs text-gray-600 mt-2">True cost calculation</div>
        </div>
      </div>

      <div className={`rounded-[2rem] border p-6 shadow-2xl ${positive ? "border-emerald-200 bg-white" : "border-gray-300 bg-white"}`}>
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] ${positive ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-700"}`}>
          {positive ? "Victory Unlocked" : "Defeat Ledger"}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-gray-700 leading-relaxed">
          <div>
            <div className="font-semibold text-gray-800 mb-2">Score → Power</div>
            <div>Your answers across body, mood, mind, and next-move questions create a wellbeing score (W). The neutral baseline is 1.0, and higher W means more power for the rest of your day.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800 mb-2">Time = Trade</div>
            <div>Every minute has a cost. Your salary and work hours give the number a real-world shape, but the movie can still add or drain value from the rest of your day.</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:?subject=${encodeURIComponent(positive ? "Victory Screen" : "Defeat Screen")}&body=${encodeURIComponent(shareText)}`}><Button>Copy to email</Button></a>
          <a href={xShareUrl} target="_blank" rel="noreferrer"><Button variant="outline">Share on X</Button></a>
          <a href={whatsappShareUrl} target="_blank" rel="noreferrer"><Button variant="outline">Share on WhatsApp</Button></a>
          <Button variant="outline" onClick={onBack}>Adjust score</Button>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={onReset}>Play again</Button>
        </div>
      </div>
    </div>
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
      <LiveWPreview state={state} />

      <motion.div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">Journey</span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">{step + 1} of {stepLabels.length}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-200 shadow-inner">
          <motion.div className="h-full bg-orange-500 shadow-lg" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {stepLabels.map((label, idx) => (
            <motion.div key={label} className="flex flex-col items-center gap-1.5" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: idx * 0.1 + 0.3 }}>
              <motion.div className={`flex h-10 w-10 items-center justify-center rounded-2xl border-2 px-2 text-sm font-bold transition-all duration-300 shadow-lg ${idx < step ? "border-gray-500 bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-gray-500/50" : idx === step ? "border-orange-500 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-500/50 animate-pulse" : "border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 shadow-gray-200/50"}`}>{idx + 1}</motion.div>
              <span className={`text-[10px] text-center leading-tight max-w-[64px] ${idx === step ? "text-orange-600 font-semibold" : "text-gray-500"}`}>{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 0 && <IntroScreen key="intro" onNext={() => setStep(1)} />}
        {step === 1 && <PhysiologyScreen key="phys" state={state} setState={setState} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
        {step === 2 && <EmotionScreen key="emo" state={state} setState={setState} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <ThoughtsScreen key="thought" state={state} setState={setState} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && <HabitsScreen key="habits" state={state} setState={setState} onBack={() => setStep(3)} onNext={() => setStep(5)} />}
        {step === 5 && <TimeMoneyScreen key="time" state={state} setState={setState} onBack={() => setStep(4)} onNext={() => setStep(6)} />}
        {step === 6 && <FinalScreen key="final" state={state} onBack={() => setStep(5)} onReset={() => { setState(initialState); setStep(0); }} />}
      </AnimatePresence>
    </div>
  );
}

function AvatarInsane({ state }: { state: LedgerState }) {
  const w = computeW(state);
  const performance = clamp((w / MODEL_W_BASE) * 50 + 25, 0, 100);

  return (
    <motion.div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <div className="mb-2 text-xs uppercase tracking-[0.3em] text-orange-600 font-semibold">Player One</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">The Individual Ledger</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">A playful post-movie run. Not a review. Not a rating. Just a few fun prompts to see what the film did to your body, mood, mind, and next move.</p>
        </div>
        <div className="flex-1 max-w-md space-y-4">
          <Battery level={initialVisualBattery.level} />
          <FaceAvatar state={state} />
        </div>
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-gray-500">Performance</div>
          <div className="text-4xl font-bold text-gray-900">{Math.round(performance)}%</div>
          <div className="text-xs text-gray-500 mt-1">internal signal</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function IndividualPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <NavigationBar currentPage="individual" />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <StepManager />
        </div>
      </main>
    </div>
  );
}