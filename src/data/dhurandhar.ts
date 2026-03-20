export type Confidence = "sourced" | "estimated" | "inferred" | "unavailable";

export type PosterAsset = {
  src: string;
  alt: string;
  label: string;
};

export type BuzzMetric = {
  label: string;
  value: string;
  note: string;
  source: string;
  confidence: Confidence;
};

export type FilmBaseline = {
  film: string;
  part: string;
  releaseDate: string;
  runtimeMinutes: number;
  languages: string;
  director: string;
  producers: string;
  studios: string;
  distributor: string;
};

export type DhurandharHomeData = {
  title: string;
  subtitle: string;
  dataCurrentThrough: string;
  posters: PosterAsset[];
  filmBaselines: FilmBaseline[];
  buzz: BuzzMetric[];
};

export type MacroAccountRow = {
  film: string;
  budgetCr: number;
  budgetRange: string;
  indiaNetBoCr: number;
  indiaNetRange: string;
  indiaGrossCr: number;
  overseasGrossCr: number;
  worldwideGrossCr: number;
  worldwideRange: string;
  estimatedNonTheatricalCr: number;
  footfallsCrore: string;
  budgetToGrossMultiple: string;
};

export type SourceType = "sourced" | "estimated" | "inferred";

export type MacroConfidence = SourceType;

export type MacroGroup =
  | "box-office assumptions"
  | "spending ratios"
  | "government/import assumptions"
  | "income-side assumptions"
  | "velocity assumptions";

export type MacroVariable = {
  key: string;
  label: string;
  symbol: string;
  value: number;
  unit: string;
  description: string;
  sourceType: SourceType;
  group: MacroGroup;
};

export type MacroFormula = {
  key: string;
  label: string;
  expression: string;
  explanation: string;
};

export type MacroAssumptionPreset = {
  key: string;
  label: string;
  description: string;
  values: Record<string, number>;
};

export type MacroMarkdownSnapshot = {
  sourcePath: string;
  headline: string;
  overview: string;
  keyClaims: string[];
  formulas: string[];
  anchors: Record<string, number>;
  headlineTotals: {
    directExpenditureCr: number;
    expandedFootprintCr: number;
    incomeEstimateCr: number;
    secondaryVelocityCr: number;
    statisticalDiscrepancyCr: number;
  };
};

export type IncomeAccountRow = {
  film: string;
  producersSharePercent: number;
  exhibitorsSharePercent: number;
  talentAndKeyCrewSharePercent: number;
  otherOverheadsAndFinancingPercent: number;
};

export type FlowAccountRow = {
  film: string;
  phase: string;
  descriptionOfMoneyFlow: string;
};

export type SentimentRow = {
  film: string;
  platform: string;
  overallSentiment: string;
  keyThemes: string;
};

export type CommunityMetricRow = {
  film: string;
  platform: string;
  metric: string;
  value: string;
  context: string;
};

export const dhurandharHomeData: DhurandharHomeData = {
  title: "Dhurandhar 1 & 2",
  subtitle:
    "Beyond reviews and ratings. A comprehensive analysis of cinema's true value through four connected perspectives: country, business, community, and personal.",
  dataCurrentThrough: "March 19, 2026",
  posters: [
    {
      src: "/dhurandhar/part-1-poster.jpg",
      alt: "Dhurandhar Part 1 poster",
      label: "Part 1",
    },
    {
      src: "/dhurandhar/part-2-poster.jpg",
      alt: "Dhurandhar: The Revenge poster",
      label: "Part 2",
    },
  ],
  filmBaselines: [
    {
      film: "Dhurandhar",
      part: "Part 1",
      releaseDate: "5 Dec 2025",
      runtimeMinutes: 214,
      languages: "Hindi (theatrical); later dubbed/re-release limited",
      director: "Aditya Dhar",
      producers: "Jyoti Deshpande, Aditya Dhar, Lokesh Dhar",
      studios: "Jio Studios, B62 Studios",
      distributor: "Jio Studios (India & overseas partners)",
    },
    {
      film: "Dhurandhar: The Revenge",
      part: "Part 2",
      releaseDate: "19 Mar 2026",
      runtimeMinutes: 192,
      languages: "Hindi, Telugu, Tamil, Kannada, Malayalam",
      director: "Aditya Dhar",
      producers: "Jyoti Deshpande, Aditya Dhar, Lokesh Dhar",
      studios: "Jio Studios, B62 Studios",
      distributor: "Jio Studios (pan-India & overseas partners)",
    },
  ],
  buzz: [
    {
      label: "Trailer views",
      value: "Close to 512M total",
      note: "Combined trailer and teaser momentum across both films.",
      source: "Community Metrics.tsv · Film 1 trailer rows",
      confidence: "sourced",
    },
    {
      label: "X / Twitter",
      value: "Strongly positive",
      note: "Early consensus highlights Ranveer, scale, music, and action, with some criticism.",
      source: "Sentiment Summary.tsv · Dhurandhar / X-Twitter",
      confidence: "estimated",
    },
    {
      label: "Instagram / reels",
      value: "Highly active",
      note: "Official audio, edits, and reaction clips remain a major part of the social loop.",
      source: "Community Metrics.tsv · social engagement interpretation",
      confidence: "inferred",
    },
    {
      label: "Short-form pulse",
      value: "Far above baseline",
      note: "Sequel launch momentum is exceptionally high across short-form video.",
      source: "Community Metrics.tsv · Part 2 trailer views in 48h",
      confidence: "sourced",
    },
  ],
};

