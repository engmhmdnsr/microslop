"use client";

import { useState } from "react";
import corridorImg from "../../../public/slop-corridor.jpg";
import mineralImg from "../../../public/slop-mineral.jpg";
import { TiltCard } from "./fx";

const CHARGES = [
  {
    no: "01",
    title: "Search slop",
    body: "Bing announced a product recall that never happened, dated March 2025, with a link to a press release that never existed. It sat above every real result. Search used to be where you checked things. Now the checking place needs checking.",
  },
  {
    no: "02",
    title: "UI bloat",
    body: "Every Word update reinstalls the Copilot button in the ribbon. No group policy, no registry key, no lasting fix. Only a recurring appointment with a button nobody invited.",
  },
  {
    no: "03",
    title: "Hallucinations",
    body: "Copilot solved a staircase puzzle with total confidence and completely wrong arithmetic. Elsewhere: a cleanup tip that would delete the WindowsApps folder, presented as safe. No warning. Just vibes.",
  },
  {
    no: "04",
    title: "Content pollution",
    body: "Machine-written blogs with fabricated Azure fixes outrank the official docs on page two. Slop costs nothing to make and ranks for free. Documentation costs salaries.",
  },
  {
    no: "05",
    title: "Verification crisis",
    body: "A reader's hundred pages of compliance guidance get misread by search as local rules. Corrections do not propagate. The wrong version has better SEO.",
  },
  {
    no: "06",
    title: "The slop cycle",
    body: "Models train on the web. The web fills with model output. Nobody kept the original. Nobody knows how this ends, including the people selling it.",
  },
];

