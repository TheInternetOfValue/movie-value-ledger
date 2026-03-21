"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavigationBar } from "@/components/NavigationBar";
import {
	BookOpen,
	HelpCircle,
	ShieldCheck,
	Sparkles,
	FileText,
	Layers,
	ArrowRight,
} from "lucide-react";

const faqGroups = [
	{
		title: "For first-time visitors",
		items: [
			{
				question: "What is this app, in plain words?",
				answer: "It is a movie-first way to explore how a film affects a person, a business, a community, and the wider economy.",
			},
			{
				question: "Do I need to understand economics to use it?",
				answer: "No. The app should make the idea understandable through simple language, visuals, and guided steps.",
			},
			{
				question: "What are the main pages?",
				answer: "Individual, Micro, Macro, and Community. Each page tells one part of the same story.",
			},
		],
	},
	{
		title: "How to read the numbers",
		items: [
			{
				question: "Are all the numbers exact?",
				answer: "No. Some are exact formulas, like the macro identities. Others are story indicators that help people understand the experience.",
			},
			{
				question: "Why use movies?",
				answer: "Because movies are emotional, social, and easy to remember. They make complex ideas feel concrete.",
			},
			{
				question: "What should I trust most?",
				answer: "Trust the labels, the formula structure, and the notes that say whether something is a canonical measure or a story metric.",
			},
		],
	},
	{
		title: "Still being refined",
		items: [
			{
				question: "What is still changing?",
				answer: "The exact wording of some story metrics, the helper text, and the way we explain the logic to new users.",
			},
			{
				question: "Should I treat this as financial advice or a strict economic ledger?",
				answer: "No. It is a storytelling and translation layer. The real accounting and protocol truth stay in the underlying canon and docs.",
			},
		],
	},
];

const assumptions = [
	"The front end is a translation layer, not a replacement for the spec.",
	"Storytelling is allowed, but the underlying economics and protocol logic should remain honest.",
	"A movie can be read as a personal, business, macroeconomic, and communal event at the same time.",
	"Some metrics are exact identities; others are qualitative indicators designed to help people understand the experience.",
	"All wellbeing-related displays should remain normalized around 1.0 in the live model.",
];

export default function AboutPage() {
	return (
		<main className="dossier-bg min-h-screen text-white pb-32">
			<NavigationBar currentPage="about" />
			
			<div className="mx-auto max-w-7xl px-6 pt-32">
				{/* Header Section */}
				<div className="mb-20 space-y-8">
					<div className="flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">
						<Layers className="h-4 w-4" />
						Project Reference / Documentation
					</div>
					
					<h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase">
						The <br/><span className="text-white/10 outline-text">System Logic</span>
					</h1>

					<div className="dossier-card p-10 border-white/5 bg-amber-500/5 max-w-3xl">
						<p className="text-sm md:text-xl text-white/60 font-medium leading-relaxed">
							The goal is <span className="text-white font-black underline decoration-amber-500/50 underline-offset-4">honesty</span>. We keep the story rich and visual, but never hide the logic. If a number is a story metric, it says so. If a formula is canonical, it stays canonical.
						</p>
					</div>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 mb-32">
					<Link href="/whitepaper" className="group">
						<div className="dossier-card p-10 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all h-full flex flex-col justify-between group">
							<div className="space-y-6">
								<BookOpen className="h-10 w-10 text-amber-500" />
								<h3 className="text-3xl font-black uppercase tracking-tighter">IoV Whitepaper</h3>
								<p className="text-white/40 leading-relaxed uppercase text-xs tracking-widest font-mono">
									The core protocol definitions, wellbeing battery math, and value capture mechanics.
								</p>
							</div>
							<ArrowRight className="h-6 w-6 text-white/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all mt-10" />
						</div>
					</Link>

					<div className="grid gap-8">
						<Link href="/faq" className="group">
							<div className="dossier-card p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex items-center justify-between group">
								<div className="flex items-center gap-6">
									<HelpCircle className="h-8 w-8 text-amber-500/60" />
									<div className="space-y-1">
										<h3 className="text-xl font-black uppercase tracking-tighter">FAQ</h3>
										<p className="text-[10px] text-white/30 uppercase tracking-widest">Common questions & app usage</p>
									</div>
								</div>
								<ArrowRight className="h-4 w-4 text-white/10 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
							</div>
						</Link>

						<Link href="/debate" className="group">
							<div className="dossier-card p-8 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-center justify-between group">
								<div className="flex items-center gap-6">
									<Layers className="h-8 w-8 text-amber-500/40" />
									<div className="space-y-1">
										<h3 className="text-xl font-black uppercase tracking-tighter text-white/60">The Debate</h3>
										<p className="text-[10px] text-white/20 uppercase tracking-widest">Conflicting views on system value</p>
									</div>
								</div>
								<ArrowRight className="h-4 w-4 text-white/10 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
							</div>
						</Link>
					</div>
				</div>

				{/* FAQ Section */}
				<div className="space-y-16">
					<div className="flex items-center gap-4">
						<div className="h-px flex-1 bg-white/5" />
						<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">System Diagnostics / FAQ</div>
						<div className="h-px flex-1 bg-white/5" />
					</div>

					<div className="grid md:grid-cols-3 gap-12">
						{faqGroups.map((group) => (
							<div key={group.title} className="space-y-8">
								<h4 className="text-lg font-black text-amber-500 uppercase tracking-tighter border-b border-white/5 pb-4">{group.title}</h4>
								<div className="space-y-10">
									{group.items.map((faq) => (
										<div key={faq.question} className="space-y-3 group">
											<div className="text-sm font-black text-white uppercase tracking-tight group-hover:text-amber-500 transition-colors">{faq.question}</div>
											<p className="text-xs text-white/40 font-medium leading-relaxed group-hover:text-white/60 transition-colors italic">{faq.answer}</p>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
