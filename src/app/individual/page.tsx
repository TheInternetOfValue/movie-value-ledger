"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Brain,
  Repeat,
  Activity,
  Sparkles,
  Zap,
  Film,
  Home,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  Play,
  Star,
  Bolt,
  BadgeInfo,
  Theater,
  Camera,
  Share2,
  Copy,
  ArrowUpRight,
  MoonStar,
  Flame,
  Shield,
  Globe,
  Building,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const perspectives = [
  { id: "macro", name: "Macro", path: "/macro" },
  { id: "micro", name: "Micro", path: "/micro" },
  { id: "community", name: "Community", path: "/community" },
  { id: "individual", name: "Individual", path: "/individual" },
  { id: "faq", name: "FAQ", path: "/faq" },
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
  performance: { learningOutput: number; earningOutput: number; skillApplication: number; communityContext: number };
};

type VisualBatteryState = {
  level: number;
};

const initialState: LedgerState = {
  salary: 40000,
  money: { ticket: 180, snacks: 150, travel: 120, parking: 60 },
  time: { pre: 35, commute: 45, movie: 170, post: 40, discussion: 20 },
  physiology: { calm: 50, movement: 50 },
  emotions: { joy: 50, safety: 50, connection: 50 },
  thoughts: { perspective: 50, inspiration: 50 },
  habits: { awareness: 50, choice: 50 },
  performance: { learningOutput: 50, earningOutput: 50, skillApplication: 50, communityContext: 50 },
};