export function Charges() {
  const [open, setOpen] = useState(0);
  return (
    <section id="charges" className="relative border-b border-neutral-900 bg-abyss py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            <span className="h-[2px] w-2 bg-signal" />
            Six counts
          </span>
          <h2 className="glitch-hover mb-8 cursor-default font-display text-[64px] font-bold leading-[0.92] tracking-tight sm:text-[84px] md:text-[96px]">
            <span className="block text-white">Read</span>
            <span className="block text-white">the</span>
            <span className="block text-signal">charges.</span>
          </h2>
          <p className="max-w-md font-mono text-sm leading-relaxed text-neutral-400">
            Each one happened to a real person, most of them twice. Open the
            ones you have stomach for.
          </p>
        </div>
        <div className="lg:col-span-7">
          {CHARGES.map((c, i) => (
            <div key={c.no} className="border-t border-white/10 last:border-b">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-baseline gap-5 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-mono text-sm font-bold text-signal">{c.no}</span>
                <span className={`font-display text-2xl font-bold uppercase tracking-tight transition-colors md:text-4xl ${open === i ? "text-white" : "text-neutral-400"}`}>
                  {c.title}
                </span>
                <span className="ml-auto font-mono text-lg text-signal">{open === i ? "–" : "+"}</span>
              </button>
              {open === i && (
                <p className="max-w-2xl pb-6 pl-12 pr-4 font-mono text-sm leading-relaxed text-neutral-300 md:pl-14">
                  {c.body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DIAG = [
  {
    id: "energy",
    no: "01",
    name: "PUE exposure",
    body: "OpenAI datacenters run at PUE 1.20, the thirstiest backend in our set. Google runs at 1.09. Microsoft hitched Copilot to the bigger cooling bill.",
    footL: "GPT-4o: 0.61 Wh/req",
    footR: "Overhead: worst",
    hud: { title: "Diagnostic: PUE exposure", value: "1.20", unit: "PUE", bar: "92%", desc: "Highest overhead power in the comparison set." },
  },
  {
    id: "water",
    no: "02",
    name: "Grid lottery",
    body: "Same flagship class on the Swedish grid: one twenty-third of the CO2. Where you burn matters as much as what you burn, and no chatbot page mentions the where.",
    footL: "Mistral: 0.01 g CO2",
    footR: "Status: calibrated",
    hud: { title: "Diagnostic: grid lottery", value: "23×", unit: "less CO2", bar: "64%", desc: "Clean grids erase most of the footprint." },
  },
  {
    id: "slop",
    no: "03",
    name: "Flagship waste",
    body: "A mini model answers for one twenty-third of the energy, yet Copilot burns flagship fuel on autocomplete-grade questions. That ratio is the business model in two numbers.",
    footL: "Mini: 0.03 Wh/req",
    footR: "Recovery: +31%",
    hud: { title: "Diagnostic: flagship waste", value: "23×", unit: "gap", bar: "88%", desc: "Small models sip. Flagships gulp." },
  },
];

export function Diagnostics() {
  const [active, setActive] = useState("energy");
  const sel = DIAG.find((d) => d.id === active)!;
  return (
    <section id="diagnostics" className="relative overflow-hidden border-b border-neutral-900 bg-abyss py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-6 md:px-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <span className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            <span className="h-2 w-2 bg-signal" />
            Findings // Diagnostics
          </span>
          <h2 className="glitch-hover mb-8 cursor-default font-display text-[62px] font-bold leading-[0.88] tracking-tight sm:text-[82px] md:text-[92px]">
            <span className="block text-white">Turn</span>
            <span className="block text-white">AI chaos</span>
            <span className="block text-signal">into</span>
            <span className="block text-signal">data.</span>
          </h2>
          <div className="mb-6 h-[3px] w-12 bg-signal shadow-[0_0_8px_#FF1744]" />
          <p className="max-w-xs font-mono text-xs leading-relaxed text-neutral-400">
            Three findings from the EcoLogits ledger. Click to switch the monitor.
          </p>
        </div>

        <div className="flex flex-col justify-start gap-4 lg:col-span-4 lg:pt-8">
          {DIAG.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(d.id)}
              className={`cursor-pointer border p-5 text-left transition-all duration-200 ${
                d.id === active
                  ? "border-signal bg-white/[0.03]"
                  : "border-white/10 bg-transparent hover:border-signal/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white md:text-base">
                  <span className={d.id === active ? "text-signal" : "text-neutral-500"}>{d.no}.</span> {d.name}
                </h3>
                {d.id === active && <span className="font-mono text-xs text-signal">● Active</span>}
              </div>
              <p className="mt-2.5 font-mono text-xs leading-relaxed text-neutral-400 md:text-sm">{d.body}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[11px] text-neutral-400">
                <span>{d.footL.split(":")[0]}: <strong className="text-white">{d.footL.split(":")[1]}</strong></span>
                <span><strong className="text-signal">{d.footR}</strong></span>
              </div>
            </button>
          ))}
        </div>

        <div className="group relative h-[420px] overflow-hidden rounded-sm border border-neutral-800/80 sm:h-[480px] lg:col-span-4 lg:h-[540px]">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center contrast-125 transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${mineralImg.src}')` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/30" />
          <div className="absolute inset-x-6 bottom-6 border border-signal/40 bg-black/85 p-4 font-mono text-xs backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-signal">
              <span>{sel.hud.title}</span>
              <span className="animate-pulse">● Feed online</span>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-neutral-400">Telemetry score</span>
              <span className="font-mono text-xl font-bold text-white">
                {sel.hud.value} <span className="text-xs text-signal">{sel.hud.unit}</span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden bg-neutral-800">
              <div className="h-full bg-signal transition-all duration-500" style={{ width: sel.hud.bar }} />
            </div>
            <p className="pt-1 text-[10px] text-neutral-400">{sel.hud.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Mission() {
  return (
    <section id="mission" className="relative border-b border-neutral-900 bg-abyss py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <TiltCard className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-neutral-800/80 bg-neutral-950 shadow-2xl md:aspect-[16/11]">
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center contrast-110 brightness-95 transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('${corridorImg.src}')` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 border border-neutral-800 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-neutral-400">
              Facility node 04 // Latency 1.2ms // Runaway buffer stable
            </div>
          </TiltCard>
        </div>
        <div className="flex flex-col justify-center lg:col-span-6 lg:pl-6">
          <span className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            <span className="h-[2px] w-2 bg-signal" />
            Our mission
          </span>
          <h2 className="glitch-hover mb-8 cursor-default font-display text-[64px] font-bold leading-[0.92] tracking-tight sm:text-[84px] md:text-[96px]">
            <span className="block text-white">Less</span>
            <span className="block text-white">waste.</span>
            <span className="block text-signal">More</span>
            <span className="block text-signal">control.</span>
          </h2>
          <div className="max-w-lg space-y-6 font-mono text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
            <p>
              AI is undeniably powerful. But it generates a colossal unseen
              footprint: grid load, evaporating reservoirs, and oceans of
              unverified digital slop.
            </p>
            <p>
              We built Microslop{" "}
              <strong className="font-bold text-white underline decoration-signal decoration-2 underline-offset-4">
                to make that visible, measurable, and immediately actionable.
              </strong>
            </p>
          </div>
          <div className="mt-8 flex items-center gap-8 border-t border-white/10 pt-6 font-mono text-xs text-neutral-400">
            <div>
              <div className="font-mono text-xl font-bold text-white">0.61 Wh</div>
              <div className="text-[10px] uppercase">Per flagship query</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-signal">2.2 mL</div>
              <div className="text-[10px] uppercase">Water per query</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
