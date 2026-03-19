"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, BookOpen, FileText, ArrowRight } from "lucide-react";

const paper = `# **The Movie Value Ledger**

### *A movie-first front end for [the Internet of Value](https://theinternetofvalue.xyz/)*

---

## **Abstract**

Modern economic systems are precise at measuring what is easy, and weak at measuring what people actually live through.

They count price, revenue, and volume.
They rarely capture what a movie does to the body, mood, mind, habits, or future time.

This whitepaper positions the Movie Value Ledger as a **front-end translation layer** for [the Internet of Value](https://theinternetofvalue.xyz/). The app uses the movie-going experience to make the underlying IOV worldview easier to feel, understand, and explore.

The core idea stays simple:

\[
VC = W \times Vcom
\]

The product adds a movie-first interface around that truth. It lets people answer relatable questions after a film, while the backend remains grounded in canonical IOV variables and layers.

In the live product, \`W\` is normalized: \`1.0\` is the neutral baseline. Any 700-style framing is legacy presentation language, not the internal model baseline.

---

## **1. Why movies**

Movies are a useful starting point because the experience is bounded, emotional, social, and easy to remember.

One film can change how you feel, how you think, what you crave, and what you do next.
That makes cinema a strong public-facing entry point for [the Internet of Value](https://theinternetofvalue.xyz/).

The aim is not to replace the spec.
The aim is to make the spec intuitive by wrapping it in a familiar cultural moment.

In India especially, a major release can already move conversation, identity, attention, and opinion at scale. That makes the movie theatre a natural place to show how value actually flows through human life.

---

## **2. What the front end is doing**

The app is not trying to sound academic. It is trying to translate the backend into a fun, relatable movie-led experience.

So the front end should ask questions people can actually answer after a screening:

- Did the theatre noise leave your ears ringing?
- Did your eyes need time to adjust after the dark halls?
- Did the movie make you want junk food, tea, cigarettes, or a walk?
- Did you sit tense, still, restless, or energized?
- Did the film change your mood after the credits?
- Did it break an old opinion or shift how you think about a person, event, or issue?

Those questions are the presentation layer.
They map back to the canonical wellbeing and identity structures underneath.

---

## **3. System architecture**

The app is organized into four visible lenses:

- **Individual** — personal time, well-being, habit, and performance
- **Micro** — film as a business investment
- **Macro** — film as an economic event
- **Community** — film as attention, identity, and collective feeling

The important point is that the UI can be conversational while the backend remains canonical.
The user sees plain language.
The system stores spec-aligned meaning.

---

## **4. The individual layer**

The individual layer is where the movie’s effect becomes personal.

The questions should sound like real life, not lab language. The app should check whether the viewer’s body, mood, thinking, habits, and next actions changed after the film.

Model note: the wellbeing readout should stay normalized around \`1.0\` throughout the UI and calculations.

### Recommended question groups

**Physiology**
- Did the sound design leave your ears ringing?
- Did your eyes take time to adjust after the dark theatre?
- Did you sit still, fidget, feel restless, or want to move?
- Did the film change your breathing pace during tense scenes?
- Did you want junk food, tea, a cigarette, or a walk afterward?

**Emotion / Feeling**
- What stayed with you after the credits?
- Did the movie leave you moved, angry, calm, unsettled, hopeful, or heavy?
- Did the feeling fade quickly or linger through the day?

**Thought**
- Did the film break an old opinion?
- Did it change how you think about India, Pakistan, violence, power, family, or justice?
- Did it make you trust or doubt a trailer, tweet, review, or celebrity take more than before?
- Did it shift a decision you were already about to make?

**Habit**
- Did the movie change what you wanted to do next?
- Did it make you want to post, talk, share, rewatch, or avoid something?
- Did it shift your evening routine?

**Performance**
- Did it affect your focus?
- Did it energize or drain your work, study, or creative output?
- Did the rest of your day feel easier or harder?

---

## **5. The micro layer**

From the perspective of the firm, a film is a structured deployment of capital under uncertainty.

Costs accumulate across multiple phases: development, production, post-production, and marketing. These are not evenly distributed over time, nor are they easily reversible. Capital is locked into the project long before any revenue signal is observed.

Revenue, in contrast, is highly concentrated. A significant portion of total returns is realized within a narrow temporal window, often during the opening weekend. This creates an asymmetric cash flow profile: prolonged outflows followed by a potentially sharp inflow.

Let total cost be ( C ) and total revenue be ( R ). Profit is trivially ( \Pi = R - C ). What is less trivial is the risk exposure:

[
	ext{Exposure Ratio} = \frac{C}{\text{Total Capital Base of the Firm}}
]

A single large-budget film can represent a significant fraction of a firm’s deployable capital. In that sense, films are not just projects; they are **capital concentration events** with nonlinear payoff distributions.

The Movie Value Ledger does not replace traditional financial analysis. It complements it by linking financial outcomes to downstream effects in well-being and attention.

---

## **6. The macro layer**

At the macro level, films behave as temporary but dense clusters of economic activity.

Within the standard expenditure framework:

[
GDP = C + I + G + (X - M)
]

films contribute across multiple components. Consumer spending includes ticket purchases and related expenditures. Investment includes production budgets and infrastructure. Government participation may appear through subsidies and regulatory support. Exports arise from international distribution, while imports capture foreign technology and services.

However, GDP does not distinguish between value that enhances future productive capacity and value that degrades it. A film that generates high revenue but leaves a population cognitively fatigued is indistinguishable, in GDP terms, from one that enhances motivation and clarity.

The Movie Value Ledger adds the missing human-state lens: what the experience did to people before, during, and after the transaction.

---

## **7. The community layer**

The community layer looks at how a film spreads across people and groups.

That includes:

- shared excitement
- fan reaction
- hashtag momentum
- language and region-based identity
- collective pride
- cultural tension

This is where the movie becomes more than a ticket. It becomes a public event.

---

## **8. Integration**

Each layer captures a different part of the same event.

The user pays.
The body reacts.
The mind changes.
The crowd responds.
The firm earns or loses.
The economy records activity.

The ledger does not flatten these into one number. It keeps the layers visible while preserving the canonical mapping underneath.

---

## **9. From prototype to system**

The current app already behaves like this idea:

- the home page introduces the movie-value framing
- the individual route turns experience into personal questions
- the macro and micro routes connect cinema to economics and business
- the community route captures collective attention and identity

The goal is not technical density.
The goal is clarity, relatability, and cultural resonance.

---

## **10. Beyond movies**

Cinema is the entry point because it is easy to understand, emotionally loaded, and culturally powerful.

The same structure can later extend to education, social media, work, or any bounded experience.

The repeating idea stays the same:

measure not only what happened, but what changed because it happened.

---

## **Conclusion**

The Movie Value Ledger is not trying to replace [the Internet of Value](https://theinternetofvalue.xyz/).
It is trying to make it visible through a movie experience people already care about.

That means the front end stays fun and relatable.
The backend stays canonical.
The mapping between the two must remain clean.

The final question is still the right one:

What did this movie do to the value of your next hour?

Until that is measured, everything else is only half the story.`;

