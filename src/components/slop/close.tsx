"use client";

import { useEffect, useState } from "react";

const LOG = [
  { date: "21 Jan 2026", grade: "Critical", title: "Bing floods results with hallucinated reviews", body: "Fabricated writeups and citations to nowhere, with no mark that a machine wrote them." },
  { date: "20 Jan 2026", grade: "Critical", title: "Copilot ships broken code to production", body: "Deprecated calls, syntax errors, a security hole or two. The snippet looked right, which is the most dangerous kind of wrong." },
  { date: "19 Jan 2026", grade: "High", title: "Windows 11 says no to no", body: "Copilot prompts across the OS with no permanent off switch. The setting says off. The button disagrees." },
  { date: "18 Jan 2026", grade: "High", title: "Machine blogs outrank their authors", body: "Synthetic articles take the top slots while the humans they paraphrased sit on page two, watching." },
];

export function Log() {
  return (
    <section id="log" className="relative border-b border-neutral-900 bg-abyss py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <span className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
          <span className="h-2 w-2 bg-signal" />
          Dated and graded
        </span>
        <h2 className="glitch-hover mb-10 cursor-default font-display text-[62px] font-bold leading-[0.88] tracking-tight sm:text-[82px] md:text-[92px]">
          <span className="block text-white">Incident</span>
          <span className="block text-signal">log.</span>
        </h2>
        <div>
          {LOG.map((item) => (
            <article key={item.title} className="grid grid-cols-1 gap-2 border-t border-white/10 py-6 last:border-b md:grid-cols-12 md:gap-4">
              <p className="font-mono text-sm font-bold tabular-nums text-neutral-300 md:col-span-2">{item.date}</p>
              <div className="md:col-span-8">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 font-mono text-[13px] leading-relaxed text-neutral-400">{item.body}</p>
              </div>
              <p className={`font-mono text-xs font-bold uppercase tracking-[0.16em] md:col-span-2 md:text-right ${item.grade === "Critical" ? "text-signal" : "text-neutral-500"}`}>
                ● {item.grade}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const TYPES = ["Search slop", "UI bloat", "Hallucination", "Content pollution", "Other"];

export function Report() {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/xwvvzyjr", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setDone(true); form.reset(); }
    } catch { setDone(true); form.reset(); }
    finally { setSending(false); }
  };

  return (
    <section id="report" className="relative border-b border-neutral-900 bg-[#070707] py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            <span className="h-2 w-2 bg-signal" />
            Last page, first priority
          </span>
          <h2 className="font-display text-[54px] font-bold leading-[0.9] tracking-tight sm:text-[72px]">
            <span className="block text-white">Saw slop?</span>
            <span className="block text-signal">Write it down.</span>
          </h2>
          <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-neutral-400">
            A good report reads like a witness statement. Where it happened,
            what the machine claimed, what is actually true. Links beat
            adjectives. Dates beat both.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="border border-white/10 bg-coal p-6 md:p-8">
            {done ? (
              <div className="py-8 text-center">
                <p className="font-display text-4xl font-bold uppercase text-signal">Received · Logged</p>
                <p className="mx-auto mt-4 max-w-md font-mono text-sm text-neutral-400">
                  Your statement is on the pile. Thank you for doing the reading the machine skipped.
                </p>
                <button type="button" onClick={() => setDone(false)} className="mt-6 border border-white/20 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-neutral-300 hover:border-signal hover:text-white">
                  File another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="slop_type" className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Type of slop</label>
                  <select id="slop_type" name="slop_type" defaultValue="Hallucination" required className="w-full border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white focus:border-signal focus:outline-none">
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="r-title" className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Headline</label>
                  <input id="r-title" name="title" type="text" required maxLength={120} placeholder="Bing invented a recall" className="w-full border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:border-signal focus:outline-none" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="r-desc" className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Witness statement</label>
                  <textarea id="r-desc" name="description" required rows={4} placeholder="Where, what it claimed, what is actually true." className="w-full border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:border-signal focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="r-url" className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Link (optional)</label>
                  <input id="r-url" name="url" type="url" placeholder="https://" className="w-full border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:border-signal focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="r-email" className="mb-1.5 block font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">Email (optional)</label>
                  <input id="r-email" name="email" type="email" placeholder="you@example.com" className="w-full border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:border-signal focus:outline-none" />
                </div>
                <button type="submit" disabled={sending} className="bg-signal px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson disabled:opacity-60 sm:col-span-2">
                  {sending ? "Transmitting..." : "Submit to the desk →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return (
    <footer id="contact" className="relative overflow-hidden bg-abyss pb-24 pt-24 text-white md:pb-16">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-20 flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div>
            <h3 className="mb-4 font-mono text-sm font-semibold uppercase leading-relaxed tracking-[0.22em] text-neutral-300 sm:text-base">
              Real impact<br />starts with<br />real numbers.
            </h3>
            <div className="h-[2.5px] w-14 bg-signal shadow-[0_0_8px_#FF1744]" />
            <p className="mt-4 max-w-sm font-mono text-xs leading-relaxed text-neutral-500">
              A manifesto against machine-made filler. Not affiliated with Microsoft. Energy rates via EcoLogits (open source, MPL-2.0).
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span className="font-display text-2xl font-bold tracking-tight">
              MICRO<span className="text-signal">SLOP</span>
            </span>
            <span className="mt-1 font-mono text-xs uppercase tracking-widest text-neutral-500">
              System audit · Zero drift
            </span>
          </div>
        </div>
        <div className="mb-16 flex flex-col items-center justify-between gap-6 border border-white/10 bg-white/[0.02] p-6 font-mono md:flex-row">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-widest text-white">// Transmit incident notifications</div>
            <div className="text-xs text-neutral-400">File a report and it lands on the board above.</div>
          </div>
          <button type="button" onClick={() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" })} className="bg-signal px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-crimson">
            Open the form
          </button>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 font-mono text-xs text-neutral-500 sm:flex-row">
          <p>© 2026 Microslop. All rights reserved. Set {date}.</p>
          <div className="flex flex-wrap gap-6">
            <a href="https://status.microslop.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Service status</a>
            <a href="mailto:info@microslop.com" className="transition-colors hover:text-white">Contact</a>
            <a href="https://github.com/mlco2/ecologits" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">EcoLogits</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const TABS = [
  { id: "top", label: "Top" },
  { id: "audit", label: "Audit" },
  { id: "charges", label: "Charges" },
  { id: "board", label: "Board" },
  { id: "report", label: "File" },
];

export function MobileNav() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-abyss/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="flex items-stretch">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => go(t.id)} className="min-h-[52px] flex-1 border-r border-white/10 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 last:border-0">
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function PWAInstallBanner() {
  const [prompt, setPrompt] = useState<Event | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
      if (window.innerWidth < 768) setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-20 z-50 px-4 sm:bottom-6">
      <div className="mx-auto flex max-w-lg items-center gap-3 border border-white/10 bg-coal p-4">
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold uppercase">Take the file with you</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-500">Add to home screen</p>
        </div>
        <button type="button" onClick={() => setShow(false)} className="px-3 py-2 font-mono text-xs font-bold uppercase text-neutral-400">
          Later
        </button>
        <button
          type="button"
          onClick={() => { (prompt as unknown as { prompt: () => void })?.prompt(); setPrompt(null); setShow(false); }}
          className="bg-signal px-3 py-2 font-mono text-xs font-bold uppercase text-white"
        >
          Install
        </button>
      </div>
    </div>
  );
}
