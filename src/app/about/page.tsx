"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Home,
	ChevronLeft,
	ChevronRight,
	BookOpen,
	HelpCircle,
	ShieldCheck,
	Sparkles,
	FileText,
	Users,
	Heart,
	Globe,
	MessageCircle,
	Layers,
	ArrowRight,
	Film,
	Link2,
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
		<div className="min-h-screen bg-white text-black">
			<div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Link href="/">
							<Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
								<Home className="h-4 w-4 mr-2" />Home
							</Button>
						</Link>
						<div className="h-4 w-px bg-gray-300" />
						<div className="text-sm text-gray-500">About</div>
					</div>
					<div className="flex items-center gap-2">
						<Link href="/community">
							<Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
								<ChevronLeft className="h-4 w-4 mr-1" />Community
							</Button>
						</Link>
						<Link href="/">
							<Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
								Home<ChevronRight className="h-4 w-4 ml-1" />
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="pt-20 px-4 py-8">
				<div className="mx-auto max-w-5xl space-y-8">
					<motion.div className="space-y-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold">About</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900">Project Intelligence</h1>
						<p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
							The Dhurandhar Ledger translates cinematic experience into economic and wellbeing-adjusted value. Explore the math, the debate, and the logic below.
						</p>
					</motion.div>

					<section className="grid gap-6 md:grid-cols-2">
						{/* WHITE PAPER */}
						<div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
							<div className="flex items-center gap-3 mb-4">
								<div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
									<FileText className="h-5 w-5 text-amber-600" />
								</div>
								<h2 className="text-lg font-bold text-gray-900">Project Whitepaper</h2>
							</div>
							<p className="text-sm text-gray-600 mb-4 leading-relaxed">
								Detailed analysis of the Dhurandhar cinematic event, its 4-lens structure, and the translation from film to ledger.
							</p>
							<Link href="/whitepaper">
								<Button className="w-full bg-gray-900 text-white hover:bg-black rounded-xl">Read Whitepaper</Button>
							</Link>
						</div>

						{/* DEBATE */}
						<div className="rounded-3xl border border-red-100 bg-red-50/50 p-6 shadow-sm hover:shadow-md transition-shadow">
							<div className="flex items-center gap-3 mb-4">
								<div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
									<MessageCircle className="h-5 w-5 text-red-600" />
								</div>
								<h2 className="text-lg font-bold text-gray-900">The Debate</h2>
							</div>
							<p className="text-sm text-gray-600 mb-4 leading-relaxed">
								The logic vs beauty conflict. Moses Sam Paul explains why "DEFEAT" is a system diagnostic, not a punishment.
							</p>
							<Link href="/debate">
								<Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-100 rounded-xl">Enter the Debate</Button>
							</Link>
						</div>

						{/* MACRO/MICRO DOCS */}
						<div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-6 shadow-sm hover:shadow-md transition-shadow">
							<div className="flex items-center gap-3 mb-4">
								<div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
									<Globe className="h-5 w-5 text-blue-600" />
								</div>
								<h2 className="text-lg font-bold text-gray-900">Economic Documentation</h2>
							</div>
							<p className="text-sm text-gray-600 mb-4 leading-relaxed">
								Technical breakdown of the Macro GDP footprint, Studio ROI identities, and Community social capital models.
							</p>
							<div className="flex gap-2">
								<Link href="/macro/dhurandhar_macro_data" className="flex-1">
									<Button variant="ghost" className="w-full text-blue-700 border border-blue-100 rounded-xl">Macro</Button>
								</Link>
								<Link href="/micro/dhurandhar_micro_data" className="flex-1">
									<Button variant="ghost" className="w-full text-blue-700 border border-blue-100 rounded-xl">Micro</Button>
								</Link>
							</div>
						</div>

						{/* FAQ */}
						<div className="rounded-3xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm hover:shadow-md transition-shadow">
							<div className="flex items-center gap-3 mb-4">
								<div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
									<HelpCircle className="h-5 w-5 text-amber-600" />
								</div>
								<h2 className="text-lg font-bold text-gray-900">FAQ</h2>
							</div>
							<p className="text-sm text-gray-600 mb-4 leading-relaxed">
								Frequently asked questions about the IoV wellbeing nodes, the marginal utility math, and film basics.
							</p>
							<Link href="/faq">
								<Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-100 rounded-xl">View FAQ</Button>
							</Link>
						</div>
					</section>

					<section className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
						<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4"><ShieldCheck className="h-4 w-4" />Assumptions and boundaries</div>
						<div className="grid gap-3 md:grid-cols-2">
							{assumptions.map((item) => (
								<div key={item} className="rounded-2xl bg-white border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed">
									{item}
								</div>
							))}
						</div>
					</section>

					<section className="rounded-3xl border border-amber-100 bg-amber-50 shadow-sm p-6 md:p-8">
						<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4"><MessageCircle className="h-4 w-4" />Why this exists</div>
						<p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-4xl">
							The goal is honesty: keep the story rich and visual, but never hide the logic. If a number is a story metric, it should say so. If a formula is canonical, it should stay canonical.
						</p>
					</section>

					<section className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
						<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4"><Link2 className="h-4 w-4" />Links</div>
						<div className="grid gap-4 md:grid-cols-3">
							<a href="http://author.theinternetofvalue.xyz/" target="_blank" rel="noreferrer" className="rounded-2xl border border-gray-200 bg-gray-50 p-4 hover:border-amber-200 hover:bg-amber-50 transition-colors">
								<div className="font-semibold text-gray-900">MosesSamPaul J.</div>
								<div className="text-sm text-gray-600 mt-1">Author page</div>
							</a>
							<a href="https://theinternetofvalue.xyz/" target="_blank" rel="noreferrer" className="rounded-2xl border border-gray-200 bg-gray-50 p-4 hover:border-amber-200 hover:bg-amber-50 transition-colors">
								<div className="font-semibold text-gray-900">The Internet of Value</div>
								<div className="text-sm text-gray-600 mt-1">Main site</div>
							</a>
							<a href="/whitepaper" className="rounded-2xl border border-gray-200 bg-gray-50 p-4 hover:border-amber-200 hover:bg-amber-50 transition-colors">
								<div className="font-semibold text-gray-900">Whitepaper</div>
								<div className="text-sm text-gray-600 mt-1">Open the full on-site version</div>
							</a>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
