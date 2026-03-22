"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Users, Globe, MessageCircle, Sparkles, Shield, Languages, Layers, Eye, Clapperboard, RadioTower, PlayCircle, Megaphone as Loudspeaker, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

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
		<>
			<NavigationBar currentPage="community" />
			
			{/* Cinematic Highlight */}
			<div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.1)_0%,transparent_50%)]" />

			<main className="flex-grow w-full max-w-[1400px] mx-auto px-6 pt-32 pb-24 relative z-10 space-y-16">
				<motion.div 
					className="space-y-8"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className="flex items-center gap-4 text-amber-500/60 uppercase tracking-[0.4em] text-[10px] font-black">
						<Users className="h-4 w-4" />
						Collective Scale / Social Fabric
					</div>
					<h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase max-w-4xl opacity-90 drop-shadow-2xl">
						Shared <br/><span className="text-white/20 outline-text">Community Impact</span>
					</h1>
				</motion.div>

				<div className="grid lg:grid-cols-12 gap-10">
					{/* Progress Sidebar */}
					<div className="lg:col-span-3 space-y-6">
						<div className="dossier-card p-8 space-y-8 border-amber-500/10">
							<div className="space-y-1">
								<span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase block">Analysis Stage</span>
								<div className="text-2xl font-black text-white uppercase tracking-tighter">{stepLabels[step]}</div>
							</div>

							<div className="space-y-3">
								{stepLabels.map((label, index) => (
									<div key={label} className={cn(
										"flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
										index === step ? "bg-amber-500/10 border-amber-500/40" : index < step ? "bg-white/5 border-white/10 opacity-60" : "bg-transparent border-white/5 opacity-30"
									)} onClick={() => setStep(index)}>
										<div className={cn(
											"h-8 w-8 rounded-full flex items-center justify-center text-xs font-black",
											index === step ? "bg-amber-500 text-black" : "bg-white/10 text-white"
										)}>{index + 1}</div>
										<span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
									</div>
								))}
							</div>

							<div className="pt-8 border-t border-white/5 space-y-4">
								<div className="space-y-1">
									<span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase block">Community Score</span>
									<div className="text-4xl font-black text-amber-500 dossier-number">{communityScore}</div>
								</div>
								<div className="space-y-1">
									<span className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase block">Social Value Est.</span>
									<div className="text-4xl font-black text-white dossier-number">{socialValue}</div>
								</div>
							</div>
						</div>

						<div className="dossier-card p-6 bg-amber-500/5 border-amber-500/10">
							<p className="text-[10px] text-amber-500/60 font-mono uppercase leading-relaxed tracking-tight">
								This model quantifies the transition of private creative labor into public cultural memory.
							</p>
						</div>
					</div>

					{/* Content Area */}
					<div className="lg:col-span-9 space-y-8">
						<motion.div 
							key={step}
							className="dossier-card p-10 md:p-14 space-y-12"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
						>
							<div className="flex items-center justify-between border-b border-white/5 pb-8">
								<div className="space-y-2">
									<div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">Surface 0{step + 1}</div>
									<h2 className="text-4xl font-black text-white uppercase tracking-tighter">
										{step === 0 && "Attention Asymmetry"}
										{step === 1 && "Identity Gathering"}
										{step === 2 && "Signal Amplification"}
									</h2>
								</div>
								<div className="hidden md:block">
									<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] text-right mb-2">Perspective</div>
									<div className="text-xs font-mono text-white/40 uppercase tracking-widest">Live Systemic Entry</div>
								</div>
							</div>

							{step === 0 && (
								<div className="space-y-12">
									<div className="grid md:grid-cols-2 gap-12">
										<div className="space-y-8">
											<div className="space-y-4">
												<span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase block">Paid Creative Labor</span>
												<div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-4">
													<div className="text-4xl font-black text-white dossier-number">{laborHours[0].toLocaleString()} <span className="text-sm opacity-30">HRS</span></div>
													<Slider value={laborHours} onValueChange={setLaborHours} max={200000} step={100} className="py-4" />
													<p className="text-[10px] text-white/30 font-mono uppercase">Direct production man-hours</p>
												</div>
											</div>
											<div className="space-y-4">
												<span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase block">Invisible Audience Attention</span>
												<div className="p-8 bg-amber-500/5 rounded-3xl border border-amber-500/10 space-y-4">
													<div className="text-4xl font-black text-amber-500 dossier-number">{totalAudienceHours.toLocaleString()} <span className="text-sm opacity-30">HRS</span></div>
													<div className="flex gap-2 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
														<div className="h-full bg-amber-500" style={{ width: '60%' }} />
													</div>
													<p className="text-[10px] text-white/30 font-mono uppercase">Cumulative engagement (Buzz + Review)</p>
												</div>
											</div>
										</div>

										<div className="space-y-10">
											<div className="p-10 bg-white/[0.02] rounded-[2.5rem] border border-white/5 space-y-6">
												<span className="text-[11px] font-black text-white uppercase tracking-[0.5em] block border-b border-white/5 pb-4">Multiplication Force</span>
												<div className="flex items-end gap-4">
													<div className="text-[64px] font-black text-white leading-none dossier-number">{attentionMultiplier.toFixed(1)}<span className="text-2xl text-white/20 ml-2">x</span></div>
													<p className="text-[11px] text-white/40 font-mono uppercase mb-2 leading-relaxed">
														For every hour of production, the community generates {attentionMultiplier.toFixed(1)} hours of shared focus.
													</p>
												</div>
											</div>
											<div className="grid gap-4">
												{signalChain.map((item, idx) => (
													<div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-amber-500/20 transition-all">
														<div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-amber-500 transition-colors">
															<item.icon className="h-5 w-5" />
														</div>
														<div className="space-y-0.5">
															<div className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</div>
															<div className="text-[9px] text-white/20 font-mono uppercase">{item.note}</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							)}

							{step === 1 && (
								<div className="grid md:grid-cols-2 gap-8">
									{identityCards.map((card, idx) => (
										<div key={idx} className="p-10 bg-white/[0.02] rounded-[2.5rem] border border-white/5 space-y-8 group hover:border-amber-500/20 transition-all">
											<div className="flex items-center justify-between">
												<div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-amber-500 group-hover:text-black transition-all">
													<card.icon className="h-7 w-7" />
												</div>
												<div className="text-4xl font-black text-white dossier-number">{card.value[0]}%</div>
											</div>
											<div className="space-y-2">
												<h4 className="text-xl font-black text-white uppercase tracking-tighter">{card.title}</h4>
												<p className="text-[11px] text-white/30 font-mono uppercase leading-relaxed">{card.note}</p>
											</div>
											<Slider 
												value={card.value} 
												onValueChange={(v) => {
													if (idx === 0) setGlobalReach(v);
													if (idx === 1) setNationalIdentity(v);
													if (idx === 2) setStateIdentity(v);
													if (idx === 3) setLanguageIdentity(v);
												}} 
												max={100} 
											/>
										</div>
									))}
								</div>
							)}

							{step === 2 && (
								<div className="space-y-12">
									<div className="grid md:grid-cols-3 gap-8">
										{signalNotes.map((note, idx) => (
											<div key={idx} className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 space-y-6">
												<note.icon className="h-8 w-8 text-amber-500/40" />
												<div className="space-y-2">
													<h4 className="text-lg font-black text-white uppercase tracking-tighter">{note.title}</h4>
													<p className="text-[11px] text-white/30 font-mono uppercase leading-relaxed">{note.body}</p>
												</div>
											</div>
										))}
									</div>
									<div className="p-10 md:p-16 bg-gradient-to-br from-amber-500/[0.08] to-transparent rounded-[3rem] border border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-12 text-left transition-all hover:bg-amber-500/[0.12] group">
										<div className="space-y-6 max-w-2xl text-center md:text-left">
											<div className="space-y-2">
												<div className="text-[11px] font-black text-amber-500/60 uppercase tracking-[0.6em]">Final Scale</div>
												<h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">The Human <br/><span className="text-white/10 outline-text">Perspective</span></h2>
											</div>
											<p className="text-sm md:text-base text-white/40 font-mono leading-relaxed uppercase tracking-tight">
												Systems, firms, and communities are built from individual choices. Calculate your own wellbeing ROI.
											</p>
										</div>
										<Button asChild className="h-24 px-12 rounded-3xl bg-amber-500 text-black font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-[0_0_40px_rgba(245,158,11,0.2)] group shrink-0">
											<Link href="/individual" className="flex items-center gap-6">
												Open Ledger
												<ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-2" />
											</Link>
										</Button>
									</div>
								</div>
							)}

							<div className="flex items-center justify-between pt-10 border-t border-white/5">
								<Button 
									variant="ghost" 
									onClick={() => setStep(Math.max(0, step - 1))}
									disabled={step === 0}
									className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white"
								>
									<ChevronLeft className="h-4 w-4 mr-2" /> Back
								</Button>
								<div className="flex gap-2">
									{stepLabels.map((_, i) => (
										<div key={i} className={cn("h-1.5 w-8 rounded-full transition-all", i === step ? "bg-amber-500 w-12" : "bg-white/10")} />
									))}
								</div>
								<Button 
									onClick={() => setStep(Math.min(2, step + 1))}
									disabled={step === 2}
									className="bg-white/10 text-white hover:bg-white/20 text-[10px] font-black uppercase tracking-[0.3em]"
								>
									Next <ChevronRight className="h-4 w-4 ml-2" />
								</Button>
							</div>
						</motion.div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}