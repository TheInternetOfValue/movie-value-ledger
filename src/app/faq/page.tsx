"use client";

import React from "react";
import { motion } from "framer-motion";
import { NavigationBar } from "@/components/NavigationBar";
import {
	HelpCircle,
	Calculator,
	TrendingUp,
	DollarSign,
	BarChart3,
	Landmark,
	Globe,
	Book,
} from "lucide-react";

const glossary = [
	{
		term: "~WellbeingIdentity",
		definition: "The core L1 protocol object representing an individual's holistic state. It is updated by value capture and wellbeing protocols."
	},
	{
		term: "Aura View",
		definition: "The UI-level representation of a Wellbeing Identity. In the app, this is visualized as the 'Battery' (0-1000)."
	},
	{
		term: "SNA-Aligned",
		definition: "System of National Accounts. This means our macro calculations (GDP/GDI) follow the international standards used by central banks and the UN."
	},
	{
		term: "W-Coefficient",
		definition: "A normalized value (0.0 to 1.0) derived from the Wellbeing Battery. 0.7 is the 'Baseline' for a functioning human."
	},
	{
		term: "Opportunity Cost",
		definition: "The economic value of your time if you had spent those hours working at your 'Base Hourly Rate' instead of watching the movie."
	},
	{
		term: "Net Personal Value",
		definition: "The final result: (Wellbeing-Adjusted Time Value) minus (Opportunity Cost + Cash Expenses)."
	},
	{
		term: "IoV (Internet of Value)",
		definition: "The architectural framework where wellbeing, time, and money are treated as interoperable assets on a shared ledger."
	},
	{
		term: "Value Circulation (VC)",
		definition: "The formula [VC = W * Vcom] which calculates how much economic energy is actually 'felt' by the participant."
	},
	{
		term: "Dossier UI",
		definition: "The cinematic, high-contrast design language used for this project, inspired by technical registries and intelligence briefings."
	}
];

