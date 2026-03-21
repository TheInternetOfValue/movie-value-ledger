"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Database, FileText, Info, LayoutDashboard, TrendingUp } from "lucide-react";

const sections = [
	{
		id: "why",
		title: "Why the three lenses matter",
		body: [
			"If someone creates the income account by taking the expenditure total and slicing percentages off it until it matches, that is not real accounting. It is a presentation mockup.",
			"Real national accounts use three different approaches: production/output, expenditure, and income. They come from different source systems and are later reconciled.",
			"The source data will not line up perfectly. A statistical discrepancy is normal.",
		],
	},
	{
		id: "model",
		title: "How to think about the movie model",
		body: [
			"Expenditure should be estimated from demand and spending flows.",
			"Income should be estimated independently from who got paid and who captured surplus.",
			"Velocity is not a third GDP identity. It is a circulation lens and it should stay separate from the first two accounts.",
		],
	},
	{
		id: "anchors",
		title: "Part 1 and Part 2 anchors",
		body: [
			"Part 1 anchors: worldwide gross ₹1,353 crore, India gross ₹1,058 crore, overseas gross ₹295 crore, total cost including P&A ₹265 crore, non-theatrical rights ₹135 crore.",
			"Part 2 assumption: worldwide gross equals 1.5 times Part 1, which gives ₹2,029.5 crore.",
			"A base overseas share of 18% is used for Part 2, which gives overseas gross ₹365.31 crore and India gross ₹1,664.19 crore.",
			"Aggregate totals: worldwide gross ₹3,382.50 crore, India gross ₹2,722.19 crore, overseas gross ₹660.31 crore, total cost ₹505 crore, non-theatrical rights ₹380 crore.",
			"India net is taken at an 84.5% ratio, which gives aggregate India net ₹2,300.25 crore.",
		],
	},
	{
		id: "expenditure",
		title: "Expenditure account",
		body: [
			"Formula: GDPmovie(E) = C + I + G + (X - M)",
			"Final expenditure result: ₹4,772.34 crore.",
		],
		table: [
			["C", "Consumption", "₹3,566.07 cr", "Tickets, concessions, adjacent spend"],
			["I", "Investment", "₹505.00 cr", "All-in production and release cost"],
			["G", "Government support", "₹7.58 cr", "Public support / facilitation"],
			["X", "Exports", "₹736.31 cr", "Overseas theatrical + foreign rights"],
			["M", "Imports", "₹42.62 cr", "Imported inputs and services"],
		],
		math: [
			"C = C_tickets + C_concessions + C_adjacent",
			"I = I_production + I_P&A + I_distribution",
			"X = X_overseas theatrical + X_foreign rights",
			"M = M_production imports + M_marketing/distribution imports",
		],
	},
	{
		id: "income",
		title: "Income account",
		body: [
			"Formula: GDPmovie(Y) = W + OS + MI + (T - S)",
			"Final income result: ₹4,353.84 crore.",
		],
		table: [
			["W", "Compensation of employees", "₹749.47 cr", "Wages and labour compensation"],
			["OS", "Operating surplus", "₹2,991.39 cr", "Producer, distributor, exhibitor surplus"],
			["MI", "Mixed income / rents / finance", "₹155.60 cr", "Royalties, rentals, finance-type income"],
			["T - S", "Taxes less subsidies", "₹457.38 cr", "Taxes net of support"],
		],
		math: [
			"W = W_production + W_tickets/service + W_concessions + W_adjacent",
			"(T - S) = T_tickets + T_concessions + T_other - S",
			"MI = MI_cost side + MI_rights",
			"OS = OS_producer/distributor + OS_exhibitor/local-service",
		],
	},
	{
		id: "gap",
		title: "What the gap means",
		body: [
			"Expenditure: ₹4,772.34 crore.",
			"Income: ₹4,353.84 crore.",
			"Difference: ₹418.50 crore.",
			"Gap as a share of expenditure: 8.77%.",
			"That gap is the statistical discrepancy or model discrepancy. For a public-data reconstruction, that is a believable result.",
		],
	},
	{
		id: "velocity",
		title: "Velocity / flow lens",
		body: [
			"Velocity is not a third GDP identity.",
			"It is a circulation or multiplier lens.",
			"Initial local injection Jlocal = I + G - M = ₹469.96 crore.",
			"Multiplier k = 1.68.",
			"Secondary spillover Vsecondary = Jlocal × (k - 1) = ₹319.57 crore.",
			"Total local circulation = ₹789.53 crore.",
		],
	},
	{
		id: "assumptions",
		title: "Variables and assumptions",
		body: [
			"WWP1 = ₹1,353.00 crore.",
			"WWP2 = ₹2,029.50 crore.",
			"Part 2 overseas share = 18%.",
			"India net ratio = 84.5%.",
			"Concessions share = 27%.",
			"Adjacent spend share = 4%.",
			"Government support share of investment = 1.5%.",
			"Foreign share of rights = 20%.",
			"Production imports = 8%.",
			"Marketing and distribution imports = 10%.",
			"Producer/distributor share of India net = 50.5%.",
			"Producer/distributor realization of overseas gross = 42%.",
			"Local circulation multiplier = 1.68.",
		],
	},
	{
		id: "headline",
		title: "Final headline numbers",
		body: [
			"Direct expenditure-based footprint: ₹4,772 crore.",
			"Independent income-side estimate: ₹4,354 crore.",
			"Secondary spillover: ₹320 crore.",
			"Expanded footprint if you add the spillover to the expenditure headline: ₹5,092 crore.",
			"Public-facing rounded version: direct ₹4.8K crore, expanded ₹5.1K crore.",
		],
	},
	{
		id: "economist",
		title: "What I would actually say as an economist",
		body: [
			"Expenditure and income should broadly reconcile, but they should not be forced to match by construction.",
			"Leaving variables blank or zero invites attack.",
			"Velocity should stay separate.",
			"Use expenditure as the primary headline, income as the reconciliation check, and a discrepancy band to show why the two do not match exactly.",
		],
	},
];

