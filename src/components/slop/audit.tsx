"use client";

import { useState } from "react";

// EcoLogits v0.11.1 midpoints per 300-token query.
const BASE_KWH = 0.0006099; // GPT-4o
const BASE_L = 0.002199; // GPT-4o water footprint

const TIERS = [
  { name: "8B Slim", sub: "mini class", mult: 0.0425 },
  { name: "70B Dense", sub: "flagship class", mult: 1.0 },
  { name: "400B+ MoE", sub: "giant class", mult: 9.6 },
];

export function Audit() {
  const [queries, setQueries] = useState(500_000);
  const [tier, setTier] = useState(1);

  const m = TIERS[tier].mult;
  const kwh = Math.round(queries * BASE_KWH * m);
  const liters = Math.round(queries * BASE_L * m);
  const barrels = (kwh / 612).toFixed(1);

  return (
    <section id="audit" className="relative border-b border-neutral-900 bg-[#070707] py-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="relative overflow-hidden rounded-sm border border-white/10 bg-coal p-6 md:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-signal/5 blur-3xl" />
          <div className="mb-8 flex flex-col items-start justify-between gap-8 border-b border-white/[0.08] pb-6 lg:flex-row lg:items-center">
            <div>
              <span className="mb-2 block font-mono text-xs font-semibold uppercase tracking-[0.22em] text-signal">
                // Interactive simulator
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                Calculate your organization's slop footprint
              </h2>
              <p className="mt-2 max-w-2xl font-mono text-xs leading-relaxed text-neutral-500">
                Real EcoLogits rates per query. Move the sliders, watch the meter.
              </p>
            </div>
            <div className="font-mono text-xs text-neutral-400">
              <span className="text-signal">●</span> Real-time parametric inference
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <div>
                <div className="mb-2 flex justify-between font-mono text-xs text-neutral-300">
                  <span>Monthly LLM queries and generations</span>
                  <span className="font-bold text-signal">{queries.toLocaleString("en-US")} req</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={10000000}
                  step={50000}
                  value={queries}
                  onChange={(e) => setQueries(parseInt(e.target.value, 10))}
                  className="slop-range"
                  aria-label="Monthly LLM queries"
                />
              </div>
              <div>
                <div className="mb-2 flex justify-between font-mono text-xs text-neutral-300">
                  <span>Model parameter complexity</span>
                  <span className="font-bold text-white">
                    {TIERS[tier].name} <span className="font-normal text-neutral-500">({TIERS[tier].sub})</span>
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                  {TIERS.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTier(i)}
                      className={`border px-3 py-2 transition-colors ${
                        i === tier
                          ? "border-signal bg-signal/10 font-bold text-white"
                          : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-signal"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 font-mono sm:grid-cols-3 lg:col-span-6">
              <div className="group relative overflow-hidden border border-white/10 bg-neutral-950 p-4 transition-colors hover:border-signal">
                <div className="mb-1 text-[10px] uppercase text-neutral-500">Watts consumed</div>
                <div className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                  {kwh.toLocaleString("en-US")} <span className="text-xs text-neutral-400">kWh</span>
                </div>
                <div className="mt-2 text-[10px] text-signal">≈ {barrels} barrels crude</div>
                <div className="mt-3 h-1 w-full bg-signal/20">
                  <div className="h-full w-3/4 bg-signal" />
                </div>
              </div>
              <div className="group relative overflow-hidden border border-white/10 bg-neutral-950 p-4 transition-colors hover:border-signal">
                <div className="mb-1 text-[10px] uppercase text-neutral-500">Cooling water vapor</div>
                <div className="text-2xl font-bold tracking-tight text-signal lg:text-3xl">
                  {liters.toLocaleString("en-US")} <span className="text-xs text-neutral-400">Liters</span>
                </div>
                <div className="mt-2 text-[10px] text-neutral-400">Evaporated into mist</div>
                <div className="mt-3 h-1 w-full bg-signal/20">
                  <div className="h-full w-1/2 bg-signal" />
                </div>
              </div>
              <div className="group relative overflow-hidden border border-white/10 bg-neutral-950 p-4 transition-colors hover:border-signal">
                <div className="mb-1 text-[10px] uppercase text-neutral-500">Provider comparison</div>
                <div className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
                  ×{m} <span className="text-xs text-signal">vs mini</span>
                </div>
                <div className="mt-2 text-[10px] text-neutral-400">Flagship burns, mini sips</div>
                <div className="mt-3 h-1 w-full bg-signal/20">
                  <div className="h-full w-4/5 bg-signal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
