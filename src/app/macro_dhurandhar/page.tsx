"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Landmark, Layers3, RotateCcw, Sparkles, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  dhurandharMacroMarkdownSnapshot,
  macroAccountRows,
  macroScenarioPresets,
  macroVariables,
  type MacroGroup,
  type MacroVariable,
} from "@/data/dhurandhar";

type TabId = "overview" | "expenditure" | "income" | "velocity" | "assumptions";

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "expenditure", label: "Expenditure", icon: Wallet },
  { id: "income", label: "Income", icon: Landmark },
  { id: "velocity", label: "Velocity", icon: TrendingUp },
  { id: "assumptions", label: "Assumptions", icon: Layers3 },
];

  function formatInr(value: number) {
    return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(value))}`;
  }

  function formatPct(value: number) {
    return `${(value * 100).toFixed(1)}%`;
  }

  function fmtCr(value: number) {
    return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(value))} Cr`;
  }

  function useStoredState<T>(key: string, fallback: T) {
    const [value, setValue] = React.useState(fallback);
    React.useEffect(() => {
      try {
        const stored = window.localStorage.getItem(key);
        if (stored) setValue(JSON.parse(stored));
      } catch {
        setValue(fallback);
      }
    }, [key]);
    React.useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // ignore
      }
    }, [key, value]);
    return [value, setValue] as const;
  }

  function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <section className={cn("rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.25)]", className)}>{children}</section>;
  }

  function Pill({ label, value }: { label: string; value: string }) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        <div className="text-[10px] uppercase tracking-[0.32em] text-white/50">{label}</div>
        <div className="mt-1 text-xl font-semibold tabular-nums text-white">{value}</div>
      </div>
    );
  }

  function WaterfallBar({ label, value, negative = false }: { label: string; value: number; negative?: boolean }) {
    const width = Math.min(100, Math.max(18, Math.abs(value) / 60));
    return (
      <div className="flex items-center gap-3">
        <div className="w-32 shrink-0 text-sm text-white/70">{label}</div>
        <div className="relative h-10 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <motion.div initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ duration: 0.45 }} className={cn("h-full", negative ? "bg-rose-400/70" : "bg-amber-400")} />
        </div>
        <div className={cn("w-28 text-right text-sm font-semibold tabular-nums", negative ? "text-rose-300" : "text-white")}>{formatInr(value)}</div>
      </div>
    );
  }

  function FormulaBlock({ title, formula, note }: { title: string; formula: string; note: string }) {
    return (
      <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-2 font-mono text-sm text-white/85">{formula}</div>
        <div className="mt-3 text-sm leading-6 text-white/60">{note}</div>
      </div>
    );
  }

  function VariableRow({ variable, value }: { variable: MacroVariable; value: number }) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold text-white">{variable.label}</div>
              <span className={cn("rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.24em]", variable.sourceType === "sourced" ? "border-emerald-500/20 bg-emerald-500/15 text-emerald-300" : variable.sourceType === "estimated" ? "border-amber-500/20 bg-amber-500/15 text-amber-300" : "border-sky-500/20 bg-sky-500/15 text-sky-300")}>{variable.sourceType}</span>
            </div>
            <div className="mt-1 text-xs leading-5 text-white/55">{variable.description}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold tabular-nums text-amber-300">{variable.unit === "%" ? formatPct(value) : variable.unit === "×" ? `${value.toFixed(2)}×` : `${value.toFixed(2)}`}</div>
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/40">{variable.symbol}</div>
          </div>
        </div>
      </div>
    );
  }

  export default function MacroDhurandharPage() {
    const snapshot = dhurandharMacroMarkdownSnapshot;
    const baseRow = macroAccountRows.find((row) => row.film === "Dhurandhar") ?? macroAccountRows[0];
    const [activeTab, setActiveTab] = useStoredState<TabId>("macro-dhurandhar-tab", "overview");
    const [values, setValues] = useStoredState<Record<string, number>>("macro-dhurandhar-values", snapshot.anchors);
    const [openGroups, setOpenGroups] = React.useState<string[]>([]);

    React.useEffect(() => {
      setValues((current) => ({ ...snapshot.anchors, ...current }));
    }, [snapshot.anchors, setValues]);

    const derived = React.useMemo(() => {
      const C_tickets = snapshot.anchors.part1IndiaGross * values.indiaNetRatio;
      const C_concessions = C_tickets * values.concessionsRatio;
      const C_adjacent = C_tickets * values.adjacentSpendRatio;
      const I = baseRow.budgetCr * 2.02;
      const G = I * values.governmentSupportRatio;
      const X = snapshot.anchors.part1OverseasGross + baseRow.estimatedNonTheatricalCr * values.foreignRightsShare;
      const M = I * values.importLeakageRatio;
      const expenditure = C_tickets + C_concessions + C_adjacent + I + G + X - M;
      const W = I * values.wagesShare * 0.62;
      const OS = I * values.operatingSurplusShare * 0.79 + baseRow.estimatedNonTheatricalCr * 0.28;
      const MI = I * values.mixedIncomeShare + baseRow.estimatedNonTheatricalCr * 0.12;
      const T_minus_S = I * values.taxesLessSubsidiesShare + G * 0.55;
      const income = W + OS + MI + T_minus_S;
      const discrepancy = income - expenditure;
      const discrepancyPct = expenditure ? discrepancy / expenditure : 0;
      const J_local = I + G - M;
      const secondaryVelocity = J_local * (values.localMultiplier - 1);
      const totalCirculation = J_local * values.localMultiplier;
      return { C_tickets, C_concessions, C_adjacent, I, G, X, M, expenditure, W, OS, MI, T_minus_S, income, discrepancy, discrepancyPct, J_local, secondaryVelocity, totalCirculation };
    }, [baseRow, snapshot.anchors, values]);

    const variables = macroVariables.map((variable) => ({ ...variable, value: values[variable.key] ?? variable.value }));
    const grouped = variables.reduce<Record<MacroGroup, MacroVariable[]>>(
      (acc, variable) => {
        acc[variable.group].push(variable);
        return acc;
      },
      {
        "box-office assumptions": [],
        "spending ratios": [],
        "government/import assumptions": [],
        "income-side assumptions": [],
        "velocity assumptions": [],
      },
    );

    const summary = [
      { label: "Direct expenditure", value: fmtCr(snapshot.headlineTotals.directExpenditureCr) },
      { label: "Expanded footprint", value: fmtCr(snapshot.headlineTotals.expandedFootprintCr) },
      { label: "Income estimate", value: fmtCr(snapshot.headlineTotals.incomeEstimateCr) },
      { label: "Secondary velocity", value: fmtCr(snapshot.headlineTotals.secondaryVelocityCr) },
      { label: "Statistical discrepancy", value: fmtCr(snapshot.headlineTotals.statisticalDiscrepancyCr) },
    ];

    const expenditureWaterfall = [
      { label: "C_tickets", value: derived.C_tickets },
      { label: "C_concessions", value: derived.C_concessions },
      { label: "C_adjacent", value: derived.C_adjacent },
      { label: "I", value: derived.I },
      { label: "G", value: derived.G },
      { label: "X", value: derived.X },
      { label: "M", value: derived.M, negative: true },
    ];

    const expenditureTerms = [
      { label: "C_tickets", value: derived.C_tickets, note: "Ticket spend from the India gross anchor and the net ratio." },
      { label: "C_concessions", value: derived.C_concessions, note: "Food and beverage spend around the cinema trip." },
      { label: "C_adjacent", value: derived.C_adjacent, note: "Parking, transport, and nearby impulse spend." },
      { label: "I", value: derived.I, note: "Production investment from the film budget anchor." },
      { label: "G", value: derived.G, note: "Government or policy-linked support." },
      { label: "X", value: derived.X, note: "Overseas receipts plus external rights value." },
      { label: "M", value: derived.M, note: "Imported leakages and foreign-service outflow." },
    ];

    const updateValue = (key: string, next: number) => setValues((current) => ({ ...current, [key]: next }));
    const setPreset = (presetKey: string) => {
      const preset = macroScenarioPresets.find((item) => item.key === presetKey);
      if (preset) setValues((current) => ({ ...current, ...preset.values }));
    };
    const toggleGroup = (group: string) => setOpenGroups((current) => (current.includes(group) ? current.filter((item) => item !== group) : [...current, group]));

    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_28%),linear-gradient(180deg,_#050505_0%,_#09090b_45%,_#111827_100%)] text-white">
        <div className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">Dhurandhar Macro Economic Footprint</div>
                <h1 className="mt-1 text-lg font-semibold text-white">Macro-first, formula-first, source-backed</h1>
              </div>
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <Button key={tab.id} onClick={() => setActiveTab(tab.id)} variant={active ? "default" : "outline"} className={cn("rounded-full border-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em]", active ? "bg-amber-400 text-black hover:bg-amber-300" : "bg-white/5 text-white hover:bg-white/10")}>
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="mt-3 grid gap-2 lg:grid-cols-5">
              {summary.map((item) => (
                <Pill key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 lg:px-6 lg:py-8">
          <SectionCard className="p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">Source of truth</div>
                <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-white lg:text-5xl">Expenditure, income, and velocity using the exact terms from `docs/macro-econ-3lenses`</h2>
                <p className="max-w-2xl text-sm leading-7 text-white/65 lg:text-base">No viewer POV. No extra theory. Just the model, the anchors, and the numbers visible on the page.</p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setActiveTab("expenditure")} className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-black hover:bg-amber-300">
                    Open expenditure account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setActiveTab("assumptions")} variant="outline" className="rounded-full border-white/10 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10">
                    Review anchors
                  </Button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Direct expenditure</div>
                  <div className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.directExpenditureCr)}</div>
                  <div className="mt-2 text-sm leading-6 text-white/65">E = C + I + G + (X - M)</div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Income estimate</div>
                  <div className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.incomeEstimateCr)}</div>
                  <div className="mt-2 text-sm leading-6 text-white/65">Y = W + OS + MI + (T - S)</div>
                </div>
              </div>
            </div>
          </SectionCard>

          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <SectionCard className="p-6">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Direct footprint</div><div className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.directExpenditureCr)}</div><div className="mt-2 text-sm text-white/60">E = C + I + G + (X - M)</div></div>
                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Expanded footprint</div><div className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.expandedFootprintCr)}</div><div className="mt-2 text-sm text-white/60">Direct footprint plus secondary spillover</div></div>
                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Income estimate</div><div className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.incomeEstimateCr)}</div><div className="mt-2 text-sm text-white/60">Y = W + OS + MI + (T - S)</div></div>
                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Secondary velocity</div><div className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.secondaryVelocityCr)}</div><div className="mt-2 text-sm text-white/60">V_secondary = J_local × (k - 1)</div></div>
                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-[10px] uppercase tracking-[0.32em] text-white/45">Statistical discrepancy</div><div className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.statisticalDiscrepancyCr)}</div><div className="mt-2 text-sm text-white/60">Accounts are not forced to equal each other</div></div>
                    </div>
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      <FormulaBlock title="Expenditure lens" formula="E = C + I + G + (X - M)" note="Demand-side accounting: the movie ecosystem’s spending footprint." />
                      <FormulaBlock title="Income lens" formula="Y = W + OS + MI + (T - S)" note="Income-side accounting: who got paid and what was captured." />
                      <FormulaBlock title="Velocity lens" formula="V_secondary = J_local × (k - 1)" note="Circulation after the initial local injection, not a third GDP identity." />
                    </div>
                  </SectionCard>
                  <SectionCard className="p-6"><div className="space-y-3">{snapshot.keyClaims.map((claim) => <div key={claim} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">{claim}</div>)}</div></SectionCard>
                </div>
              </motion.div>
            ) : null}

            {activeTab === "expenditure" ? (
              <motion.div key="expenditure" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <SectionCard className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div><div className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">Expenditure account</div><div className="mt-1 text-lg font-semibold text-white">E = C + I + G + (X - M)</div></div>
                    <div className="text-right"><div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Direct footprint</div><div className="mt-1 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.directExpenditureCr)}</div></div>
                  </div>
                  <FormulaBlock title="Build-up" formula="C = C_tickets + C_concessions + C_adjacent" note="The page keeps the component labels as written in the markdown." />
                  <div className="space-y-3 rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-sm font-semibold text-white">Waterfall chart</div>{expenditureWaterfall.map((item) => <WaterfallBar key={item.label} label={item.label} value={item.value} negative={item.negative} />)}</div>
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-sm font-semibold text-white">Single control</div><div className="mt-3 space-y-3"><label className="block rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center justify-between gap-3"><div><div className="text-sm font-semibold text-white">Part 2 multiplier</div><div className="mt-1 text-xs text-white/55">Scales the Part 2 anchor from the markdown snapshot.</div></div><div className="text-sm font-semibold tabular-nums text-white">{values.part2WorldwideMultiplier.toFixed(2)}×</div></div><input className="mt-3 w-full accent-amber-400" type="range" min={1} max={2.25} step={0.01} value={values.part2WorldwideMultiplier} onChange={(e) => updateValue("part2WorldwideMultiplier", Number(e.target.value))} /></label></div></div>
                </SectionCard>
                <SectionCard className="space-y-3 p-6"><div className="text-lg font-semibold text-white">Literal terms</div>{expenditureTerms.map((term) => <div key={term.label} className="rounded-3xl border border-white/10 bg-black/20 p-4"><div className="flex items-start justify-between gap-4"><div><div className="font-semibold text-white">{term.label}</div><div className="mt-1 text-xs leading-5 text-white/55">{term.note}</div></div><div className="text-lg font-semibold tabular-nums text-amber-300">{formatInr(term.value)}</div></div></div>)}</SectionCard>
              </motion.div>
            ) : null}

            {activeTab === "income" ? (
              <motion.div key="income" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <SectionCard className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-4"><div><div className="text-[11px] uppercase tracking-[0.4em] text-amber-300/80">Income account</div><div className="mt-1 text-lg font-semibold text-white">Y = W + OS + MI + (T - S)</div></div><div className="text-right"><div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Income estimate</div><div className="mt-1 text-3xl font-semibold tabular-nums text-amber-300">{fmtCr(snapshot.headlineTotals.incomeEstimateCr)}</div></div></div>
                  <FormulaBlock title="Income-side reconstruction" formula="W + OS + MI + (T - S)" note="This is independent income-side accounting, not a mirror of the expenditure total." />
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-sm font-semibold text-white">Reconciliation</div><div className="mt-4 space-y-3 text-sm"><div className="flex items-center justify-between"><span className="text-white/65">Expenditure estimate</span><span className="text-white">{fmtCr(snapshot.headlineTotals.directExpenditureCr)}</span></div><div className="flex items-center justify-between"><span className="text-white/65">Income estimate</span><span className="text-white">{fmtCr(snapshot.headlineTotals.incomeEstimateCr)}</span></div><div className="flex items-center justify-between"><span className="text-white/65">Statistical discrepancy</span><span className="text-white">{fmtCr(snapshot.headlineTotals.statisticalDiscrepancyCr)}</span></div><div className="flex items-center justify-between"><span className="text-white/65">Discrepancy %</span><span className="text-white">{formatPct(derived.discrepancyPct)}</span></div></div></div>
                </SectionCard>
                <SectionCard className="space-y-3 p-6"><div className="text-lg font-semibold text-white">Income terms</div>{[{ label: "W", value: derived.W, note: "Wages" },{ label: "OS", value: derived.OS, note: "Operating surplus" },{ label: "MI", value: derived.MI, note: "Mixed income" },{ label: "T - S", value: derived.T_minus_S, note: "Taxes less subsidies" }].map((term) => <div key={term.label} className="rounded-3xl border border-white/10 bg-black/20 p-4"><div className="flex items-start justify-between gap-4"><div><div className="font-semibold text-white">{term.label}</div><div className="mt-1 text-xs leading-5 text-white/55">{term.note}</div></div><div className="text-lg font-semibold tabular-nums text-amber-300">{formatInr(term.value)}</div></div></div>)}</SectionCard>
              </motion.div>
            ) : null}

            {activeTab === "velocity" ? (
              <motion.div key="velocity" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <SectionCard className="space-y-4 p-6">
                  <FormulaBlock title="Velocity lens" formula="V_secondary = J_local × (k - 1)" note="Velocity is circulation after the initial injection, not a third GDP identity." />
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="flex items-center justify-between gap-4"><div><div className="text-sm font-semibold text-white">Local injection</div><div className="mt-1 text-sm text-white/60">J_local = I + G - M</div></div><div className="text-3xl font-semibold tabular-nums text-amber-300">{formatInr(derived.J_local)}</div></div><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Secondary velocity</div><div className="mt-2 text-2xl font-semibold tabular-nums text-white">{formatInr(derived.secondaryVelocity)}</div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Total circulation</div><div className="mt-2 text-2xl font-semibold tabular-nums text-white">{formatInr(derived.totalCirculation)}</div></div></div></div>
                </SectionCard>
                <SectionCard className="space-y-4 p-6"><div className="rounded-3xl border border-white/10 bg-black/20 p-5"><div className="text-sm font-semibold text-white">One control only</div><div className="mt-1 text-sm text-white/60">k controls how much the local injection gets re-spent.</div><div className="mt-3 text-right text-sm font-semibold tabular-nums text-white">{values.localMultiplier.toFixed(2)}×</div><input className="mt-2 w-full accent-amber-400" type="range" min={1} max={3} step={0.01} value={values.localMultiplier} onChange={(e) => updateValue("localMultiplier", Number(e.target.value))} /></div><FormulaBlock title="Velocity note" formula="J_local = I + G - M" note="If the control changes, only the circulation layer changes; the account terms stay visible." /></SectionCard>
              </motion.div>
            ) : null}

            {activeTab === "assumptions" ? (
              <motion.div key="assumptions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
                <SectionCard className="p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-lg font-semibold text-white">Collapsed assumptions</div><div className="text-sm text-white/60">These are the live anchors behind the formulas.</div></div><div className="flex flex-wrap gap-2">{macroScenarioPresets.map((preset) => <Button key={preset.key} onClick={() => setPreset(preset.key)} variant="outline" className="rounded-full border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white hover:bg-white/10">{preset.label}</Button>)}<Button onClick={() => setValues(snapshot.anchors)} className="rounded-full bg-amber-400 px-4 py-2 text-xs uppercase tracking-[0.26em] text-black hover:bg-amber-300"><RotateCcw className="h-4 w-4" /> Reset to anchors</Button></div></div></SectionCard>
                <div className="grid gap-4 xl:grid-cols-2">
                  {(["box-office assumptions", "spending ratios", "government/import assumptions", "income-side assumptions", "velocity assumptions"] as MacroGroup[]).map((group) => {
                    const expanded = openGroups.includes(group);
                    return (
                      <SectionCard key={group} className="p-6">
                        <button type="button" onClick={() => toggleGroup(group)} className="flex w-full items-center justify-between gap-3 text-left"><div><div className="text-[11px] uppercase tracking-[0.38em] text-amber-300/70">{group}</div><div className="mt-1 text-sm text-white/55">{expanded ? "Hide variables" : "Show variables"}</div></div><div className="text-white/70">{expanded ? "−" : "+"}</div></button>
                        {expanded ? <div className="mt-4 space-y-3">{grouped[group].map((variable) => <VariableRow key={variable.key} variable={variable} value={values[variable.key] ?? variable.value} />)}</div> : null}
                      </SectionCard>
                    );
                  })}
                </div>
                <SectionCard className="p-6"><div className="text-sm font-semibold text-white">Markdown snapshot</div><div className="mt-3 grid gap-3 md:grid-cols-3"><FormulaBlock title="Source" formula={snapshot.sourcePath} note="This page is driven by the markdown snapshot, not a separate story layer." /><FormulaBlock title="Formula set" formula={snapshot.formulas.join("   ")} note="The three lenses stay separate." /><FormulaBlock title="Anchors" formula={`${formatInr(snapshot.anchors.part1WorldwideGross)} · ${formatPct(snapshot.anchors.indiaNetRatio)} · ${snapshot.anchors.localMultiplier.toFixed(2)}×`} note="Visible defaults from the snapshot." /></div></SectionCard>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    );
  }
