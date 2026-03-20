"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Calculator,
  TrendingUp,
  Users,
  Heart,
  DollarSign,
  BarChart3,
  Film,
  Landmark,
  Globe,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const perspectives = [
  { id: "macro", name: "Macro", path: "/macro" },
  { id: "micro", name: "Micro", path: "/micro" },
  { id: "community", name: "Community", path: "/community" },
  { id: "individual", name: "Individual", path: "/individual" },
];

function NavigationBar({ currentPage }: { currentPage: string }) {
  const currentIndex = perspectives.findIndex((p) => p.id === currentPage);
  const prevPage = currentIndex > 0 ? perspectives[currentIndex - 1] : null;
  const nextPage = currentIndex < perspectives.length - 1 ? perspectives[currentIndex + 1] : null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-2">
            {perspectives.map((p) => (
              <Link key={p.id} href={p.path}>
                <Button
                  variant={p.id === currentPage ? "default" : "ghost"}
                  size="sm"
                  className={`text-xs px-3 py-1 ${
                    p.id === currentPage
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {p.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {prevPage && (
            <Link href={prevPage.path}>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {prevPage.name}
              </Button>
            </Link>
          )}
          {nextPage && (
            <Link href={nextPage.path}>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-300">
                {nextPage.name}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const faqSections = [
  {
    id: "overview",
    title: "App Overview & Logic",
    icon: HelpCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    questions: [
      {
        q: "What is the fundamental premise of this app?",
        a: "This app treats a movie experience as both an economic event and a wellbeing event. It pairs time, money, and audience impact with the Internet of Value (IoV) wellbeing model so the result is easier to compare across macro, micro, community, and individual lenses."
      },
      {
        q: "Why use wellbeing as a currency alongside money?",
        a: "Money shows cost. Wellbeing shows lived impact. Using both gives a more complete picture of whether the film created value, drained value, or simply shifted value from one place to another."
      },
      {
        q: "What's the baseline wellbeing assumption?",
        a: "The app starts from a 700/1000 wellbeing baseline, or W = 0.7. That is the neutral reference point used to compare the live run against normal life outside the movie."
      },
      {
        q: "How does the app handle negative wellbeing impacts?",
        a: "Each slider is signed. Left means drain, right means restore. That lets the page capture both kinds of response without pretending every movie effect is positive."
      }
    ]
  },
  {
    id: "macro",
    title: "Macro Perspective FAQs",
    icon: Landmark,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    questions: [
      {
        q: "Does a single movie really have its own GDP?",
        a: "A movie does not have its own GDP in the strict national-accounting sense. The page uses GDP language as a public-facing shorthand for the economic ripple effect around the film: spending, earnings, circulation, and spillovers."
      },
      {
        q: "Why show three GDP approaches (Expenditure, Income, Velocity)?",
        a: "They are three different ways to frame the same economic story. Expenditure shows what gets spent, income shows who receives it, and velocity shows how quickly money moves through the film ecosystem."
      },
      {
        q: "What are realistic GDP contribution numbers for a Bollywood blockbuster?",
        a: "The exact number depends on scale, release pattern, and monetisation windows. The app keeps the page conversational and lets the supporting reference page carry the detailed assumptions."
      },
      {
        q: "How does movie GDP relate to national economic indicators?",
        a: "The film economy touches jobs, consumption, taxes, exports, and local business activity. The macro page is designed to show those channels without overloading the public page with dense econometrics."
      },
      {
        q: "What's the velocity concept applied to movies?",
        a: "Velocity is a way of describing how far one rupee travels after a ticket, payment, or contract enters the movie system. If the same money moves through more hands, the circulation effect is stronger."
      },
      {
        q: "Why are the income distribution percentages fixed (40% wages, 35% profits, etc.)?",
        a: "They are presentation baselines, not universal constants. The percentages help the page stay readable and show how revenue is split across roles, while the reference page holds the fuller context."
      }
    ]
  },
  {
    id: "micro",
    title: "Micro Perspective FAQs",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    questions: [
      {
        q: "What are realistic cost breakdowns for Indian movies?",
        a: "Film budgets usually split across talent, creative, production, marketing, and financing. The exact mix changes by scale and genre, so the page keeps the public summary compact and uses the reference page for the detailed breakdown."
      },
      {
        q: "How accurate are the ROI calculations?",
        a: "They are intentionally simplified. The app is meant to make the logic visible rather than replace a full studio finance model."
      },
      {
        q: "Why separate theatrical, overseas, and OTT revenue?",
        a: "Each window behaves differently. Theatrical, overseas, and OTT have different costs, timing, and upside, so separating them makes the micro story easier to understand."
      },
      {
        q: "What do the income share sliders represent?",
        a: "They show how revenue is divided between cast and crew, producers, lenders, and rights holders. They are a simplified visual layer over a more detailed financial picture."
      },
      {
        q: "How does movie financing work in practice?",
        a: "Most film projects use a mix of equity, loans, pre-sales, and rights deals. The app condenses that into a clear cost model so the public page stays readable."
      }
    ]
  },
  {
    id: "community",
    title: "Community Perspective FAQs",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    questions: [
      {
        q: "How can you quantify 'cultural impact' numerically?",
        a: "By using proxies. Attention hours, identity resonance, and social circulation are not perfect measures, but they make the conversation visible and comparable across projects."
      },
      {
        q: "What are 'audience hours' measuring?",
        a: "They measure the total time people spend with the film across trailers, discussion, reviews, clips, and social sharing. It is a useful way to show how a title travels beyond the theatre itself."
      },
      {
        q: "How is the attention multiplier calculated?",
        a: "It compares audience time with the labour time that went into making and releasing the film. A higher multiplier means stronger amplification from the same creative effort."
      },
      {
        q: "What do the identity sliders measure?",
        a: "They represent how strongly the film lands across cultural layers such as national recognition, regional pride, language, and diaspora reach."
      },
      {
        q: "Is the social value formula meaningful?",
        a: "It is a deliberately simple model for the app, not a universal standard. Its job is to give the public page a clear, readable signal, while the reference page explains the assumptions."
      },
      {
        q: "How does movie marketing create 'signal chains'?",
        a: "Marketing creates a signal chain by moving the film from production to awareness to conversation to cultural amplification. Each step builds on the last."
      }
    ]
  },
  {
    id: "individual",
    title: "Individual Perspective FAQs",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    questions: [
      {
        q: "What's the scientific basis for the wellbeing battery?",
        a: "Based on Internet of Value (IoV) protocol wellbeing nodes: Physiology (body state), Emotion (feelings), Thought (perspective), Habit (behavior), Performance (outcomes). Each node has signed weights reflecting their impact on overall wellbeing."
      },
      {
        q: "Why are wellbeing weights different for each node?",
        a: "Weights reflect relative importance: Physiology (1.8/1.2) highest because body state affects everything, Performance (1.55/1.45/1.6/1.2) important for life satisfaction, Emotions (1.5/1.1/1.2) significant but variable. These are protocol-defined, not arbitrary."
      },
      {
        q: "How is hourly rate calculated from salary?",
        a: "Annual salary ÷ (8 hours/day × 22 work days/month × 12 months) = hourly rate. Assumes standard work week. This represents opportunity cost - time spent on movie vs. work value."
      },
      {
        q: "What's the net value calculation logic?",
        a: "Net Value = Wellbeing Delta - Money Spent. Wellbeing Delta = (Actual Wellbeing Value) - (Baseline Wellbeing Value). Actual = hours × hourly rate × W, Baseline = hours × hourly rate × 0.7. Positive net value = worthwhile experience."
      },
      {
        q: "Why normalize wellbeing to 0-1 scale (W = battery/1000)?",
        a: "Makes wellbeing comparable to other metrics. W=0.7 means 70% of maximum possible wellbeing. This allows mathematical operations like multiplication with monetary values."
      },
      {
        q: "Are the time breakdowns realistic?",
        a: "Pre-release (trailers/social media), Scrolling (research/reviews), Movie (2-3 hours), Post-discussion (talking about it), Reviews (reading/writing). Total 4-8 hours is realistic for engaged movie fans."
      },
      {
        q: "How do signed sliders work mathematically?",
        a: "Slider range 0-100, neutral at 50. toSigned(value) = (value - 50) × 2. So 0 = -100 (maximum drain), 50 = 0 (neutral), 100 = +100 (maximum boost). This creates balanced positive/negative impact range."
      },
      {
        q: "What's the relationship between wellbeing and performance?",
        a: "IoV protocol models performance as wellbeing-integrated: Learning, Earning, Skill, Community outputs are both affected by wellbeing and contribute back to it. High wellbeing enables better performance, which creates more wellbeing."
      }
    ]
  },
  {
    id: "methodology",
    title: "Methodology & Assumptions",
    icon: Calculator,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    questions: [
      {
        q: "What are the biggest methodological assumptions?",
        a: "1) Wellbeing can be quantified 0-1000 scale. 2) Baseline wellbeing is exactly 700. 3) All wellbeing nodes have linear relationships. 4) Money and wellbeing are directly comparable. 5) Movie impact is isolated from other life factors."
      },
      {
        q: "How reliable are the economic numbers?",
        a: "Macro/micro numbers use real industry data but simplified. GDP contributions based on industry reports. Movie budgets and revenues use public data from major films. All numbers are directional, not precise accounting."
      },
      {
        q: "What's the biggest logical leap in the app?",
        a: "⚠️ MAJOR LOGICAL FLAG: Treating wellbeing as a currency equivalent to money. While conceptually interesting, wellbeing and money have different units, measurement errors, and interpersonal comparisons. The math works but the philosophy is debatable."
      },
      {
        q: "How does this relate to traditional economics?",
        a: "Traditional economics focuses on monetary optimization. This extends to wellbeing optimization, creating 'wellbeing-adjusted GDP' or 'wellbeing ROI'. It's behavioral economics meets welfare economics, but with IoV protocol structure."
      },
      {
        q: "What data sources inform the calculations?",
        a: "IoV protocol specifications, Indian film industry reports (FICCI, IBF), macroeconomic data (RBI, MOSPI), wellbeing research (positive psychology), movie industry analysis (Box Office India, OTT platforms)."
      },
      {
        q: "How should users interpret the results?",
        a: "As educational tools, not financial advice. The calculations demonstrate concepts: movie economics, wellbeing measurement, value quantification. Use for understanding, not precise decision-making."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <NavigationBar currentPage="faq" />
      <div className="pt-20 px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold">Frequently Asked Questions</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Understanding Movie Value</h1>
            <p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
              Rational analysis of the economics, logic, and assumptions behind wellbeing-adjusted movie valuation.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqSections.map((section, sectionIndex) => {
              const IconComponent = section.icon;
              return (
                <motion.div key={section.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionIndex * 0.08 }}>
                  <Card className={`border-2 ${section.borderColor} ${section.bgColor}`}>
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-6 flex items-center gap-3">
                        <div className={`rounded-2xl bg-white/75 p-3 ${section.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                          <p className="text-sm text-gray-600">Clear answers, with the fuller reference kept on the route pages.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {section.questions.map((faq, faqIndex) => (
                          <div key={faqIndex} className="rounded-2xl border border-white/70 bg-white/85 p-5 shadow-sm">
                            <h3 className="mb-2 flex items-start gap-2 font-semibold text-gray-900">
                              {faq.q.includes("⚠️") && <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />}
                              <span>{faq.q}</span>
                            </h3>
                            <p className="leading-relaxed text-gray-700">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-gray-600 mb-4">
              Have more questions? The methodology combines economics, wellbeing science, and IoV protocol design.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/about">
                <Button variant="outline" className="border-gray-300">
                  About the Project
                </Button>
              </Link>
              <Link href="/whitepaper">
                <Button variant="outline" className="border-gray-300">
                  Technical Whitepaper
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}