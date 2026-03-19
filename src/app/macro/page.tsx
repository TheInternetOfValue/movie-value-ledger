"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, Users, Building, Globe, ArrowRight, ArrowDown, TrendingUp, DollarSign, Film } from "lucide-react";
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
	const [consumption, setConsumption] = React.useState([500]);
	const [investment, setInvestment] = React.useState([200]);
	const [government, setGovernment] = React.useState([150]);
	const [exports, setExports] = React.useState([100]);
	const [imports, setImports] = React.useState([80]);
	const [moneySupply, setMoneySupply] = React.useState([1000]);
	const [priceLevel, setPriceLevel] = React.useState([3]);
	const [quantity, setQuantity] = React.useState([333]);
	const [step, setStep] = React.useState(0);

	const gdpValue = consumption[0] + investment[0] + government[0] + (exports[0] - imports[0]);
	const velocity = quantity[0] > 0 ? priceLevel[0] : 0;
	const nominalGDP = moneySupply[0] * velocity;
	const expenditureGdp = gdpValue;
	const velocityGdp = nominalGDP;
	const adjustedWages = Math.round(gdpValue * 0.4);
	const adjustedProfits = Math.round(gdpValue * 0.35);
	const adjustedInterest = Math.round(gdpValue * 0.15);
	const adjustedRoyalties = Math.round(gdpValue * 0.1);
	const incomeGdp = adjustedWages + adjustedProfits + adjustedInterest + adjustedRoyalties;
	const stepLabels = ["Expenditure", "Income", "Velocity"];
	const stepNarratives = [
		{
			helper: "Expenditure approach",
			title: "GDP = C + I + G + (X - M)",
				body: "C = consumption, I = investment, G = government spending, X = exports, and M = imports. Think of a film release: people buy tickets and merch, the studio spends to make the film, public support adds fuel, and overseas demand adds extra demand while imported inputs are subtracted.",
		},
		{
			helper: "Income approach",
			title: "GDP = wages + profits + interest + rent/royalties",
			body: "Wages go to cast and crew, profits go to producers and studios, interest goes to lenders, and rent/royalties go to rights holders. A movie can be the same activity seen from a different side of the ledger.",
		},
		{
			helper: "Money velocity",
			title: "MV = PQ",
				body: "M = money supply, V = how often money circulates, P = average price level, and Q = quantity of goods/services. A simple story: if the same rupee keeps changing hands faster, more economic value is supported by the same amount of money.",
		},
	];

	return (
		<div className="min-h-screen bg-white text-black">
			<NavigationBar currentPage="macro" />
			<div className="pt-20 px-4 py-8">
				<div className="mx-auto max-w-5xl space-y-8">
					<motion.div className="space-y-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold">Macro level</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900">Movie as National Economic Event</h1>
						<p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">How a single movie ripples through GDP, jobs, and cultural exports.</p>
					</motion.div>

					<motion.div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
						<div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50">
							<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
								<div>
									<div className="text-xs uppercase tracking-[0.35em] text-amber-500 font-semibold mb-2">Open macro</div>
									<h2 className="text-2xl md:text-3xl font-bold text-gray-900">GDP tradeoff: one movie, one economy pulse</h2>
									<p className="mt-2 max-w-3xl text-gray-600">Three clear segments inside one card. Open Expenditure, then Income, then Velocity.</p>
								</div>
								<div className="text-sm text-gray-500">Step {step + 1} / {stepLabels.length}</div>
							</div>
						</div>

						<div className="space-y-8 p-6 md:p-8">
							<div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
								<div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white p-5 md:p-6 shadow-sm">
									<div className="text-xs uppercase tracking-[0.35em] text-amber-500 font-semibold mb-3">Educational reel</div>
									<div className="space-y-3">
										<div className="text-lg font-semibold text-gray-900">{stepNarratives[step].helper}</div>
										<div className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{stepNarratives[step].title}</div>
										<p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl">{stepNarratives[step].body}</p>
										<div className="rounded-2xl border border-white/80 bg-white/80 p-4">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Movie mapping</div>
											<div className="text-sm text-gray-700">
													{step === 0 && "For movies, C can mean audience spending, I can mean production spending, G can mean public support, X can mean overseas demand, and M can mean imported inputs."}
													{step === 1 && "The same film economy can be read as income paid out to workers, studios, lenders, and rights holders."}
													{step === 2 && "The movie example is about circulation speed: how quickly money linked to the film keeps moving through the economy."}
											</div>
										</div>
									</div>
								</div>
								<div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
									<div className="text-xs uppercase tracking-[0.35em] text-gray-400 font-semibold mb-3">Flow map</div>
									<div className="space-y-3">
										{stepLabels.map((label, index) => {
											const active = index === step;
											const done = index < step;
											return (
												<div key={label} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 ${active ? "border-amber-200 bg-amber-50" : done ? "border-gray-200 bg-gray-50" : "border-dashed border-gray-200 bg-white"}`}>
													<div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${active ? "bg-amber-500 text-white" : done ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500"}`}>{index + 1}</div>
													<div>
														<div className="font-semibold text-gray-900">{label}</div>
														<div className="text-xs text-gray-500">{active ? "Open now" : done ? "Complete" : "Coming next"}</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>

							{step === 0 && (
								<motion.div className="space-y-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
									<div className="grid gap-4 md:grid-cols-3">
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Scene</div>
											<div className="text-sm text-gray-700">The expenditure view is the demand side of GDP. We read what people, firms, and government spend on the movie economy.</div>
										</div>
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Lens</div>
											<div className="text-sm text-gray-700">Use the sliders to change C, I, G, X, and M. These are all part of the expenditure formula, so they belong together here.</div>
										</div>
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Question</div>
											<div className="text-sm text-gray-700">How does the movie’s final GDP change when spending, investment, and public support move?</div>
										</div>
									</div>
									<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><Users className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Consumption (C)</span></div><Slider value={consumption} onValueChange={setConsumption} max={1000} min={0} step={10} className="w-full" /><div className="text-2xl font-bold text-gray-900">₹{consumption[0]} Cr</div><p className="text-sm text-gray-600">Tickets, food, merchandise</p></motion.div>
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><Building className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Investment (I)</span></div><Slider value={investment} onValueChange={setInvestment} max={500} min={0} step={10} className="w-full" /><div className="text-2xl font-bold text-gray-900">₹{investment[0]} Cr</div><p className="text-sm text-gray-600">Production equipment, studios</p></motion.div>
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><Globe className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Government (G)</span></div><Slider value={government} onValueChange={setGovernment} max={300} min={0} step={10} className="w-full" /><div className="text-2xl font-bold text-gray-900">₹{government[0]} Cr</div><p className="text-sm text-gray-600">Film commissions, subsidies</p></motion.div>
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><ArrowRight className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Exports (X)</span></div><Slider value={exports} onValueChange={setExports} max={200} min={0} step={5} className="w-full" /><div className="text-2xl font-bold text-gray-900">₹{exports[0]} Cr</div><p className="text-sm text-gray-600">Overseas demand, streaming abroad</p></motion.div>
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2"><ArrowDown className="h-5 w-5 text-gray-500" /><span className="font-semibold text-gray-900">Imports (M)</span></div><Slider value={imports} onValueChange={setImports} max={150} min={0} step={5} className="w-full" /><div className="text-2xl font-bold text-gray-900">₹{imports[0]} Cr</div><p className="text-sm text-gray-600">Imported inputs, foreign equipment</p></motion.div>
									</div>
									<div className="rounded-3xl p-5 bg-amber-50 border border-amber-100">
										<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Result</div>
										<div className="grid gap-4 md:grid-cols-3">
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Expenditure GDP</div><div className="text-2xl font-bold text-gray-900">₹{expenditureGdp} Cr</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Formula reminder</div><div className="text-sm text-gray-700">C + I + G + (X - M)</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Movie lens</div><div className="text-sm text-gray-700">A movie’s GDP effect grows when local spending rises and net exports stay positive.</div></div>
										</div>
									</div>
									<div className="flex justify-end">
										<Button onClick={() => setStep(1)} className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300">
											Next: Income
										</Button>
									</div>
								</motion.div>
							)}

							{step === 1 && (
								<motion.div className="space-y-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
									<div className="grid gap-4 md:grid-cols-3">
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Scene</div>
											<div className="text-sm text-gray-700">The income view is the supply side of GDP. We read who receives the value generated by the movie economy.</div>
										</div>
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Lens</div>
											<div className="text-sm text-gray-700">This is the income side of GDP. Start with the formula, then read the movie as payments flowing to people and institutions.</div>
										</div>
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Question</div>
											<div className="text-sm text-gray-700">Which income channel grows most when the movie scales up?</div>
										</div>
									</div>
									<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
										<div className="space-y-3 p-4 rounded-2xl bg-gray-50 border border-gray-200"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Income / Wages</span></div><div className="text-2xl font-bold text-gray-900">₹{adjustedWages} Cr</div></div>
										<div className="space-y-3 p-4 rounded-2xl bg-gray-50 border border-gray-200"><div className="flex items-center gap-2"><Building className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Income / Profits</span></div><div className="text-2xl font-bold text-gray-900">₹{adjustedProfits} Cr</div></div>
										<div className="space-y-3 p-4 rounded-2xl bg-gray-50 border border-gray-200"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Income / Interest</span></div><div className="text-2xl font-bold text-gray-900">₹{adjustedInterest} Cr</div></div>
										<div className="space-y-3 p-4 rounded-2xl bg-gray-50 border border-gray-200"><div className="flex items-center gap-2"><Globe className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Income / Royalties</span></div><div className="text-2xl font-bold text-gray-900">₹{adjustedRoyalties} Cr</div></div>
									</div>
									<div className="rounded-3xl p-5 bg-amber-50 border border-amber-100">
										<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Result</div>
										<div className="grid gap-4 md:grid-cols-3">
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Income GDP</div><div className="text-2xl font-bold text-gray-900">₹{incomeGdp} Cr</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Formula reminder</div><div className="text-sm text-gray-700">wages + profits + interest + rent/royalties</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Movie lens</div><div className="text-sm text-gray-700">The same movie activity reappears as income paid to people and institutions.</div></div>
										</div>
									</div>
									<div className="flex justify-between gap-3">
										<Button onClick={() => setStep(0)} variant="outline" className="px-6 py-3 rounded-2xl">Back</Button>
										<Button onClick={() => setStep(2)} className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300">Next: Velocity</Button>
									</div>
								</motion.div>
							)}

							{step === 2 && (
								<motion.div className="space-y-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
									<div className="grid gap-4 md:grid-cols-3">
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Scene</div>
											<div className="text-sm text-gray-700">Velocity is the circulation story. It asks how many times the movie-linked money changes hands in the economy.</div>
										</div>
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Lens</div>
											<div className="text-sm text-gray-700">This is the money-circulation side of macroeconomics. Exports and imports are not part of this slide because velocity is about turnover, not trade flow.</div>
										</div>
										<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
											<div className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mb-2">Question</div>
											<div className="text-sm text-gray-700">If the same movie money circulates faster, how much larger is the nominal value story?</div>
										</div>
									</div>
									<div className="grid gap-4 lg:grid-cols-3">
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}>
											<div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Money supply (M)</span></div>
											<Slider value={moneySupply} onValueChange={setMoneySupply} max={5000} min={100} step={100} className="w-full" />
											<div className="text-2xl font-bold text-gray-900">₹{moneySupply[0]} Cr</div>
											<p className="text-sm text-gray-600">The pool of movie-linked money available to circulate</p>
										</motion.div>
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}>
											<div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Price level (P)</span></div>
											<Slider value={priceLevel} onValueChange={setPriceLevel} max={10} min={1} step={0.5} className="w-full" />
											<div className="text-2xl font-bold text-gray-900">{priceLevel[0]}</div>
											<p className="text-sm text-gray-600">The average price level of movie goods and services</p>
										</motion.div>
										<motion.div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200" whileHover={{ scale: 1.01 }}>
											<div className="flex items-center gap-2"><Film className="h-5 w-5 text-amber-500" /><span className="font-semibold text-gray-900">Quantity (Q)</span></div>
											<Slider value={quantity} onValueChange={setQuantity} max={1000} min={50} step={25} className="w-full" />
											<div className="text-2xl font-bold text-gray-900">{quantity[0]}</div>
											<p className="text-sm text-gray-600">The number of movie goods/services being traded</p>
										</motion.div>
									</div>
									<div className="rounded-3xl p-5 bg-amber-50 border border-amber-100">
										<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Result</div>
										<div className="grid gap-4 md:grid-cols-3">
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Velocity GDP</div><div className="text-2xl font-bold text-gray-900">₹{velocityGdp} Cr</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Formula reminder</div><div className="text-sm text-gray-700">M × V = P × Q</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Movie lens</div><div className="text-sm text-gray-700">The same movie economy can be read as money, price level, and quantity moving together.</div></div>
										</div>
									</div>
									<div className="rounded-3xl p-5 bg-amber-50 border border-amber-100">
										<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Movie mapping</div>
										<div className="grid gap-4 md:grid-cols-3">
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">What the formula says</div><div className="text-2xl font-bold text-gray-900">MV = PQ</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">What it means here</div><div className="text-sm text-gray-700">Movie money keeps moving through tickets, wages, vendors, and reinvestment.</div></div>
											<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Nominal value lens</div><div className="text-2xl font-bold text-gray-900">₹{velocityGdp} Cr</div></div>
										</div>
									</div>
									<div className="flex justify-between gap-3">
										<Button onClick={() => setStep(1)} variant="outline" className="px-6 py-3 rounded-2xl">Back</Button>
										<Button onClick={() => setStep(0)} className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300">Restart</Button>
									</div>
								</motion.div>
							)}
						</div>
					</motion.div>
				</div>
			</div>
			<Footer />
		</div>
	);
}