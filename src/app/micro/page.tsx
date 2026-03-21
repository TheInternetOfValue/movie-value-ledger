"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, BookOpen, ArrowRight, Film, Globe, Building, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { dhurandharHomeData, macroAccountRows } from "@/data/dhurandhar";

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
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/">
						<Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
							<Home className="h-4 w-4 mr-2" />
							Home
						</Button>
					</Link>
					<div className="h-4 w-px bg-gray-300" />
					<div className="flex items-center gap-2">
						{perspectives.map((p) => (
							<Link key={p.id} href={p.path}>
								<Button variant={p.id === currentPage ? "default" : "ghost"} size="sm" className={`text-xs px-3 py-1 ${p.id === currentPage ? "bg-amber-500 hover:bg-amber-600 text-white" : "text-gray-600 hover:text-gray-900"}`}>
									{p.name}
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
		</motion.div>
	);
}

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
	const AccordionSection = ({
		id,
		title,
		subtitle,
		children,
	}: {
		id: typeof openSection;
		title: string;
		subtitle: string;
		children: React.ReactNode;
	}) => {
		const isOpen = openSection === id;
		return (
			<div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
				<button type="button" onClick={() => setOpenSection(isOpen ? "revenue" : id)} className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left">
					<div>
						<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">{title}</div>
						<div className="mt-1 text-sm text-slate-600">{subtitle}</div>
					</div>
					<div className="text-sm font-semibold text-slate-500">{isOpen ? "Close" : "Open"}</div>
				</button>
				{isOpen && <div className="px-5 md:px-6 pb-5 md:pb-6">{children}</div>}
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-[#f7f4ee] text-slate-900 flex flex-col">
			<NavigationBar currentPage="micro" />
			<div className="pt-20 px-3 md:px-4 py-3 flex-grow">
				<div className="w-full space-y-4">
					<motion.div className="space-y-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<div className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">Micro level</div>
						<h1 className="text-4xl md:text-5xl font-black text-slate-900">Microeconomics of Dhurandhar</h1>
						<p className="mx-auto max-w-4xl text-base text-slate-600 md:text-lg leading-relaxed">A numbers-first view of the franchise as a project-finance asset, with the full readable reference below.</p>
					</motion.div>

					<motion.div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 md:p-8 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
						<div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
							<div className="space-y-4">
								<AccordionSection id="revenue" title="Revenue items" subtitle="The different forms of revenue flowing into the franchise.">
									<div className="space-y-3">
										<div className="grid gap-3 md:grid-cols-3">
											{revenueSlices.map((item) => (
												<div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
													<div className="text-sm font-semibold text-slate-900">{item.label}</div>
													<div className="mt-2 text-2xl font-black tracking-tight text-slate-900">{item.value}</div>
													<div className="mt-1 text-sm text-slate-600">{item.note}</div>
												</div>
											))}
										</div>
										<div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
											<div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold">Revenue total</div>
											<div className="mt-2 text-3xl font-black tracking-tight text-slate-900">₹{producerRevenue.toFixed(2)} cr</div>
											<div className="mt-1 text-sm text-slate-600">Producer-studio top line after realization and rights stacking.</div>
										</div>
									</div>
								</AccordionSection>

								<AccordionSection id="costs" title="Cost items" subtitle="Direct and indirect costs needed to mount the project.">
									<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
										{costSlices.map((item) => (
											<div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
												<div className="text-sm font-semibold text-slate-900">{item.label}</div>
												<div className="mt-2 text-xl font-black tracking-tight text-slate-900">{item.value}</div>
												<div className="mt-1 text-sm text-slate-600">{item.note}</div>
											</div>
										))}
									</div>
									<div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50 p-4">
										<div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold">Operating costs</div>
										<div className="mt-2 text-3xl font-black tracking-tight text-slate-900">₹{operatingCosts} cr</div>
										<div className="mt-1 text-sm text-slate-600">Production + P&A + distribution + talent premium + overhead.</div>
									</div>
								</AccordionSection>

								<AccordionSection id="profit" title="Profit bridge" subtitle="Gross profit or EBITDA, then debt and non-cash items.">
									<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
										<div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">EBITDA</div><div className="mt-2 text-2xl font-black text-slate-900">₹{ebitda.toFixed(2)} cr</div><div className="mt-1 text-sm text-slate-600">Revenue minus operating cost</div></div>
										<div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Amortisation</div><div className="mt-2 text-2xl font-black text-slate-900">₹{amortization} cr</div><div className="mt-1 text-sm text-slate-600">Capitalized production cost burden</div></div>
										<div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Interest</div><div className="mt-2 text-2xl font-black text-slate-900">₹{interest} cr</div><div className="mt-1 text-sm text-slate-600">Financing cost</div></div>
										<div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">EBIT</div><div className="mt-2 text-2xl font-black text-slate-900">₹{ebit.toFixed(2)} cr</div><div className="mt-1 text-sm text-slate-600">After amortisation, before interest</div></div>
									</div>
									<div className="mt-4 rounded-2xl border border-orange-100 bg-orange-50 p-4">
										<div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold">Pre-tax profit</div>
										<div className="mt-2 text-3xl font-black tracking-tight text-slate-900">₹{pbt.toFixed(2)} cr</div>
										<div className="mt-1 text-sm text-slate-600">EBIT less interest.</div>
									</div>
								</AccordionSection>

								<AccordionSection id="details" title="Tax and returns" subtitle="Tax, PAT, and model checks at the bottom of the stack.">
									<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
										<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Tax</div><div className="mt-2 text-2xl font-black text-slate-900">₹{tax} cr</div><div className="mt-1 text-sm text-slate-600">Modeled effective tax charge</div></div>
										<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">PAT</div><div className="mt-2 text-2xl font-black text-slate-900">₹{pat.toFixed(2)} cr</div><div className="mt-1 text-sm text-slate-600">Post-tax project outcome</div></div>
										<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">ROI</div><div className="mt-2 text-2xl font-black text-slate-900">{roi.toFixed(1)}%</div><div className="mt-1 text-sm text-slate-600">On operating cost</div></div>
									</div>
								</AccordionSection>
							</div>

							<div className="rounded-[1.75rem] border border-orange-100 bg-[#fffaf1] p-5 shadow-sm">
								<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">Reference</div>
								<div className="mt-3 text-sm leading-relaxed text-slate-700">Full document: {dhurandharHomeData.title}</div>
								<div className="mt-4 flex flex-wrap gap-3">
									<Link href="/micro/dhurandhar_micro_data" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-4"><BookOpen className="h-4 w-4" />Open full micro reference</Link>
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