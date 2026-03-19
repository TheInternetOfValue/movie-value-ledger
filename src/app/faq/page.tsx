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
        a: "This app treats movie experiences as economic and wellbeing events using [the Internet of Value](https://theinternetofvalue.xyz/) (IoV) protocol. It quantifies both monetary costs and wellbeing-adjusted value to determine if a movie experience creates net positive impact."
      },
      {
        q: "Why use wellbeing as a currency alongside money?",
        a: "Traditional economics only counts monetary transactions, but wellbeing represents the human experience. The IoV protocol models wellbeing as a state updated by value capture, wellbeing protocols, and commons. Movies can enhance or drain wellbeing, which should factor into their true value."
      },
      {
        q: "What's the baseline wellbeing assumption?",
        a: "The app assumes a baseline wellbeing of 700/1000 (W=0.7) for normal life. This represents 'neutral' wellbeing - not ecstatic, but not suffering. Any movie that improves wellbeing above this creates positive delta value."
      },
      {
        q: "How does the app handle negative wellbeing impacts?",
        a: "Using signed sliders: left side drains wellbeing (negative impact), right side restores it (positive impact). For example, 'sat for too long' (physiology drain) vs 'danced and enjoyed' (physiology boost)."
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
        a: "⚠️ LOGICAL FLAG: No, GDP measures an entire economy's output. A movie contributes to GDP but doesn't have its own. This is a conceptual metaphor - treating the movie's economic ripple effects as a 'mini-economy' for educational purposes."
      },
      {
        q: "Why show three GDP approaches (Expenditure, Income, Velocity)?",
        a: "These are the three standard ways economists measure GDP. Expenditure shows demand-side spending, Income shows supply-side earnings distribution, Velocity shows money circulation speed. Applied to movies, it demonstrates how one film creates economic activity across multiple dimensions."
      },
      {
        q: "What are realistic GDP contribution numbers for a Bollywood blockbuster?",
        a: "A major Bollywood film might contribute ₹500-2000 Cr to Indian GDP through: ₹300-800 Cr theatrical revenue, ₹200-500 Cr merchandise/food, ₹100-300 Cr production wages, ₹50-200 Cr overseas earnings. The app's sliders allow exploration of these components."
      },
      {
        q: "How does movie GDP relate to national economic indicators?",
        a: "Movies contribute to GDP growth, employment, and exports. India's film industry employs ~6 million people and contributes ~1.3% to GDP. During economic slowdowns, entertainment spending often remains resilient as 'aspirational consumption'."
      },
      {
        q: "What's the velocity concept applied to movies?",
        a: "Money velocity measures how often currency circulates. For movies: same ₹100 ticket might pay actor wages → producer profits → crew salaries → local spending → repeat. Higher velocity means more economic activity from the same money supply."
      },
      {
        q: "Why are the income distribution percentages fixed (40% wages, 35% profits, etc.)?",
        a: "These represent typical economic distribution in capitalist systems. In reality, these vary by industry and regulation. The app uses these as educational baselines to show how movie revenues flow through different economic actors."
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
        a: "Typical Bollywood budget: 30-40% actors, 15-20% director/creative, 5-10% music, 15-20% below-the-line (crew/tech), 20-30% P&A (marketing), 5-10% financing. Total budgets range ₹50-500 Cr depending on scale."
      },
      {
        q: "How accurate are the ROI calculations?",
        a: "The basic ROI formula (profit/cost × 100) is correct, but real movie ROI is complex. Many films lose money initially but profit through OTT, international sales, and merchandise. The app shows simplified immediate ROI."
      },
      {
        q: "Why separate theatrical, overseas, and OTT revenue?",
        a: "These represent different revenue windows with different economics: Theatrical (high upfront costs, shared with theaters), Overseas (currency exchange, cultural adaptation), OTT (subscription/streaming revenue, global reach)."
      },
      {
        q: "What do the income share sliders represent?",
        a: "They show how total revenue gets distributed: Wages to cast/crew, Profits to producers/studios, Interest to lenders, Royalties to rights holders. In reality, this distribution varies widely by contract and bargaining power."
      },
      {
        q: "How does movie financing work in practice?",
        a: "Movies often use mixed financing: Producer equity, bank loans, private equity, pre-sales, and sometimes government subsidies. The financing cost in the app represents interest payments on borrowed capital."
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
        a: "⚠️ LOGICAL FLAG: Cultural impact is inherently qualitative and subjective. The app attempts quantification through proxies: attention hours (social media buzz), identity scores (cultural belonging), and social value calculations. This is more art than science."
      },
      {
        q: "What are 'audience hours' measuring?",
        a: "Total time spent engaging with the movie across platforms: watching trailers, reading reviews, discussing with friends, sharing on social media. One viral movie might generate millions of audience hours vs. thousands for a flop."
      },
      {
        q: "How is the attention multiplier calculated?",
        a: "Total audience hours ÷ labor hours invested. If 1000 labor hours create 1 million audience hours, multiplier = 1000x. This shows amplification effect - how much attention the movie generates per unit of creative effort."
      },
      {
        q: "What do the identity sliders measure?",
        a: "Cultural belonging across dimensions: Global (diaspora recognition), National (shared symbols), Regional (local language/place), Linguistic (dialect pride). High scores suggest the movie strengthens community identity."
      },
      {
        q: "Is the social value formula meaningful?",
        a: "Social value = (audience hours ÷ 100,000 × 12) + (community score × 8). This is an arbitrary formula created for the app. In reality, social impact measurement is controversial and no standard formula exists."
      },
      {
        q: "How does movie marketing create 'signal chains'?",
        a: "Signal chain: Individual creation → Team production → Marketing pulse → Theatrical release → Cultural amplification. Each step builds on the previous, creating compounding attention and meaning."
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
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <Card className={`border-2 ${section.borderColor} ${section.bgColor}`}>
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`p-2 rounded-lg ${section.color} bg-white shadow-sm`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      </div>

                      <div className="space-y-4">
                        {section.questions.map((faq, faqIndex) => (
                          <div key={faqIndex} className="border-l-4 border-gray-200 pl-4">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                              {faq.q.includes('⚠️ LOGICAL FLAG') && (
                                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                              )}
                              {faq.q}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
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