"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// 🎯 CORE LOGIC & TYPES
// ============================================================================

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

// ============================================================================
// 🧮 BUSINESS LOGIC FUNCTIONS
// ============================================================================

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

  // Calculate wellbeing impact (change from baseline)
  const wellbeingImpact = w - BASE_W;

  // Calculate productivity gain (hourly rate improvement)
  const productivityGain = effectiveHourly - baseHourly;

  // Calculate effective time value (what your time is now worth per hour)
  const timeValueIncrease = productivityGain * 8; // Daily impact (8 hours)

  // Calculate net wellbeing ROI (simplified)
  const wellbeingROI = wellbeingImpact > 0 ?
    ((productivityGain / baseHourly) * 100) : 0;

  return {
    w,
    baseHourly,
    effectiveHourly,
    totalMoney,
    totalHours,
    wellbeingImpact,
    productivityGain,
    timeValueIncrease,
    wellbeingROI
  };
}

// ============================================================================
// 🎨 UI COMPONENTS
// ============================================================================

function GameButton({ children, onClick, variant = "primary", className = "" }: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const baseClasses = "px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function GameCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-3xl shadow-xl border-2 border-white/50 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-gray-700">Your Journey</span>
        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full font-semibold">
          {current} of {total}
        </span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

function WellbeingMeter({ w }: { w: number }) {
  const percentage = ((w - MIN_W) / (MAX_W - MIN_W)) * 100;
  const color = w >= 800 ? "from-green-400 to-emerald-500" :
               w >= 680 ? "from-yellow-400 to-orange-500" :
               "from-red-400 to-pink-500";

  return (
    <div className="text-center mb-8">
      <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Wellbeing Battery
      </div>
      <div className="relative w-32 h-8 mx-auto bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <div className="text-3xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {w}/1000
      </div>
    </div>
  );
}

function AssessmentSlider({
  label,
  value,
  onChange,
  min = -100,
  max = 100,
  leftLabel,
  rightLabel,
  description
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  leftLabel: string;
  rightLabel: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-white/50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {label}
        </h3>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {value}
        </div>
      </div>

      {description && (
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
      )}

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full appearance-none cursor-pointer slider"
      />

      <div className="flex justify-between mt-3 text-sm font-medium">
        <span className="text-red-600">{leftLabel}</span>
        <span className="text-green-600">{rightLabel}</span>
      </div>
    </motion.div>
  );
}

// ============================================================================
// 🎮 GAME SCREENS
// ============================================================================

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <GameCard className="max-w-2xl">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-6"
          >
            🎬
          </motion.div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent">
            Movie Individual Ledger
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            This movie cost you more than a ticket. It cost you life-hours and wellbeing changes.
            Let's calculate the true value.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { icon: "❤️", label: "Body" },
              { icon: "✨", label: "Emotions" },
              { icon: "🧠", label: "Thoughts" },
              { icon: "🔄", label: "Habits" },
              { icon: "⚡", label: "Performance" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-gray-700">{item.label}</div>
              </motion.div>
            ))}
          </div>

          <GameButton onClick={onNext}>
            Start Assessment
          </GameButton>
        </div>
      </GameCard>
    </div>
  );
}

function PhysiologyScreen({ state, setState, onBack, onNext }: {
  state: LedgerState;
  setState: (s: LedgerState) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const w = computeW(state);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator current={1} total={7} />
        <WellbeingMeter w={w} />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            How did your body respond?
          </h2>
          <p className="text-gray-600">
            Your body often knows before your mind does. How did this movie make you feel physically?
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <AssessmentSlider
            label="Body Tension"
            value={state.physiology.calm}
            onChange={(value) => setState({
              ...state,
              physiology: { ...state.physiology, calm: value }
            })}
            leftLabel="Tense & Restless"
            rightLabel="Calm & Settled"
            description="Did your breathing settle or stay tense? Did your muscles relax or tighten?"
          />

          <AssessmentSlider
            label="Physical Energy"
            value={state.physiology.movement}
            onChange={(value) => setState({
              ...state,
              physiology: { ...state.physiology, movement: value }
            })}
            leftLabel="Still & Flat"
            rightLabel="Energized & Moving"
            description="Did the movie wake you up physically? Did you feel like dancing or staying put?"
          />
        </div>

        <div className="flex justify-between">
          <GameButton variant="secondary" onClick={onBack}>
            Back
          </GameButton>
          <GameButton onClick={onNext}>
            Continue
          </GameButton>
        </div>
      </div>
    </div>
  );
}