const categories = [
	{
		id: "introduction",
		title: "Introduction & Overview",
		icon: <HelpCircle className="h-6 w-6" />,
		faqs: [
			{
				question: "What is the fundamental premise of this app?",
				answer: "This app treats a movie experience as both an economic event and a wellbeing event. It pairs time, money, and audience impact with the Internet of Value (IoV) wellbeing model so the result is easier to compare across macro, micro, community, and individual lenses."
			},
			{
				question: "Why use wellbeing as a currency alongside money?",
				answer: "Money shows cost. Wellbeing shows lived impact. Using both gives a more complete picture of whether the film created value, drained value, or simply shifted value from one place to another."
			},
			{
				question: "What's the baseline wellbeing assumption?",
				answer: "The app starts from a 700/1000 wellbeing baseline, or W = 0.7. That is the neutral reference point used to compare the live run against normal life outside the movie."
			},
			{
				question: "How does the app handle negative wellbeing impacts?",
				answer: "Each slider is signed. Left means drain, right means restore. That lets the page capture both kinds of response without pretending every movie effect is positive."
			}
		]
	},
	{
		id: "macro",
		title: "Macro Perspective FAQs",
		icon: <Globe className="h-6 w-6" />,
		faqs: [
			{
				question: "Does a single movie really have its own GDP?",
				answer: "A movie does not have its own GDP in the strict national-accounting sense. The page uses GDP language as a public-facing shorthand for the economic ripple effect around the film: spending, earnings, circulation, and spillovers."
			},
			{
				question: "Why show three GDP approaches (Expenditure, Income, Velocity)?",
				answer: "They are three different ways to frame the same economic story. Expenditure shows what gets spent, income shows who receives it, and velocity shows how quickly money moves through the film ecosystem."
			},
			{
				question: "What are realistic GDP contribution numbers for a Bollywood blockbuster?",
				answer: "The exact number depends on scale, release pattern, and monetisation windows. The app keeps the page conversational and lets the supporting reference page carry the detailed assumptions."
			},
			{
				question: "How does movie GDP relate to national economic indicators?",
				answer: "The film economy touches jobs, consumption, taxes, exports, and local business activity. The macro page is designed to show those channels without overloading the public page with dense econometrics."
			},
			{
				question: "What's the velocity concept applied to movies?",
				answer: "Velocity is a way of describing how far one rupee travels after a ticket, payment, or contract enters the movie system. If the same money moves through more hands, the circulation effect is stronger."
			},
			{
				question: "Why are the income distribution percentages fixed (40% wages, 35% profits, etc.)?",
				answer: "They are presentation baselines, not universal constants. The percentages help the page stay readable and show how revenue is split across roles, while the reference page holds the fuller context."
			}
		]
	},
	{
		id: "micro",
		title: "Micro Perspective FAQs",
		icon: <Calculator className="h-6 w-6" />,
		faqs: [
			{
				question: "What are realistic cost breakdowns for Indian movies?",
				answer: "Film budgets usually split across talent, creative, production, marketing, and financing. The exact mix changes by scale and genre, so the page keeps the public summary compact and uses the reference page for the detailed breakdown."
			},
			{
				question: "How accurate are the ROI calculations?",
				answer: "They are intentionally simplified. The app is meant to make the logic visible rather than replace a full studio finance model."
			},
			{
				question: "Why separate theatrical, overseas, and OTT revenue?",
				answer: "Each window behaves differently. Theatrical, overseas, and OTT have different costs, timing, and upside, so separating them makes the micro story easier to understand."
			},
			{
				question: "What do the income share sliders represent?",
				answer: "They show how revenue is divided between cast and crew, producers, lenders, and rights holders. They are a simplified visual layer over a more detailed financial picture."
			},
			{
				question: "How does movie financing work in practice?",
				answer: "Most film projects use a mix of equity, loans, pre-sales, and rights deals. The app condenses that into a clear cost model so the public page stays readable."
			}
		]
	},
	{
		id: "community",
		title: "Community Perspective FAQs",
		icon: <Globe className="h-6 w-6" />,
		faqs: [
			{
				question: "How can you quantify 'cultural impact' numerically?",
				answer: "By using proxies. Attention hours, identity resonance, and social circulation are not perfect measures, but they make the conversation visible and comparable across projects."
			},
			{
				question: "What are 'audience hours' measuring?",
				answer: "They measure the total time people spend with the film across trailers, discussion, reviews, clips, and social sharing. It is a useful way to show how a title travels beyond the theatre itself."
			},
			{
				question: "How is the attention multiplier calculated?",
				answer: "It compares audience time with the labour time that went into making and releasing the film. A higher multiplier means stronger amplification from the same creative effort."
			},
			{
				question: "What do the identity sliders measure?",
				answer: "They represent how strongly the film lands across cultural layers such as national recognition, regional pride, language, and diaspora reach."
			},
			{
				question: "Is the social value formula meaningful?",
				answer: "It is a deliberately simple model for the app, not a universal standard. Its job is to give the public page a clear, readable signal, while the reference page explains the assumptions."
			},
			{
				question: "How does movie marketing create 'signal chains'?",
				answer: "Marketing creates a signal chain by moving the film from production to awareness to conversation to cultural amplification. Each step builds on the last."
			}
		]
	},
	{
		id: "individual",
		title: "Individual Perspective FAQs",
		icon: <HelpCircle className="h-6 w-6" />,
		faqs: [
			{
				question: "What's the scientific basis for the wellbeing battery?",
				answer: "Based on Internet of Value (IoV) protocol wellbeing nodes: Physiology (body state), Emotion (feelings), Thought (perspective), Habit (behavior), Performance (outcomes). Each node has signed weights reflecting their impact on overall wellbeing."
			},
			{
				question: "Why are wellbeing weights different for each node?",
				answer: "Weights reflect relative importance: Physiology (1.8/1.2) highest because body state affects everything, Performance (1.55/1.45/1.6/1.2) important for life satisfaction, Emotions (1.5/1.1/1.2) significant but variable. These are protocol-defined, not arbitrary."
			},
			{
				question: "How is hourly rate calculated from salary?",
				answer: "Annual salary ÷ (8 hours/day × 22 work days/month × 12 months) = hourly rate. Assumes standard work week. This represents opportunity cost - time spent on movie vs. work value."
			},
			{
				question: "What's the net value calculation logic?",
				answer: "Net Value = Wellbeing Delta - Money Spent. Wellbeing Delta = (Actual Wellbeing Value) - (Baseline Wellbeing Value). Actual = hours × hourly rate × W, Baseline = hours × hourly rate × 0.7. Positive net value = worthwhile experience."
			},
			{
				question: "Why normalize wellbeing to 0-1 scale (W = battery/1000)?",
				answer: "Makes wellbeing comparable to other metrics. W=0.7 means 70% of maximum possible wellbeing. This allows mathematical operations like multiplication with monetary values."
			},
			{
				question: "Are the time breakdowns realistic?",
				answer: "Pre-release (trailers/social media), Scrolling (research/reviews), Movie (2-3 hours), Post-discussion (talking about it), Reviews (reading/writing). Total 4-8 hours is realistic for engaged movie fans."
			},
			{
				question: "How do signed sliders work mathematically?",
				answer: "Slider range 0-100, neutral at 50. toSigned(value) = (value - 50) × 2. So 0 = -100 (maximum drain), 50 = 0 (neutral), 100 = +100 (maximum boost). This creates balanced positive/negative impact range."
			},
			{
				question: "What's the relationship between wellbeing and performance?",
				answer: "IoV protocol models performance as wellbeing-integrated: Learning, Earning, Skill, Community outputs are both affected by wellbeing and contribute back to it. High wellbeing enables better performance, which creates more wellbeing."
			}
		]
	},
	{
		id: "methodology",
		title: "Methodology & Assumptions",
		icon: <Calculator className="h-6 w-6" />,
		faqs: [
			{
				question: "What are the biggest methodological assumptions?",
				answer: "1) Wellbeing can be quantified 0-1000 scale. 2) Baseline wellbeing is exactly 700. 3) All wellbeing nodes have linear relationships. 4) Money and wellbeing are directly comparable. 5) Movie impact is isolated from other life factors."
			},
			{
				question: "How reliable are the economic numbers?",
				answer: "Macro/micro numbers use real industry data but simplified. GDP contributions based on industry reports. Movie budgets and revenues use public data from major films. All numbers are directional, not precise accounting."
			},
			{
				question: "What's the biggest logical leap in the app?",
				answer: "⚠️ MAJOR LOGICAL FLAG: Treating wellbeing as a currency equivalent to money. While conceptually interesting, wellbeing and money have different units, measurement errors, and interpersonal comparisons. The math works but the philosophy is debatable."
			},
			{
				question: "How does this relate to traditional economics?",
				answer: "Traditional economics focuses on monetary optimization. This extends to wellbeing optimization, creating 'wellbeing-adjusted GDP' or 'wellbeing ROI'. It's behavioral economics meets welfare economics, but with IoV protocol structure."
			},
			{
				question: "What data sources inform the calculations?",
				answer: "IoV protocol specifications, Indian film industry reports (FICCI, IBF), macroeconomic data (RBI, MOSPI), wellbeing research (positive psychology), movie industry analysis (Box Office India, OTT platforms)."
			},
			{
				question: "How should users interpret the results?",
				answer: "As educational tools, not financial advice. The calculations demonstrate concepts: movie economics, wellbeing measurement, value quantification. Use for understanding, not precise decision-making."
			}
		]
	}
];

