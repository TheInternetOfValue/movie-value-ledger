import Link from "next/link";
import { Button } from "@/components/ui/button";

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
			<div className="min-h-screen bg-[#f7f4ee] px-4 py-10 text-slate-900 overflow-hidden">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
				<div className="space-y-3 text-center">
					<div className="text-xs font-semibold uppercase tracking-[0.45em] text-orange-500">Reference only</div>
					<h1 className="text-3xl md:text-5xl font-bold tracking-tight">Dhurandhar Macro Data</h1>
					<p className="mx-auto max-w-3xl text-sm md:text-base text-slate-600">This page contains the full readable macro note behind the public `/macro` view.</p>
				</div>

				<div className="rounded-[2rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
					<div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Table of contents</div>
					<div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
						{sections.map((section) => (
							<a key={section.id} href={`#${section.id}`} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-orange-300 hover:text-orange-600">
								{section.title}
							</a>
						))}
					</div>
				</div>

				<div className="w-full rounded-[2rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm text-left space-y-8">
					{sections.map((section) => (
						<section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
							<h2 className="text-xl md:text-2xl font-bold text-slate-900">{section.title}</h2>
							<div className="space-y-2 text-sm md:text-base leading-relaxed text-slate-700">
								{section.body.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
							{section.math && (
								<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Visible math</div>
									<div className="mt-3 space-y-2 font-mono text-sm text-slate-800">
										{section.math.map((line) => (
											<div key={line}>{line}</div>
										))}
									</div>
								</div>
							)}
							{section.table && (
								<div className="overflow-hidden rounded-2xl border border-slate-200">
									<table className="w-full border-collapse text-sm">
										<thead className="bg-slate-100 text-slate-600">
											<tr>
												<th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Symbol</th>
												<th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Meaning</th>
												<th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Value</th>
												<th className="border-b border-slate-200 px-4 py-3 text-left font-semibold">Notes</th>
											</tr>
										</thead>
										<tbody>
											{section.table.map((row) => (
												<tr key={row[0]} className="odd:bg-white even:bg-slate-50">
													<td className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900">{row[0]}</td>
													<td className="border-b border-slate-200 px-4 py-3 text-slate-700">{row[1]}</td>
													<td className="border-b border-slate-200 px-4 py-3 text-slate-900">{row[2]}</td>
													<td className="border-b border-slate-200 px-4 py-3 text-slate-600">{row[3]}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</section>
					))}
				</div>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<Link href="/macro">
						<Button className="rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600">Back to macro</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