function EmotionsScreen({ state, setState, onBack, onNext }: {
  state: LedgerState;
  setState: (s: LedgerState) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const w = computeW(state);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator current={2} total={7} />
        <WellbeingMeter w={w} />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            How did you feel?
          </h2>
          <p className="text-gray-600">
            Emotions are your body's wisdom speaking. What chemistry did this movie trigger?
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <AssessmentSlider
            label="Mood & Joy"
            value={state.emotions.joy}
            onChange={(value) => setState({
              ...state,
              emotions: { ...state.emotions, joy: value }
            })}
            leftLabel="Sad & Down"
            rightLabel="Joyful & Uplifted"
            description="Did dopamine and serotonin levels rise? Did you feel happier?"
          />

          <AssessmentSlider
            label="Safety & Comfort"
            value={state.emotions.safety}
            onChange={(value) => setState({
              ...state,
              emotions: { ...state.emotions, safety: value }
            })}
            leftLabel="Fearful & Anxious"
            rightLabel="Safe & Secure"
            description="Did cortisol and adrenaline activate? Did you feel threatened or protected?"
          />

          <AssessmentSlider
            label="Connection & Belonging"
            value={state.emotions.connection}
            onChange={(value) => setState({
              ...state,
              emotions: { ...state.emotions, connection: value }
            })}
            leftLabel="Isolated & Alone"
            rightLabel="Connected & Included"
            description="Did oxytocin flow? Did you feel socially connected or separate?"
          />
        </div>

        <div className="flex justify-between">
          <GameButton variant="secondary" onClick={onBack}>
            Back
          </GameButton>
          <GameButton onClick={onNext}>
            Continue
          </GameButton>
        </div>
      </div>
    </div>
  );
}

function ThoughtsScreen({ state, setState, onBack, onNext }: {
  state: LedgerState;
  setState: (s: LedgerState) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const w = computeW(state);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator current={3} total={7} />
        <WellbeingMeter w={w} />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            How did your mind expand?
          </h2>
          <p className="text-gray-600">
            Thoughts are the architecture of your reality. What new perspectives did this movie open?
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <AssessmentSlider
            label="Perspective & Insight"
            value={state.thoughts.perspective}
            onChange={(value) => setState({
              ...state,
              thoughts: { ...state.thoughts, perspective: value }
            })}
            leftLabel="Same Old Views"
            rightLabel="Fresh Perspectives"
            description="Did you see the world differently? Did new ideas emerge?"
          />

          <AssessmentSlider
            label="Inspiration & Creativity"
            value={state.thoughts.inspiration}
            onChange={(value) => setState({
              ...state,
              thoughts: { ...state.thoughts, inspiration: value }
            })}
            leftLabel="Uninspired & Bored"
            rightLabel="Inspired & Creative"
            description="Did your imagination ignite? Did you feel motivated to create or explore?"
          />
        </div>

        <div className="flex justify-between">
          <GameButton variant="secondary" onClick={onBack}>
            Back
          </GameButton>
          <GameButton onClick={onNext}>
            Continue
          </GameButton>
        </div>
      </div>
    </div>
  );
}

