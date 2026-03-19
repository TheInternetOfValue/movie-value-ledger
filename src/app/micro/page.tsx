"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, Users, Building, Globe, Film, Music, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

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
	const [actorCosts, setActorCosts] = React.useState([150]);
	const [directorCosts, setDirectorCosts] = React.useState([50]);
	const [musicCosts, setMusicCosts] = React.useState([30]);
	const [belowLineCosts, setBelowLineCosts] = React.useState([80]);
	const [pandACosts, setPandACosts] = React.useState([200]);
	const [financingCosts, setFinancingCosts] = React.useState([40]);
	const [indiaTheatrical, setIndiaTheatrical] = React.useState([300]);
	const [overseasRevenue, setOverseasRevenue] = React.useState([150]);
	const [ottRevenue, setOttRevenue] = React.useState([200]);
	const [wageShare, setWageShare] = React.useState([45]);
	const [profitShare, setProfitShare] = React.useState([30]);
	const [interestShare, setInterestShare] = React.useState([10]);
	const [royaltyShare, setRoyaltyShare] = React.useState([15]);

	const totalCosts = actorCosts[0] + directorCosts[0] + musicCosts[0] + belowLineCosts[0] + pandACosts[0] + financingCosts[0];
	const totalRevenue = indiaTheatrical[0] + overseasRevenue[0] + ottRevenue[0];
	const profit = totalRevenue - totalCosts;
	const roi = totalCosts > 0 ? (profit / totalCosts) * 100 : 0;
	const wageValue = Math.round((totalRevenue * wageShare[0]) / 100);
	const profitValue = Math.round((totalRevenue * profitShare[0]) / 100);
	const interestValue = Math.round((totalRevenue * interestShare[0]) / 100);
	const royaltyValue = Math.round((totalRevenue * royaltyShare[0]) / 100);
	const incomeTotal = wageValue + profitValue + interestValue + royaltyValue;
	const stageCards = [
		{
			label: "Pre-production / build",
			icon: Film,
			description: "Who and what gets assembled before the camera rolls.",
			controls: [
				{ label: "Actors & Cast", value: actorCosts[0], setValue: setActorCosts, max: 300, step: 5, icon: Users },
				{ label: "Director & Creative", value: directorCosts[0], setValue: setDirectorCosts, max: 100, step: 5, icon: Film },
				{ label: "Music & Sound", value: musicCosts[0], setValue: setMusicCosts, max: 60, step: 2, icon: Music },
			],
		},
		{
			label: "Production / spend",
			icon: Building,
			description: "The money that keeps the shoot, logistics, and release machine moving.",
			controls: [
				{ label: "Below-the-Line", value: belowLineCosts[0], setValue: setBelowLineCosts, max: 150, step: 5, icon: Building },
				{ label: "P&A", value: pandACosts[0], setValue: setPandACosts, max: 400, step: 10, icon: Globe },
				{ label: "Financing", value: financingCosts[0], setValue: setFinancingCosts, max: 80, step: 2, icon: TrendingUp },
			],
		},
		{
			label: "Release / revenue",
			icon: DollarSign,
			description: "Where the movie earns back through theaters and downstream channels.",
			controls: [
				{ label: "India Theatrical", value: indiaTheatrical[0], setValue: setIndiaTheatrical, max: 400, step: 10, icon: Users },
				{ label: "Overseas", value: overseasRevenue[0], setValue: setOverseasRevenue, max: 250, step: 5, icon: Globe },
				{ label: "OTT / Satellite / Other", value: ottRevenue[0], setValue: setOttRevenue, max: 250, step: 5, icon: DollarSign },
			],
		},
	];

	return (
		<div className="min-h-screen bg-white text-black">
			<NavigationBar currentPage="micro" />
			<div className="pt-20 px-4 py-8">
				<div className="mx-auto max-w-5xl space-y-8">
					<motion.div className="space-y-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold">Micro level</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900">Movie as Business Investment</h1>
						<p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">A single focused view for movie cost, revenue, ROI, and earnings distribution.</p>
					</motion.div>

					<motion.div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
						<div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50">
							<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
								<div>
									<div className="text-xs uppercase tracking-[0.35em] text-amber-500 font-semibold mb-2">Open micro</div>
									<h2 className="text-2xl md:text-3xl font-bold text-gray-900">Cost stack, revenue stack, profit stack</h2>
									<p className="mt-2 max-w-3xl text-gray-600">Keep the business model visible, then let the income shares move live with the sliders.</p>
								</div>
								<div className="text-sm text-gray-500">Live view</div>
							</div>
						</div>

						<div className="space-y-8 p-6 md:p-8">
							<div className="grid gap-4 md:grid-cols-3">
								{stageCards.map((stage) => {
									const StageIcon = stage.icon;
									return (
										<div key={stage.label} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
											<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-2"><StageIcon className="h-4 w-4" />{stage.label}</div>
											<div className="text-sm text-gray-600">{stage.description}</div>
										</div>
									);
								})}
							</div>
							<div className="rounded-3xl p-5 bg-amber-50 border border-amber-100">
								<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Business result</div>
								<div className="grid gap-4 md:grid-cols-3">
									<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Total cost</div><div className="text-2xl font-bold text-gray-900">₹{totalCosts} Cr</div></div>
									<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Total revenue</div><div className="text-2xl font-bold text-gray-900">₹{totalRevenue} Cr</div></div>
									<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">ROI</div><div className="text-2xl font-bold text-gray-900">{roi.toFixed(1)}%</div></div>
								</div>
							</div>

							<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
								{stageCards.map((stage) => (
									<div key={stage.label} className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
										<div className="flex items-center gap-2 mb-3 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold">
											<stage.icon className="h-4 w-4" />
											{stage.label}
										</div>
										<div className="space-y-4">
											{stage.controls.map((control) => {
												const ControlIcon = control.icon;
												return (
													<div key={control.label} className="space-y-3 rounded-2xl bg-gray-50 border border-gray-100 p-3">
														<div className="flex items-center gap-2"><ControlIcon className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">{control.label}</span></div>
														<Slider value={[control.value]} onValueChange={(next) => control.setValue(next)} max={control.max} min={0} step={control.step} className="w-full" />
														<div className="text-lg font-bold text-gray-900">₹{control.value} Cr</div>
													</div>
												);
											})}
										</div>
									</div>
								))}
							</div>

							<div className="rounded-3xl p-5 bg-amber-50 border border-amber-100">
								<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Income check</div>
								<div className="grid gap-4 md:grid-cols-4">
									<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Wages</div><div className="text-2xl font-bold text-gray-900">₹{wageValue} Cr</div></div>
									<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Profit</div><div className="text-2xl font-bold text-gray-900">₹{profitValue} Cr</div></div>
									<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Interest</div><div className="text-2xl font-bold text-gray-900">₹{interestValue} Cr</div></div>
									<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Royalties</div><div className="text-2xl font-bold text-gray-900">₹{royaltyValue} Cr</div></div>
								</div>
								<div className="mt-4 rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Income total</div><div className="text-2xl font-bold text-gray-900">₹{incomeTotal} Cr</div></div>
								<div className="mt-4 grid gap-4 md:grid-cols-3">
									<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><Users className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Wages share</span></div><Slider value={wageShare} onValueChange={setWageShare} max={70} min={0} step={1} className="w-full" /><div className="text-lg font-bold text-gray-900">{wageShare[0]}%</div></motion.div>
									<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><Building className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Profit share</span></div><Slider value={profitShare} onValueChange={setProfitShare} max={60} min={0} step={1} className="w-full" /><div className="text-lg font-bold text-gray-900">{profitShare[0]}%</div></motion.div>
									<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Interest / royalty weighting</span></div><Slider value={interestShare} onValueChange={setInterestShare} max={50} min={0} step={1} className="w-full" /><div className="text-lg font-bold text-gray-900">{interestShare[0]}% / {royaltyShare[0]}%</div></motion.div>
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