export default function FAQPage() {
	return (
		<main className="dossier-bg min-h-screen text-white pb-32">
			<NavigationBar currentPage="about" />
			
			<div className="mx-auto max-w-7xl px-6 pt-32">
				{/* Header Section */}
				<div className="mb-20 space-y-8">
					<div className="flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">
						<HelpCircle className="h-4 w-4" />
						Interrogation / System FAQ
					</div>
					
					<h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase">
						System <br/><span className="text-white/10 outline-text">Diagnostics</span>
					</h1>

					<div className="dossier-card p-10 border-white/5 bg-amber-500/5 max-w-3xl">
						<p className="text-sm md:text-xl text-white/60 font-medium leading-relaxed">
							Everything you need to know about <span className="text-white font-black underline decoration-amber-500/50 underline-offset-4">The Ledger</span>, the math behind the nodes, and how to read the four layers of value.
						</p>
					</div>
				</div>

				{/* Glossary Section */}
				<section className="mb-32 space-y-12">
					<div className="flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] border-b border-white/5 pb-6">
						<Book className="h-4 w-4" />
						Project Glossary
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{glossary.map((item) => (
							<div key={item.term} className="dossier-card p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
								<h3 className="text-lg font-black text-amber-500 uppercase tracking-tighter mb-3 group-hover:scale-105 transition-transform origin-left">
									{item.term}
								</h3>
								<p className="text-[11px] text-white/40 font-medium leading-relaxed uppercase tracking-tight">
									{item.definition}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* FAQ Grid */}
				<div className="space-y-32">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{categories.map((category) => (
							<section key={category.id} className="space-y-8">
								<div className="flex items-center gap-4 border-b border-white/5 pb-6">
									<div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-amber-500">
										{category.icon}
									</div>
									<h2 className="text-xl font-black text-white uppercase tracking-tighter">{category.title}</h2>
								</div>
								
								<div className="space-y-12">
									{category.faqs.map((faq, i) => (
										<div key={i} className="group space-y-3">
											<div className="flex gap-4">
												<span className="text-white/10 font-black dossier-number text-xs mt-1">0{i+1}</span>
												<div className="text-sm font-black text-white uppercase tracking-tight group-hover:text-amber-500 transition-colors leading-tight">
													{faq.question}
												</div>
											</div>
											<p className="text-xs text-white/40 font-medium leading-relaxed italic pl-9 group-hover:text-white/60 transition-colors">
												{faq.answer}
											</p>
										</div>
									))}
								</div>
							</section>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}