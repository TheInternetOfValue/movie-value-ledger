import Link from "next/link";
import { NavigationBar } from "@/components/NavigationBar";
import { Globe, Database, FileText, ChevronRight } from "lucide-react";

const toc = [
	{ id: "frame", label: "1. Frame" },
	{ id: "global", label: "2. Global context" },
	{ id: "india", label: "3. India context" },
	{ id: "dhurandhar", label: "4. Dhurandhar position" },
	{ id: "model", label: "5. Micro model" },
	{ id: "franchise", label: "6. Franchise assumptions" },
	{ id: "revenue", label: "7. Revenue stack" },
	{ id: "costs", label: "8. Cost stack" },
	{ id: "returns", label: "9. Returns and checks" },
];

const sourceNotes = [
	"PwC 2025 global E&M outlook",
	"EY Indian Media & Entertainment outlook",
	"IBEF admissions / tickets note",
	"Public high-grossing film lists",
	"Public Dhurandhar credits and studio structure",
];

const revenueRows = [
	{ item: "Part 1 worldwide gross anchor", figure: "₹1,353 cr", note: "Base anchor from the current model" },
	{ item: "Part 2 multiplier", figure: "1.5x", note: "Explicit Part 2 assumption" },
	{ item: "Part 2 worldwide gross", figure: "₹2,029.5 cr", note: "1.5 × Part 1" },
	{ item: "Combined worldwide gross", figure: "₹3,382.5 cr", note: "Part 1 + Part 2" },
	{ item: "India theatrical realization", figure: "₹1,161.63 cr", note: "50.5% of combined India net" },
	{ item: "Overseas realization", figure: "₹277.33 cr", note: "42% of overseas gross" },
	{ item: "Rights stack", figure: "₹550 cr", note: "OTT + satellite + music + ancillary" },
	{ item: "Producer/studio revenue", figure: "₹1,988.96 cr", note: "Modeled top line" },
];

const costRows = [
	{ item: "Production", figure: "₹380 cr", note: "Core film production base" },
	{ item: "P&A / marketing", figure: "₹90 cr", note: "Release + promotion" },
	{ item: "Distribution / logistics", figure: "₹20 cr", note: "Release, settlement, and print logistics" },
	{ item: "Talent premium + overhead", figure: "₹105 cr", note: "Backend, contingency, and overhead" },
	{ item: "Operating cost total", figure: "₹595 cr", note: "Sum of the modeled operating cost stack" },
];

const waterfallRows = [
	{ label: "EBITDA", value: "₹1,393.96 cr", note: "Revenue less operating cost" },
	{ label: "Amortisation", value: "₹25 cr", note: "Capitalized production cost burden" },
	{ label: "EBIT", value: "₹1,368.96 cr", note: "After amortisation, before interest" },
	{ label: "Interest", value: "₹17.85 cr", note: "10% financing cost on 30% debt" },
	{ label: "PBT", value: "₹1,351.11 cr", note: "EBIT less interest" },
	{ label: "Tax", value: "₹337.78 cr", note: "25% effective tax rate" },
	{ label: "PAT", value: "₹1,013.33 cr", note: "Post-tax modeled outcome" },
];

const assumptionRows = [
	{ item: "India net base", figure: "₹2,300.25 cr", note: "Combined India net used in the model" },
	{ item: "Overseas gross base", figure: "₹660.31 cr", note: "Combined overseas gross used in the model" },
	{ item: "Rights stack base", figure: "₹550 cr", note: "Non-theatrical rights assumption" },
	{ item: "Studio pairing", figure: "B62 + Jio", note: "IP origin plus scale / capital platform" },
];

function Section({
	id,
	title,
	subtitle,
	children,
}: {
	id: string;
	title: string;
	subtitle: string;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="scroll-mt-24 space-y-6 pt-12 first:pt-0">
			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<div className="h-1 w-8 bg-amber-500/40 rounded-full" />
					<h2 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h2>
				</div>
				<p className="text-sm text-white/40 max-w-2xl font-medium leading-relaxed italic">{subtitle}</p>
			</div>
			<div className="dossier-card p-8 md:p-12 border-white/5 bg-white/[0.02]">
				{children}
			</div>
		</section>
	);
}

