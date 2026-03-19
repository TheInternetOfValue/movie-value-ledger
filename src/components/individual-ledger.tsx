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
  Zap,
  Film,
  Landmark,
  Users,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const INR = "₹";
const BASE_W = 1.0;
const MIN_W = 0.4;
const MAX_W = 1.2;

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

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatInr(n: number) {
  return `${INR}${Math.round(n).toLocaleString("en-IN")}`;
}

function formatInrCompact(n: number) {
  const abs = Math.abs(n);
  if (abs >= 10000000) return `${n < 0 ? "-" : ""}${INR}${(abs / 10000000).toFixed(2)}Cr`;
  if (abs >= 100000) return `${n < 0 ? "-" : ""}${INR}${(abs / 100000).toFixed(2)}L`;
  return `${n < 0 ? "-" : ""}${INR}${Math.round(abs).toLocaleString("en-IN")}`;
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
  const color = w >= 800 ? "bg-gradient-to-r from-emerald-400 to-green-500" : w >= 680 ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-red-400 to-pink-500";
  const glow = w >= 800 ? "shadow-emerald-500/50" : w >= 680 ? "shadow-amber-500/50" : "shadow-red-500/50";

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Well-being Battery</span>
        <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{w}/1000</span>
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
  const color = pct >= 75 ? "bg-gradient-to-r from-emerald-400 to-green-500" : pct >= 50 ? "bg-gradient-to-r from-amber-400 to-orange-500" : "bg-gradient-to-r from-red-400 to-pink-500";
  const glow = pct >= 75 ? "shadow-emerald-500/30" : pct >= 50 ? "shadow-amber-500/30" : "shadow-red-500/30";

  return (
    <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-lg border border-white/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
            {icon}
          </div>
          <span className="font-semibold text-gray-800">{label}</span>
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{Math.round(pct)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gradient-to-r from-gray-200 to-gray-300 shadow-inner border border-white/50">
        <div className={`h-full ${color} transition-all duration-700 ease-out shadow-lg ${glow}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Tile({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-3xl p-6 bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-xl border-2 border-white/50 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {icon}
        </div>
        <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</div>
      </div>
      <div className="text-sm text-red-600 leading-relaxed">{text}</div>
    </motion.div>
  );
}

function SliderBlock({ label, left, right, value, onChange, note }: { label: string; left: string; right: string; value: number; onChange: (n: number) => void; note?: string }) {
  return (
    <motion.div
      className="rounded-3xl p-6 bg-gradient-to-br from-white via-indigo-50 to-purple-50 shadow-xl border-2 border-white/50 hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">{label}</div>
          {note && <div className="text-sm text-red-600 leading-relaxed">{note}</div>}
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tabular-nums">{Math.round(value)}</div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Slider value={[value]} min={-100} max={100} step={1} onValueChange={(v) => onChange(v[0] ?? 0)} className="z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full opacity-20 blur-sm" />
        </div>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300">{left}</span>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300">{right}</span>
        </div>
      </div>
    </motion.div>
  );
}

function MoneyBlock({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <motion.div
      className="rounded-3xl p-6 bg-gradient-to-br from-white via-emerald-50 to-green-50 shadow-xl border-2 border-white/50 hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {icon}
        </div>
        <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{label}</div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Slider value={[value]} min={0} max={2000} step={10} onValueChange={(v) => onChange(v[0] ?? 0)} className="z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 rounded-full opacity-20 blur-sm" />
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{formatInr(value)}</div>
        </div>
      </div>
    </motion.div>
  );
}

function TimeBlock({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <motion.div
      className="rounded-3xl p-6 bg-gradient-to-br from-white via-orange-50 to-red-50 shadow-xl border-2 border-white/50 hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {icon}
        </div>
        <div className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{label}</div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Slider value={[value]} min={0} max={360} step={5} onValueChange={(v) => onChange(v[0] ?? 0)} className="z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-red-200 to-pink-200 rounded-full opacity-20 blur-sm" />
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{Math.round(value)}m</div>
        </div>
      </div>
    </motion.div>
  );
}

function AvatarInsane({ state }: { state: LedgerState }) {
  const w = computeW(state);
  const body = clamp(50 + (state.physiology.calm + state.physiology.movement) / 4, 0, 100);
  const mood = clamp(50 + (state.emotions.joy + state.emotions.safety + state.emotions.connection) / 6, 0, 100);
  const mind = clamp(50 + (state.thoughts.perspective + state.thoughts.inspiration) / 4, 0, 100);
  const habit = clamp(50 + (state.habits.awareness + state.habits.choice) / 4, 0, 100);
  const performance = clamp((w / BASE_W) * 50 + 25, 0, 100);
  const face = w >= 1.08 ? "🦾" : w >= 1.03 ? "😎" : w >= 1.0 ? "🙂" : w >= 0.94 ? "😬" : "🥴";
  const aura = w >= 800 ? "from-green-200 via-white to-green-50" : w >= 680 ? "from-amber-200 via-white to-amber-50" : "from-red-200 via-white to-red-50";

  return (
    <motion.div
      className="overflow-hidden rounded-3xl shadow-2xl border-2 border-white/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`bg-gradient-to-br ${aura} p-0`}>
        <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
          <div className="border-b-2 border-white/30 p-8 lg:border-b-0 lg:border-r-2 lg:border-white/30">
            <div className="text-xs uppercase tracking-[0.25em] text-red-600 font-semibold mb-6">Avatar Mode</div>
            <motion.div
              key={w}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                className="text-[96px] leading-none mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                {face}
              </motion.div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Your Current State</div>
              <div className="mt-2 text-sm text-red-600 leading-relaxed">The movie is changing your battery in real time.</div>
            </motion.div>
            <div className="mt-8">
              <Battery w={w} />
            </div>
          </div>

          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              <StatBar label="Body" value={body} icon={<Heart className="h-4 w-4" />} />
              <StatBar label="Mood" value={mood} icon={<Sparkles className="h-4 w-4" />} />
              <StatBar label="Mind" value={mind} icon={<Brain className="h-4 w-4" />} />
              <StatBar label="Habits" value={habit} icon={<Repeat className="h-4 w-4" />} />
              <StatBar label="Performance" value={performance} icon={<Zap className="h-4 w-4" />} />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <motion.div
                className="rounded-3xl border-2 border-white/50 bg-white/90 p-6 shadow-xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">What this means</div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  Performance is not separate from your well-being. If your overall state improves, the value of your next hour improves too.
                </div>
              </motion.div>
              <motion.div
                className="rounded-3xl border-2 border-white/50 bg-white/90 p-6 shadow-xl backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">Protocol idea</div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  W changes your effective time-value. A bad experience does not just waste time. It can reduce the quality of the hours that follow.
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StepShell({ title, subtitle, children, onBack, onNext, nextLabel = "Next", showBack = true }: { title: string; subtitle: string; children: React.ReactNode; onBack?: () => void; onNext?: () => void; nextLabel?: string; showBack?: boolean }) {
  return (
    <motion.div
      className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-8 md:p-10">
        <div className="space-y-3 mb-8">
          <motion.div
            className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.div>
          <motion.div
            className="text-base text-red-600 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.div>
        </div>
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.div>
        <motion.div
          className="flex items-center justify-between pt-6 border-t-2 border-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {showBack ? (
            <Button
              variant="outline"
              onClick={onBack}
              className="px-6 py-3 rounded-2xl border-2 border-red-500 hover:border-red-600 hover:bg-red-50 transition-all duration-200 font-semibold"
            >
              Back
            </Button>
          ) : <div />}
          <Button
            onClick={onNext}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {nextLabel}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
  <StepShell title="This movie cost you more than a ticket." subtitle="You begin with a baseline well-being score of 1.0. We'll track body, mood, thinking, habits, and then the economic value of your time." onNext={onNext} nextLabel="Start" showBack={false}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Tile title="Physiology" text="Did your body settle, tense up, or come alive?" icon={<Heart className="h-4 w-4" />} />
        <Tile title="Emotions + feelings" text="Did it feel joyful, safe, connected, or the opposite?" icon={<Sparkles className="h-4 w-4" />} />
        <Tile title="Thoughts" text="Did it challenge your mind or leave nothing behind?" icon={<Brain className="h-4 w-4" />} />
        <Tile title="Habits" text="Did it nudge your choices or reinforce old patterns?" icon={<Repeat className="h-4 w-4" />} />
        <Tile title="Performance" text="Then we ask what happened to the value of your next hour." icon={<Zap className="h-4 w-4" />} />
      </div>
    </StepShell>
  );
}

function PhysiologyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="What happened in your body?" subtitle="We start with physiology because your body often knows before your opinion does." onBack={onBack} onNext={onNext}>
      <div className="space-y-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Body State Assessment
          </div>
          <div className="text-red-600">
            Rate how your body responded during the movie experience
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SliderBlock
              label="Body Tension"
              left="Calm & Settled"
              right="Tense & Restless"
              value={state.physiology.calm}
              onChange={(n) => setState({ ...state, physiology: { ...state.physiology, calm: n } })}
              note="Did your breathing and body settle, or stay tense and overstimulated?"
            />
          </motion.div>

          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SliderBlock
              label="Physical Energy"
              left="Still & Flat"
              right="Moved & Energized"
              value={state.physiology.movement}
              onChange={(n) => setState({ ...state, physiology: { ...state.physiology, movement: n } })}
              note="Did the movie physically wake you up, or were you mostly flat?"
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-200">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-emerald-800">Your body knows first - trust these instincts</span>
          </div>
        </motion.div>
      </div>
    </StepShell>
  );
}

function EmotionScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="How did it feel?" subtitle="Feelings are the names you give to what your inner chemistry felt like." onBack={onBack} onNext={onNext}>
      <div className="space-y-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Emotional Response
          </div>
          <div className="text-red-600">
            How did the movie make you feel inside?
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SliderBlock
              label="Mood & Joy"
              left="Sad & Down"
              right="Joyful & Uplifted"
              value={state.emotions.joy}
              onChange={(n) => setState({ ...state, emotions: { ...state.emotions, joy: n } })}
              note="Joy often tracks with dopamine and serotonin shifts."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SliderBlock
              label="Safety & Comfort"
              left="Fearful & Anxious"
              right="Safe & Secure"
              value={state.emotions.safety}
              onChange={(n) => setState({ ...state, emotions: { ...state.emotions, safety: n } })}
              note="Fear tends to elevate stress chemistry like cortisol and adrenaline."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SliderBlock
              label="Connection & Belonging"
              left="Isolated & Alone"
              right="Connected & Included"
              value={state.emotions.connection}
              onChange={(n) => setState({ ...state, emotions: { ...state.emotions, connection: n } })}
              note="Connection often aligns with oxytocin and social ease."
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 border-2 border-rose-200">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-rose-800">Emotions are your body's wisdom speaking</span>
          </div>
        </motion.div>
      </div>
    </StepShell>
  );
}

function ThoughtsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="Did anything shift in your mind?" subtitle="Now move from body and feeling into cognition." onBack={onBack} onNext={onNext}>
      <div className="space-y-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mental Impact
          </div>
          <div className="text-red-600">
            How did the movie challenge or expand your thinking?
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SliderBlock
              label="Perspective Change"
              left="Same Old Views"
              right="New Perspectives"
              value={state.thoughts.perspective}
              onChange={(n) => setState({ ...state, thoughts: { ...state.thoughts, perspective: n } })}
              note="Did the film challenge or change the way you think?"
            />
          </motion.div>

          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SliderBlock
              label="Creative Inspiration"
              left="Uninspired"
              right="Motivated to Create"
              value={state.thoughts.inspiration}
              onChange={(n) => setState({ ...state, thoughts: { ...state.thoughts, inspiration: n } })}
              note="Did it make you want to act, create, or rethink something?"
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-100 to-purple-100 border-2 border-violet-200">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-violet-800">Great thoughts change everything</span>
          </div>
        </motion.div>
      </div>
    </StepShell>
  );
}

function HabitsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="Will this change what you do next?" subtitle="This is where experience becomes behavior." onBack={onBack} onNext={onNext}>
      <div className="space-y-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Behavioral Impact
          </div>
          <div className="text-red-600">
            How will this experience influence your future choices?
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SliderBlock
              label="Pattern Awareness"
              left="Stuck in Old Loops"
              right="New Awareness"
              value={state.habits.awareness}
              onChange={(n) => setState({ ...state, habits: { ...state.habits, awareness: n } })}
              note="Did it pull you toward old loops, or help you notice better ones?"
            />
          </motion.div>

          <motion.div
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SliderBlock
              label="Future Movie Choices"
              left="Automatic Selection"
              right="Conscious Choice"
              value={state.habits.choice}
              onChange={(n) => setState({ ...state, habits: { ...state.habits, choice: n } })}
              note="Will you keep choosing films automatically, or more intentionally next time?"
            />
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse"></div>
            <span className="text-sm font-semibold text-amber-800">Every experience shapes who you become</span>
          </div>
        </motion.div>
      </div>
    </StepShell>
  );
}

function TimeMoneyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  const d = computeDerived(state);
  return (
    <StepShell title="Now let's look at the real cost." subtitle="You didn't just spend money. You spent life-hours, and your wellbeing changes the value of those hours." onBack={onBack} onNext={onNext} nextLabel="See final truth">
      <div className="space-y-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
            The True Cost Calculator
          </div>
          <div className="text-red-600">
            Beyond the ticket price - what did this really cost you?
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Time Value Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6 shadow-xl">
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">Your Time Value</div>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/80 border border-cyan-200">
                  <Label className="text-sm font-semibold">Monthly Income</Label>
                  <div className="text-lg font-bold text-cyan-700 mt-1">{formatInr(state.salary)} / month</div>
                  <Slider min={10000} max={1000000} step={5000} value={[state.salary]} onValueChange={(v) => setState({ ...state, salary: v[0] })} className="mt-2" />
                </div>
                <div className="p-4 rounded-2xl bg-white/80 border border-cyan-200">
                  <Label className="text-sm font-semibold">Working Hours per Month</Label>
                  <div className="text-lg font-bold text-cyan-700 mt-1">{state.hoursPerMonth} hours</div>
                  <Slider min={160} max={176} step={1} value={[state.hoursPerMonth]} onValueChange={(v) => setState({ ...state, hoursPerMonth: v[0] })} className="mt-2" />
                  <div className="text-sm text-red-600 mt-2">Base hourly = {formatInr(d.baseHourly)} / hr</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-100 border-2 border-cyan-200">
                  <div className="text-sm font-semibold text-cyan-800">Effective hourly after wellbeing = <span className="text-lg font-bold">{formatInr(d.effectiveHourly)} / hr</span></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Money Spent Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-xl">
              <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">Money Spent</div>
              <div className="space-y-4">
                {[
                  ["🎫 Ticket", state.money.ticket, "ticket"],
                  ["🍿 Snacks", state.money.snacks, "snacks"],
                  ["🚗 Travel", state.money.travel, "travel"],
                  ["🅿️ Parking", state.money.parking, "parking"],
                ].map(([label, value, key]) => (
                  <div key={key as string} className="p-4 rounded-2xl bg-white/80 border border-emerald-200">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-semibold">{label as string}</Label>
                      <div className="text-lg font-bold text-emerald-700">{formatInr(value as number)}</div>
                    </div>
                    <Slider min={0} max={2000} step={10} value={[value as number]} onValueChange={(v) => setState({ ...state, money: { ...state.money, [key as string]: v[0] } as LedgerState["money"] })} />
                  </div>
                ))}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-200">
                  <div className="text-sm font-semibold text-emerald-800">Total cash spent = <span className="text-lg font-bold">{formatInr(d.totalMoney)}</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Time Breakdown */}
        <motion.div
          className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">Time Breakdown</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["📱 Pre-movie content", state.time.pre, "pre", 180],
              ["🚶 Commute + wait", state.time.commute, "commute", 180],
              ["🎬 Movie runtime", state.time.movie, "movie", 300],
              ["💬 Post-movie content", state.time.post, "post", 180],
              ["🗣️ Discussions", state.time.discussion, "discussion", 180],
            ].map(([label, value, key, max]) => (
              <div key={key as string} className="p-4 rounded-2xl bg-white/80 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-semibold">{label as string}</Label>
                  <div className="text-lg font-bold text-purple-700">{value as number}m</div>
                </div>
                <Slider min={0} max={max as number} step={5} value={[value as number]} onValueChange={(v) => setState({ ...state, time: { ...state.time, [key as string]: v[0] } as LedgerState["time"] })} />
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-200">
              <div className="text-sm font-semibold text-purple-800">Total time = <span className="text-lg font-bold">{d.totalHours.toFixed(2)} hrs</span></div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-100 to-blue-100 border-2 border-indigo-200">
              <div className="text-sm font-semibold text-indigo-800">Base opportunity cost = <span className="text-lg font-bold">{formatInr(d.baseHourly * d.totalHours)}</span></div>
            </div>
          </div>
        </motion.div>

        {/* Wisdom Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-200 shadow-lg">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></div>
            <div className="text-left">
              <div className="font-semibold text-purple-800 mb-1">Why this matters</div>
              <div className="text-sm text-purple-700">If wellbeing rises, performance rises with it. So the same hour is no longer the same hour. Your time-value becomes stronger. If wellbeing falls, your next hours become lower-quality hours.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </StepShell>
  );
}

function FinalScreen({ state, onBack, onReset }: { state: LedgerState; onBack: () => void; onReset: () => void }) {
  const d = computeDerived(state);
  const positive = d.net >= 0;
  const shareText = `My Movie Ledger\nW: 1.0 → ${d.w}\nTime: ${d.totalHours.toFixed(2)} hrs\nNet impact: ${positive ? "+" : ""}${formatInrCompact(d.net)}\nThis movie ${positive ? "added to" : "drained"} my life-value.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("Copied share text.");
    } catch {
      alert("Could not copy. You can still select the text manually.");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Movie Ledger", text: shareText });
      } else {
        await handleCopy();
      }
    } catch {
      // no-op
    }
  };

  return (
    <StepShell title="Final Truth" subtitle="Here is the trade you actually made." onBack={onBack} onNext={onReset} nextLabel="Start Over">
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
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Your baseline productivity value: 1.0 (neutral wellbeing) × total hours spent × your base hourly rate from salary input. This represents what you would have earned working instead."
          >
            <div className="text-sm font-semibold text-blue-700 mb-2">Baseline Value</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{formatInrCompact(d.baselineVC)}</div>
            <div className="text-xs text-blue-600 mt-2">1.0 × time × base hourly</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6 shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Your actual productivity value: New wellbeing score (from your ratings) × total hours × adjusted hourly rate. Higher wellbeing = higher productivity = higher effective hourly rate."
          >
            <div className="text-sm font-semibold text-purple-700 mb-2">Actual Value</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{formatInrCompact(d.actualVC)}</div>
            <div className="text-xs text-purple-600 mt-2">New W × time × effective hourly</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
            title="Total money spent on this experience: ticket price + food/drinks + travel costs + parking. Entered in the Time + Money screen."
          >
            <div className="text-sm font-semibold text-emerald-700 mb-2">Cash Spent</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{formatInr(d.totalMoney)}</div>
            <div className="text-xs text-emerald-600 mt-2">Ticket + food + travel + parking</div>
          </motion.div>
        </motion.div>

        {/* Net Impact */}
        <motion.div
          className={`rounded-3xl border-2 p-8 text-center shadow-2xl ${positive ? "border-green-300 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" : "border-red-300 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50"}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          title={`True cost/benefit calculation: (Actual productivity value) - (Baseline productivity value) - (Cash spent). Positive = experience added value to your life. Negative = experience cost you more than it gave back. Based on your wellbeing changes from ratings and time/money inputs.`}
        >
          <div className="text-lg font-semibold text-gray-700 mb-4">Net Personal Impact</div>
          <motion.div
            className={`text-6xl font-bold mb-4 ${positive ? "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent" : "bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            {positive ? "+" : ""}{formatInrCompact(d.net)}
          </motion.div>
          <div className={`text-xl font-semibold ${positive ? "text-green-700" : "text-red-700"}`}>
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
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Wellbeing Score: Calculated from your ratings across Physiology (calm + movement), Emotions (joy + safety + connection), Thoughts (perspective + inspiration), and Habits (awareness + choice). 1.0 = neutral baseline. Higher = better wellbeing, lower = worse.`}
          >
            <div className="text-sm font-semibold text-cyan-700 mb-2">W Score</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">1.0 → {d.w}</div>
            <div className="text-xs text-cyan-600 mt-2">Wellbeing shift</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Total time invested: Sum of all time components from Time + Money screen (preparation + commute + movie duration + post-movie time + discussions). Converted from minutes to hours.`}
          >
            <div className="text-sm font-semibold text-orange-700 mb-2">Time Spent</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{d.totalHours.toFixed(2)} hrs</div>
            <div className="text-xs text-orange-600 mt-2">Total title-related time</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Productivity Impact: Base hourly rate (salary ÷ monthly hours) adjusted by wellbeing. Higher wellbeing = higher productivity = higher effective hourly rate. Shows how your mental state affects work performance.`}
          >
            <div className="text-sm font-semibold text-purple-700 mb-2">Hour Value</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{formatInr(d.baseHourly)} → {formatInr(d.effectiveHourly)}</div>
            <div className="text-xs text-purple-600 mt-2">Performance from wellbeing</div>
          </motion.div>
          <motion.div
            className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 p-6 shadow-xl"
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
            title={`Final Assessment: Based on net impact calculation. Positive net impact = Time Well Spent (experience added value). Negative net impact = Life Drain (experience cost more than it gave).`}
          >
            <div className="text-sm font-semibold text-rose-700 mb-2">Verdict</div>
            <div className={`text-2xl font-bold mb-2 ${positive ? "bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent" : "bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"}`}>
              {positive ? "Time Well Spent ✨" : "Life Drain ⚠️"}
            </div>
            <div className="text-xs text-rose-600 mt-2">Share this result</div>
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
          className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 p-6 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="text-lg font-bold bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent mb-3">Share Your Results</div>
              <div className="bg-white/80 p-4 rounded-2xl border border-red-400 font-mono text-sm text-gray-700 whitespace-pre-line shadow-inner">
                {shareText}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="px-6 py-3 rounded-2xl border-2 border-red-500 hover:border-red-600 hover:bg-red-50 transition-all duration-200 font-semibold"
              >
                <Copy className="mr-2 h-4 w-4" />Copy
              </Button>
              <Button
                onClick={handleShare}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Share2 className="mr-2 h-4 w-4" />Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Hosting Note */}
        <motion.div
          className="rounded-3xl border-2 border-white/50 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">💡</div>
            <div>
              <div className="font-bold text-indigo-800 mb-2">Hosting Note</div>
              <div className="text-sm text-indigo-700 leading-relaxed">
                Push this to GitHub, connect the repo to Netlify, and you'll get a shareable public URL. The built-in share text above is what makes the output socially portable.
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
        className="rounded-3xl border-2 border-white/50 bg-gradient-to-r from-white via-blue-50 to-purple-50 p-6 shadow-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Journey</span>
          <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">{step + 1} of {stepLabels.length}</span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-red-200 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
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
                  idx < step ? "border-green-500 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/50" :
                  idx === step ? "border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-blue-500/50 animate-pulse" :
                  "border-red-500 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 shadow-gray-200/50"
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

export default function IndividualLedger() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8 text-black md:px-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
          backgroundSize: '400px 400px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl space-y-8 relative z-10">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm uppercase tracking-[0.3em] text-red-600 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Standalone Module v2</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">The Individual Ledger</h1>
          <p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
            A personal value audit of experience. Not a review. Not a rating. Just one uncomfortable question:
            <span className="font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> was this worth your life-time?</span>
          </p>
        </motion.div>

        <StepManager />
      </div>
    </div>
  );
}
