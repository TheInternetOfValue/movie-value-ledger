"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Brain, 
  Repeat, 
  Activity, 
  Zap, 
  Share2, 
  Wallet,
  CheckCircle2,
  Undo2,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";

import { useWellbeing } from "@/lib/wellbeing-context";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// --- Types ---
type LedgerState = {
  salary: number;
  hoursPerMonth: number;
  money: { ticket: number; snacks: number; travel: number; parking: number };
  time: { pre: number; commute: number; movie: number; post: number; discussion: number };
  physiology: { calm: number; movement: number };
  emotions: { joy: number; safety: number; connection: number };
  feelings: { perspective: number; inspiration: number };
  thoughts: { conviction: number; clarity: number };
  habits: { awareness: number; choice: number };
  performance: { learning: number; community: number };
};

const initialState: LedgerState = {
  salary: 40000,
  hoursPerMonth: 170,
  money: { ticket: 180, snacks: 150, travel: 120, parking: 60 },
  time: { pre: 35, commute: 45, movie: 170, post: 40, discussion: 20 },
  physiology: { calm: 0, movement: 0 },
  emotions: { joy: 0, safety: 0, connection: 0 },
  feelings: { perspective: 0, inspiration: 0 },
  thoughts: { conviction: 0, clarity: 0 },
  habits: { awareness: 0, choice: 0 },
  performance: { learning: 0, community: 0 },
};

// --- Values & Constants ---
const INR = "₹";
const BASE_W = 700;
const MIN_W = 0;
const MAX_W = 1000;

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

// --- Logic from standalone backup ---
function computeBattery(state: LedgerState): number {
  const phys = state.physiology.calm + state.physiology.movement;
  const emo = state.emotions.joy + state.emotions.safety + state.emotions.connection;
  const feeling = state.feelings.perspective + state.feelings.inspiration;
  const thought = state.thoughts.conviction + state.thoughts.clarity;
  const habit = state.habits.awareness + state.habits.choice;
  const perf = state.performance.learning + state.performance.community;
  
  // Weights aligned with Protocol Stack (L2)
  const delta = (phys * 1.8) + (emo * 1.5) + (feeling * 1.3) + (thought * 1.2) + (habit * 1.1) + (perf * 1.0);
  return clamp(Math.round(BASE_W + delta), MIN_W, MAX_W);
}

function computeDerived(state: LedgerState) {
  const battery = computeBattery(state);
  const w = battery / 1000;
  const baseW = BASE_W / 1000;
  
  const baseHourly = state.salary / state.hoursPerMonth;
  const effectiveHourly = baseHourly * (w / baseW);
  const totalMoney = Object.values(state.money).reduce((a, b) => a + b, 0);
  const totalHours = Object.values(state.time).reduce((a, b) => a + b, 0) / 60;
  
  const baselineVC = baseW * totalHours * baseHourly;
  const actualVC = w * totalHours * effectiveHourly;
  const net = actualVC - baselineVC - totalMoney;
  
  return { battery, w, baseHourly, effectiveHourly, totalMoney, totalHours, baselineVC, actualVC, net };
}

