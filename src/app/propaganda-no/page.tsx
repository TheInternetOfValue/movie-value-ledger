"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowLeft, Twitter, Instagram } from "lucide-react";
import { TwitterEmbed, InstagramEmbed, SocialScripts } from "@/components/SocialEmbeds";

const tweetUrls = [
	"https://x.com/ssrajamouli/status/2035210972089262351",
	"https://x.com/RGVzoomin/status/2034866391233569218",
	"https://x.com/RGVzoomin/status/2034107545783308451",
];

const voices = [
	{
		platform: "Twitter",
		icon: Twitter,
		user: "@NostalgicCinephile",
		content: "Why can't we just enjoy a movie for once? This is pure art. Storytelling at its finest. #CinemaRocks",
		color: "text-blue-400",
	},
	{
		platform: "Instagram",
		icon: Instagram,
		user: "movie_magic",
		content: "Saw it twice! The emotions, the music, the story. It doesn't have an agenda; it has a soul. Stop overanalyzing everything.",
		color: "text-pink-500",
	},
];

export default function PropagandaNoPage() {
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
						<Heart className="h-12 w-12 text-emerald-500" />
						<h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-emerald-500">
							NO
						</h1>
					</div>
					<p className="text-xl text-emerald-200/60 max-w-2xl leading-relaxed">
						"Art is the only thing that doesn't have to be anything but itself."
					</p>
				</header>

				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
					{/* Column 1: Expert Signals */}
					<div className="space-y-8">
						<h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4">
							Social Sentiment / Feeling
						</h2>
						{voices.map((voice, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: i * 0.1 }}
								className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-2xl space-y-4 shadow-[0_4px_20px_rgba(16,185,129,0.1)]"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<voice.icon className={`h-5 w-5 ${voice.color}`} />
										<span className="font-bold text-sm tracking-tight">
											{voice.user}
										</span>
									</div>
									<span className="text-[10px] uppercase tracking-widest text-white/20 font-black">
										{voice.platform}
									</span>
								</div>
								<p className="text-lg text-white/80 leading-relaxed font-serif italic">
									"{voice.content}"
								</p>
							</motion.div>
						))}

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="p-6 border border-emerald-500/20 rounded-3xl bg-emerald-950/5 mt-12"
						>
							<h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4">
								A Cinematic Mirror
							</h3>
							<p className="text-white/60 text-sm leading-relaxed">
								Fans argue that the film reflects human struggle and community identity without the need for extraction or external agendas.
							</p>
						</motion.div>
					</div>

					{/* Columns 2 & 3: Twitter Embeds */}
					<div className="md:col-span-1 lg:col-span-2 space-y-8">
						<h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 border-b border-white/10 pb-4">
							Praise from the Industry (Live Tweets)
						</h2>
						<div className="grid gap-6 lg:grid-cols-1">
							{tweetUrls.map((url, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.2 + i * 0.1 }}
									className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 p-2"
								>
									<TwitterEmbed url={url} />
								</motion.div>
							))}
						</div>
					</div>
				</div>

				<div className="pt-12 border-t border-white/10 text-center">
					<p className="text-sm text-white/40 mb-6 uppercase tracking-widest underline underline-offset-8 decoration-emerald-500/30">
						Is raw feeling enough to ignore systemic impact?
					</p>
					<Link
						href="/systems-pov"
						className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-emerald-500 transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
					>
						Explore the Systems Math{" "}
						<ArrowLeft className="h-4 w-4 rotate-180" />
					</Link>
				</div>
			</div>
		</div>
	);
}
