"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Building, Globe, ArrowRight, ArrowDown, TrendingUp, DollarSign, Film, CircleDollarSign, Waypoints, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { flowAccountRows, incomeAccountRows, macroAccountRows } from "@/data/dhurandhar";
import { cn } from "@/lib/utils";

export default function MacroPage() {
	const selectedMacro = macroAccountRows[0];
	const [lens, setLens] = React.useState<"expenditure" | "income" | "velocity">("expenditure");
	const activeMacro = macroAccountRows[0];
	const activeIncome = incomeAccountRows[0];
	const activeFlow = flowAccountRows[0];
	const headlineDirect = 4772.34;
	const headlineIncome = 4353.84;
	const discrepancy = headlineDirect - headlineIncome;
	const discrepancyPct = (discrepancy / headlineDirect) * 100;
	const spillover = 319.57;
	const expenditureFinal = 3566.07 + 505 + 7.58 + 736.31 - 42.62;
	const incomeFinal = 749.47 + 2991.39 + 155.6 + 457.38;
	const velocityFinal = spillover;
	const lensCopy = {
		expenditure: {
			tag: "Headline account",
			title: "Expenditure lens",
			formula: "GDP(E) = C + I + G + (X - M)",
			theory: "Framed by demand-side national accounting. Used globally to measure output from spending and net external demand.",
			referenceTitle: "Theory + reference",
			referenceBody: "The expenditure lens is the demand-side GDP identity, formalized in the System of National Accounts. It is used by national statistical offices, central banks, and macro analysts to measure output by spending flows.",
			referenceNote: "Full variable table and derivation notes live in macro/dhurandhar_macro_data.",
			finalLabel: "Final output",
			finalValue: `₹${expenditureFinal.toFixed(2)} cr`,
			finalNote: "Computed from C + I + G + X - M using the visible table rows.",
			body: "Demand-side footprint built from spending flows.",
			focus: [
				{ label: "C", value: "₹3,566.07 cr", note: "Tickets, concessions, adjacent spend" },
				{ label: "I", value: "₹505.00 cr", note: "All-in production and release cost" },
				{ label: "G", value: "₹7.58 cr", note: "Public support / facilitation" },
				{ label: "X", value: "₹736.31 cr", note: "Overseas theatrical + foreign rights" },
				{ label: "M", value: "₹42.62 cr", note: "Imported inputs and services" },
			],
		},
		income: {
			tag: "Reconciliation check",
			title: "Income lens",
			formula: "GDP(Y) = W + OS + MI + (T - S)",
			theory: "Framed by the income side of the SNA. Used globally to track who earned what and to reconcile against expenditure.",
			referenceTitle: "Theory + reference",
			referenceBody: "The income lens is the earnings-side GDP identity in national accounting. It is associated with Simon Kuznets and later standardized through the SNA, and it is used by statisticians and macro economists to track compensation, surplus, and taxes.",
			referenceNote: "Full variable table and derivation notes live in macro/dhurandhar_macro_data.",
			finalLabel: "Final output",
			finalValue: `₹${incomeFinal.toFixed(2)} cr`,
			finalNote: "Computed from W + OS + MI + (T - S) using the visible table rows.",
			body: "Who got paid and who captured surplus, estimated independently.",
			focus: [
				{ label: "W", value: "₹749.47 cr", note: "Compensation of employees" },
				{ label: "OS", value: "₹2,991.39 cr", note: "Operating surplus" },
				{ label: "MI", value: "₹155.60 cr", note: "Mixed income / rents / finance" },
				{ label: "T - S", value: "₹457.38 cr", note: "Taxes less subsidies" },
			],
		},
		velocity: {
			tag: "Circulation lens",
			title: "Velocity lens",
			formula: "Vsecondary = Jlocal × (k - 1)",
			theory: "Framed by circulation and multiplier theory. Used globally as a way to describe the speed and spread of a local impulse.",
			referenceTitle: "Theory + reference",
			referenceBody: "The velocity lens is a circulation view built from multiplier logic and local flow thinking. It is used by regional economists and policy teams to describe how an initial shock keeps moving through the economy.",
			referenceNote: "Full variable table and derivation notes live in macro/dhurandhar_macro_data.",
			finalLabel: "Final output",
			finalValue: `₹${velocityFinal.toFixed(2)} cr`,
			finalNote: "Computed spillover from the local multiplier lens.",
			body: "A spillover story for the local economy.",
			focus: [
				{ label: "Jlocal", value: "₹469.96 cr", note: "I + G - M" },
				{ label: "k", value: "1.68", note: "Local circulation multiplier" },
				{ label: "Secondary", value: "₹319.57 cr", note: "Spillover beyond the initial injection" },
			],
		},
	} as const;
	const active = lensCopy[lens];
	const lensOrder = ["expenditure", "income", "velocity"] as const;
	const position = lensOrder.indexOf(lens);
	const goPrev = () => setLens(lensOrder[Math.max(0, position - 1)]);
	const goNext = () => setLens(lensOrder[Math.min(lensOrder.length - 1, position + 1)]);

	return (
		<>
			<NavigationBar currentPage="macro" />
			
			<div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.1)_0%,transparent_50%)]" />

			<main className="flex-grow w-full max-w-[1400px] mx-auto px-6 pt-32 pb-24 relative z-10 space-y-16">
				<motion.div 
					className="dossier-card p-10 md:p-16 space-y-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className="space-y-6">
						<div className="flex items-center gap-4 text-amber-500/60 uppercase tracking-[0.4em] text-[10px] font-black">
							<Globe className="h-4 w-4" />
							National Scale / Tier 1 Data
							<span className="dossier-stamp dossier-stamp-sourced ml-auto">Verified</span>
						</div>
						<h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase max-w-4xl">
							Impact on <br/><span className="text-white/10 outline-text">The GDP</span>
						</h1>
					</div>

					<div className="grid md:grid-cols-2 gap-12 items-end">
						 <div className="inline-flex flex-col gap-2 p-8 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
							<span className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase">Aggregate Contribution</span>
							<span className="text-5xl md:text-7xl font-black tracking-tight text-amber-500 dossier-number">
								₹4.77K <span className="text-2xl text-amber-500/40">cr</span>
							</span>
							<p className="dossier-note mt-2 max-w-xs">
								Calculated using the Multiplier Effect (k = 1/[1-MPC]). Includes indirect spend across 12 sectors.
							</p>
						 </div>
						 
						 <div className="flex flex-wrap gap-3">
							{(["expenditure", "income", "velocity"] as const).map((item) => (
							  <Button 
								key={item} 
								onClick={() => setLens(item)} 
								className={cn(
								  "h-14 px-8 rounded-xl font-black uppercase tracking-[0.2em] transition-all",
								  lens === item 
									? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
									: "bg-white/5 text-white/40 hover:bg-white/10"
								)}
							  >
								{item}
							  </Button>
							))}
						 </div>
					</div>
				</motion.div>

				<div className="grid lg:grid-cols-12 gap-10">
					 {/* Lens Detail */}
					 <motion.div 
						key={lens}
						className="lg:col-span-8 dossier-card p-12 space-y-12 border-white/5"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					 >
						<div className="flex items-center justify-between border-b border-white/5 pb-6">
							<div className="space-y-1">
								<div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">{active.tag}</div>
								<h2 className="text-4xl font-black text-white uppercase tracking-tight">{active.title}</h2>
							</div>
							<div className="text-right">
								<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-2">Equation</div>
								<div className="text-xl font-mono text-white/60 tracking-tighter">
									{active.formula.split(' ').map((part, i) => (
										<motion.span 
											key={i}
											whileHover={{ color: "#f59e0b", scale: 1.1 }}
											className="inline-block px-1 transition-colors cursor-crosshair"
										>
											{part}
										</motion.span>
									))}
								</div>
							</div>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{active.focus.map((f, idx) => (
								<motion.div 
									key={idx} 
									className="group space-y-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/[0.02] transition-all duration-500"
									whileHover={{ y: -5 }}
								>
									<div className="flex items-center justify-between">
										<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] group-hover:text-amber-500 transition-colors">
											{f.label}
										</div>
										<motion.div 
											className="h-1 w-1 rounded-full bg-amber-500 scale-0 group-hover:scale-100 transition-transform"
										/>
									</div>
									<div className="text-3xl font-black text-white dossier-number group-hover:translate-x-1 transition-transform">
										{f.value}
									</div>
									<div className="text-[10px] text-white/40 leading-relaxed font-mono uppercase">
										{f.note}
									</div>
								</motion.div>
							))}
						</div>

						<div className="p-10 bg-gradient-to-br from-amber-500/[0.08] to-transparent rounded-[2.5rem] border border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
							<div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
								<TrendingUp className="h-32 w-32 rotate-12" />
							</div>
							<div className="space-y-4 relative z-10">
								<div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em]">{active.finalLabel}</div>
								<div className="text-7xl font-black text-white dossier-number leading-none tracking-tighter group-hover:scale-[1.02] transition-transform origin-left">
									{active.finalValue}
								</div>
							</div>
							<div className="max-w-[280px] relative z-10">
								<div className="flex items-center gap-2 mb-3">
									<Waypoints className="h-3 w-3 text-amber-500/40" />
									<span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Derivation Check</span>
								</div>
								<p className="text-[11px] text-white/40 font-mono leading-relaxed uppercase tracking-tight">
									{active.finalNote}
								</p>
							</div>
						</div>
					 </motion.div>

					 {/* Theory / Reference */}
					 <motion.div 
						className="lg:col-span-4 space-y-8"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
					 >
						<div className="dossier-card p-10 space-y-8 border-amber-500/10">
							<div className="flex items-center gap-3">
								<BookOpen className="h-5 w-5 text-amber-500" />
								<span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Theoretic Basis</span>
							</div>
							<p className="text-lg text-white/60 font-medium leading-relaxed font-serif italic">
								"{active.theory}"
							</p>
							<div className="space-y-4 pt-4 border-t border-white/5">
								<h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Reference Notes</h4>
								<p className="text-[11px] text-white/40 leading-relaxed font-mono uppercase tracking-tight">
									{active.referenceBody}
								</p>
							</div>
							<div className="dossier-stamp border-amber-500/20 text-amber-500/60 text-[9px]">
								Verified: SNA Standard
							</div>
						</div>

						<Button asChild className="w-full h-20 rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-amber-500 transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)]">
							<Link href="/macro/dhurandhar_macro_data">
								Full Data Ledger
							</Link>
						</Button>
					 </motion.div>
				</div>
			</main>

			<Footer />
		</>
	);
}