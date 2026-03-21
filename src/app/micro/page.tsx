"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building, Film, TrendingUp, DollarSign, ArrowRight, BookOpen } from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { macroAccountRows } from "@/data/dhurandhar";
import { cn } from "@/lib/utils";

export default function MicroPage() {
	const microSummary = macroAccountRows[0];
	const part1Anchor = 1353;
	const part2Multiplier = 1.5;
	const part2WorldwideGross = 2029.5;
	const franchiseWorldwideGross = part1Anchor + part2WorldwideGross;
	const indiaNet = 2300.25;
	const overseasGross = 660.31;
	const indiaRealization = 1161.63;
	const overseasRealization = 277.33;
	const rightsStack = 550;
	const producerRevenue = 1988.96;
	const operatingCosts = 595;
	const ebitda = producerRevenue - operatingCosts;
	const amortization = 25;
	const interest = 17.85;
	const ebit = ebitda - amortization;
	const pbt = ebit - interest;
	const tax = 337.78;
	const pat = pbt - tax;
	const roi = operatingCosts > 0 ? ((producerRevenue - operatingCosts) / operatingCosts) * 100 : 0;
	const revenueSlices = [
		{ label: "India theatrical realization", value: "₹1,161.63 cr", note: "50.5% of combined India net" },
		{ label: "Overseas realization", value: "₹277.33 cr", note: "42% of overseas gross" },
		{ label: "Rights stack", value: "₹550 cr", note: "OTT + satellite + music + ancillary" },
	];
	const costSlices = [
		{ label: "Production", value: "₹380 cr", note: "Combined film production base" },
		{ label: "P&A / marketing", value: "₹90 cr", note: "Release and promotion spend" },
		{ label: "Distribution / logistics", value: "₹20 cr", note: "Release and settlement costs" },
		{ label: "Talent premium + overhead", value: "₹105 cr", note: "Backend, contingency, and overhead" },
	];
	const modelNotes = [
		{ label: "Part 1 anchor", value: "₹1,353 cr", icon: Film },
		{ label: "Part 2 assumption", value: "1.5x Part 1", icon: TrendingUp },
		{ label: "Combined gross", value: "₹3,382.5 cr", icon: DollarSign },
		{ label: "Studio pairing", value: "B62 + Jio", icon: Building },
	];
	const [openSection, setOpenSection] = React.useState<"revenue" | "costs" | "profit" | "details">("revenue");

	return (
		<>
			<NavigationBar currentPage="micro" />
			
			{/* Cinematic Highlight */}
			<div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.1)_0%,transparent_50%)]" />

			<main className="flex-grow w-full max-w-[1400px] mx-auto px-6 pt-32 pb-24 relative z-10 space-y-16">
				<motion.div 
					className="space-y-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className="flex items-center gap-4 text-amber-500/60 uppercase tracking-[0.4em] text-[10px] font-black">
						<Building className="h-4 w-4" />
						Corporate Scale / Project Finance
					</div>
					<h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase max-w-4xl opacity-90 drop-shadow-2xl">
						Project <br/><span className="text-white/20 outline-text">Microeconomics</span>
					</h1>
				</motion.div>

				<div className="grid lg:grid-cols-12 gap-10">
					{/* Summary Stats */}
					<div className="lg:col-span-4 space-y-6">
						<div className="dossier-card p-10 space-y-10 border-amber-500/10">
							<div className="space-y-2">
								<span className="text-[10px] font-black text-white/30 tracking-[0.4em] uppercase">EBITDA Post-Release</span>
								<div className="text-6xl font-black text-amber-500 dossier-number leading-none">₹{ebitda.toFixed(2)}<span className="text-xl ml-2 opacity-40">cr</span></div>
							</div>

							<div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
								<div className="space-y-1">
									<span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">Net Profit (PAT)</span>
									<div className="text-2xl font-black text-white dossier-number">₹{pat.toFixed(2)}cr</div>
								</div>
								<div className="space-y-1 text-right">
									<span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">ROI Yield</span>
									<div className="text-2xl font-black text-emerald-500 dossier-number">{roi.toFixed(1)}%</div>
								</div>
							</div>

							{/* New Link to Data Ledger */}
							<div className="pt-8">
								<Link href="/micro/dhurandhar_micro_data">
									<Button variant="outline" className="w-full h-14 border-white/10 bg-white/[0.02] hover:bg-white/[0.05] group rounded-xl">
										<div className="flex items-center justify-between w-full px-2">
											<div className="flex items-center gap-3">
												<BookOpen className="h-4 w-4 text-amber-500/60" />
												<span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Full Data Ledger</span>
											</div>
											<ArrowRight className="h-4 w-4 text-white/20 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
										</div>
									</Button>
								</Link>
							</div>

							<div className="space-y-6 pt-10 border-t border-white/5">
								<span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase block">Assumptions Case</span>
								<div className="grid gap-4">
									{modelNotes.map((note, idx) => (
										<div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
											<div className="flex items-center gap-3">
												<note.icon className="h-4 w-4 text-amber-500/60" />
												<span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{note.label}</span>
											</div>
											<span className="text-xs font-black text-white dossier-number">{note.value}</span>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="dossier-card p-8 bg-black/40 border-white/5 space-y-4">
							<div className="flex items-center gap-3">
								<div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
								<span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Audit Status</span>
								<span className="dossier-stamp dossier-stamp-estimated ml-auto">Synthesized</span>
							</div>
							<p className="dossier-note text-[11px] text-white/20 uppercase leading-relaxed">
								Financials modeled across combined franchise lifecycle. Figures represent synthesized performance post-theatrical run.
							</p>
						</div>
					</div>

					{/* Interactive Breakdown */}
					<div className="lg:col-span-8 space-y-6">
						<div className="flex flex-wrap gap-2">
							{(["revenue", "costs", "profit"] as const).map((tab) => (
								<Button 
									key={tab}
									onClick={() => setOpenSection(tab)}
									className={cn(
										"h-14 px-10 rounded-xl font-black uppercase tracking-[0.3em] text-xs transition-all",
										openSection === tab ? "bg-white text-black" : "bg-white/5 text-white/20 hover:bg-white/10"
									)}
								>
									{tab} ledger
								</Button>
							))}
						</div>

						<motion.div 
							key={openSection}
							className="dossier-card p-10 md:p-14 min-h-[500px]"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
						>
							{openSection === "revenue" && (
								<div className="space-y-10">
									<div className="flex items-center justify-between border-b border-white/5 pb-6">
										<h3 className="text-3xl font-black text-white uppercase tracking-tighter">Gross Inflows</h3>
										<div className="text-right">
											<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-2">Realization Model</div>
											<div className="text-sm font-mono text-amber-500/60 tracking-tighter cursor-crosshair hover:text-amber-500 transition-colors">
												Total_R = India + Overseas + Rights
											</div>
										</div>
									</div>
									<div className="grid gap-6">
										{revenueSlices.map((item, idx) => (
											<motion.div 
												key={idx} 
												whileHover={{ x: 10, backgroundColor: "rgba(245, 158, 11, 0.05)" }}
												className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-between group hover:border-amber-500/30 transition-all duration-300"
											>
												<div className="space-y-1">
													<div className="text-sm font-black text-white uppercase tracking-widest group-hover:text-amber-500 transition-colors">{item.label}</div>
													<div className="text-[10px] text-white/20 uppercase font-mono">{item.note}</div>
												</div>
												<div className="text-3xl font-black text-white dossier-number group-hover:scale-110 transition-transform origin-right">{item.value}</div>
											</motion.div>
										))}
									</div>
								</div>
							)}

							{openSection === "costs" && (
								<div className="space-y-10">
									<div className="flex items-center justify-between border-b border-white/5 pb-6">
										<h3 className="text-3xl font-black text-white uppercase tracking-tighter">Budget Allocation</h3>
										<div className="text-right">
											<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-2">Capital Outflow</div>
											<div className="text-sm font-mono text-rose-500/60 tracking-tighter cursor-crosshair hover:text-rose-500 transition-colors">
												Budget_T = Prod + Mkt + Dist + Talent
											</div>
										</div>
									</div>
									<div className="grid gap-6">
										{costSlices.map((item, idx) => (
											<motion.div 
												key={idx} 
												whileHover={{ x: 10, backgroundColor: "rgba(244, 63, 94, 0.05)" }}
												className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-between group hover:border-rose-500/30 transition-all duration-300"
											>
												<div className="space-y-1">
													<div className="text-sm font-black text-white uppercase tracking-widest group-hover:text-rose-500 transition-colors">{item.label}</div>
													<div className="text-[10px] text-white/20 uppercase font-mono">{item.note}</div>
												</div>
												<div className="text-3xl font-black text-white/80 dossier-number group-hover:scale-110 transition-transform origin-right">{item.value}</div>
											</motion.div>
										))}
									</div>
								</div>
							)}

							{openSection === "profit" && (
								<div className="space-y-12">
									<div className="flex items-center justify-between border-b border-white/5 pb-6">
										<h3 className="text-3xl font-black text-white uppercase tracking-tighter">Waterfall Net</h3>
										<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Final Capture</div>
									</div>
									<div className="grid grid-cols-2 gap-8">
										{[
											{ label: "PBT", value: pbt, sub: "Profit Before Tax" },
											{ label: "Tax Line", value: tax, sub: "Corporate Rate" },
											{ label: "Amortization", value: amortization, sub: "Asset Decay" },
											{ label: "Interest", value: interest, sub: "Cost of Capital" }
										].map((item, idx) => (
											<div key={idx} className="p-6 bg-white/[0.01] rounded-2xl border border-white/5">
												<span className="text-[9px] font-black text-white/20 tracking-[0.4em] uppercase block mb-1">{item.sub}</span>
												<div className="text-2xl font-black text-white dossier-number">₹{item.value.toFixed(2)}cr</div>
											</div>
										))}
									</div>
								</div>
							)}
						</motion.div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}