export default function WhitepaperPage() {
	return (
		<div className="min-h-screen bg-white text-black">
			<div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Link href="/">
							<Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900"><Home className="h-4 w-4 mr-2" />Home</Button>
						</Link>
						<div className="h-4 w-px bg-gray-300" />
						<div className="text-sm text-gray-500">Whitepaper</div>
					</div>
					<div className="flex items-center gap-2">
						<Link href="/about">
							<Button variant="outline" size="sm" className="text-gray-600 border-gray-300"><ChevronLeft className="h-4 w-4 mr-1" />About</Button>
						</Link>
						<Link href="/community">
							<Button variant="outline" size="sm" className="text-gray-600 border-gray-300">Community<ChevronRight className="h-4 w-4 ml-1" /></Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="pt-20 px-4 py-8">
				<div className="mx-auto max-w-5xl space-y-8">
					<motion.div className="space-y-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
						<div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold">Whitepaper</div>
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900">The Movie Value Ledger</h1>
						<p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">A movie-first front end for [the Internet of Value](https://theinternetofvalue.xyz/).</p>
					</motion.div>

					<section className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-white shadow-sm p-6 md:p-8">
						<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4"><BookOpen className="h-4 w-4" />Quick read</div>
						<div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 shadow-sm">
							<div className="prose prose-gray max-w-none prose-headings:scroll-mt-24 prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
								<ReactMarkdown>{paper}</ReactMarkdown>
							</div>
						</div>
					</section>

					<section className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6 md:p-8">
						<div className="flex items-center gap-2 text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4"><ArrowRight className="h-4 w-4" />What to remember</div>
						<div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-5 text-white shadow-lg">
							<div className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-2">Closing note</div>
							<div className="text-lg font-semibold mb-2">Story first, truth intact.</div>
							<div className="text-sm text-gray-200 leading-relaxed">The whitepaper is not here to replace the spec documents. It is here to make the public story easy to follow while keeping the canonical structure visible.</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