export default function IndividualLedger() {
  const { setBattery } = useWellbeing();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<LedgerState>(initialState);
  
  const battery = useMemo(() => computeBattery(state), [state]);
  
  useEffect(() => {
    setBattery(battery);
  }, [battery, setBattery]);

  const stepLabels = ["Intro", "Physiology", "Emotive", "Feeling", "Thought", "Habit", "Perform", "Finance", "Result"];

  const next = () => {
    setStep(s => Math.min(s + 1, stepLabels.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const back = () => {
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const reset = () => { setState(initialState); setStep(0); };

  const isFinalStep = step === stepLabels.length - 1;

  return (
    <div className="space-y-8 pb-24 max-w-6xl mx-auto px-4 md:px-0">
      {/* Dynamic Header: Hidden on Final Step */}
      {!isFinalStep && (
        <div className="mb-16 space-y-6">
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em] animate-pulse">
            Pulse Scale / Personal Experience
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase">
            Individual <br/><span className="text-white/10">Wellbeing Ledger</span>
          </h1>
        </div>
      )}

      {/* Sticky Header for Real-time Feedback (Hidden on Final Step) */}
      {!isFinalStep && (
        <motion.div 
          className="sticky top-4 z-50 dossier-card border-white/10 bg-black/80 backdrop-blur-xl p-6 grid grid-cols-[1fr_auto] gap-8 items-center shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-3">
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <div className="text-[9px] uppercase tracking-[0.4em] text-amber-500 font-black">Active Diagnostic Profile</div>
             </div>
             <div className="grid grid-cols-6 gap-2 opacity-60">
                <MiniStatTick label="PHYS" value={50 + (state.physiology.calm + state.physiology.movement)} />
                <MiniStatTick label="EMO" value={50 + (state.emotions.joy + state.emotions.safety)} />
                <MiniStatTick label="FEEL" value={50 + (state.feelings.perspective + state.feelings.inspiration)} />
                <MiniStatTick label="THOT" value={50 + (state.thoughts.conviction + state.thoughts.clarity)} />
                <MiniStatTick label="HABT" value={50 + (state.habits.awareness + state.habits.choice)} />
                <MiniStatTick label="PERF" value={50 + (state.performance.learning + state.performance.community)} />
             </div>
          </div>
          <div className="text-right flex flex-col items-end">
             <span className="text-4xl font-black text-white dossier-number tracking-tighter leading-none">{battery}</span>
             <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1">Aura Level</span>
          </div>
        </motion.div>
      )}

      {/* Navigation Scrubber (Hidden on Final Step) */}
      {!isFinalStep && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {stepLabels.map((label, idx) => (
            <button 
              key={label} 
              onClick={() => idx <= step && setStep(idx)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all border",
                idx === step ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" : 
                idx < step ? "bg-white/10 border-emerald-500/50 text-emerald-500" : 
                "bg-white/[0.02] border-white/5 text-white/20 hover:border-white/20"
              )}
            >
              <span className="text-[10px] font-black">{idx < step ? "✓" : idx + 1}</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[500px]"
        >
          {step === 0 && (
            <StepWrapper title="Initialize Protocol" subtitle="The Movie Dhurandhar is not a commodity. It is an investment of your life-force." onNext={next} nextLabel="Start Diagnostic">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard icon={<Activity />} title="Physiology" desc="Body state, kinetic energy, sensory load." />
                <FeatureCard icon={<Heart />} title="Emotion" desc="Primary biochemical affect and safety." />
                <FeatureCard icon={<Zap />} title="Feeling" desc="The subjective 'felt sense' (Perspective & Inspiration)." />
                <FeatureCard icon={<Brain />} title="Thought" desc="Mental models, logic, and cognitive conviction." />
                <FeatureCard icon={<Repeat />} title="Habit" desc="Behavioral choices and loop awareness." />
                <FeatureCard icon={<TrendingUp />} title="Performance" desc="Skill yield, learning, and community contribution." />
              </div>
            </StepWrapper>
          )}

          {step === 1 && (
            <StepWrapper title="Physiology" subtitle="The body records the impact before the mind justifies it." onNext={next} onBack={back}>
              <div className="grid md:grid-cols-2 gap-8">
                <SliderBlock
                  label="Interoceptive Presence"
                  left="Anxious/Tight"
                  right="Regulated"
                  value={state.physiology.calm}
                  onChange={(v: number) => setState({...state, physiology: {...state.physiology, calm: v}})}
                  note="Did your breathing deepen or become shallow and restricted?"
                />
                <SliderBlock
                  label="Kinetic Readiness"
                  left="Stagnant"
                  right="Energized"
                  value={state.physiology.movement}
                  onChange={(v: number) => setState({...state, physiology: {...state.physiology, movement: v}})}
                  note="Do you feel physically heavy or ready for vital movement?"
                />
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper title="Emotional Data" subtitle="Sentiment is a leading indicator of systemic value." onNext={next} onBack={back}>
              <div className="grid md:grid-cols-3 gap-8">
                <SliderBlock
                  label="Biochemical Joy"
                  left="Drained"
                  right="Exuberant"
                  value={state.emotions.joy}
                  onChange={(v: number) => setState({...state, emotions: {...state.emotions, joy: v}})}
                  note="The raw intensity of satisfaction felt."
                />
                <SliderBlock
                  label="Internal Safety"
                  left="Threatened"
                  right="Secure"
                  value={state.emotions.safety}
                  onChange={(v: number) => setState({...state, emotions: {...state.emotions, safety: v}})}
                  note="Did you feel a sense of 'threat' or social warmth?"
                />
                <SliderBlock
                  label="Social Connection"
                  left="Isolated"
                  right="Bonded"
                  value={state.emotions.connection}
                  onChange={(v: number) => setState({...state, emotions: {...state.emotions, connection: v}})}
                  note="Your degree of empathy or unity with others."
                />
              </div>
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper title="Felt Experience" subtitle="The nuanced, subjective 'felt sense' of the cinematic journey." onNext={next} onBack={back}>
              <div className="grid md:grid-cols-2 gap-8">
                <SliderBlock
                  label="Subjective Horizon"
                  left="Contracted"
                  right="Expanded"
                  value={state.feelings.perspective}
                  onChange={(v: number) => setState({...state, feelings: {...state.feelings, perspective: v}})}
                  note="Did your sense of 'the possible' expand or shrink?"
                />
                <SliderBlock
                  label="Visceral Inspiration"
                  left="Inert"
                  right="Vibrant"
                  value={state.feelings.inspiration}
                  onChange={(v: number) => setState({...state, feelings: {...state.feelings, inspiration: v}})}
                  note="Did you feel a resonance in your chest or gut?"
                />
              </div>
            </StepWrapper>
          )}

          {step === 4 && (
            <StepWrapper title="Cognitive Conviction" subtitle="Mental models and the logic of belief." onNext={next} onBack={back}>
              <div className="grid md:grid-cols-2 gap-8">
                <SliderBlock
                  label="Model Integrity"
                  left="Dissolved"
                  right="Solidified"
                  value={state.thoughts.conviction}
                  onChange={(v: number) => setState({...state, thoughts: {...state.thoughts, conviction: v}})}
                  note="Did the film clarify or confuse your mental structures?"
                />
                <SliderBlock
                  label="Logical Clarity"
                  left="Foggy"
                  right="Lucid"
                  value={state.thoughts.clarity}
                  onChange={(v: number) => setState({...state, thoughts: {...state.thoughts, clarity: v}})}
                  note="Is the 'Why' behind this experience clear to you?"
                />
              </div>
            </StepWrapper>
          )}

          {step === 5 && (
            <StepWrapper title="Habitual Intent" subtitle="A movie ends, but its influence is a loop." onNext={next} onBack={back}>
              <div className="grid md:grid-cols-2 gap-8">
                <SliderBlock
                  label="Pattern Awareness"
                  left="Auto-Pilot"
                  right="Hyper-Lucid"
                  value={state.habits.awareness}
                  onChange={(v: number) => setState({...state, habits: {...state.habits, awareness: v}})}
                  note="Are you more aware of your own default patterns?"
                />
                <SliderBlock
                  label="Sovereign Sovereignty"
                  left="Compulsive"
                  right="Intentional"
                  value={state.habits.choice}
                  onChange={(v: number) => setState({...state, habits: {...state.habits, choice: v}})}
                  note="Has your ability to choose your next action shifted?"
                />
              </div>
            </StepWrapper>
          )}

          {step === 6 && (
            <StepWrapper title="Lived Performance" subtitle="The outcome of wellbeing is action." onNext={next} onBack={back}>
              <div className="grid md:grid-cols-2 gap-8">
                <SliderBlock
                  label="Learning Yield"
                  left="Stagnant"
                  right="Advanced"
                  value={state.performance.learning}
                  onChange={(v: number) => setState({...state, performance: {...state.performance, learning: v}})}
                  note="Did you gain a new tool for navigating reality?"
                />
                <SliderBlock
                  label="Community Contribution"
                  left="Inert"
                  right="Engaged"
                  value={state.performance.community}
                  onChange={(v: number) => setState({...state, performance: {...state.performance, community: v}})}
                  note="Do you feel more capable of serving or leading?"
                />
              </div>
            </StepWrapper>
          )}

          {step === 7 && (
            <StepWrapper title="Value Stake" subtitle="The hard numbers of your life-time investment." onNext={next} onBack={back} nextLabel="Calculate Net Impact">
              <div className="space-y-12">
                <div className="grid lg:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Capital Stake (Cash)</h4>
                      <div className="grid grid-cols-2 gap-4">
                         <InputBlock label="Ticket Cost" value={state.money.ticket} onChange={(v: number) => setState({...state, money: {...state.money, ticket: v}})} />
                         <InputBlock label="Snacks/Concess" value={state.money.snacks} onChange={(v: number) => setState({...state, money: {...state.money, snacks: v}})} />
                         <InputBlock label="Travel Stake" value={state.money.travel} onChange={(v: number) => setState({...state, money: {...state.money, travel: v}})} />
                         <InputBlock label="Parking/Other" value={state.money.parking} onChange={(v: number) => setState({...state, money: {...state.money, parking: v}})} />
                      </div>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Time Stake (Minutes)</h4>
                      <div className="grid grid-cols-2 gap-4">
                         <TimeInput label="Commute Time" value={state.time.commute} onChange={(v: number) => setState({...state, time: {...state.time, commute: v}})} />
                         <TimeInput label="Movie Runtime" value={state.time.movie} onChange={(v: number) => setState({...state, time: {...state.time, movie: v}})} />
                         <TimeInput label="Post Reflection" value={state.time.post} onChange={(v: number) => setState({...state, time: {...state.time, post: v}})} />
                         <TimeInput label="Discussion" value={state.time.discussion} onChange={(v: number) => setState({...state, time: {...state.time, discussion: v}})} />
                      </div>
                   </div>
                </div>
                <div className="dossier-card bg-amber-500/5 border-amber-500/20 p-8 flex flex-wrap items-center justify-between gap-8">
                   <div className="space-y-1">
                      <div className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Base Monthly Yield</div>
                      <div className="text-4xl font-black text-white dossier-number tracking-tighter">{formatInr(state.salary)}</div>
                   </div>
                   <div className="flex-grow max-w-lg">
                      <Slider value={[state.salary]} min={10000} max={1000000} step={10000} onValueChange={([v]) => setState({...state, salary: v})} />
                      <p className="text-[9px] text-white/20 mt-4 uppercase font-mono">Used to calculate your hourly opportunity cost.</p>
                   </div>
                </div>
              </div>
            </StepWrapper>
          )}

          {step === 8 && (
            <FinalView state={state} onReset={reset} onBack={back} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Internal UI Components ---

function StepWrapper({ title, subtitle, children, onNext, onBack, nextLabel = "Continue", onBackLabel = "Back" }: any) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
         <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">{title}</h3>
         <p className="text-white/40 font-medium tracking-tight uppercase text-sm md:text-lg border-l-2 border-amber-500/40 pl-6 max-w-3xl">{subtitle}</p>
      </div>
      <div className="py-6">{children}</div>
      <div className="flex items-center justify-between pt-12 border-t border-white/5">
        {onBack ? (
          <Button variant="ghost" onClick={onBack} className="text-white/30 hover:text-white uppercase tracking-[0.4em] text-[11px] h-14 px-10">
            <Undo2 className="h-4 w-4 mr-3" /> {onBackLabel}
          </Button>
        ) : <div />}
        <Button onClick={onNext} className="bg-white text-black hover:bg-amber-500 transition-all uppercase tracking-[0.5em] font-black text-[11px] h-16 px-12 rounded-xl group">
          {nextLabel} <ChevronRight className="h-4 w-4 ml-3 group-hover:translate-x-2 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="dossier-card p-6 space-y-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
      <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-amber-500 group-hover:text-black transition-all">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="space-y-2">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-white">{title}</div>
        <div className="text-[11px] text-white/20 uppercase font-mono leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function SliderBlock({ label, left, right, value, onChange, note }: any) {
  return (
    <div className="dossier-card p-8 space-y-8 bg-white/[0.01] border-white/5">
      <div className="space-y-2">
         <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">{label}</div>
         {note && <p className="text-[11px] text-white/20 italic font-mono uppercase tracking-tighter">{note}</p>}
      </div>
      <div className="space-y-6">
        <div className="relative pt-2">
           <Slider value={[value]} min={-50} max={50} step={1} onValueChange={([v]) => onChange(v)} />
        </div>
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
          <span className={cn(value < 0 ? "text-rose-500" : "text-white/20")}>{left}</span>
          <span className={cn(value > 0 ? "text-emerald-500" : "text-white/20")}>{right}</span>
        </div>
      </div>
    </div>
  );
}

function InputBlock({ label, value, onChange }: any) {
  return (
    <div className="dossier-card border-white/5 p-6 space-y-4 bg-black/40">
       <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</div>
       <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-white dossier-number tracking-tighter">{formatInr(value)}</span>
          <div className="flex gap-2">
             <button onClick={() => onChange(Math.max(0, value - 50))} className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors">-</button>
             <button onClick={() => onChange(value + 50)} className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors">+</button>
          </div>
       </div>
    </div>
  );
}

function TimeInput({ label, value, onChange }: any) {
  return (
    <div className="dossier-card border-white/5 p-6 space-y-4 bg-black/40">
       <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</div>
       <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-white dossier-number tracking-tighter">{value}m</span>
          <div className="flex gap-2">
             <button onClick={() => onChange(Math.max(0, value - 15))} className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors">-</button>
             <button onClick={() => onChange(value + 15)} className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-colors">+</button>
          </div>
       </div>
    </div>
  );
}

function MiniStatTick({ label, value }: any) {
  return (
    <div className="space-y-1">
       <div className="text-[7px] font-black text-white/30 uppercase tracking-widest">{label}</div>
       <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-white/40" style={{ width: `${clamp(value, 0, 100)}%` }} />
       </div>
    </div>
  );
}

function FinalView({ state, onReset, onBack }: any) {
  const d = computeDerived(state);
  const positive = d.net >= 0;

  const handleShare = () => {
    const text = `I just analyzed my experience of Dhurandhar. Result: ${positive ? "VICTORY" : "DEFEAT"} with a Net Value of ${formatInrCompact(d.net)}. #Dhurandhar #IoV #WellbeingLedger`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title: 'Dhurandhar Wellbeing Ledger', text, url });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    }
  };

  return (
     <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
        {/* Full Screen Cinematic Background */}
        <div className="fixed inset-0 z-0">
           <motion.img 
             initial={{ scale: 1.1, opacity: 0 }}
             animate={{ scale: 1, opacity: positive ? 0.2 : 0.25 }}
             transition={{ duration: 1.5 }}
             src="/dhurandhar/part-1-poster.jpg" 
             className={cn("w-full h-full object-cover grayscale", !positive && "sepia hue-rotate-[320deg] brightness-50")} 
           />
           {/* Dynamic Vignette based on Outcome */}
           <div className={cn(
             "absolute inset-0 transition-colors duration-1000",
             positive ? "bg-emerald-950/20" : "bg-rose-950/30"
           )} />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 w-full min-h-screen py-24 px-6">
            <div className="max-w-6xl mx-auto space-y-20">
                {/* Systems POV Header */}
                <div className="text-center space-y-2">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="text-7xl md:text-[160px] font-black text-white uppercase tracking-tighter leading-none"
                   >
                      Dhurandhar&apos;s Impact
                   </motion.h2>
                   <div className="text-amber-500 text-[11px] font-black uppercase tracking-[1.2em]">[ A SYSTEM&apos;S POV ]</div>
                </div>

                {/* Unified Logic Stack */}
                <div className="grid md:grid-cols-3 gap-6">
                    <StatCard label="INDIA&apos;S ECONOMY" value="₹4,772+ Cr" sub="TOTAL GDP FOOTPRINT" />
                    <StatCard label="STUDIO ECOSYSTEM" value="₹1,988+ Cr" sub="PRODUCER REVENUE" />
                    <StatCard label="SOCIAL IDENTITY" value="HIGH IMPACT" sub="CULTURAL RESONANCE" />
                </div>

                {/* Main Outcome Area */}
                <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <div className="text-[10px] uppercase font-black tracking-[0.5em] text-white/30">Individual Level Outcome</div>
                         <motion.h3 
                           initial={{ scale: 0.9, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           className={cn("text-8xl md:text-[180px] font-black uppercase leading-[0.8] tracking-tighter", positive ? "text-emerald-500" : "text-rose-600")}
                         >
                            {positive ? "VICTORY" : "DEFEAT"}
                         </motion.h3>
                         <p className="text-white/60 max-w-md font-medium uppercase text-sm leading-relaxed tracking-tight border-l-2 border-white/20 pl-8 mt-8">
                            {positive 
                              ? "The experience generated a wellbeing surplus against your capital and time investment." 
                              : "The movie consumed more from you than it gave back in wellbeing-adjusted returns."}
                         </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                         <StatLine label="PHYSIOLOGY" value={50 + (state.physiology.calm + state.physiology.movement)} color={positive ? "emerald" : "rose"} />
                         <StatLine label="EMOTION" value={50 + (state.emotions.joy + state.emotions.safety)} color={positive ? "emerald" : "rose"} />
                         <StatLine label="FEELING" value={50 + (state.feelings.perspective + state.feelings.inspiration)} color={positive ? "emerald" : "rose"} />
                         <StatLine label="THOUGHT" value={50 + (state.thoughts.conviction + state.thoughts.clarity)} color={positive ? "emerald" : "rose"} />
                         <StatLine label="HABIT" value={50 + (state.habits.awareness + state.habits.choice)} color={positive ? "emerald" : "rose"} />
                         <StatLine label="PERFORMANCE" value={50 + (state.performance.learning + state.performance.community)} color={positive ? "emerald" : "rose"} />
                      </div>

                      <div className="flex flex-wrap gap-6 pt-8">
                         <Button onClick={onReset} className="h-16 px-12 bg-white text-black font-black uppercase tracking-[0.4em] text-[11px] hover:bg-amber-500 transition-all rounded-full">
                           RECALCULATE
                         </Button>
                         <Button onClick={handleShare} variant="outline" className="h-16 px-12 border-white/20 text-white uppercase tracking-[0.4em] text-[11px] hover:bg-white/10 transition-all rounded-full group">
                           <Share2 className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" /> SHARE POSTER
                         </Button>
                      </div>
                   </div>

                   {/* Vertical Dossier Card */}
                   <motion.div 
                     initial={{ x: 40, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     className="dossier-card bg-black/80 border-white/10 p-12 space-y-12 shadow-2xl backdrop-blur-3xl border-t-4 border-t-amber-500"
                   >
                      <div className="space-y-4">
                         <div className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 font-mono">STAMP: VERIFIED_LEDGER</div>
                         <div className="text-sm font-black text-white/40 uppercase tracking-[0.3em]">FINAL AURA LEVEL</div>
                         <div className="text-9xl font-black dossier-number tracking-tighter leading-none text-white">{d.battery}</div>
                         <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className={cn("h-full", positive ? "bg-emerald-500" : "bg-rose-500")}
                              initial={{ width: 0 }}
                              animate={{ width: `${(d.battery/1000)*100}%` }}
                              transition={{ delay: 0.5, duration: 1 }}
                            />
                         </div>
                      </div>

                      <div className="space-y-4 pt-8 border-t border-white/5">
                         <div className="text-[10px] font-black uppercase tracking-widest text-white/30">NET PERSONAL VALUE</div>
                         <div className={cn("text-7xl font-black dossier-number tracking-tighter", positive ? "text-emerald-500" : "text-rose-500")}>
                            {positive ? "+" : ""}{formatInrCompact(d.net)}
                         </div>
                         <div className="text-[10px] uppercase font-mono text-white/20 tracking-[0.2em]">Wellbeing Adjusted Surplus</div>
                      </div>

                      <div className="pt-8 opacity-20 hover:opacity-100 transition-opacity flex justify-center">
                         <div className="dossier-stamp dossier-stamp-verified rotate-12 scale-125">AUTHENTIC</div>
                      </div>
                   </motion.div>
                </div>
            </div>
        </div>
     </div>
  );
}

function StatCard({ label, value, sub, color }: any) {
  return (
     <div className="dossier-card bg-white/[0.03] border-white/5 p-8 space-y-2">
        <div className="flex items-center gap-2">
           <div className="h-1 w-1 rounded-full bg-amber-500" />
           <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">{label}</div>
        </div>
        <div className="text-3xl font-black text-white dossier-number tracking-tighter">{value}</div>
        <div className="text-[9px] font-black uppercase tracking-widest text-white/20">{sub}</div>
     </div>
  );
}

function StatLine({ label, value, color }: any) {
  const isEmerald = color === "emerald";
  return (
     <div className="space-y-3">
        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
           <span className="text-white/30">{label}</span>
           <span className={isEmerald ? "text-emerald-500" : "text-rose-500"}>{value}</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
           <div 
             className={cn("h-full transition-all duration-1000", isEmerald ? "bg-emerald-500/40" : "bg-rose-500/40")} 
             style={{ width: `${value}%` }} 
           />
        </div>
     </div>
  );
}