const initialVisualBattery: VisualBatteryState = {
  level: 700,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toSigned(value: number) {
  return value - 50;
}

function toScore(value: number) {
  return clamp(Math.round(50 + value), 0, 100);
}

function SliderLane({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      {children}
    </div>
  );
}

function CenteredSliderLane({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
      {children}
    </div>
  );
}

function computeBattery(state: LedgerState): number {
  const phys = toSigned(state.physiology.calm) * 1.8 + toSigned(state.physiology.movement) * 1.2;
  const emotion = toSigned(state.emotions.joy) * 1.5 + toSigned(state.emotions.safety) * 1.1 + toSigned(state.emotions.connection) * 1.2;
  const thought = toSigned(state.thoughts.perspective) * 1.3 + toSigned(state.thoughts.inspiration) * 1.4;
  const habit = toSigned(state.habits.awareness) * 1.2 + toSigned(state.habits.choice) * 1.35;
  const performance = toSigned(state.performance.learningOutput) * 1.55 + toSigned(state.performance.earningOutput) * 1.45 + toSigned(state.performance.skillApplication) * 1.6 + toSigned(state.performance.communityContext) * 1.2;
  
  // LOGIC FIX 1: Marginal Utility Multiplier (Econ Fix)
  // If baseline is low, positive inputs have higher impact (Relief Effect)
  // If baseline is high, negative inputs have higher impact (Drain Effect)
  const currentBase = 700;
  let multiplier = 1.0;
  if (currentBase < 400) multiplier = 1.4; // Relief effect for low wellbeing
  if (currentBase > 850) multiplier = 1.2; // Diminishing returns/high stakes
  
  const raw = 700 + (phys + emotion + thought + habit + performance) * multiplier;
  return clamp(Math.round(raw), 0, 1000);
}

function batteryMood(delta: number) {
  if (delta > 5) return "charging";
  if (delta < -5) return "draining";
  return "steady";
}

function formatInrCompact(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

function computeW(state: LedgerState) {
  const battery = computeBattery(state);
  return clamp(battery / 1000, 0, 1);
}

function computeDerived(state: LedgerState) {
  const w = computeW(state);
  const assumedWorkHoursPerDay = 8;
  const assumedWorkDaysPerMonth = 22;
  const hoursPerMonth = assumedWorkHoursPerDay * assumedWorkDaysPerMonth;
  const baseHourly = state.salary / hoursPerMonth;
  const totalMoney = Object.values(state.money).reduce((a, b) => a + b, 0);
  const totalHours = Object.values(state.time).reduce((a, b) => a + b, 0) / 60;
  const baselineW = 0.7;
  const baselineValue = totalHours * baseHourly * baselineW;
  const actualValue = totalHours * baseHourly * w;
  const wellbeingDeltaValue = actualValue - baselineValue;
  const netValue = wellbeingDeltaValue - totalMoney;
  return {
    baseHourly,
    totalMoney,
    totalHours,
    w,
    baselineValue,
    actualValue,
    wellbeingDeltaValue,
    netValue,
  };
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function formatNetValue(value: number) {
  const rounded = Math.ceil(Math.abs(value));
  return `${value >= 0 ? "+" : "-"}₹${rounded.toLocaleString("en-IN")}`;
}

function Battery({ level }: { level: number }) {
  const visualBattery = Math.round(clamp(level, 0, 1000));
  const pct = (visualBattery / 1000) * 100;
  const color = visualBattery >= 800 ? "bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-300" : visualBattery >= 700 ? "bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" : "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600";
  const glow = visualBattery >= 800 ? "shadow-emerald-500/30" : visualBattery >= 700 ? "shadow-amber-500/30" : "shadow-slate-500/30";

  return (
    <div className="relative rounded-[1.5rem] border border-white/10 bg-white/8 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold text-white/90">Well-being Battery</span>
        <div className="text-right">
          <div className="font-black text-xl text-white">{visualBattery}/1000</div>
          <div className="text-[11px] text-white/65">story meter, starts near 700</div>
        </div>
      </div>
      <div className="h-5 overflow-hidden rounded-full bg-black/30 shadow-inner ring-1 ring-white/10">
        <div className={`h-full ${color} transition-all duration-700 ease-out shadow-lg ${glow}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-white/55">
        <span>drained</span>
        <span>charged</span>
      </div>
    </div>
  );
}

function NodeReadout({ label, value, battery, subtitle }: { label: string; value: number; battery: number; subtitle: string }) {
  const delta = battery - 700;
  const moodClass = delta > 5 ? "text-emerald-300" : delta < -5 ? "text-rose-300" : "text-amber-200";
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white">{label}</div>
          <div className="mt-1 text-xs leading-relaxed text-white/60">{subtitle}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-black text-white">{Math.round(value)}%</div>
          <div className={`text-[10px] uppercase tracking-[0.2em] ${moodClass}`}>{batteryMood(delta)}</div>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  const pct = clamp(value, 0, 100);
  const color = pct >= 75 ? "bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400" : pct >= 50 ? "bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" : "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600";
  const glow = pct >= 75 ? "shadow-cyan-500/20" : pct >= 50 ? "shadow-amber-500/20" : "shadow-slate-400/20";

  return (
    <div className="space-y-2 rounded-[1.25rem] border border-white/10 bg-white/8 p-4 shadow-lg backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-2 text-white">{icon}</div>
          <span className="font-semibold text-white/80">{label}</span>
        </div>
        <span className="font-bold text-white">{Math.round(pct)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-black/30 shadow-inner ring-1 ring-white/10">
        <div className={`h-full ${color} shadow-lg ${glow}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Tile({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <motion.div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="mb-3 text-white/90">{icon}</div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{text}</p>
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
    <motion.div className="space-y-6 rounded-[2rem] border border-white/10 bg-[rgba(17,24,39,0.9)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl md:p-8" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/78">{subtitle}</p>
      </div>
      <div>{children}</div>
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button variant="outline" onClick={onBack} disabled={!onBack} className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
          Back
        </Button>
        <Button onClick={onNext} disabled={!onNext} className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-lg shadow-amber-500/20 hover:brightness-110">
          {nextLabel}
        </Button>
      </div>
    </motion.div>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <StepShell title="Impact at an Individual level" subtitle="You begin at a 700 / 1000 wellbeing baseline. The movie then moves your 6 wellbeing nodes, one scene at a time." onNext={onNext} nextLabel="Let’s see how the movie impacts all parameters of your wellbeing">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Tile title="Physiology" text="Body state, movement, rest, breath, tension." icon={<Activity className="h-6 w-6" />} />
        <Tile title="Emotion" text="Biochemical charge and emotional temperature." icon={<Heart className="h-6 w-6" />} />
        <Tile title="Feeling" text="The felt experience of the film in the moment." icon={<MoonStar className="h-6 w-6" />} />
        <Tile title="Thought" text="Mental model, perspective, and cognitive shift." icon={<Brain className="h-6 w-6" />} />
        <Tile title="Habit" text="Cue, routine, choice, and streak pressure." icon={<Repeat className="h-6 w-6" />} />
        <Tile title="Performance" text="Learning, earning, skill, and community value." icon={<Flame className="h-6 w-6" />} />
      </div>
    </StepShell>
  );
}

function PhysiologyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  const battery = computeBattery(state);
  return (
    <StepShell title="Physiology" subtitle="Did the movie settle your body or make it more activated? Left is draining, right is restoring." onBack={onBack} onNext={onNext}>
      <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur-xl">
        <CardContent className="space-y-6 p-5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Movement" value={state.physiology.movement} battery={battery} subtitle="movement and rest both shift the run" />
            <CenteredSliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">How did the movie impact your movement?</div>
                <Slider value={[state.physiology.movement]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, physiology: { ...state.physiology, movement: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>sat for too long</span><span>danced and enjoyed</span></div>
              </div>
            </CenteredSliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Senses" value={state.physiology.calm} battery={battery} subtitle="senses and stimulation shift the run" />
            <CenteredSliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">How did the movie impact your senses (eyes, ears, etc)?</div>
                <Slider value={[state.physiology.calm]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, physiology: { ...state.physiology, calm: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>under stimulated</span><span>over stimulated</span></div>
              </div>
            </CenteredSliderLane>
          </div>
        </CardContent>
      </Card>
    </StepShell>
  );
}

function EmotionScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  const battery = computeBattery(state);
  return (
    <StepShell title="Emotion" subtitle="Did the movie uplift you or leave you drained? This scene should be about emotional intensity and direction." onBack={onBack} onNext={onNext}>
      <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur-xl">
        <CardContent className="space-y-6 p-5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Joy" value={state.emotions.joy} battery={battery} subtitle="positive emotion charges the battery" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it felt heavier, right if it felt lighter.</div>
                <Slider value={[state.emotions.joy]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, emotions: { ...state.emotions, joy: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>heavy</span><span>light</span></div>
              </div>
            </SliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Safety" value={state.emotions.safety} battery={battery} subtitle="safety reduces drain" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it felt tense, right if it felt safe.</div>
                <Slider value={[state.emotions.safety]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, emotions: { ...state.emotions, safety: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>tense</span><span>safe</span></div>
              </div>
            </SliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Connection" value={state.emotions.connection} battery={battery} subtitle="connection increases the movie’s lift" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it isolated you, right if it connected you.</div>
                <Slider value={[state.emotions.connection]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, emotions: { ...state.emotions, connection: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>isolated</span><span>connected</span></div>
              </div>
            </SliderLane>
          </div>
        </CardContent>
      </Card>
    </StepShell>
  );
}

function ThoughtsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  const battery = computeBattery(state);
  return (
    <StepShell title="Feeling" subtitle="The felt layer of the experience. Was it heavy or light? This should move the battery both ways." onBack={onBack} onNext={onNext}>
      <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur-xl">
        <CardContent className="space-y-6 p-5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Wonder" value={state.thoughts.perspective} battery={battery} subtitle="wonder changes how the score feels" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it narrowed you, right if it expanded your view.</div>
                <Slider value={[state.thoughts.perspective]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, thoughts: { ...state.thoughts, perspective: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>narrow</span><span>expanded</span></div>
              </div>
            </SliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Peace / Equanimity" value={state.thoughts.inspiration} battery={battery} subtitle="equanimity steadies the battery" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it unsettled you, right if it re-centered you.</div>
                <Slider value={[state.thoughts.inspiration]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, thoughts: { ...state.thoughts, inspiration: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>uneasy</span><span>centered</span></div>
              </div>
            </SliderLane>
          </div>
        </CardContent>
      </Card>
    </StepShell>
  );
}

function MindScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  const battery = computeBattery(state);
  return (
    <StepShell title="Thought" subtitle="This is where mental models shift. Did the movie narrow or expand your understanding?" onBack={onBack} onNext={onNext}>
      <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur-xl">
        <CardContent className="space-y-6 p-5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Perspective" value={state.thoughts.perspective} battery={battery} subtitle="perspective shifts affect the battery too" />
            <div className="space-y-2">
              <div className="text-sm font-semibold text-white/90">Move left if it felt limiting, right if it felt clarifying.</div>
              <Slider value={[state.thoughts.perspective]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, thoughts: { ...state.thoughts, perspective: v } })} />
              <div className="flex justify-between text-[11px] text-white/45"><span>limited</span><span>clarified</span></div>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Inspiration" value={state.thoughts.inspiration} battery={battery} subtitle="inspiration should visibly charge the run" />
            <div className="space-y-2">
              <div className="text-sm font-semibold text-white/90">Move left if it unsettled you, right if it felt motivating and clear.</div>
              <Slider value={[state.thoughts.inspiration]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, thoughts: { ...state.thoughts, inspiration: v } })} />
              <div className="flex justify-between text-[11px] text-white/45"><span>stalled</span><span>motivated</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </StepShell>
  );
}

function HabitsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  const battery = computeBattery(state);
  return (
    <StepShell title="Habit" subtitle="Cue, routine, and choice. Did the movie make your next move more impulsive or more intentional?" onBack={onBack} onNext={onNext}>
      <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur-xl">
        <CardContent className="space-y-6 p-5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Awareness" value={state.habits.awareness} battery={battery} subtitle="awareness lets the battery respond" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if you stayed on autopilot, right if you became more aware.</div>
                <Slider value={[state.habits.awareness]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, habits: { ...state.habits, awareness: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>automatic</span><span>aware</span></div>
              </div>
            </SliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Choice" value={state.habits.choice} battery={battery} subtitle="choices should visibly move the score" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Did it make the next action feel different?</div>
                <Slider value={[state.habits.choice]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, habits: { ...state.habits, choice: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>automatic</span><span>chosen</span></div>
              </div>
            </SliderLane>
          </div>
        </CardContent>
      </Card>
    </StepShell>
  );
}

function TimeMoneyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  const hourlyRate = Math.round(state.salary / (8 * 22));
  const derived = computeDerived(state);
  const battery = computeBattery(state);
  return (
    <StepShell title="Time & Money Investment" subtitle="Break down your time and money spent on movie-related activities. This calculates the net value impact." onBack={onBack} onNext={onNext}>
      <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur-xl">
        <CardContent className="space-y-6 p-5 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <Label className="text-white/55">Monthly Salary</Label>
              <div className="mt-1 text-3xl font-black text-white">₹{state.salary.toLocaleString()}</div>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <Label className="text-white/55">Hourly Rate</Label>
              <div className="mt-1 text-3xl font-black text-white">₹{hourlyRate}</div>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-sm text-white/80">Adjust salary</Label>
              <div className="text-sm font-semibold text-white">₹{state.salary.toLocaleString()}</div>
            </div>
            <Slider value={[state.salary]} min={10000} max={200000} step={5000} onValueChange={([value]) => setState({ ...state, salary: value })} />
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Time Breakdown (minutes)</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Pre-release (events, hype)</Label>
                  <div className="text-sm font-semibold text-white">{state.time.pre} min</div>
                </div>
                <Slider value={[state.time.pre]} min={0} max={120} step={5} onValueChange={([v]) => setState({ ...state, time: { ...state.time, pre: v } })} />
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Scrolling (insta, reviews)</Label>
                  <div className="text-sm font-semibold text-white">{state.time.commute} min</div>
                </div>
                <Slider value={[state.time.commute]} min={0} max={120} step={5} onValueChange={([v]) => setState({ ...state, time: { ...state.time, commute: v } })} />
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Movie itself</Label>
                  <div className="text-sm font-semibold text-white">{state.time.movie} min</div>
                </div>
                <Slider value={[state.time.movie]} min={0} max={300} step={10} onValueChange={([v]) => setState({ ...state, time: { ...state.time, movie: v } })} />
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Post-movie discussion</Label>
                  <div className="text-sm font-semibold text-white">{state.time.post} min</div>
                </div>
                <Slider value={[state.time.post]} min={0} max={120} step={5} onValueChange={([v]) => setState({ ...state, time: { ...state.time, post: v } })} />
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 md:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Reviews & reflection</Label>
                  <div className="text-sm font-semibold text-white">{state.time.discussion} min</div>
                </div>
                <Slider value={[state.time.discussion]} min={0} max={120} step={5} onValueChange={([v]) => setState({ ...state, time: { ...state.time, discussion: v } })} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Money Breakdown (₹)</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Ticket</Label>
                  <div className="text-sm font-semibold text-white">₹{state.money.ticket}</div>
                </div>
                <Slider value={[state.money.ticket]} min={0} max={500} step={10} onValueChange={([v]) => setState({ ...state, money: { ...state.money, ticket: v } })} />
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Snacks</Label>
                  <div className="text-sm font-semibold text-white">₹{state.money.snacks}</div>
                </div>
                <Slider value={[state.money.snacks]} min={0} max={300} step={10} onValueChange={([v]) => setState({ ...state, money: { ...state.money, snacks: v } })} />
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Travel</Label>
                  <div className="text-sm font-semibold text-white">₹{state.money.travel}</div>
                </div>
                <Slider value={[state.money.travel]} min={0} max={200} step={10} onValueChange={([v]) => setState({ ...state, money: { ...state.money, travel: v } })} />
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-white/80">Parking</Label>
                  <div className="text-sm font-semibold text-white">₹{state.money.parking}</div>
                </div>
                <Slider value={[state.money.parking]} min={0} max={100} step={5} onValueChange={([v]) => setState({ ...state, money: { ...state.money, parking: v } })} />
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">Total Time</div>
              <div className="mt-1 text-2xl font-black text-white">{derived.totalHours.toFixed(1)}h</div>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">Total Money Spent</div>
              <div className="mt-1 text-2xl font-black text-white">₹{derived.totalMoney.toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">Wellbeing Score (W)</div>
              <div className="mt-1 text-2xl font-black text-white">{derived.w.toFixed(2)}</div>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">Baseline Value</div>
              <div className="mt-1 text-2xl font-black text-white">₹{Math.round(derived.baselineValue).toLocaleString("en-IN")}</div>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">Actual Value</div>
              <div className="mt-1 text-2xl font-black text-white">₹{Math.round(derived.actualValue).toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-white/50">Net Value Impact</div>
            <div className="mt-1 text-3xl font-black text-white">{derived.netValue >= 0 ? "+" : ""}₹{Math.round(derived.netValue).toLocaleString("en-IN")}</div>
            <div className="text-sm text-white/60 mt-2">Wellbeing delta value - money spent</div>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            <div className="flex items-center justify-between gap-3">
              <span>Wellbeing Battery</span>
              <span className="font-bold text-white">{battery}/1000</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500" style={{ width: `${battery / 10}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </StepShell>
  );
}

function PerformanceScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: React.Dispatch<React.SetStateAction<LedgerState>>; onBack: () => void; onNext: () => void; }) {
  const battery = computeBattery(state);
  return (
    <StepShell title="Performance node" subtitle="Salary and spend belong here as part of wellbeing. Did the movie create value or drain it?" onBack={onBack} onNext={onNext} nextLabel="See the final outcome">
      <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur-xl">
        <CardContent className="space-y-6 p-5 md:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Learning output" value={state.performance.learningOutput} battery={battery} subtitle="learning output should visibly power the score" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it wasted your time, right if it taught you something useful.</div>
                <Slider value={[state.performance.learningOutput]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, performance: { ...state.performance, learningOutput: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>wasted</span><span>useful</span></div>
              </div>
            </SliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Earning output" value={state.performance.earningOutput} battery={battery} subtitle="earning output lives in the same wellbeing engine" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it felt value-draining, right if it felt value-creating.</div>
                <Slider value={[state.performance.earningOutput]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, performance: { ...state.performance, earningOutput: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>draining</span><span>creating</span></div>
              </div>
            </SliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Skill application" value={state.performance.skillApplication} battery={battery} subtitle="applied skill should lift the run" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it blocked you, right if it sharpened a skill or behavior.</div>
                <Slider value={[state.performance.skillApplication]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, performance: { ...state.performance, skillApplication: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>blocked</span><span>sharpened</span></div>
              </div>
            </SliderLane>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <NodeReadout label="Community context" value={state.performance.communityContext} battery={battery} subtitle="shared context should also move the battery" />
            <SliderLane>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-white/90">Move left if it felt more isolated, right if it felt more shared.</div>
                <Slider value={[state.performance.communityContext]} min={0} max={100} step={1} onValueChange={([v]) => setState({ ...state, performance: { ...state.performance, communityContext: v } })} />
                <div className="flex justify-between text-[11px] text-white/45"><span>isolated</span><span>shared</span></div>
              </div>
            </SliderLane>
          </div>
        </CardContent>
      </Card>
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
  const face = mood === "upbeat"
    ? { eyes: "✦‿✦", mouth: "⌣", tint: "from-amber-300/35 via-white/8 to-fuchsia-300/20", aura: "from-amber-400/40 to-fuchsia-400/20", tag: "charged" }
    : mood === "worn"
      ? { eyes: "-‿-", mouth: "﹏", tint: "from-slate-500/30 via-white/8 to-slate-800/20", aura: "from-slate-400/30 to-indigo-400/20", tag: "worn out" }
      : { eyes: "•‿•", mouth: "▁", tint: "from-cyan-300/25 via-white/8 to-slate-300/20", aura: "from-cyan-400/30 to-blue-400/20", tag: "steady" };

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${face.tint} p-5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${face.aura} opacity-60 blur-3xl`} />
      <div className="relative flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/55 mb-2">Avatar mood</div>
          <div className="flex items-center gap-3">
            <div className="relative rounded-full border border-white/10 bg-black/20 px-4 py-3 text-5xl leading-none shadow-inner">
              <motion.div animate={{ y: [0, -1.5, 0], rotate: [0, 1, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
                {face.eyes}
              </motion.div>
            </div>
            <motion.div className="text-4xl leading-none" animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
              {face.mouth}
            </motion.div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-white">{face.tag}</div>
          <div className="text-xs text-white/55">from your current run</div>
        </div>
      </div>
    </div>
  );
}

function FinalScreen({ state, onBack, onReset }: { state: LedgerState; onBack: () => void; onReset: () => void }) {
  const d = computeDerived(state);
  const positive = d.netValue >= 0;
  
  // Hard-hitting, personal terms
  const title = positive ? "VICTORY" : "DEFEAT";
  const subtitle = positive 
    ? "You successfully extracted value from the experience." 
    : "The movie consumed more from you than it gave back.";

  const roundedW = round2(d.w);
  const startingBattery = 700;
  const roundedBattery = Math.round(computeBattery(state));
  const roundedNetValue = Math.ceil(Math.abs(d.netValue));
  
  // Base values (before movie) were 50
  const physiologyEnd = Math.round((state.physiology.calm + state.physiology.movement) / 2);
  const emotionEnd = Math.round((state.emotions.joy + state.emotions.safety + state.emotions.connection) / 3);
  const feelingEnd = emotionEnd; // Feeling maps to Emotion in this schema
  const thoughtEnd = Math.round((state.thoughts.perspective + state.thoughts.inspiration) / 2);
  const habitEnd = Math.round((state.habits.awareness + state.habits.choice) / 2);
  const performanceEnd = Math.round((state.performance.learningOutput + state.performance.earningOutput + state.performance.skillApplication + state.performance.communityContext) / 4);

  const shareText = `Dhurandhar | ${title}\nNet Value: ${positive ? "+" : "-"}₹${roundedNetValue.toLocaleString("en-IN")}\nWellbeing: ${startingBattery} → ${roundedBattery}\n\n#Dhurandhar #MovieLedger`;
  
  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Dhurandhar | ${title}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert("Results copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Poster Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/dhurandhar/part-1-poster.jpg" 
            alt="Dhurandhar Poster" 
            className="h-full w-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 md:p-8">
          {/* Main Title Section */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-black tracking-[0.2em] text-red-600 uppercase md:text-6xl lg:text-7xl drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              Dhurandhar&apos;s Impact
            </h1>
            <div className="mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 backdrop-blur-md">
              [ A System&apos;s POV ]
            </div>
          </div>

          {/* IMPACT TRIAD: MACRO, MICRO, COMMUNITY */}
          <div className="mb-8 grid gap-4 border-b border-white/10 pb-8 md:grid-cols-3">
            {/* MACRO */}
            <div className="group relative space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.35em] text-amber-500">
                <Globe className="h-3.5 w-3.5" /> India&apos;s Economy
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-white">₹4,772+ Cr</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">Total GDP Footprint</div>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                <div className="space-y-0.5">
                  <div className="text-[8px] uppercase tracking-tighter text-white/40">Direct Tax</div>
                  <div className="text-[11px] font-bold text-emerald-400">₹840+ Cr</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[8px] uppercase tracking-tighter text-white/40">Multiplier</div>
                  <div className="text-[11px] font-bold text-amber-400">3.2x Velocity</div>
                </div>
              </div>
            </div>

            {/* MICRO */}
            <div className="group relative space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.35em] text-blue-400">
                <Building className="h-3.5 w-3.5" /> Studio Ecosystem
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-white">₹1,988+ Cr</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">Producer Revenue</div>
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                <div className="space-y-0.5">
                  <div className="text-[8px] uppercase tracking-tighter text-white/40">Jio + B62</div>
                  <div className="text-[11px] font-bold text-blue-400">Joint Victory</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[8px] uppercase tracking-tighter text-white/40">Efficiency</div>
                  <div className="text-[11px] font-bold text-emerald-400">334% ROI</div>
                </div>
              </div>
            </div>

            {/* COMMUNITY */}
            <div className="group relative space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.35em] text-purple-400">
                <Users className="h-3.5 w-3.5" /> Social Identity
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black text-white">High Impact</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">Cultural Resonance</div>
              </div>
              <div className="grid grid-cols-3 gap-1 border-t border-white/5 pt-3">
                <div className="space-y-0.5">
                  <div className="text-[8px] uppercase tracking-tighter text-white/40">Narrative</div>
                  <div className="text-[9px] font-bold text-purple-400">Compressed</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[8px] uppercase tracking-tighter text-white/40">Shared ID</div>
                  <div className="text-[9px] font-bold text-purple-400">Strong</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[8px] uppercase tracking-tighter text-white/40">Shelf-Life</div>
                  <div className="text-[9px] font-bold text-purple-400">Long</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.5em] text-amber-500 opacity-50">Individual Level</h2>
                <div className="mt-2 flex items-baseline gap-4">
                  <span className={`text-7xl font-black tracking-tighter ${positive ? 'text-white' : 'text-red-500'}`}>
                    {title}
                  </span>
                </div>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/70">{subtitle}</p>
              </div>

              {/* NODE CHARACTER STATS */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 max-w-lg">
                <NodeBattery label="Physiology" startValue={50} endValue={physiologyEnd} />
                <NodeBattery label="Emotion" startValue={50} endValue={emotionEnd} />
                <NodeBattery label="Feeling" startValue={50} endValue={feelingEnd} />
                <NodeBattery label="Thought" startValue={50} endValue={thoughtEnd} />
                <NodeBattery label="Habit" startValue={50} endValue={habitEnd} />
                <NodeBattery label="Performance" startValue={50} endValue={performanceEnd} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-3xl ring-1 ring-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Summary Ledger</div>
                  <button 
                    onClick={handleWebShare}
                    className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5 text-white/80" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Overall Wellbeing</div>
                    <div className="flex items-center gap-4">
                      <div className="text-5xl font-black text-white tabular-nums tracking-tighter">
                        {roundedBattery}
                      </div>
                      <div className="space-y-0.5">
                        <div className={`text-xs font-bold ${roundedBattery >= startingBattery ? 'text-emerald-400' : 'text-rose-500'}`}>
                          {roundedBattery >= startingBattery ? 'GAIN' : 'DRAIN'}
                        </div>
                        <div className="text-[9px] text-white/30 uppercase tracking-widest">Starts at {startingBattery}</div>
                      </div>
                    </div>
                    {/* Overall Battery Bar */}
                    <div className="mt-3 relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div 
                        className="absolute inset-y-0 left-0 bg-white/20"
                        initial={{ width: '70%' }}
                        animate={{ width: '70%' }}
                      />
                      <motion.div 
                        className={`absolute inset-y-0 h-full ${roundedBattery >= startingBattery ? 'bg-emerald-500/60' : 'bg-rose-500/60'}`}
                        initial={{ width: 0, left: `${Math.min(70, roundedBattery/10)}%` }}
                        animate={{ width: `${Math.abs(roundedBattery - startingBattery)/10}%`, left: `${Math.min(70, roundedBattery/10)}%` }}
                        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-2">Net Value Result</div>
                    <div className={`text-4xl font-black tabular-nums tracking-tighter ${positive ? 'text-emerald-400' : 'text-red-500'}`}>
                      {positive ? "+" : "-"}₹{roundedNetValue.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-6 px-4">
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="h-12 border-white/10 bg-white/5 px-6 text-white hover:bg-white/10"
            onClick={() => {
              navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
              alert("Link and results copied to clipboard!");
            }}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Results
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-white/10 bg-white/5 px-6 text-white hover:bg-white/10"
            onClick={handleWebShare}
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            className="h-12 text-white/60 hover:text-white"
            onClick={onBack}
          >
            Adjust Run
          </Button>
          <Button 
            className="h-12 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-8 font-bold text-white shadow-xl shadow-orange-500/20 hover:brightness-110" 
            onClick={onReset}
          >
            Recalculate Experience
          </Button>
        </div>
      </div>
    </div>
  );
}

function NodeBattery({ label, startValue, endValue }: { label: string; startValue: number; endValue: number }) {
  const isGain = endValue >= startValue;
  const delta = Math.abs(endValue - startValue);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{label}</span>
        <div className="flex items-center gap-1.5 tabular-nums">
          <span className="text-[10px] text-white/30">{startValue}</span>
          <span className="text-[10px] text-white/20">→</span>
          <span className={`text-[12px] font-bold ${isGain ? 'text-emerald-400' : 'text-rose-500'}`}>
            {endValue}
          </span>
        </div>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-white/20"
          initial={{ width: `${startValue}%` }}
          animate={{ width: `${startValue}%` }}
        />
        <motion.div 
          className={`absolute inset-y-0 h-full ${isGain ? 'bg-emerald-500/60' : 'bg-rose-500/60'}`}
          initial={{ width: 0, left: `${Math.min(startValue, endValue)}%` }}
          animate={{ width: `${delta}%`, left: `${Math.min(startValue, endValue)}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function StepManager() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<LedgerState>(initialState);
  const derived = useMemo(() => computeDerived(state), [state]);
  const liveBattery = computeBattery(state);

  return (
    <div className="space-y-8">
      {step !== 8 && <HeroPanel state={state} battery={liveBattery} />}

      <AnimatePresence mode="wait">
        {step === 0 && <IntroScreen key="intro" onNext={() => setStep(1)} />}
        {step === 1 && <PhysiologyScreen key="phys" state={state} setState={setState} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
        {step === 2 && <EmotionScreen key="emo" state={state} setState={setState} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <ThoughtsScreen key="feeling" state={state} setState={setState} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && <MindScreen key="thought" state={state} setState={setState} onBack={() => setStep(3)} onNext={() => setStep(5)} />}
        {step === 5 && <HabitsScreen key="habits" state={state} setState={setState} onBack={() => setStep(4)} onNext={() => setStep(6)} />}
        {step === 6 && <TimeMoneyScreen key="performance-time" state={state} setState={setState} onBack={() => setStep(5)} onNext={() => setStep(7)} />}
        {step === 7 && <PerformanceScreen key="performance-node" state={state} setState={setState} onBack={() => setStep(6)} onNext={() => setStep(8)} />}
        {step === 8 && <FinalScreen key="final" state={state} onBack={() => setStep(7)} onReset={() => { setState(initialState); setStep(0); }} />}
      </AnimatePresence>
    </div>
  );
}

function HeroPanel({ state, battery }: { state: LedgerState; battery: number }) {
  return (
    <motion.div 
      className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.22),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.92))] p-6 text-white shadow-[0_35px_100px_rgba(0,0,0,0.25)] md:p-8" 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70 backdrop-blur-xl">
            <Theater className="h-3.5 w-3.5" />
            Dhurandhar Impact
          </div>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Individual Well-being</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="min-w-[240px]">
            <Battery level={battery} />
          </div>
          <div className="min-w-[240px]">
            <FaceAvatar state={state} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function IndividualPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%),linear-gradient(135deg,#020617 0%,#111827 45%,#0f172a 100%)] flex flex-col">
      <NavigationBar currentPage="individual" />
      <main className="px-4 pb-16 pt-24 md:px-6 flex-grow">
        <div className="mx-auto max-w-7xl">
          <StepManager />
        </div>
      </main>
      <Footer />
    </div>
  );
}