export const macroAccountRows: MacroAccountRow[] = [
  {
    film: "Dhurandhar",
    budgetCr: 250,
    budgetRange: "225–280",
    indiaNetBoCr: 850,
    indiaNetRange: "820–894",
    indiaGrossCr: 1000,
    overseasGrossCr: 299,
    worldwideGrossCr: 1300,
    worldwideRange: "1188–1354",
    estimatedNonTheatricalCr: 150,
    footfallsCrore: "3.65",
    budgetToGrossMultiple: "5.2",
  },
  {
    film: "Dhurandhar: The Revenge",
    budgetCr: 275,
    budgetRange: "250–350",
    indiaNetBoCr: 140,
    indiaNetRange: "135–145 (Day 0+1 only)",
    indiaGrossCr: 175,
    overseasGrossCr: 60,
    worldwideGrossCr: 235,
    worldwideRange: "200–250 (preliminary)",
    estimatedNonTheatricalCr: 245,
    footfallsCrore: "",
    budgetToGrossMultiple: "0.8545454545",
  },
];

export const dhurandharMacroMarkdownSnapshot: MacroMarkdownSnapshot = {
  sourcePath: "docs/macro-econ-3lenses",
  headline: "Use separate expenditure, income, and velocity lenses — do not force one to equal the others.",
  overview:
    "The notes emphasize independent reconstruction, visible discrepancy, and velocity as a circulation lens rather than a third GDP identity.",
  keyClaims: [
    "Expenditure should be estimated from demand and spending flows.",
    "Income should be estimated independently from who got paid and who captured surplus.",
    "Velocity measures circulation, not another identical GDP total.",
  ],
  formulas: [
    "E = C + I + G + (X - M)",
    "Y = W + OS + MI + (T - S)",
    "V_secondary = J_local × (k - 1)",
    "J_local = I + G - M",
  ],
  anchors: {
    part1WorldwideGross: 1353,
    part1IndiaGross: 1058,
    part1OverseasGross: 295,
    part1Costs: 265,
    part1NonTheatrical: 135,
    part2WorldwideMultiplier: 1.5,
    part2OverseasShare: 0.18,
    indiaNetRatio: 0.845,
    concessionsRatio: 0.27,
    adjacentSpendRatio: 0.04,
    governmentSupportRatio: 0.015,
    importLeakageRatio: 0.08,
    foreignRightsShare: 0.22,
    wagesShare: 0.48,
    operatingSurplusShare: 0.31,
    mixedIncomeShare: 0.12,
    taxesLessSubsidiesShare: 0.09,
    localMultiplier: 1.72,
  },
  headlineTotals: {
    directExpenditureCr: 4772,
    expandedFootprintCr: 5092,
    incomeEstimateCr: 4354,
    secondaryVelocityCr: 320,
    statisticalDiscrepancyCr: 418,
  },
};

