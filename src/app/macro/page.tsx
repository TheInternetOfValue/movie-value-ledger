"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  DollarSign,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  Users,
  Building,
  Globe,
  Calculator,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const perspectives = [
  { id: "macro", name: "Macro", path: "/macro" },
  { id: "micro", name: "Micro", path: "/micro" },
  { id: "community", name: "Community", path: "/community" },
  { id: "individual", name: "Individual", path: "/individual" }
];

function NavigationBar({ currentPage }: { currentPage: string }) {
  const currentIndex = perspectives.findIndex(p => p.id === currentPage);
  const prevPage = currentIndex > 0 ? perspectives[currentIndex - 1] : null;
  const nextPage = currentIndex < perspectives.length - 1 ? perspectives[currentIndex + 1] : null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              {perspectives.map((perspective, index) => (
                <Link key={perspective.id} href={perspective.path}>
                  <Button
                    variant={perspective.id === currentPage ? "default" : "ghost"}
                    size="sm"
                    className={`text-xs px-3 py-1 ${
                      perspective.id === currentPage
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {perspective.name}
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
      </div>
    </motion.div>
  );
}

export default function MacroPage() {
  const [consumption, setConsumption] = useState([500]);
  const [investment, setInvestment] = useState([200]);
  const [government, setGovernment] = useState([150]);
  const [exports, setExports] = useState([100]);
  const [imports, setImports] = useState([80]);

  const [wages, setWages] = useState([300]);
  const [profits, setProfits] = useState([250]);
  const [interest, setInterest] = useState([100]);
  const [royalties, setRoyalties] = useState([50]);

  const [velocity, setVelocity] = useState([3]);

  const totalExpenditure = consumption[0] + investment[0] + government[0] + (exports[0] - imports[0]);
  const totalIncome = wages[0] + profits[0] + interest[0] + royalties[0];

  // In GDP accounting, both approaches should equal - make income approach derive from expenditure
  const gdpValue = totalExpenditure;
  const adjustedWages = Math.round(gdpValue * 0.4); // 40% wages
  const adjustedProfits = Math.round(gdpValue * 0.35); // 35% profits
  const adjustedInterest = Math.round(gdpValue * 0.15); // 15% interest
  const adjustedRoyalties = Math.round(gdpValue * 0.1); // 10% royalties

  const moneySupply = 1000;
  const nominalGDP = moneySupply * velocity[0];

  return (
    <div className="min-h-screen bg-white text-black">
      <NavigationBar currentPage="macro" />

      <div className="pt-20 px-4 py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm uppercase tracking-[0.3em] text-amber-600 font-semibold">Macro Economic Impact</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Movie as National Economic Event</h1>
            <p className="mx-auto max-w-4xl text-base text-gray-700 md:text-lg leading-relaxed">
              How a single movie ripples through the entire economy, creating jobs, generating revenue, and influencing national prosperity.
            </p>
          </motion.div>

        {/* Expenditure Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                <TrendingUp className="h-8 w-8 text-amber-600" />
                Expenditure Approach: GDP = C + I + G + (X - M)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Every movie ticket, streaming subscription, and merchandise purchase contributes to national economic output.
                This shows how movie-related spending flows through the economy.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Consumption (C)</span>
                  </div>
                  <Slider
                    value={consumption}
                    onValueChange={setConsumption}
                    max={1000}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-amber-600">₹{consumption[0]} Cr</div>
                  <p className="text-sm text-gray-600">Tickets, food, merchandise</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Investment (I)</span>
                  </div>
                  <Slider
                    value={investment}
                    onValueChange={setInvestment}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-amber-600">₹{investment[0]} Cr</div>
                  <p className="text-sm text-gray-600">Production equipment, studios</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Government (G)</span>
                  </div>
                  <Slider
                    value={government}
                    onValueChange={setGovernment}
                    max={300}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-amber-600">₹{government[0]} Cr</div>
                  <p className="text-sm text-gray-600">Film commissions, subsidies</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Exports (X)</span>
                  </div>
                  <Slider
                    value={exports}
                    onValueChange={setExports}
                    max={200}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-amber-600">₹{exports[0]} Cr</div>
                  <p className="text-sm text-gray-600">Overseas box office, streaming</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border-2 border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-800">Imports (M)</span>
                  </div>
                  <Slider
                    value={imports}
                    onValueChange={setImports}
                    max={150}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-2xl font-bold text-amber-600">₹{imports[0]} Cr</div>
                  <p className="text-sm text-gray-600">Foreign films, equipment</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Net Exports (X-M)</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">₹{exports[0] - imports[0]} Cr</div>
                  <p className="text-sm text-gray-600">Trade balance contribution</p>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-amber-600 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold mb-2">GDP Contribution</div>
                <div className="text-5xl font-bold">₹{totalExpenditure} Cr</div>
                <p className="mt-2 opacity-90">Movie industry's direct contribution to national economy</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Income Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                <DollarSign className="h-8 w-8 text-amber-600" />
                Income Approach: GDP = Wages + Profits + Interest + Royalties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                The same economic activity measured from the income side. GDP from expenditure equals GDP from income.
                These values are derived directly from the expenditure approach above.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Wages & Salaries</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">₹{adjustedWages} Cr</div>
                  <p className="text-sm text-gray-600">40% of GDP - actors, crew, technicians</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Business Profits</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">₹{adjustedProfits} Cr</div>
                  <p className="text-sm text-gray-600">35% of GDP - production companies, distributors</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Interest & Returns</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">₹{adjustedInterest} Cr</div>
                  <p className="text-sm text-gray-600">15% of GDP - bank loans, investor returns</p>
                </motion.div>

                <motion.div
                  className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-gray-900">Royalties & IP</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-600">₹{adjustedRoyalties} Cr</div>
                  <p className="text-sm text-gray-600">10% of GDP - music, merchandise, remakes</p>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-amber-600 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold mb-2">GDP Verification</div>
                <div className="text-5xl font-bold">₹{gdpValue} Cr</div>
                <p className="mt-2 opacity-90">Income approach equals expenditure approach</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Money Velocity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                <RotateCcw className="h-8 w-8 text-amber-600" />
                Money Velocity: How Rupees Multiply Through the Economy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                One rupee spent on a movie ticket doesn't just disappear. It gets paid to actors, who buy groceries,
                who pay shopkeepers, who invest in businesses. This shows how money circulates and multiplies economic impact.
              </p>

              <div className="flex flex-col lg:flex-row items-center gap-8">
                <motion.div
                  className="flex-1 space-y-4 p-6 rounded-xl bg-gray-50 border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 mb-4">Money Supply × Velocity = Economic Activity</div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-700">Money Supply (M)</span>
                        <span className="text-xl font-bold text-amber-600">₹{moneySupply} Cr</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-700">Velocity (V)</span>
                        <Slider
                          value={velocity}
                          onValueChange={setVelocity}
                          max={10}
                          min={1}
                          step={0.1}
                          className="mx-4 flex-1"
                        />
                        <span className="text-xl font-bold text-amber-600">{velocity[0]}×</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-2 border-amber-200">
                        <span className="font-bold text-gray-900">Nominal GDP (M × V)</span>
                        <span className="text-2xl font-bold text-amber-600">₹{nominalGDP} Cr</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex-1 space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-center text-sm text-gray-600 mb-4">
                    How ₹1 becomes ₹{velocity[0]} of economic activity
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                        ₹1
                      </div>
                    </div>
                    <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      Ticket
                    </div>
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-amber-100 text-gray-900 flex items-center justify-center font-bold text-sm shadow-lg">
                      Actor
                    </div>
                    <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      Shop
                    </div>
                    <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      Bank
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold shadow-lg border-4 border-white">
                      ×{velocity[0]}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-8 p-6 rounded-2xl bg-amber-600 text-white text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-2xl font-bold mb-2">Economic Multiplier Effect</div>
                <div className="text-4xl font-bold mb-2">{velocity[0]}×</div>
                <p className="opacity-90">Each rupee in movie spending creates {velocity[0]} rupees of total economic activity</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
}