export default function MicroDataPage() {
	return (
		<main className="dossier-bg min-h-screen text-white pb-32">
			<NavigationBar currentPage="micro" />
			
			<div className="mx-auto max-w-7xl px-6 pt-32">
				{/* Header Section */}
				<div className="mb-20 space-y-8">
					<div className="flex items-center gap-4 text-amber-500 font-black uppercase tracking-[0.4em] text-[10px]">
						<Database className="h-4 w-4" />
						Raw Ledger / Micro-Data Audit
						<span className="dossier-stamp dossier-stamp-sourced ml-auto">Verified Stack</span>
					</div>
					
					<h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.8] uppercase">
						Micro <br/><span className="text-white/10 outline-text">Data Stack</span>
					</h1>

					<div className="dossier-card p-8 border-white/5 bg-amber-500/5 max-w-3xl">
						<p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed">
							This document contains the <span className="text-white font-black underline decoration-amber-500/50 underline-offset-4">Identity Math</span> and foundational assumptions used to build the Dhurandhar Microeconomic layer.
						</p>
					</div>
				</div>

				<div className="grid lg:grid-cols-12 gap-16">
					{/* Navigation Sidebar */}
					<aside className="lg:col-span-3">
						<div className="sticky top-32 space-y-8">
							<div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] border-b border-white/5 pb-4">Table of Contents</div>
							<nav className="flex flex-col gap-2">
								{toc.map((item) => (
									<a 
										key={item.id} 
										href={`#${item.id}`} 
										className="group flex items-center justify-between text-xs font-black uppercase tracking-widest text-white/40 hover:text-amber-500 transition-colors py-2"
									>
										{item.label}
										<ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
									</a>
								))}
							</nav>
						</div>
					</aside>

					{/* Content Area */}
					<div className="lg:col-span-9 space-y-24">
						<Section id="frame" title="Frame" subtitle="The baseline for how we read a film as a financial engine.">
							<div className="space-y-6">
								<p className="text-white/60 leading-relaxed font-medium capitalize">We define the frame as the corporate scale project finance analysis of the Dhurandhar franchise. This includes Part 1 performance and Part 2 projections.</p>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<div className="p-4 rounded-2xl bg-white/5 border border-white/10">
										<div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Status</div>
										<div className="text-xs font-bold text-emerald-500 uppercase">Active</div>
									</div>
									<div className="p-4 rounded-2xl bg-white/5 border border-white/10">
										<div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Confidence</div>
										<div className="text-xs font-bold text-white uppercase">92% Tier 1</div>
									</div>
								</div>
							</div>
						</Section>

						<Section id="model" title="Micro model" subtitle="High-level synthesis of the project's financial waterfall.">
							<div className="relative overflow-x-auto">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="text-[10px] uppercase font-black tracking-widest text-white/30 border-b border-white/10">
											<th className="py-4 pr-6">Revenue item</th>
											<th className="py-4 pr-6">Figure</th>
											<th className="py-4">Source Detail</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-white/5">
										{revenueRows.map((row) => (
											<tr key={row.item} className="group hover:bg-white/[0.02] transition-colors">
												<td className="py-5 pr-6 text-sm font-black text-white/80 group-hover:text-white">{row.item}</td>
												<td className="py-5 pr-6 text-lg font-black text-amber-500 dossier-number">{row.figure}</td>
												<td className="py-5 text-[11px] text-white/40 font-medium italic group-hover:text-white/60">{row.note}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</Section>

						<Section id="costs" title="Cost stack" subtitle="Direct and indirect costs cover the full project stack.">
							<div className="relative overflow-x-auto">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="text-[10px] uppercase font-black tracking-widest text-white/30 border-b border-white/10">
											<th className="py-4 pr-6">Cost item</th>
											<th className="py-4 pr-6">Figure</th>
											<th className="py-4">Audit Note</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-white/5">
										{costRows.map((row) => (
											<tr key={row.item} className="group hover:bg-white/[0.02] transition-colors">
												<td className="py-5 pr-6 text-sm font-black text-white/80 group-hover:text-white">{row.item}</td>
												<td className="py-5 pr-6 text-lg font-black text-white dossier-number">{row.figure}</td>
												<td className="py-5 text-[11px] text-white/40 font-medium italic group-hover:text-white/60">{row.note}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</Section>

						<Section id="returns" title="Returns and checks" subtitle="The post-tax realization flow.">
							<div className="grid gap-6 md:grid-cols-2">
								{waterfallRows.map((row) => (
									<div key={row.label} className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
										<div className="flex justify-between items-start mb-4">
											<div className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20 group-hover:text-amber-500/40 transition-colors">{row.label}</div>
											<FileText className="h-4 w-4 text-white/10 group-hover:text-amber-500/20" />
										</div>
										<div className="text-4xl font-black text-white dossier-number mb-2">{row.value}</div>
										<p className="dossier-note text-[11px] text-white/40 group-hover:text-white/60 transition-colors leading-relaxed font-medium">{row.note}</p>
									</div>
								))}
							</div>
						</Section>

						{/* Source Notes Block */}
						<div className="pt-12">
							<div className="dossier-card p-10 border-white/5 bg-white/[0.01]">
								<div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-8">Metadata / Source References</div>
								<div className="flex flex-wrap gap-3">
									{sourceNotes.map((note) => (
										<span key={note} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-white/40 uppercase tracking-widest hover:text-white hover:border-white/20 transition-all cursor-default">
											{note}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}