export default function DhurandharMacroDataPage() {
	return (
		<main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
			<div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none" />
			
			<div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
				{/* Cinematic Header */}
				<header className="mb-20 space-y-6">
					<div className="flex items-center gap-3">
						<div className="h-1 w-12 bg-amber-500" />
						<div className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">Macro Ledger Reference</div>
					</div>
					
					<h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8">
						Macro <br/><span className="text-white/10 outline-text">Data Stack</span>
					</h1>

					<div className="max-w-2xl border-l-2 border-amber-500/30 pl-8 py-2">
						<p className="text-lg text-white/40 font-medium uppercase tracking-tight leading-relaxed">
							Full-spectrum reconciliation of the Dhurandhar economic footprint. Sourced from production expenditure, theatrical realization, and secondary circulation flow.
						</p>
					</div>
				</header>

				<div className="grid lg:grid-cols-[300px_1fr] gap-16">
					{/* Sticky Sidebar Nav */}
					<aside className="hidden lg:block">
						<div className="sticky top-24 space-y-8">
							<div className="space-y-2">
								<div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Registry Sections</div>
								<div className="flex flex-col gap-1">
									{sections.map((s) => (
										<a 
											key={s.id} 
											href={`#${s.id}`} 
											className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
										>
											<span className="text-[11px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{s.title}</span>
											<ChevronRight className="h-3 w-3 text-white/10 group-hover:text-amber-500 transition-colors" />
										</a>
									))}
								</div>
							</div>
							
							<div className="pt-8 border-t border-white/5">
								<Link href="/macro">
									<Button className="w-full h-14 bg-white text-black hover:bg-amber-500 font-black uppercase tracking-[0.3em] text-[10px] transition-all rounded-xl">
										<LayoutDashboard className="mr-2 h-4 w-4" /> Exit Registry
									</Button>
								</Link>
							</div>
						</div>
					</aside>

					{/* Main Content Feed */}
					<div className="space-y-32">
						{sections.map((section) => (
							<section key={section.id} id={section.id} className="scroll-mt-32 space-y-12">
								<div className="space-y-4">
									<div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">Block::{section.id}</div>
									<h2 className="text-4xl font-black text-white uppercase tracking-tighter">{section.title}</h2>
								</div>

								<div className="grid gap-8">
									<div className="space-y-4">
										{section.body.map((p, idx) => (
											<p key={idx} className="text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
												{p}
											</p>
										))}
									</div>

									{section.math && (
										<div className="dossier-card bg-white/[0.02] border-white/5 p-8 relative overflow-hidden group">
											<div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
												<TrendingUp size={80} />
											</div>
											<div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Variable Logic</div>
											<div className="space-y-3 font-mono text-sm text-amber-500/80">
												{section.math.map((line, idx) => (
													<div key={idx} className="flex gap-4">
														<span className="text-white/10">{idx + 1}.</span>
														{line}
													</div>
												))}
											</div>
										</div>
									)}

									{section.table && (
										<div className="dossier-card bg-black/40 border-white/5 overflow-hidden">
											<div className="overflow-x-auto">
												<table className="w-full text-left border-collapse">
													<thead>
														<tr className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-white/30 border-b border-white/10">
															<th className="py-5 px-8">ID</th>
															<th className="py-5 px-8">Definition</th>
															<th className="py-5 px-8">Impact</th>
															<th className="py-5 px-8">Note</th>
														</tr>
													</thead>
													<tbody className="divide-y divide-white/5">
														{section.table.map((row) => (
															<tr key={row[0]} className="group hover:bg-white/[0.02] transition-all">
																<td className="py-6 px-8 text-sm font-black text-amber-500 border-r border-white/5">{row[0]}</td>
																<td className="py-6 px-8 text-sm font-black text-white/90">{row[1]}</td>
																<td className="py-6 px-8 text-xl font-black text-white dossier-number tracking-tighter">{row[2]}</td>
																<td className="py-6 px-8 text-[11px] text-white/30 font-medium italic group-hover:text-white/60 transition-colors">{row[3]}</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									)}
								</div>
							</section>
						))}

						{/* Final Footer Links */}
						<footer className="pt-20 border-t border-white/5 flex flex-col items-center gap-8">
							<div className="text-center space-y-2">
								<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Audit Registry Internal</div>
								<p className="text-sm text-white/40">Verified via the Internet of Value Protocol v1.4</p>
							</div>
							<div className="flex gap-4">
								<Link href="/macro">
									<Button variant="outline" className="border-white/10 text-white/60 hover:bg-white/5 hover:text-white uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl">
										Back to Dashboard
									</Button>
								</Link>
								<Link href="/whitepaper">
									<Button className="bg-white text-black hover:bg-amber-500 uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl">
										View Protocol
									</Button>
								</Link>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</main>
	);
}
