"use client";

import { useEffect, useState } from "react";

export function useTelemetry() {
  const [slop, setSlop] = useState(14_291_840);
  const [power, setPower] = useState(8419.82);
  const [water, setWater] = useState(612_490);

  useEffect(() => {
    const id = setInterval(() => {
      setSlop((v) => v + Math.floor(Math.random() * 18) + 7);
      setPower((v) => v + (Math.random() * 0.12 - 0.04));
      setWater((v) => v + Math.floor(Math.random() * 8) + 2);
    }, 120);
    return () => clearInterval(id);
  }, []);

  return {
    slop: slop.toLocaleString("en-US"),
    power: power.toFixed(2),
    water: water.toLocaleString("en-US"),
  };
}

function WaveBars() {
  const [bars, setBars] = useState([8, 14, 4, 12, 8]);
  useEffect(() => {
    const onMove = () =>
      setBars(Array.from({ length: 5 }, () => Math.floor(Math.random() * 14) + 2));
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="flex h-3.5 items-center gap-[3px] border-l border-neutral-800 pl-2" title="System Resonator Pulse">
      {bars.map((h, i) => (
        <span key={i} className="w-[2px] bg-signal transition-all duration-75" style={{ height: h }} />
      ))}
    </div>
  );
}

export function TelemetryBar() {
  const t = useTelemetry();
  return (
    <aside className="relative z-50 overflow-hidden border-b border-white/[0.07] bg-[#080808] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-bold text-signal">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-signal" />
            Live telemetry
          </span>
          <span className="hidden text-neutral-600 sm:inline">|</span>
          <span className="hidden sm:inline">Global model dump:</span>
          <span className="font-semibold tabular-nums text-white">{t.slop}</span>
          <span className="text-signal">gal slop</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Grid draw:</span>
            <span className="font-semibold tabular-nums text-white">{t.power}</span>
            <span>MW/h</span>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="text-neutral-500">Cooling intake:</span>
            <span className="font-semibold tabular-nums text-white">{t.water}</span>
            <span className="text-signal">L/min</span>
          </div>
          <WaveBars />
        </div>
      </div>
    </aside>
  );
}

const NAV = [
  { href: "#audit", label: "Audit" },
  { href: "#charges", label: "Charges" },
  { href: "#log", label: "Log" },
  { href: "#board", label: "Board" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.04] bg-abyss/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">
        <button type="button" onClick={() => go("#top")} className="flex items-center gap-3" aria-label="MICROSLOP Home">
          <span className="block h-8 w-2 bg-signal shadow-[0_0_12px_#FF1744]" aria-hidden />
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            MICRO<span className="text-signal">SLOP</span>
          </span>
        </button>
        <nav className="hidden items-center gap-9 font-mono text-xs font-semibold uppercase tracking-[0.22em] lg:flex">
          {NAV.map((l) => (
            <button key={l.href} type="button" onClick={() => go(l.href)} className="text-neutral-400 transition-colors hover:text-white">
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go("#report")}
            className="border border-signal/30 bg-signal/10 px-3 py-1.5 text-signal transition-colors hover:border-signal"
          >
            File a report ↗
          </button>
        </nav>
        <button type="button" onClick={() => setOpen((v) => !v)} className="p-2 text-neutral-400 hover:text-white lg:hidden" aria-label="Toggle navigation">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-6 py-3 lg:hidden">
          {[...NAV, { href: "#report", label: "File a report" }].map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => go(l.href)}
              className="block w-full border-b border-white/5 py-3 text-left font-mono text-sm font-bold uppercase tracking-[0.18em] text-neutral-300 last:border-0"
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

export function CursorFollower() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = document.getElementById("cursor-dot");
    const glow = document.getElementById("cursor-glow");
    if (!dot || !glow) return;
    dot.className += " hidden md:block w-3 h-3 bg-signal shadow-[0_0_12px_#FF1744]";
    glow.className += " hidden md:block w-72 h-72";
    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <>
      <div id="cursor-glow" />
      <div id="cursor-dot" />
    </>
  );
}