function HabitsScreen({ state, setState, onBack, onNext }: {
  state: LedgerState;
  setState: (s: LedgerState) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const w = computeW(state);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator current={4} total={7} />
        <WellbeingMeter w={w} />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            How did your habits shift?
          </h2>
          <p className="text-gray-600">
            Habits are the compound interest of self-improvement. What patterns did this movie influence?
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <AssessmentSlider
            label="Self-Awareness"
            value={state.habits.awareness}
            onChange={(value) => setState({
              ...state,
              habits: { ...state.habits, awareness: value }
            })}
            leftLabel="Unaware & Automatic"
            rightLabel="Mindful & Aware"
            description="Did you become more conscious of your thoughts, feelings, or behaviors?"
          />

          <AssessmentSlider
            label="Choice & Agency"
            value={state.habits.choice}
            onChange={(value) => setState({
              ...state,
              habits: { ...state.habits, choice: value }
            })}
            leftLabel="Victim of Circumstance"
            rightLabel="Author of My Life"
            description="Did you feel more empowered to choose your responses and actions?"
          />
        </div>

        <div className="flex justify-between">
          <GameButton variant="secondary" onClick={onBack}>
            Back
          </GameButton>
          <GameButton onClick={onNext}>
            Continue
          </GameButton>
        </div>
      </div>
    </div>
  );
}

function TimeMoneyScreen({ state, setState, onBack, onNext }: {
  state: LedgerState;
  setState: (s: LedgerState) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const w = computeW(state);
  const derived = computeDerived(state);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator current={5} total={7} />
        <WellbeingMeter w={w} />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            The Time & Money Investment
          </h2>
          <p className="text-gray-600">
            Every movie costs more than the ticket price. Let's calculate your total investment.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Time Investment */}
          <GameCard>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Time Investment
            </h3>
            <div className="space-y-3">
              {Object.entries(state.time).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize text-gray-700">{key.replace('_', ' ')}:</span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setState({
                      ...state,
                      time: { ...state.time, [key]: Number(e.target.value) }
                    })}
                    className="w-20 px-2 py-1 border rounded text-right"
                  />
                  <span className="text-sm text-gray-500">min</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Total Time:</span>
                <span>{derived.totalHours.toFixed(1)} hours</span>
              </div>
            </div>
          </GameCard>

          {/* Money Investment */}
          <GameCard>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Money Investment
            </h3>
            <div className="space-y-3">
              {Object.entries(state.money).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize text-gray-700">{key}:</span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setState({
                      ...state,
                      money: { ...state.money, [key]: Number(e.target.value) }
                    })}
                    className="w-20 px-2 py-1 border rounded text-right"
                  />
                  <span className="text-sm text-gray-500">₹</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Total Money:</span>
                <span>{formatInr(derived.totalMoney)}</span>
              </div>
            </div>
          </GameCard>
        </div>

        <div className="flex justify-between">
          <GameButton variant="secondary" onClick={onBack}>
            Back
          </GameButton>
          <GameButton onClick={onNext}>
            Calculate Results
          </GameButton>
        </div>
      </div>
    </div>
  );
}

