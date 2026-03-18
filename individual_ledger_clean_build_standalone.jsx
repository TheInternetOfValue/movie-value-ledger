import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, Brain, Repeat, Wallet, Clock3, Sparkles, Activity, Share2, Copy, Zap, Film, Landmark, Users, BarChart3 } from "lucide-react";

const INR = "\u20B9";
const BASE_W = 700;
const MIN_W = 400;
const MAX_W = 1000;

type LedgerState = {
  salary: number;
  hoursPerMonth: number;
  money: {
    ticket: number;
    snacks: number;
    travel: number;
    parking: number;
  };
  time: {
    pre: number;
    commute: number;
    movie: number;
    post: number;
    discussion: number;
  };
  physiology: {
    calm: number;
    movement: number;
  };
  emotions: {
    joy: number;
    safety: number;
    connection: number;
  };
  thoughts: {
    perspective: number;
    inspiration: number;
  };
  habits: {
    awareness: number;
    choice: number;
  };
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
  const color = w >= 800 ? "bg-green-500" : w >= 680 ? "bg-amber-500" : "bg-red-500";
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
        <span>Well-being battery</span>
        <span>{w}/1000</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-neutral-200">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatBar({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  const pct = clamp(value, 0, 100);
  const color = pct >= 75 ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-neutral-600">{icon}<span>{label}</span></div>
        <span className="font-medium text-black">{Math.round(pct)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function AvatarInsane({ state }: { state: LedgerState }) {
  const w = computeW(state);
  const body = clamp(50 + (state.physiology.calm + state.physiology.movement) / 4, 0, 100);
  const mood = clamp(50 + (state.emotions.joy + state.emotions.safety + state.emotions.connection) / 6, 0, 100);
  const mind = clamp(50 + (state.thoughts.perspective + state.thoughts.inspiration) / 4, 0, 100);
  const habit = clamp(50 + (state.habits.awareness + state.habits.choice) / 4, 0, 100);
  const performance = clamp((w / BASE_W) * 50 + 25, 0, 100);
  const face = w >= 840 ? "🦾" : w >= 780 ? "😎" : w >= 700 ? "🙂" : w >= 620 ? "😬" : "🥴";
  const aura = w >= 800 ? "from-green-200 via-white to-green-50" : w >= 680 ? "from-amber-200 via-white to-amber-50" : "from-red-200 via-white to-red-50";

  return (
    <Card className="overflow-hidden border-neutral-200">
      <CardContent className="p-0">
        <div className={`grid gap-0 lg:grid-cols-[360px_1fr] bg-gradient-to-br ${aura}`}>
          <div className="border-b border-neutral-200 p-6 lg:border-b-0 lg:border-r">
            <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">Avatar mode</div>
            <motion.div
              key={w}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-center"
            >
              <div className="text-[96px] leading-none">{face}</div>
              <div className="mt-3 text-2xl font-semibold">Your current state</div>
              <div className="mt-1 text-sm text-neutral-600">The movie is changing your battery in real time.</div>
            </motion.div>
            <div className="mt-6">
              <Battery w={w} />
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <StatBar label="Body" value={body} icon={<Heart className="h-3.5 w-3.5" />} />
              <StatBar label="Mood" value={mood} icon={<Sparkles className="h-3.5 w-3.5" />} />
              <StatBar label="Mind" value={mind} icon={<Brain className="h-3.5 w-3.5" />} />
              <StatBar label="Habits" value={habit} icon={<Repeat className="h-3.5 w-3.5" />} />
              <StatBar label="Performance" value={performance} icon={<Zap className="h-3.5 w-3.5" />} />
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4">
                <div className="text-sm font-medium">What this means</div>
                <div className="mt-2 text-sm text-neutral-600">
                  Performance is not separate from your well-being. If your overall state improves, the value of your next hour improves too.
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4">
                <div className="text-sm font-medium">Protocol idea</div>
                <div className="mt-2 text-sm text-neutral-600">
                  W changes your effective time-value. A bad experience does not just waste time. It can reduce the quality of the hours that follow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SliderBlock({ label, left, right, value, onChange, note }: { label: string; left: string; right: string; value: number; onChange: (n: number) => void; note?: string }) {
  return (
    <div className="space-y-2 rounded-2xl border border-neutral-200 p-4">
      <div className="text-sm font-medium">{label}</div>
      <div className="flex justify-between text-xs text-neutral-500">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <Slider min={-100} max={100} step={1} value={[value]} onValueChange={(v) => onChange(v[0])} />
      {note ? <div className="text-xs text-neutral-600">{note}</div> : null}
    </div>
  );
}

function StepShell({ title, subtitle, children, onBack, onNext, nextLabel = "Next", showBack = true }: { title: string; subtitle: string; children: React.ReactNode; onBack?: () => void; onNext?: () => void; nextLabel?: string; showBack?: boolean }) {
  return (
    <Card className="border-neutral-200">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-1">
          <div className="text-2xl font-semibold">{title}</div>
          <div className="text-sm text-neutral-600">{subtitle}</div>
        </div>
        <div className="mt-6">{children}</div>
        <div className="mt-8 flex items-center justify-between">
          {showBack ? <Button variant="outline" onClick={onBack}>Back</Button> : <div />}
          <Button onClick={onNext}>{nextLabel}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function IntroScreen({ onNext }: { onNext: () => void }) {
  return (
    <StepShell title="This movie cost you more than a ticket." subtitle="You begin with a baseline well-being score of 700. We’ll track body, mood, thinking, habits, and then the economic value of your time." onNext={onNext} nextLabel="Start" showBack={false}>
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

function Tile({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex items-center gap-2 text-sm font-medium">{icon}{title}</div>
      <div className="mt-2 text-xs text-neutral-600">{text}</div>
    </div>
  );
}

function PhysiologyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="What happened in your body?" subtitle="We start with physiology because your body often knows before your opinion does." onBack={onBack} onNext={onNext}>
      <div className="grid gap-4 md:grid-cols-2">
        <SliderBlock label="Body state" left="Calm" right="Restless" value={state.physiology.calm} onChange={(n) => setState({ ...state, physiology: { ...state.physiology, calm: n } })} note="Did your breathing and body settle, or stay tense and overstimulated?" />
        <SliderBlock label="Physical engagement" left="Still" right="Moved / danced" value={state.physiology.movement} onChange={(n) => setState({ ...state, physiology: { ...state.physiology, movement: n } })} note="Did the movie physically wake you up, or were you mostly flat?" />
      </div>
    </StepShell>
  );
}

function EmotionScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="How did it feel?" subtitle="Feelings are the names you give to what your inner chemistry felt like." onBack={onBack} onNext={onNext}>
      <div className="grid gap-4 md:grid-cols-3">
        <SliderBlock label="Mood tone" left="Sad" right="Joyful" value={state.emotions.joy} onChange={(n) => setState({ ...state, emotions: { ...state.emotions, joy: n } })} note="Joy often tracks with dopamine and serotonin shifts." />
        <SliderBlock label="Nervous system" left="Fearful" right="Safe" value={state.emotions.safety} onChange={(n) => setState({ ...state, emotions: { ...state.emotions, safety: n } })} note="Fear tends to elevate stress chemistry like cortisol and adrenaline." />
        <SliderBlock label="Social feeling" left="Isolated" right="Connected" value={state.emotions.connection} onChange={(n) => setState({ ...state, emotions: { ...state.emotions, connection: n } })} note="Connection often aligns with oxytocin and social ease." />
      </div>
    </StepShell>
  );
}

function ThoughtsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="Did anything shift in your mind?" subtitle="Now move from body and feeling into cognition." onBack={onBack} onNext={onNext}>
      <div className="grid gap-4 md:grid-cols-2">
        <SliderBlock label="Perspective shift" left="Nothing new" right="New perspectives" value={state.thoughts.perspective} onChange={(n) => setState({ ...state, thoughts: { ...state.thoughts, perspective: n } })} note="Did the film challenge or change the way you think?" />
        <SliderBlock label="Motivation" left="Uninspired" right="Inspired" value={state.thoughts.inspiration} onChange={(n) => setState({ ...state, thoughts: { ...state.thoughts, inspiration: n } })} note="Did it make you want to act, create, or rethink something?" />
      </div>
    </StepShell>
  );
}

function HabitsScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  return (
    <StepShell title="Will this change what you do next?" subtitle="This is where experience becomes behavior." onBack={onBack} onNext={onNext}>
      <div className="grid gap-4 md:grid-cols-2">
        <SliderBlock label="Pattern shift" left="Old patterns" right="New awareness" value={state.habits.awareness} onChange={(n) => setState({ ...state, habits: { ...state.habits, awareness: n } })} note="Did it pull you toward old loops, or help you notice better ones?" />
        <SliderBlock label="Movie choice style" left="Blind choice" right="Conscious choice" value={state.habits.choice} onChange={(n) => setState({ ...state, habits: { ...state.habits, choice: n } })} note="Will you keep choosing films automatically, or more intentionally next time?" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-600">
        <span className="rounded-full border px-3 py-1">🚬 smoking</span>
        <span className="rounded-full border px-3 py-1">🍿 impulse booking</span>
        <span className="rounded-full border px-3 py-1">🧠 reflective choosing</span>
        <span className="rounded-full border px-3 py-1">🎬 team + trailer check</span>
      </div>
    </StepShell>
  );
}

function TimeMoneyScreen({ state, setState, onBack, onNext }: { state: LedgerState; setState: (s: LedgerState) => void; onBack: () => void; onNext: () => void }) {
  const d = computeDerived(state);
  return (
    <StepShell title="Now let’s look at the real cost." subtitle="You didn’t just spend money. You spent life-hours, and your wellbeing changes the value of those hours." onBack={onBack} onNext={onNext} nextLabel="See final truth">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="text-lg font-medium">Your time value</div>
            <div className="mt-4 space-y-4">
              <div>
                <Label>Monthly income</Label>
                <Slider min={10000} max={1000000} step={5000} value={[state.salary]} onValueChange={(v) => setState({ ...state, salary: v[0] })} />
                <div className="text-sm">{formatInr(state.salary)} / month</div>
              </div>
              <div>
                <Label>Working hours per month</Label>
                <Slider min={160} max={176} step={1} value={[state.hoursPerMonth]} onValueChange={(v) => setState({ ...state, hoursPerMonth: v[0] })} />
                <div className="text-sm">Base hourly = {formatInr(d.baseHourly)} / hr</div>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm">
                Effective hourly after wellbeing = <b>{formatInr(d.effectiveHourly)} / hr</b>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="text-lg font-medium">Money spent</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Ticket", state.money.ticket, "ticket"],
                ["Snacks", state.money.snacks, "snacks"],
                ["Travel", state.money.travel, "travel"],
                ["Parking", state.money.parking, "parking"],
              ].map(([label, value, key]) => (
                <div key={key as string}>
                  <Label>{label as string}</Label>
                  <Slider min={0} max={2000} step={10} value={[value as number]} onValueChange={(v) => setState({ ...state, money: { ...state.money, [key as string]: v[0] } as LedgerState["money"] })} />
                  <div className="text-sm">{formatInr(value as number)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm font-medium">Cash spent = {formatInr(d.totalMoney)}</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="text-lg font-medium">Time spent</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Pre-movie content", state.time.pre, "pre", 180],
                ["Commute + wait", state.time.commute, "commute", 180],
                ["Movie runtime", state.time.movie, "movie", 300],
                ["Post-movie content", state.time.post, "post", 180],
                ["Discussions", state.time.discussion, "discussion", 180],
              ].map(([label, value, key, max]) => (
                <div key={key as string}>
                  <Label>{label as string}</Label>
                  <Slider min={0} max={max as number} step={5} value={[value as number]} onValueChange={(v) => setState({ ...state, time: { ...state.time, [key as string]: v[0] } as LedgerState["time"] })} />
                  <div className="text-sm">{value as number} min</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm font-medium">Total time = {d.totalHours.toFixed(2)} hrs</div>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm font-medium">Base opportunity cost = {formatInr(d.baseHourly * d.totalHours)}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
            <div className="font-medium text-black">Why this matters</div>
            <div className="mt-2">
              If wellbeing rises, performance rises with it. So the same hour is no longer the same hour. Your time-value becomes stronger. If wellbeing falls, your next hours become lower-quality hours.
            </div>
          </div>
        </div>
      </div>
    </StepShell>
  );
}

function FinalScreen({ state, onBack, onReset }: { state: LedgerState; onBack: () => void; onReset: () => void }) {
  const d = computeDerived(state);
  const positive = d.net >= 0;
  const shareText = `My Movie Ledger\nW: 700 → ${d.w}\nTime: ${d.totalHours.toFixed(2)} hrs\nNet impact: ${positive ? "+" : ""}${formatInrCompact(d.net)}\nThis movie ${positive ? "added to" : "drained"} my life-value.`;

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
    <StepShell title="Final truth" subtitle="Here is the trade you actually made." onBack={onBack} onNext={onReset} nextLabel="Start over">
      <div className="grid gap-6 lg:grid-cols-3">
        <MetricCard title="Baseline value" value={formatInrCompact(d.baselineVC)} note="700 × time × base hourly" />
        <MetricCard title="Actual value" value={formatInrCompact(d.actualVC)} note="new W × time × effective hourly" />
        <MetricCard title="Cash spent" value={formatInr(d.totalMoney)} note="Ticket + food + travel + parking" />
      </div>

      <div className={`mt-6 rounded-3xl border p-6 text-center ${positive ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}>
        <div className="text-sm text-neutral-600">Net personal impact</div>
        <div className={`mt-2 text-4xl font-semibold ${positive ? "text-green-700" : "text-red-700"}`}>{positive ? "+" : ""}{formatInrCompact(d.net)}</div>
        <div className="mt-3 text-lg font-medium">{positive ? "This experience added to your life-value." : "This experience cost you life-value."}</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <MetricCard title="W score" value={`700 → ${d.w}`} note="Wellbeing shift" />
        <MetricCard title="Time spent" value={`${d.totalHours.toFixed(2)} hrs`} note="Total title-related time" />
        <MetricCard title="Base vs effective hour" value={`${formatInr(d.baseHourly)} → ${formatInr(d.effectiveHourly)}`} note="Performance emerges from wellbeing" />
        <MetricCard title="Verdict" value={positive ? "Time well spent" : "Life drain"} note="Share this" />
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium">Viral layer</div>
            <div className="mt-1 text-sm text-neutral-600 whitespace-pre-line">{shareText}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy}><Copy className="mr-2 h-4 w-4" />Copy</Button>
            <Button onClick={handleShare}><Share2 className="mr-2 h-4 w-4" />Share</Button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-700">
        <div className="font-medium text-black">Hosting note</div>
        <div className="mt-2">Push this to GitHub, connect the repo to Netlify, and you’ll get a shareable public URL. The built-in share text above is what makes the output socially portable.</div>
      </div>
    </StepShell>
  );
}

function MetricCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <div className="text-sm text-neutral-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="mt-2 text-xs text-neutral-600">{note}</div>
    </div>
  );
}

function StepManager() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<LedgerState>(initialState);
  const stepLabels = ["Intro", "Physiology", "Emotions", "Thoughts", "Habits", "Time + Money", "Final"];

  return (
    <div className="space-y-6">
      <AvatarInsane state={state} />

      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          {stepLabels.map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex h-8 min-w-8 items-center justify-center rounded-full border px-3 text-xs font-medium ${idx <= step ? "border-black bg-black text-white" : "border-neutral-300 bg-white text-neutral-500"}`}>{idx + 1}</div>
              <div className={`text-xs ${idx <= step ? "text-black" : "text-neutral-400"}`}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.22 }}>
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

function SystemMacroExplorer() {
  const [c, setC] = useState(260);
  const [i, setI] = useState(24);
  const [g, setG] = useState(8);
  const [x, setX] = useState(210);
  const [m, setM] = useState(30);
  const y = c + i + g + x - m;

  const [crewDays, setCrewDays] = useState(150);
  const [crewSize, setCrewSize] = useState(320);
  const [audienceHours, setAudienceHours] = useState(94000000);
  const laborHours = crewDays * crewSize * 10;
  const amplifier = audienceHours / Math.max(1, laborHours);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-neutral-200">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold"><Landmark className="h-5 w-5" />Macro explorer</div>
            <div className="text-sm text-neutral-600">Simple GDP lens: C + I + G + X − M</div>
            {[
              ["Consumption", c, setC, 500],
              ["Investment", i, setI, 100],
              ["Government", g, setG, 60],
              ["Exports", x, setX, 500],
              ["Imports", m, setM, 100],
            ].map(([label, value, setter, max]) => (
              <div key={label as string}>
                <Label>{label as string}</Label>
                <Slider min={0} max={max as number} step={2} value={[value as number]} onValueChange={(v) => (setter as any)(v[0])} />
                <div className="text-sm">{formatInrCompact((value as number) * 10000000)}</div>
              </div>
            ))}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-xs text-neutral-500">GDP impact proxy</div>
              <div className="text-2xl font-semibold">{formatInrCompact(y * 10000000)}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-neutral-200">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold"><Users className="h-5 w-5" />Community signal</div>
            <div className="text-sm text-neutral-600">Paid labor vs unpaid audience attention.</div>
            <div>
              <Label>Crew size</Label>
              <Slider min={100} max={600} step={10} value={[crewSize]} onValueChange={(v) => setCrewSize(v[0])} />
              <div className="text-sm">{crewSize}</div>
            </div>
            <div>
              <Label>Crew days</Label>
              <Slider min={60} max={220} step={5} value={[crewDays]} onValueChange={(v) => setCrewDays(v[0])} />
              <div className="text-sm">{crewDays}</div>
            </div>
            <div>
              <Label>Audience hours</Label>
              <Slider min={20000000} max={200000000} step={1000000} value={[audienceHours]} onValueChange={(v) => setAudienceHours(v[0])} />
              <div className="text-sm">{(audienceHours / 1000000).toFixed(1)}M hrs</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard title="Labor hours" value={`${(laborHours / 1000000).toFixed(2)}M`} note="Crew × days × 10 hrs" />
              <MetricCard title="Attention multiplier" value={`${amplifier.toFixed(1)}×`} note="Audience hours ÷ labor hours" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function IndividualLedgerStandaloneV2() {
  return (
    <div className="min-h-screen bg-white px-4 py-8 text-black md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-neutral-500">Standalone module v2</div>
          <h1 className="text-3xl font-semibold md:text-4xl">The Individual Ledger</h1>
          <p className="mx-auto max-w-4xl text-sm text-neutral-600 md:text-base">
            A personal value audit of experience. Not a review. Not a rating. Just one uncomfortable question:
            <span className="font-medium text-black"> was this worth your life-time?</span>
          </p>
        </div>

        <Tabs defaultValue="individual">
          <TabsList className="border border-neutral-200 bg-white">
            <TabsTrigger value="individual">Individual Ledger</TabsTrigger>
            <TabsTrigger value="explorer">Macro Explorer</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="mt-6">
            <StepManager />
          </TabsContent>

          <TabsContent value="explorer" className="mt-6">
            <SystemMacroExplorer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
