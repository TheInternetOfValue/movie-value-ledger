"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, Users, Building, Globe, ArrowRight, ArrowDown, TrendingUp, DollarSign, Film, CircleDollarSign, Waypoints, BookOpen } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { flowAccountRows, incomeAccountRows, macroAccountRows } from "@/data/dhurandhar";

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
		<motion.div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
			<div className="w-full px-3 md:px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/">
						<Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900"><Home className="h-4 w-4 mr-2" />Home</Button>
					</Link>
					<div className="h-4 w-px bg-gray-300" />
					<div className="flex items-center gap-2">
						{perspectives.map((p) => (
							<Link key={p.id} href={p.path}><Button variant={p.id === currentPage ? "default" : "ghost"} size="sm" className={`text-xs px-3 py-1 ${p.id === currentPage ? "bg-amber-500 hover:bg-amber-600 text-white" : "text-gray-600 hover:text-gray-900"}`}>{p.name}</Button></Link>
						))}
					</div>
				</div>
				<div className="flex items-center gap-2">
					{prevPage && <Link href={prevPage.path}><Button variant="outline" size="sm" className="text-gray-600 border-gray-300"><ChevronLeft className="h-4 w-4 mr-1" />{prevPage.name}</Button></Link>}
					{nextPage && <Link href={nextPage.path}><Button variant="outline" size="sm" className="text-gray-600 border-gray-300">{nextPage.name}<ChevronRight className="h-4 w-4 ml-1" /></Button></Link>}
				</div>
			</div>
		</motion.div>
	);
}

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
		<div className="min-h-screen bg-[#f7f4ee] text-slate-900 overflow-hidden">
			<NavigationBar currentPage="macro" />
			<div className="pt-20 px-3 md:px-4 py-3">
				<div className="w-full space-y-4">
					<motion.div className="w-full rounded-[2.5rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
						<div className="flex flex-col gap-6">
							<div className="space-y-4">
								<h1 className="max-w-5xl text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[0.95]">Impact of Dhurandhar on India's GDP</h1>
								<div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-4 py-3 text-orange-600">
									<span className="text-3xl md:text-5xl font-black tracking-tight text-orange-600">₹4.35K cr → ₹4.77K cr</span>
								</div>
							</div>
							<div className="flex flex-wrap gap-2">
								{(["expenditure", "income", "velocity"] as const).map((item) => (
									<Button key={item} onClick={() => setLens(item)} variant={lens === item ? "default" : "outline"} className={lens === item ? "bg-orange-500 text-white hover:bg-orange-600" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}>
										{item[0].toUpperCase() + item.slice(1)}
									</Button>
								))}
							</div>
						</div>
					</motion.div>

					<motion.div className="grid gap-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
						<div className="rounded-[2rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
							<div className="flex items-center justify-between gap-3">
								<div>
									<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">{active.tag}</div>
									<h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">{active.title}</h2>
								</div>
								<div className="text-right text-sm text-slate-500">{position + 1} / 3</div>
							</div>
							<div className="mt-4 grid gap-3 xl:grid-cols-[1.3fr_0.7fr] xl:items-start">
 								<div>
							<div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50 p-4">
								<div className="text-xs uppercase tracking-[0.3em] text-orange-500">Formula</div>
								<div className="mt-2 text-2xl font-semibold text-slate-900">{active.formula}</div>
							</div>
							<div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
								<div className="text-xs uppercase tracking-[0.3em] text-slate-400">Theory</div>
								<div className="mt-2 text-sm md:text-base leading-relaxed text-slate-700">{active.theory}</div>
							</div>
							<p className="mt-4 text-sm md:text-base text-slate-700 leading-relaxed">{active.body}</p>
							<div className="mt-5 grid gap-2">
								{active.focus.map((item) => (
									<div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
										<div className="flex items-start justify-between gap-3">
											<div>
												<div className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</div>
												<div className="mt-1 text-sm md:text-base text-slate-700">{item.note}</div>
											</div>
											<div className="text-right text-lg font-bold text-orange-500">{item.value}</div>
										</div>
									</div>
								))}
							</div>
							<div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-4">
								<div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold">{active.finalLabel}</div>
								<div className="mt-2 flex items-end justify-between gap-4">
									<div className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">{active.finalValue}</div>
									<div className="text-sm text-slate-600 text-right max-w-xs">{active.finalNote}</div>
								</div>
							</div>
								</div>
								<div className="rounded-[1.75rem] border border-orange-100 bg-[#fffaf1] p-4 shadow-sm">
									<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">{active.referenceTitle}</div>
									<p className="mt-3 text-sm leading-relaxed text-slate-700">{active.referenceBody}</p>
									<p className="mt-3 text-sm leading-relaxed text-slate-600">{active.referenceNote}</p>
									<div className="mt-4">
										<Link href="/macro/dhurandhar_macro_data" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-4">
											<BookOpen className="h-4 w-4" />
											Open macro reference for the full variable table and derivation notes.
										</Link>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

				</div>
			</div>
			<Footer />
		</div>
	);
}