function FinalScreen({ state }: { state: LedgerState }) {
  const w = computeW(state);
  const derived = computeDerived(state);

  const wellbeingChange = derived.wellbeingImpact;
  const isPositive = wellbeingChange > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 p-6">
      <div className="max-w-4xl mx-auto">
        <ProgressIndicator current={7} total={7} />

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-6"
          >
            {isPositive ? "🎉" : wellbeingChange === 0 ? "🤔" : "😌"}
          </motion.div>

          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-slate-800 bg-clip-text text-transparent">
            Your Movie Experience Results
          </h2>
          <p className="text-gray-600">
            Beyond the ticket price - how this movie impacted your wellbeing and productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Wellbeing Impact */}
          <GameCard>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Wellbeing Impact
            </h3>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                wellbeingChange > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                wellbeingChange === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                'bg-gradient-to-r from-red-500 to-pink-600'
              } bg-clip-text text-transparent`}>
                {wellbeingChange > 0 ? '+' : ''}{wellbeingChange}
              </div>
              <div className="text-sm text-gray-600">
                {wellbeingChange > 0 ? 'Wellbeing points gained' :
                 wellbeingChange === 0 ? 'No wellbeing change' :
                 'Wellbeing points lost'}
              </div>
            </div>
          </GameCard>

          {/* Productivity Impact */}
          <GameCard>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Daily Productivity Boost
            </h3>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${
                derived.productivityGain > 0 ? 'from-green-500 to-emerald-600' :
                'from-gray-500 to-slate-600'
              } bg-clip-text text-transparent`}>
                {derived.productivityGain > 0 ? '+' : ''}{formatInr(derived.productivityGain)}
              </div>
              <div className="text-sm text-gray-600">
                Extra earning power per hour
              </div>
            </div>
          </GameCard>
        </div>

        {/* Understanding Your Results */}
        <GameCard className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-gray-800 to-slate-800 bg-clip-text text-transparent">
            Understanding Your Results
          </h3>

          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <strong className="text-blue-800">Wellbeing Score:</strong> Your overall mental and emotional state (baseline: 700/1000).
              {wellbeingChange > 0 && " This movie improved your wellbeing!"}
              {wellbeingChange === 0 && " This movie maintained your wellbeing."}
              {wellbeingChange < 0 && " This movie temporarily lowered your wellbeing."}
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <strong className="text-green-800">Productivity Impact:</strong> Better wellbeing = higher effective hourly rate.
              {derived.productivityGain > 0 &&
                ` You're now ${Math.round((derived.productivityGain / derived.baseHourly) * 100)}% more productive per hour!`
              }
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
              <strong className="text-purple-800">Time Investment:</strong> You spent {derived.totalHours.toFixed(1)} hours total on this movie experience
              (including travel, waiting, and post-movie discussions).
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
              <strong className="text-orange-800">Money Spent:</strong> {formatInr(derived.totalMoney)} on tickets, snacks, and transport.
            </div>
          </div>
        </GameCard>

        {/* Actionable Insights */}
        <GameCard className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What This Means for You
          </h3>

          <div className="text-center space-y-3">
            {wellbeingChange > 50 && (
              <div className="text-green-700 font-semibold">
                🎯 This movie was a wellbeing investment! Your improved mental state could boost your daily productivity by {formatInr(derived.timeValueIncrease)} or more.
              </div>
            )}

            {wellbeingChange > 0 && wellbeingChange <= 50 && (
              <div className="text-blue-700 font-semibold">
                👍 This movie had a positive wellbeing impact. Small improvements compound over time!
              </div>
            )}

            {wellbeingChange === 0 && (
              <div className="text-gray-700 font-semibold">
                🤔 This movie maintained your wellbeing. Sometimes stability is valuable too.
              </div>
            )}

            {wellbeingChange < 0 && (
              <div className="text-orange-700 font-semibold">
                💭 This movie temporarily affected your wellbeing. That's okay - movies are subjective experiences.
              </div>
            )}
          </div>
        </GameCard>

        <div className="text-center">
          <GameButton onClick={() => window.location.reload()}>
            Try Another Movie
          </GameButton>
        </div>
      </div>
    </div>
  );
}

export default function MovieLedgerGame() {
  const [currentStep, setCurrentStep] = useState(0);
  const [gameState, setGameState] = useState<LedgerState>(initialState);

  const screens = [
    () => <IntroScreen onNext={() => setCurrentStep(1)} />,
    () => (
      <PhysiologyScreen
        state={gameState}
        setState={setGameState}
        onBack={() => setCurrentStep(0)}
        onNext={() => setCurrentStep(2)}
      />
    ),
    () => (
      <EmotionsScreen
        state={gameState}
        setState={setGameState}
        onBack={() => setCurrentStep(1)}
        onNext={() => setCurrentStep(3)}
      />
    ),
    () => (
      <ThoughtsScreen
        state={gameState}
        setState={setGameState}
        onBack={() => setCurrentStep(2)}
        onNext={() => setCurrentStep(4)}
      />
    ),
    () => (
      <HabitsScreen
        state={gameState}
        setState={setGameState}
        onBack={() => setCurrentStep(3)}
        onNext={() => setCurrentStep(5)}
      />
    ),
    () => (
      <TimeMoneyScreen
        state={gameState}
        setState={setGameState}
        onBack={() => setCurrentStep(4)}
        onNext={() => setCurrentStep(6)}
      />
    ),
    () => <FinalScreen state={gameState} />,
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {screens[currentStep]()}
      </motion.div>
    </AnimatePresence>
  );
}