export const macroVariables: MacroVariable[] = [
  { key: "part1WorldwideGross", label: "Part 1 worldwide gross", symbol: "WW₁", value: 1353, unit: "₹ cr", description: "Anchor worldwide gross for Dhurandhar Part 1.", sourceType: "sourced", group: "box-office assumptions" },
  { key: "part2WorldwideMultiplier", label: "Part 2 multiplier", symbol: "m₂", value: 1.5, unit: "×", description: "Projected Part 2 worldwide gross relative to Part 1.", sourceType: "estimated", group: "box-office assumptions" },
  { key: "part2OverseasShare", label: "Part 2 overseas share", symbol: "s₂", value: 0.18, unit: "%", description: "Projected overseas share of Part 2 worldwide gross.", sourceType: "estimated", group: "box-office assumptions" },
  { key: "concessionsRatio", label: "Concessions ratio", symbol: "r_c", value: 0.27, unit: "%", description: "Food and beverage spend around the moviegoing trip.", sourceType: "estimated", group: "spending ratios" },
  { key: "adjacentSpendRatio", label: "Adjacent spend ratio", symbol: "r_a", value: 0.04, unit: "%", description: "Parking, local transport, nearby food and impulse spend.", sourceType: "estimated", group: "spending ratios" },
  { key: "governmentSupportRatio", label: "Government support ratio", symbol: "r_g", value: 0.015, unit: "%", description: "Public support, rebates, or policy-linked support.", sourceType: "inferred", group: "government/import assumptions" },
  { key: "importLeakageRatio", label: "Import leakage ratio", symbol: "r_m", value: 0.08, unit: "%", description: "Imported equipment, foreign services, and leakages.", sourceType: "estimated", group: "government/import assumptions" },
  { key: "foreignRightsShare", label: "Foreign rights share", symbol: "r_x", value: 0.22, unit: "%", description: "Part of non-theatrical or external franchise rights held overseas.", sourceType: "inferred", group: "government/import assumptions" },
  { key: "wagesShare", label: "Wages share", symbol: "W", value: 0.48, unit: "%", description: "Compensation of employees in the reconstructed income view.", sourceType: "estimated", group: "income-side assumptions" },
  { key: "operatingSurplusShare", label: "Operating surplus share", symbol: "OS", value: 0.31, unit: "%", description: "Operating surplus captured by producers, distributors, and exhibitors.", sourceType: "estimated", group: "income-side assumptions" },
  { key: "mixedIncomeShare", label: "Mixed income share", symbol: "MI", value: 0.12, unit: "%", description: "Mixed income, rent, finance, and rights-type earnings.", sourceType: "inferred", group: "income-side assumptions" },
  { key: "taxesLessSubsidiesShare", label: "Taxes less subsidies share", symbol: "T-S", value: 0.09, unit: "%", description: "Product and production taxes net of subsidies.", sourceType: "inferred", group: "income-side assumptions" },
  { key: "localMultiplier", label: "Local multiplier", symbol: "k", value: 1.72, unit: "×", description: "Circulation multiplier for the local economy after initial injection.", sourceType: "estimated", group: "velocity assumptions" },
];

export const macroScenarioPresets: MacroAssumptionPreset[] = [
  {
    key: "conservative",
    label: "Conservative",
    description: "Lower spillovers, higher leakage, tighter audience spend assumptions.",
    values: { part2WorldwideMultiplier: 1.25, concessionsRatio: 0.22, adjacentSpendRatio: 0.03, governmentSupportRatio: 0.01, importLeakageRatio: 0.11, foreignRightsShare: 0.17, wagesShare: 0.45, operatingSurplusShare: 0.3, mixedIncomeShare: 0.1, taxesLessSubsidiesShare: 0.15, localMultiplier: 1.5 },
  },
  {
    key: "base",
    label: "Base",
    description: "Uses the article anchors as the starting case.",
    values: { part2WorldwideMultiplier: 1.5, concessionsRatio: 0.27, adjacentSpendRatio: 0.04, governmentSupportRatio: 0.015, importLeakageRatio: 0.08, foreignRightsShare: 0.22, wagesShare: 0.48, operatingSurplusShare: 0.31, mixedIncomeShare: 0.12, taxesLessSubsidiesShare: 0.09, localMultiplier: 1.72 },
  },
  {
    key: "aggressive",
    label: "Aggressive",
    description: "Higher audience spending, more circulation, stronger franchise economics.",
    values: { part2WorldwideMultiplier: 1.72, concessionsRatio: 0.31, adjacentSpendRatio: 0.06, governmentSupportRatio: 0.02, importLeakageRatio: 0.06, foreignRightsShare: 0.28, wagesShare: 0.5, operatingSurplusShare: 0.34, mixedIncomeShare: 0.1, taxesLessSubsidiesShare: 0.06, localMultiplier: 1.95 },
  },
];

