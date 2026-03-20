import Link from "next/link";

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
		<section id={id} className="rounded-[2rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
			<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<div>
					<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">{id}</div>
					<h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
				</div>
				<Link href="#top" className="text-sm font-semibold text-orange-600 hover:text-orange-700 underline underline-offset-4">Back to top</Link>
			</div>
			<p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">{subtitle}</p>
			<div className="mt-5">{children}</div>
		</section>
	);
}

export default function MicroReferencePage() {
	return (
		<main id="top" className="min-h-screen bg-[#f7f4ee] text-slate-900">
			<div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
				<div className="mb-8">
					<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">Micro reference</div>
					<h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight text-slate-900">Microeconomics of Dhurandhar</h1>
					<p className="mt-4 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">A detailed reference version of the microeconomics note with actual figures, formulas, and source-oriented tables.</p>
				</div>

				<div className="mb-6 rounded-[2rem] border border-orange-100 bg-orange-50 p-5 shadow-sm">
					<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">Table of contents</div>
					<div className="mt-4 grid gap-2 md:grid-cols-3 xl:grid-cols-4">
						{toc.map((item) => (
							<Link key={item.id} href={`#${item.id}`} className="rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-orange-200 hover:text-orange-600 transition-colors">
								{item.label}
							</Link>
						))}
					</div>
				</div>

				<div className="grid gap-4">
					<Section id="frame" title="A proper frame for the microeconomics of film" subtitle="A movie is a project-finance asset inside a larger industrial system, not GDP.">
						<div className="grid gap-3 md:grid-cols-3">
							<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
								<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Unit of analysis</div>
								<div className="mt-2 text-sm text-slate-700 leading-relaxed">Producer, studio, financier, distributor, exhibitor, streamer, broadcaster, music label, and franchise owner.</div>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
								<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Core question</div>
								<div className="mt-2 text-sm text-slate-700 leading-relaxed">Who funded the film, who took the risk, who captured the rights, and who ended up with the surplus?</div>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
								<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Commercial logic</div>
								<div className="mt-2 text-sm text-slate-700 leading-relaxed">A film is a bundle of rights and cash-flow windows: theatrical, streaming, TV licensing, music, consumer products, and library value.</div>
							</div>
						</div>
					</Section>

					<Section id="global" title="Global context" subtitle="Integrated media groups dominate because they control both content and downstream monetization.">
						<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
							{[
								{ item: "Global cinema box office (2024)", figure: "US$33 bn", note: "PwC 2025 outlook" },
								{ item: "Projected 2029 box office", figure: "US$41.5 bn", note: "PwC 2025 outlook" },
								{ item: "Paramount filmed entertainment mix", figure: "~72% licensing / 27% theatrical", note: "SEC filing summary" },
								{ item: "Entertainment strategy", figure: "IP across platforms", note: "Disney / Warner / Paramount style model" },
							].map((row) => (
								<div key={row.item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">{row.item}</div>
									<div className="mt-2 text-2xl font-black tracking-tight text-slate-900">{row.figure}</div>
									<div className="mt-1 text-sm text-slate-600">{row.note}</div>
								</div>
							))}
						</div>
					</Section>

					<Section id="india" title="India: one market on paper, many industries in practice" subtitle="The market is huge, fragmented, and rights-sensitive, so the model has to separate reported, estimated, and modeled numbers.">
						<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
							{[
								{ item: "Film revenue", figure: "INR 187 bn", note: "EY 2024" },
								{ item: "Films released", figure: "1,600+", note: "EY 2024" },
								{ item: "Hindi films above INR 1 bn", figure: "11", note: "EY 2024" },
								{ item: "Admissions / tickets", figure: "943m tickets", note: "IBEF 2023" },
							].map((row) => (
								<div key={row.item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">{row.item}</div>
									<div className="mt-2 text-2xl font-black tracking-tight text-slate-900">{row.figure}</div>
									<div className="mt-1 text-sm text-slate-600">{row.note}</div>
								</div>
							))}
						</div>
					</Section>

					<Section id="dhurandhar" title="Where Dhurandhar sits" subtitle="This is a franchise-scale event-film asset with a creative-origin banner and a capital / distribution platform.">
						<div className="grid gap-3 md:grid-cols-3">
							{assumptionRows.map((row) => (
								<div key={row.item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">{row.item}</div>
									<div className="mt-2 text-2xl font-black tracking-tight text-slate-900">{row.figure}</div>
									<div className="mt-1 text-sm text-slate-600">{row.note}</div>
								</div>
							))}
						</div>
					</Section>

					<Section id="model" title="The right micro model" subtitle="The model should start with the full revenue stack and full cost stack, then work down into returns.">
						<div className="grid gap-3 md:grid-cols-2">
							<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
								<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Revenue identity</div>
								<div className="mt-2 text-sm font-mono text-slate-800 leading-relaxed">TR = BO<sub>India</sub> + BO<sub>Overseas</sub> + OTT + Satellite + Music + Ancillary</div>
							</div>
							<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
								<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">Cost identity</div>
								<div className="mt-2 text-sm font-mono text-slate-800 leading-relaxed">TC = Production + P&amp;A + Distribution + Financing + Talent premium + Overheads</div>
							</div>
						</div>
					</Section>

					<Section id="franchise" title="Dhurandhar franchise assumptions" subtitle="Part 2 is explicitly modeled at 1.5x Part 1 instead of being silently blended into one number.">
						<table className="w-full border-collapse overflow-hidden rounded-2xl">
							<thead>
								<tr className="text-left text-xs uppercase tracking-[0.25em] text-slate-400">
									<th className="border-b border-slate-200 py-3 pr-4">Assumption</th>
									<th className="border-b border-slate-200 py-3 pr-4">Value</th>
									<th className="border-b border-slate-200 py-3">Source / note</th>
								</tr>
							</thead>
							<tbody>
								{[
									["Part 1 worldwide gross anchor", "₹1,353 cr", "Base anchor from the model"],
									["Part 2 multiplier", "1.5x", "Explicit assumption"],
									["Part 2 worldwide gross", "₹2,029.5 cr", "1.5 × Part 1"],
									["Combined worldwide gross", "₹3,382.5 cr", "Part 1 + Part 2"],
								].map(([a, b, c]) => (
									<tr key={a} className="align-top">
										<td className="border-b border-slate-100 py-3 pr-4 font-medium text-slate-900">{a}</td>
										<td className="border-b border-slate-100 py-3 pr-4 font-mono text-slate-900">{b}</td>
										<td className="border-b border-slate-100 py-3 text-slate-600">{c}</td>
									</tr>
								))}
							</tbody>
						</table>
					</Section>

					<Section id="revenue" title="Revenue stack" subtitle="The producer/studio top line is the realized film revenue after theatrical conversion and the rights stack.">
						<table className="w-full border-collapse overflow-hidden rounded-2xl">
							<thead>
								<tr className="text-left text-xs uppercase tracking-[0.25em] text-slate-400">
									<th className="border-b border-slate-200 py-3 pr-4">Revenue item</th>
									<th className="border-b border-slate-200 py-3 pr-4">Figure</th>
									<th className="border-b border-slate-200 py-3">Notes</th>
								</tr>
							</thead>
							<tbody>
								{revenueRows.map((row) => (
									<tr key={row.item} className="align-top">
										<td className="border-b border-slate-100 py-3 pr-4 font-medium text-slate-900">{row.item}</td>
										<td className="border-b border-slate-100 py-3 pr-4 font-mono text-slate-900">{row.figure}</td>
										<td className="border-b border-slate-100 py-3 text-slate-600">{row.note}</td>
									</tr>
								))}
							</tbody>
						</table>
					</Section>

					<Section id="costs" title="Cost stack" subtitle="Direct and indirect costs cover the full project stack, not just one headline line item.">
						<table className="w-full border-collapse overflow-hidden rounded-2xl">
							<thead>
								<tr className="text-left text-xs uppercase tracking-[0.25em] text-slate-400">
									<th className="border-b border-slate-200 py-3 pr-4">Cost item</th>
									<th className="border-b border-slate-200 py-3 pr-4">Figure</th>
									<th className="border-b border-slate-200 py-3">Notes</th>
								</tr>
							</thead>
							<tbody>
								{costRows.map((row) => (
									<tr key={row.item} className="align-top">
										<td className="border-b border-slate-100 py-3 pr-4 font-medium text-slate-900">{row.item}</td>
										<td className="border-b border-slate-100 py-3 pr-4 font-mono text-slate-900">{row.figure}</td>
										<td className="border-b border-slate-100 py-3 text-slate-600">{row.note}</td>
									</tr>
								))}
							</tbody>
						</table>
					</Section>

					<Section id="returns" title="Returns and checks" subtitle="The waterfall should show EBITDA, EBIT, PBT, tax, and PAT in order so the result is readable as a flow.">
						<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
							{waterfallRows.map((row) => (
								<div key={row.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">{row.label}</div>
									<div className="mt-2 text-2xl font-black tracking-tight text-slate-900">{row.value}</div>
									<div className="mt-1 text-sm text-slate-600">{row.note}</div>
								</div>
							))}
						</div>
						<div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4">
							<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">Interpretation</div>
							<div className="mt-2 text-sm md:text-base text-slate-700 leading-relaxed">Under the stated assumptions, the model yields a strong post-tax outcome. The key is to keep it clearly labeled as a modeled base case rather than an audited result.</div>
						</div>
					</Section>
				</div>

				<div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
					<div className="text-xs uppercase tracking-[0.35em] text-orange-500 font-semibold">Source notes</div>
					<div className="mt-4 flex flex-wrap gap-2">
						{sourceNotes.map((note) => (
							<span key={note} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">{note}</span>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}