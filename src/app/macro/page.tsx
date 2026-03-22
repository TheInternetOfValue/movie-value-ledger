"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Building, Globe, ArrowRight, ArrowDown, TrendingUp, DollarSign, Film, CircleDollarSign, Waypoints, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { flowAccountRows, incomeAccountRows, macroAccountRows } from "@/data/dhurandhar";
import { cn } from "@/lib/utils";

export default function MacroPage() {
	const [lens, setLens] = React.useState<"expenditure" | "income" | "velocity">("expenditure");
	const [hoveredVar, setHoveredVar] = React.useState<string | null>(null);

	const expenditureFinal = 3566.07 + 505 + 7.58 + 736.31 - 42.62;
	const incomeFinal = 749.47 + 2991.39 + 155.6 + 457.38;
	const velocityFinal = 319.57;

	const lensCopy = {
		expenditure: {
			tag: "Headline account",
			title: "Expenditure lens",
			formula: "GDP(E) = C + I + G + (X - M)",
			theory: "Framed by demand-side national accounting. Used globally to measure output from spending and net external demand.",
			referenceTitle: "Theory + reference",
			referenceBody: "The expenditure lens is the demand-side GDP identity, formalized in the System of National Accounts. It is used by national statistical offices, central banks, and macro analysts to measure output by spending flows.",
			finalLabel: "Final output",
			finalValue: `₹${expenditureFinal.toFixed(2)} cr`,
			finalNote: "Computed from C + I + G + X - M using the visible table rows.",
			focus: [
				{ label: "C", fullName: "Consumption", value: "₹3,566.07 cr", note: "Tickets, concessions, adjacent spend" },
				{ label: "I", fullName: "Investment", value: "₹505.00 cr", note: "All-in production and release cost" },
				{ label: "G", fullName: "Government", value: "₹7.58 cr", note: "Public support / facilitation" },
				{ label: "X", fullName: "Exports", value: "₹736.31 cr", note: "Overseas theatrical + foreign rights" },
				{ label: "M", fullName: "Imports", value: "₹42.62 cr", note: "Imported inputs and services" },
			],
		},
		income: {
			tag: "Reconciliation check",
			title: "Income lens",
			formula: "GDP(Y) = W + OS + MI + (T - S)",
			theory: "Framed by the income side of the SNA. Used globally to track who earned what and to reconcile against expenditure.",
			referenceTitle: "Theory + reference",
			referenceBody: "The income lens is the earnings-side GDP identity in national accounting. It is associated with Simon Kuznets and later standardized through the SNA.",
			finalLabel: "Final output",
			finalValue: `₹${incomeFinal.toFixed(2)} cr`,
			finalNote: "Computed from W + OS + MI + (T - S) using the visible table rows.",
			focus: [
				{ label: "W", fullName: "Wages", value: "₹749.47 cr", note: "Compensation of employees" },
				{ label: "OS", fullName: "Operating Surplus", value: "₹2,991.39 cr", note: "Operating surplus" },
				{ label: "MI", fullName: "Mixed Income", value: "₹155.60 cr", note: "Mixed income / rents / finance" },
				{ label: "T - S", fullName: "Taxes - Subsidies", value: "₹457.38 cr", note: "Taxes less subsidies" },
			],
		},
		velocity: {
			tag: "Circulation lens",
			title: "Velocity lens",
			formula: "Secondary = Jlocal × (k - 1)",
			theory: "Framed by circulation and multiplier theory. Used globally as a way to describe the speed and spread of a local impulse.",
			referenceTitle: "Theory + reference",
			referenceBody: "The velocity lens is a circulation view built from multiplier logic and local flow thinking.",
			finalLabel: "Final output",
			finalValue: `₹${velocityFinal.toFixed(2)} cr`,
			finalNote: "Computed spillover from the local multiplier lens.",
			focus: [
				{ label: "Jlocal", fullName: "Initial Injection", value: "₹469.96 cr", note: "I + G - M" },
				{ label: "k", fullName: "Multiplier", value: "1.68", note: "Local circulation multiplier" },
				{ label: "Secondary", fullName: "Spillover", value: "₹319.57 cr", note: "Spillover beyond initial injection" },
			],
		},
	} as const;

	const active = lensCopy[lens];

	return (
<>
			<NavigationBar currentPage="macro" />
			
			<div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.1)_0%,transparent_50%)]" />

			<main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 sm:pt-32 pb-24 relative z-10 space-y-8 sm:space-y-16">
				<motion.div 
					className="dossier-card p-6 sm:p-12 md:p-16 space-y-8 sm:space-y-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className="space-y-4 sm:space-y-6">
						<div className="flex flex-wrap items-center gap-3 sm:gap-4 text-amber-500/60 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[8px] sm:text-[10px] font-black">
							<Globe className="h-3 w-3 sm:h-4 sm:w-4" />
							National Scale / Tier 1 Data
							<span className="dossier-stamp dossier-stamp-sourced ml-auto">Verified</span>
						</div>
						<h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.9] uppercase max-w-5xl">
							Impact on <br/><span className="text-white/10 outline-text">The GDP</span>
						</h1>
					</div>

					<div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
						 <div className="inline-flex flex-col gap-1 sm:gap-2 p-6 sm:p-10 bg-white/5 rounded-2xl sm:rounded-[2.5rem] border border-white/5 backdrop-blur-md">
							<span className="text-[8px] sm:text-[10px] font-black text-white/30 tracking-[0.3em] sm:tracking-[0.4em] uppercase">Aggregate Contribution</span>
							<span className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-amber-500 dossier-number">
								₹4.77K <span className="text-xl sm:text-3xl text-amber-500/40">cr</span>
							</span>
							<p className="dossier-note mt-2 max-w-xs text-xs sm:text-sm">
								Calculated using the Multiplier Effect (k = 1.68). Includes indirect spend across 12 sectors.
							</p>
						 </div>
						 
						 <div className="flex flex-wrap gap-2 sm:gap-4">
							{(["expenditure", "income", "velocity"] as const).map((item) => (
  <Button 
								key={item} 
								onClick={() => setLens(item)} 
								className={cn(
  "h-12 sm:h-16 px-6 sm:px-10 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all text-[10px] sm:text-xs",
  lens === item 
? "bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.1)]" 
: "bg-white/5 text-white/40 hover:bg-white/10"
)}
							  >
								{item}
							  </Button>
							))}
						 </div>
					</div>
				</motion.div>

				<div className="grid lg:grid-cols-12 gap-6 sm:gap-10">
					 <motion.div 
						key={lens}
						className="lg:col-span-8 dossier-card p-6 sm:p-12 space-y-8 sm:space-y-16 border-white/5"
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4 }}
					 >
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-8 sm:pb-12">
							<div className="space-y-1 sm:space-y-2">
								<div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">{active.tag}</div>
								<h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">{active.title}</h2>
							</div>
							<div className="sm:text-right">
								<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-2 sm:mb-4">Formula Interaction</div>
								<div className="text-lg sm:text-2xl font-mono text-white/60 tracking-tighter flex flex-wrap gap-x-1 sm:gap-x-2">
									{active.formula.split(' ').flatMap((word, wordIdx) => {
										// Updated regex to catch mixed-case (Jlocal), single letters (k), and numbers (1)
										const parts = word.match(/([A-Z]+[a-z]*|[a-z]|\d|\(|\)|\+|\-|×)/g) || [word];
										
										return parts.map((part, i) => {
											// Check if it's a variable by comparing against the labels in focus list
											const isVariable = active.focus.some(f => f.label === part);
											const isActive = hoveredVar === part;

											return (
												<motion.span 
													key={`${wordIdx}-${i}`}
													onMouseEnter={() => isVariable && setHoveredVar(part)}
													onMouseLeave={() => setHoveredVar(null)}
													animate={{ 
														color: isActive ? "#f59e0b" : "rgba(255,255,255,0.6)",
														scale: isActive ? 1.1 : 1,
														y: isActive ? -2 : 0
													}}
													className={cn(
														"inline-block transition-all",
														isVariable ? "cursor-pointer font-bold text-white/90 underline decoration-white/20 underline-offset-4" : "opacity-40"
													)}
												>
													{part}
												</motion.span>
											);
										});
									})}
								</div>
							</div>
						</div>

						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
							{active.focus.map((f, idx) => {
								const isActive = hoveredVar === f.label;
								return (
<motion.div 
										key={idx} 
										onMouseEnter={() => setHoveredVar(f.label)}
										onMouseLeave={() => setHoveredVar(null)}
										className={cn(
"group space-y-4 p-6 sm:p-8 bg-white/[0.02] rounded-2xl sm:rounded-3xl border transition-all duration-500",
isActive 
? "border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)] bg-amber-500/[0.05]" 
: "border-white/5 hover:border-amber-500/30 hover:bg-amber-500/[0.02]"
)}
										animate={{ y: isActive ? -8 : 0 }}
									>
										<div className="flex items-center justify-between">
											<div className={cn(
"text-[10px] font-black uppercase tracking-[0.4em] transition-colors",
isActive ? "text-amber-500" : "text-white/20 group-hover:text-amber-500"
)}>
												{f.label} = <span className="text-white/40">{f.fullName}</span>
											</div>
											<motion.div 
												className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"
												initial={{ opacity: 0 }}
												animate={{ opacity: isActive ? 1 : 0 }}
											/>
										</div>
										<div className={cn(
"text-2xl sm:text-4xl font-black dossier-number transition-all",
isActive ? "text-amber-500 translate-x-1" : "text-white group-hover:translate-x-1"
)}>
											{f.value}
										</div>
										<div className="text-[10px] text-white/30 leading-relaxed font-mono uppercase">
											{f.note}
										</div>
									</motion.div>
								);
							})}
						</div>

						<div className="p-8 sm:p-12 bg-gradient-to-br from-amber-500/[0.08] to-transparent rounded-[2rem] sm:rounded-[3rem] border border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
							<div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
								<TrendingUp className="h-64 w-64 rotate-12" />
							</div>
							<div className="space-y-4 relative z-10 w-full md:w-auto">
								<div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em]">{active.finalLabel}</div>
								<div className="text-5xl sm:text-8xl font-black text-white dossier-number leading-none tracking-tighter group-hover:scale-[1.02] transition-transform origin-left">
									{active.finalValue}
								</div>
							</div>
							<div className="max-w-[320px] relative z-10 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-10">
								<div className="flex items-center gap-2 mb-3">
									<Waypoints className="h-3 w-3 text-amber-500/40" />
									<span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Validation Vector</span>
								</div>
								<p className="text-[11px] text-white/40 font-mono leading-relaxed uppercase tracking-tight mb-6">
									{active.finalNote}
								</p>
								<Button asChild variant="outline" className="h-10 w-full border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
									<Link href="/macro/dhurandhar_macro_data">
										Examine Detailed Ledger
									</Link>
								</Button>
							</div>
						</div>
					 </motion.div>

					 <motion.div 
						className="lg:col-span-4 space-y-6 sm:space-y-10"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
					 >
						<div className="dossier-card p-8 sm:p-12 space-y-8 sm:space-y-10 border-amber-500/10 h-full flex flex-col justify-between">
							<div className="space-y-8">
								<div className="flex items-center gap-3">
									<BookOpen className="h-5 w-5 text-amber-500" />
									<span className="text-[11px] font-black text-white uppercase tracking-[0.5em]">Theoretic Basis</span>
								</div>
								<p className="text-xl sm:text-2xl text-white/60 font-medium leading-relaxed font-serif italic">
									"{active.theory}"
								</p>
								<div className="space-y-4 pt-6 sm:pt-10 border-t border-white/10">
									<h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Scaling Bridge</h4>
									<p className="text-[11px] text-white/40 leading-relaxed font-mono uppercase tracking-tight">
										National aggregates capture the broad shock, but firms and households experience the pulse differently.
									</p>
								</div>
							</div>

							<Button asChild className="w-full h-20 sm:h-24 rounded-2xl sm:rounded-3xl bg-amber-500 text-black font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-[0_0_40px_rgba(245,158,11,0.2)] text-xs sm:text-sm group mt-12">
								<Link href="/micro" className="flex items-center justify-center gap-4">
									Step Into Micro Scale
									<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
								</Link>
							</Button>
						</div>
					 </motion.div>
				</div>
			</main>

			<Footer />
		</>
	);
}
