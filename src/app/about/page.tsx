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
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900">Whitepaper + FAQ</h1>
						<p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
							This page keeps the assumptions visible: what the app means, what the numbers mean, and what is story versus strict measurement.
						</p>
					</motion.div>

					<section className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
						<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4"><BookOpen className="h-4 w-4" />Whitepaper</div>
						<div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 mb-6">
							<div className="flex items-center gap-3 mb-3">
								<div className="h-12 w-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md"><Sparkles className="h-5 w-5" /></div>
								<div>
									<div className="text-sm font-semibold text-gray-900">A public doorway into the spec</div>
									<div className="text-xs text-gray-500">Read this first if you want the short version before the full paper.</div>
								</div>
							</div>
							<p className="text-sm text-gray-600 leading-relaxed">The whitepaper is the deeper reference. This page just makes it easier for new visitors to understand the story before they open the full document.</p>
						</div>
						<div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 mb-6">
							<div className="flex items-center gap-2 mb-2"><Film className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">What the paper says</span></div>
							<p className="text-sm text-gray-600 leading-relaxed">The paper explains the movie-first front end, the four-lens structure, the normalized wellbeing baseline, and the difference between story metrics and canonical measures.</p>
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
								<div className="flex items-center gap-2 mb-2"><Sparkles className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Movie-first interface</span></div>
								<p className="text-sm text-gray-600">The app uses cinema as the front door into the Internet of Value.</p>
							</div>
							<div className="rounded-2xl bg-white border border-gray-200 p-4">
								<div className="flex items-center gap-2 mb-2"><Users className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Four lenses</span></div>
								<p className="text-sm text-gray-600">Individual, Micro, Macro, and Community each tell one layer of the same experience.</p>
							</div>
							<div className="rounded-2xl bg-white border border-gray-200 p-4">
								<div className="flex items-center gap-2 mb-2"><Heart className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Normalized wellbeing</span></div>
								<p className="text-sm text-gray-600">The live model treats 1.0 as the neutral baseline.</p>
							</div>
							<div className="rounded-2xl bg-white border border-gray-200 p-4">
								<div className="flex items-center gap-2 mb-2"><Globe className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Canonical truth</span></div>
								<p className="text-sm text-gray-600">Storytelling may be playful, but the mapping back to the spec must stay clear.</p>
							</div>
						</div>
						<div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-4">
							<div className="flex items-center gap-2 mb-2"><FileText className="h-4 w-4 text-amber-500" /><span className="font-semibold text-gray-900">Read the full paper</span></div>
							<p className="text-sm text-gray-600 mb-4">The whitepaper explains the lens structure, the movie-first rationale, and the canonical assumptions behind the UI.</p>
							<a href="/whitepaper" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700">
								Open whitepaper <ArrowRight className="h-4 w-4" />
							</a>
						</div>
					</section>

					<section className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
						<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4"><HelpCircle className="h-4 w-4" />FAQ</div>
						<div className="space-y-6">
							{faqGroups.map((group) => (
								<div key={group.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5">
									<div className="flex items-center gap-2 mb-4">
										<BookOpen className="h-4 w-4 text-amber-500" />
										<div className="font-semibold text-gray-900">{group.title}</div>
									</div>
									<div className="grid gap-4 md:grid-cols-2">
										{group.items.map((item) => (
											<div key={item.question} className="rounded-2xl border border-gray-200 bg-white p-4">
												<div className="font-semibold text-gray-900 mb-2">{item.question}</div>
												<div className="text-sm text-gray-600 leading-relaxed">{item.answer}</div>
											</div>
										))}
									</div>
								</div>
							))}
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
