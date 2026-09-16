// ============================================================================
// EcoLogits-based impact data for the "Cost of Slop" section.
// Numbers computed offline with EcoLogits v0.11.1 methodology
// (mlco2/ecologits, MPL-2.0) for one standard query = 300 output tokens.
// Architectures of frontier models are undisclosed, so EcoLogits reports
// ranges. We store min/max and display the midpoint labeled as estimate.
// PUE values below are EcoLogits' own per-provider datacenter configs.
// Recompute: pip install ecologits, then ecologits.tracers.utils.llm_impacts.
// ============================================================================

export interface ModelImpact {
  provider: string;
  providerShort: string;
  model: string;
  role: string;
  energyMin: number; // kWh per query
  energyMax: number; // kWh per query
  gwpMin: number; // kgCO2eq per query
  gwpMax: number; // kgCO2eq per query
  pue: string;
  grid: string;
  note?: string;
  highlight?: boolean;
}

export const QUERY_PROFILE = "One standard Copilot-style query, 300 output tokens";

export const ECO_METHOD = {
  library: "EcoLogits",
  version: "v0.11.1",
  repo: "https://github.com/mlco2/ecologits",
  docs: "https://ecologits.ai",
};

export const FLAGSHIP_IMPACTS: ModelImpact[] = [
  {
    provider: "OpenAI (Copilot backend)",
    providerShort: "OpenAI",
    model: "GPT-4o",
    role: "What Copilot runs on",
    energyMin: 0.000466,
    energyMax: 0.000754,
    gwpMin: 0.000197,
    gwpMax: 0.000308,
    pue: "1.20",
    grid: "USA",
    highlight: true,
  },
  {
    provider: "Anthropic",
    providerShort: "Anthropic",
    model: "Claude Sonnet 4",
    role: "Flagship chat model",
    energyMin: 0.000438,
    energyMax: 0.000732,
    gwpMin: 0.00019,
    gwpMax: 0.000303,
    pue: "1.09-1.14",
    grid: "USA",
  },
  {
    provider: "Google",
    providerShort: "Google",
    model: "Gemini 2.5 Flash",
    role: "Flagship efficient model",
    energyMin: 0.000408,
    energyMax: 0.000671,
    gwpMin: 0.000172,
    gwpMax: 0.000273,
    pue: "1.09",
    grid: "USA",
  },
  {
    provider: "Mistral AI",
    providerShort: "Mistral",
    model: "Mistral Large",
    role: "EU-hosted flagship",
    energyMin: 0.000178,
    energyMax: 0.000178,
    gwpMin: 0.000011,
    gwpMax: 0.000011,
    pue: "1.16",
    grid: "Sweden",
    note: "Cleanest grid in the set",
  },
];

export const LIGHTWEIGHT_IMPACTS: ModelImpact[] = [
  {
    provider: "OpenAI",
    providerShort: "OpenAI",
    model: "GPT-4o mini",
    role: "Small model",
    energyMin: 0.000024,
    energyMax: 0.000028,
    gwpMin: 0.000011,
    gwpMax: 0.000012,
    pue: "1.20",
    grid: "USA",
  },
  {
    provider: "Anthropic",
    providerShort: "Anthropic",
    model: "Claude Haiku",
    role: "Small model",
    energyMin: 0.000019,
    energyMax: 0.000049,
    gwpMin: 0.000008,
    gwpMax: 0.00002,
    pue: "1.09-1.14",
    grid: "USA",
  },
];

// Everyday equivalences for one GPT-4o query (midpoint: 0.61 Wh, 0.25 g CO2).
// Sources: phone charge ~15 Wh, 10W LED bulb, avg petrol car ~120 g CO2/km,
// avg US home ~29 kWh/day.
export const EQUIVALENCES = [
  {
    value: "4%",
    label: "of a full phone charge",
    detail: "About 25 queries drain one charge",
  },
  {
    value: "3.7 min",
    label: "of a 10W LED bulb",
    detail: "Per single query",
  },
  {
    value: "2.1 m",
    label: "of driving a petrol car",
    detail: "Per single query, 120 g CO2/km",
  },
  {
    value: "21 homes",
    label: "powered for a day",
    detail: "Per 1M queries, 610 kWh total",
  },
];

export const SCALE_BLOCK = {
  queries: "1,000,000",
  energyKwh: 610,
  co2Kg: 252,
  drivingKm: 2100,
  headline: "One million Copilot queries burn about 610 kWh",
  subline:
    "Roughly 252 kg of CO2, the same as driving 2,100 km. Then remember Copilot ships inside Windows and Office, firing on hundreds of millions of machines.",
};

export function mid(min: number, max: number): number {
  return (min + max) / 2;
}