export const incomeAccountRows: IncomeAccountRow[] = [
  {
    film: "Dhurandhar",
    producersSharePercent: 52.5,
    exhibitorsSharePercent: 47.5,
    talentAndKeyCrewSharePercent: 40,
    otherOverheadsAndFinancingPercent: 60,
  },
  {
    film: "Dhurandhar: The Revenge (projected pattern)",
    producersSharePercent: 52.5,
    exhibitorsSharePercent: 47.5,
    talentAndKeyCrewSharePercent: 40,
    otherOverheadsAndFinancingPercent: 60,
  },
];

export const flowAccountRows: FlowAccountRow[] = [
  {
    film: "Dhurandhar",
    phase: "Production (2014–2025)",
    descriptionOfMoneyFlow: "Staggered production spend across sets, locations, VFX, salaries, spread over ~18–24 months.",
  },
  {
    film: "Dhurandhar",
    phase: "Theatrical run (Dec 2025–Feb 2026)",
    descriptionOfMoneyFlow: "High-velocity revenue inflow: rapid box office collections with strong weekday hold and long tail.",
  },
  {
    film: "Dhurandhar",
    phase: "Post-theatrical",
    descriptionOfMoneyFlow: "Lump-sum and staggered cash from OTT, satellite and music rights layered over 1–3 years.",
  },
  {
    film: "Dhurandhar: The Revenge",
    phase: "Production (shot alongside Part 1)",
    descriptionOfMoneyFlow: "Incremental spend lower than a standalone film because core sets, VFX pipelines and writing staff were already in place.",
  },
  {
    film: "Dhurandhar: The Revenge",
    phase: "Release window (from Mar 2026)",
    descriptionOfMoneyFlow: "Front‑loaded cash from record paid previews and opening day, followed by regular theatrical settlement cycles.",
  },
  {
    film: "Dhurandhar: The Revenge",
    phase: "Forward-looking ecosystem impact",
    descriptionOfMoneyFlow: "Non-theatrical deals and franchise halo expected to recycle value into future Aditya Dhar/Jio Studios projects.",
  },
];

export const communityMetricRows: CommunityMetricRow[] = [
  {
    film: "Dhurandhar",
    platform: "YouTube",
    metric: "Official trailer views (all platforms, early run)",
    value: "200000000",
    context: "Trailer crossed ~200M views across platforms shortly after launch.",
  },
  {
    film: "Dhurandhar",
    platform: "YouTube",
    metric: "Official JioStudios Hindi trailer views",
    value: "72000000",
    context: "Single‑channel trailer view count snapshot.",
  },
  {
    film: "Dhurandhar: The Revenge",
    platform: "YouTube",
    metric: "Hindi trailer views in first 24 hours",
    value: "39200000",
    context: "Hindi trailer views in first 24 hours on YouTube.",
  },
  {
    film: "Dhurandhar: The Revenge",
    platform: "YouTube + other",
    metric: "Trailer views in first 48 hours (all platforms)",
    value: "312000000",
    context: "Cross-platform trailer views in first 48 hours.",
  },
];

export const sentimentRows: SentimentRow[] = [
  {
    film: "Dhurandhar",
    platform: "X / Twitter",
    overallSentiment: "Strongly positive with some criticism",
    keyThemes: "Praise for Ranveer, scale, music and action; criticism of length and ideological tone.",
  },
  {
    film: "Dhurandhar",
    platform: "Reddit",
    overallSentiment: "Polarised but engaged",
    keyThemes: "Long-form debates on politics, violence and craft; repeated threads on box office milestones.",
  },
  {
    film: "Dhurandhar",
    platform: "Review aggregators",
    overallSentiment: "Generally favourable",
    keyThemes: "High audience scores and solid critic reviews; some note hyper-nationalist framing.",
  },
  {
    film: "Dhurandhar: The Revenge",
    platform: "X / Twitter",
    overallSentiment: "Positive to mixed-positive in first 24–48 hours",
    keyThemes: "Applause for scale and set-pieces; some feel narrative is less tight than Part 1.",
  },
  {
    film: "Dhurandhar: The Revenge",
    platform: "YouTube & Instagram",
    overallSentiment: "Highly engaged",
    keyThemes: "High trailer engagement, reaction videos, reels and edits using trailer audio.",
  },
];
