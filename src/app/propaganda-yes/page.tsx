"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Twitter, Instagram, ExternalLink } from "lucide-react";
import { InstagramEmbed, SocialScripts } from "@/components/SocialEmbeds";

const voices = [
	{
		platform: "Twitter",
		icon: Twitter,
		user: "@SystemCritic",
		content: "The timing of this release isn't accidental. It's a textbook case of soft-power projection through high-budget cinema. #Agenda2026",
		color: "text-blue-400",
	},
	{
		platform: "Instagram",
		icon: Instagram,
		user: "cinematic_truth",
		content: "Notice the specific color grading during the political segments. Subliminal messaging is at an all-time high here. Wake up people!",
		color: "text-pink-500",
	},
];

const links = [
	{
		title: "Newslaundry: Review on The Hollywood Reporter Vanishes",
		url: "https://www.newslaundry.com/2025/12/09/dhurandhar-review-on-the-hollywood-reporter-vanishes",
		desc: "Critical analysis of the film's media reception.",
	},
	{
		title: "The Caravan: Film Critics on Dhurandhar",
		url: "https://caravanmagazine.in/film/dhurandhar-film-critics",
		desc: "A deep dive into the political undertones of the narrative.",
	},
];

const instaUrls = [
	"https://www.instagram.com/p/DWCfSlbkllw/",
	"https://www.instagram.com/p/DSeyKEfFswy/",
	"https://www.instagram.com/p/DWELywqEo32/",
	"https://www.instagram.com/p/DWIgToIjTxG/",
];

export default function PropagandaYesPage() {
	return (
		<div className="min-h-screen bg-black text-white p-8 md:p-16 flex flex-col items-center">
			<SocialScripts />
			<div className="w-full max-w-6xl space-y-12">
				<Link
					href="/"
					className="inline-flex items-center text-white/40 hover:text-white transition-colors gap-2 uppercase text-xs tracking-widest font-bold"
				>
					<ArrowLeft className="h-4 w-4" /> Back to Interrogation
				</Link>

				<header className="space-y-4">
					<div className="flex items-center gap-4">
						<ShieldAlert className="h-12 w-12 text-red-500" />
						<h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-red-500">
							YES
						</h1>
					</div>
					<p className="text-xl text-red-200/60 max-w-2xl leading-relaxed">
						"Everything is political. Every frame is a choice. Every choice is an
						instruction."
					</p>
				</header>

				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
					{/* Column 1: Articles */}
					<div className="space-y-8">
						<h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4">
							Critical Investigations
						</h2>
						{links.map((link, i) => (
							<motion.a
								key={i}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: i * 0.1 }}
								className="block group bg-red-950/20 border border-red-900/40 p-6 rounded-2xl hover:bg-red-900/40 transition-all hover:border-red-500/50"
							>
								<div className="flex justify-between items-start mb-2">
									<h3 className="font-bold text-lg leading-tight group-hover:text-red-400 transition-colors">
										{link.title}
									</h3>
									<ExternalLink className="h-4 w-4 text-white/20 group-hover:text-red-400" />
								</div>
								<p className="text-sm text-white/40 leading-relaxed">
									{link.desc}
								</p>
							</motion.a>
						))}

						<h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4 mt-12">
							Expert Signals
						</h2>
						{voices.map((voice, i) => (
							<div
								key={i}
								className="bg-red-950/10 border border-white/5 p-6 rounded-2xl space-y-3"
							>
								<div className="flex items-center gap-3">
									<voice.icon className={`h-4 w-4 ${voice.color}`} />
									<span className="font-bold text-xs tracking-tight">
										{voice.user}
									</span>
								</div>
								<p className="text-sm text-white/60 leading-relaxed italic">
									"{voice.content}"
								</p>
							</div>
						))}
					</div>

					{/* Column 2 & 3: Embeds */}
					<div className="md:col-span-1 lg:col-span-2 space-y-8">
						<h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4">
							Social Interrogations (Live)
						</h2>
						<div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
							{instaUrls.map((url, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.2 + i * 0.1 }}
									className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2"
								>
									<InstagramEmbed url={url} />
								</motion.div>
							))}
						</div>
					</div>
				</div>

				<div className="pt-12 border-t border-white/10 text-center">
					<p className="text-sm text-white/40 mb-6 uppercase tracking-widest">
						Is the narrative constructed or discovered?
					</p>
					<Link
						href="/systems-pov"
						className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-red-500 transition-all hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
					>
						Analyze the System Impact{" "}
						<ArrowLeft className="h-4 w-4 rotate-180" />
					</Link>
				</div>
			</div>
		</div>
	);
}
