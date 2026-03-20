"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, Users, Heart, Globe, MessageCircle, Star, Eye, Sparkles, Megaphone, Shield, Languages, Layers, Flame, RadioTower, Clapperboard, Megaphone as Loudspeaker, Camera, PlayCircle } from "lucide-react";
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
					<Link href="/"><Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900"><Home className="h-4 w-4 mr-2" />Home</Button></Link>
					<div className="h-4 w-px bg-gray-300" />
					<div className="flex items-center gap-2">
						{perspectives.map((p) => (<Link key={p.id} href={p.path}><Button variant={p.id === currentPage ? "default" : "ghost"} size="sm" className={`text-xs px-3 py-1 ${p.id === currentPage ? "bg-amber-500 hover:bg-amber-600 text-white" : "text-gray-600 hover:text-gray-900"}`}>{p.name}</Button></Link>))}
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

export default function CommunityPage() {
	const [laborHours, setLaborHours] = React.useState([50000]);
	const [wagePool, setWagePool] = React.useState([200]);
	const [buzzHours, setBuzzHours] = React.useState([100000]);
	const [hypeHours, setHypeHours] = React.useState([500000]);
	const [launchHours, setLaunchHours] = React.useState([2000000]);
	const [releaseHours, setReleaseHours] = React.useState([10000000]);
	const [reviewHours, setReviewHours] = React.useState([3000000]);

	const [globalReach, setGlobalReach] = React.useState([50]);
	const [nationalIdentity, setNationalIdentity] = React.useState([80]);
	const [stateIdentity, setStateIdentity] = React.useState([60]);
	const [languageIdentity, setLanguageIdentity] = React.useState([70]);
	const [step, setStep] = React.useState(0);

	const totalAudienceHours = buzzHours[0] + hypeHours[0] + launchHours[0] + releaseHours[0] + reviewHours[0];
	const attentionMultiplier = laborHours[0] > 0 ? totalAudienceHours / laborHours[0] : 0;
	const averageHourlyWage = laborHours[0] > 0 ? (wagePool[0] * 10000000) / laborHours[0] : 0;
	const communityScore = Math.round((globalReach[0] + nationalIdentity[0] + stateIdentity[0] + languageIdentity[0]) / 4);
	const socialValue = Math.round((totalAudienceHours / 100000) * 12 + communityScore * 8);
	const signalNotes = [
		{ icon: MessageCircle, title: "Conversations", body: "How much the movie gets talked about in homes, groups, and workplaces." },
		{ icon: Sparkles, title: "Cultural memory", body: "Whether the movie becomes a reference point people keep returning to." },
		{ icon: Shield, title: "Belonging", body: "How strongly the movie supports shared identity and continuity." },
	];
	const signalChain = [
		{ icon: Clapperboard, label: "Individual creation", note: "Director, writer, and early creative vision." },
		{ icon: Users, label: "Team production", note: "Cast, crew, design, and collaboration." },
		{ icon: Loudspeaker, label: "Marketing pulse", note: "Trailer, posters, interviews, anticipation." },
		{ icon: PlayCircle, label: "Theatrical release", note: "Shared attention in the room." },
		{ icon: RadioTower, label: "Cultural amplification", note: "Reviews, social chatter, and public memory." },
	];
	const stepLabels = ["Attention", "Identity", "Signal"];
	const identityCards = [
		{ icon: Globe, title: "Global Identity", value: globalReach, max: 100, note: "Diaspora, festivals, and cross-border recognition." },
		{ icon: Layers, title: "National Identity", value: nationalIdentity, max: 100, note: "Shared symbols and public narratives." },
		{ icon: Eye, title: "State / Regional Identity", value: stateIdentity, max: 100, note: "Local language, place, and regional memory." },
		{ icon: Languages, title: "Language Identity", value: languageIdentity, max: 100, note: "Plural voices, dialects, and linguistic pride." },
	];

	return (
		<div className="min-h-screen bg-white text-black overflow-x-hidden">
			<NavigationBar currentPage="community" />
			<div className="pt-20 px-0 sm:px-4 py-8">
				<div className="mx-auto w-full max-w-5xl space-y-8 px-0 sm:px-0">
					<motion.div className="space-y-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold">Community level</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900">Community Impact</h1>
						<p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">How a movie turns into shared feeling, shared talk, and shared identity.</p>
					</motion.div>

					<motion.div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
						<div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50">
							<div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
								<div>
									<div className="text-xs uppercase tracking-[0.35em] text-amber-500 font-semibold mb-2">Open community</div>
									<h2 className="text-2xl md:text-3xl font-bold text-gray-900">Three surfaces for community meaning</h2>
									<p className="mt-2 max-w-3xl text-gray-600">Each surface isolates a different layer: who creates, who gathers, and how that becomes shared identity.</p>
								</div>
								<div className="text-sm text-gray-500">Live view</div>
							</div>
						</div>

						<div className="space-y-8 p-6 md:p-8">
							<div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
								<div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white p-5 md:p-6 shadow-sm">
									<div className="text-xs uppercase tracking-[0.35em] text-amber-500 font-semibold mb-3">Community reel</div>
									<div className="space-y-3">
										<div className="text-lg font-semibold text-gray-900">{stepLabels[step]}</div>
										<div className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
											{step === 0 && "Who creates the shared pulse?"}
											{step === 1 && "What identities does the film gather?"}
											{step === 2 && "How does attention become cultural memory?"}
										</div>
										<p className="text-sm md:text-base text-gray-700 leading-relaxed">
											{step === 0 && "Start with labor and attention asymmetry. This is the entry point: the visible work versus the invisible audience energy it creates."}
											{step === 1 && "Then look at how the movie gathers identity across global, national, regional, and language layers."}
											{step === 2 && "Finally, see how those signals become memory, belonging, and a broader communal effect."}
										</p>
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
							<section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
								<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold"><Megaphone className="h-4 w-4" />Surface 1 · Attention asymmetry</div>
								<div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
									<div>
										<p className="text-sm text-gray-600 mb-4">Paid labor is visible; audience attention is often unpaid. This is the imbalance community turns into cultural value.</p>
										<div className="space-y-3">
											<div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
												<div className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">Paid labor</div>
												<div className="text-3xl font-bold text-gray-900">{laborHours[0].toLocaleString()} hrs</div>
												<div className="text-sm text-gray-600 mt-1">The work that creates the movie and supports the community around it.</div>
											</div>
											<div className="rounded-2xl bg-white border border-gray-200 p-4">
												<div className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold mb-2">Audience attention</div>
												<div className="text-3xl font-bold text-gray-900">{totalAudienceHours.toLocaleString()} hrs</div>
												<div className="text-sm text-gray-600 mt-1">Buzz, hype, release reach, and reviews combined.</div>
											</div>
											<div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
												<div className="flex items-center gap-2 mb-2"><Heart className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Wage pool</span></div>
												<div className="text-2xl font-bold text-gray-900">₹{wagePool[0]} Cr</div>
												<div className="text-sm text-gray-600 mt-1">How the social cost of creation is held together.</div>
											</div>
										</div>
									</div>
									<div className="space-y-4">
										<motion.div className="rounded-2xl bg-gray-50 border border-gray-200 p-4" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2 mb-2"><MessageCircle className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Buzz</span></div><Slider value={buzzHours} onValueChange={setBuzzHours} max={500000} min={50000} step={25000} className="w-full" /><div className="text-xl font-bold text-gray-900">{buzzHours[0].toLocaleString()} hrs</div></motion.div>
										<motion.div className="rounded-2xl bg-gray-50 border border-gray-200 p-4" whileHover={{ scale: 1.01 }}><div className="flex items-center gap-2 mb-2"><Star className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Hype</span></div><Slider value={hypeHours} onValueChange={setHypeHours} max={2000000} min={100000} step={50000} className="w-full" /><div className="text-xl font-bold text-gray-900">{hypeHours[0].toLocaleString()} hrs</div></motion.div>
									</div>
								</div>
								<div className="flex justify-end">
									<Button onClick={() => setStep(1)} className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300">Next: Identity</Button>
								</div>
							</section>
							)}

							{step === 1 && (
							<section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
								<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold"><Layers className="h-4 w-4" />Surface 2 · Identity layers</div>
								<div className="grid gap-4 md:grid-cols-2">
									{identityCards.map((card) => {
										const Icon = card.icon;
										const updater = card.title === "Global Identity" ? setGlobalReach : card.title === "National Identity" ? setNationalIdentity : card.title === "State / Regional Identity" ? setStateIdentity : setLanguageIdentity;
										return (
											<motion.div key={card.title} className="rounded-2xl bg-gray-50 border border-gray-200 p-4" whileHover={{ scale: 1.01 }}>
												<div className="flex items-center gap-2 mb-2"><Icon className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">{card.title}</span></div>
												<Slider value={card.value} onValueChange={updater} max={card.max} min={0} step={5} className="w-full" />
												<div className="text-2xl font-bold text-gray-900">{card.value[0]}%</div>
												<p className="text-xs text-gray-500 mt-1">{card.note}</p>
											</motion.div>
										);
									})}
								</div>
								<div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
									<div className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold mb-2">Community identity score</div>
									<div className="text-3xl font-bold text-gray-900">{communityScore}%</div>
									<div className="text-sm text-gray-600 mt-1">A simple average of the identity layers above.</div>
								</div>
								<div className="flex justify-between gap-3">
									<Button onClick={() => setStep(0)} variant="outline" className="px-6 py-3 rounded-2xl">Back</Button>
									<Button onClick={() => setStep(2)} className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300">Next: Signal</Button>
								</div>
							</section>
							)}

							{step === 2 && (
							<section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
								<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold"><Flame className="h-4 w-4" />Surface 3 · Collective signal</div>
								<div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
									<div className="space-y-4">
										<div className="rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 p-5 shadow-sm">
											<div className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">Amplification effect</div>
											<div className="text-3xl font-bold text-gray-900 mb-2">{attentionMultiplier.toFixed(1)}x</div>
											<div className="text-sm text-gray-600">How much audience attention grows relative to the paid creative effort.</div>
										</div>
										<div className="rounded-3xl bg-gray-50 border border-gray-200 p-5 shadow-sm">
											<div className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold mb-2">Collective cultural impact</div>
											<div className="text-3xl font-bold text-gray-900">{socialValue}</div>
											<div className="text-sm text-gray-600 mt-1">A story index for reach, identity, and shared memory.</div>
										</div>
									</div>
									<div className="space-y-3">
										<div className="rounded-2xl bg-white border border-gray-200 p-4">
											<div className="flex items-center gap-2 mb-2"><Sparkles className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Cultural memory</span></div>
											<div className="text-sm text-gray-600">The movie moves from a single act into shared symbol, repeated talk, and public recall.</div>
										</div>
										<div className="relative rounded-3xl border border-gray-200 bg-white p-5 overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50/40 to-white" />
											<div className="relative">
												<div className="flex items-center justify-center mb-6">
													<div className="w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg text-3xl">🎬</div>
												</div>
												<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
													{signalChain.map((node, index) => {
														const Icon = node.icon;
														return (
															<div key={node.label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
																<div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center mb-3"><Icon className="h-4 w-4" /></div>
																<div className="font-semibold text-gray-900">{node.label}</div>
																<div className="text-xs text-gray-500 mt-1 leading-relaxed">{node.note}</div>
																<div className="mt-3 text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">0{index + 1}</div>
															</div>
														);
													})}
												</div>
											</div>
										</div>
										<div className="grid gap-3 md:grid-cols-3">
											{signalNotes.map((note) => {
												const Icon = note.icon;
												return (
													<div key={note.title} className="rounded-2xl bg-white border border-gray-200 p-3">
														<div className="flex items-center gap-2 mb-2"><Icon className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900 text-sm">{note.title}</span></div>
														<div className="text-xs text-gray-500 leading-relaxed">{note.body}</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
								<div className="flex justify-between gap-3">
									<Button onClick={() => setStep(1)} variant="outline" className="px-6 py-3 rounded-2xl">Back</Button>
									<Button onClick={() => setStep(0)} variant="outline" className="px-6 py-3 rounded-2xl">Restart</Button>
								</div>
							</section>
							)}

							{step === 2 && (
								<div className="rounded-3xl p-5 bg-amber-50 border border-amber-100">
									<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold mb-3">Community result</div>
									<div className="grid gap-4 md:grid-cols-3">
										<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Attention multiplier</div><div className="text-2xl font-bold text-gray-900">{attentionMultiplier.toFixed(1)}x</div></div>
										<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Average hourly wage</div><div className="text-2xl font-bold text-gray-900">₹{Math.round(averageHourlyWage)}</div></div>
										<div className="rounded-2xl bg-white p-4 border border-gray-200"><div className="text-xs text-gray-500">Audience hours</div><div className="text-2xl font-bold text-gray-900">{totalAudienceHours.toLocaleString()}</div></div>
									</div>
								</div>
							)}
						</div>
					</motion.div>
				</div>
			</div>
			<Footer />
		</div>
	);
}