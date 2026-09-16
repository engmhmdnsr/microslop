"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  url?: string | null;
  email?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ADMIN_STORAGE_KEY = "microslop_admin_complaints";
const PINNED_COMPLAINT_ID = "default-0";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

const DEFAULT_COMPLAINTS: Complaint[] = [
  { id: "default-0", title: "Microsoft Admin Center Products Page broken", description: "Microslop vibecoded the \"Your Products\" tab into oblivion. Resulting in the fun and quirky side effects, that all our MAK keys are inaccessible until they fix it. Fun!", category: "other", severity: "critical", url: "https://admin.cloud.microsoft/#/subscriptions", email: null, status: "open", createdAt: "2026-04-07T09:00:00.000Z", updatedAt: "2026-04-07T09:00:00.000Z" },
  { id: "default-5", title: "Copilot becomes stupid with math", description: "I gave Copilot a staircase puzzle made of offset n x n x n cubes and asked how many unit cubes a perfectly straight needle would pass through from the top-left-front corner of the 10th step to the bottom-right-back corner of the 1st step. Copilot answered with total confidence and completely wrong arithmetic. I know the answer is not this.", category: "hallucination", severity: "high", url: "https://copilot.microsoft.com/shares/ZEuEHuicgUfhn3mizKRSp", email: null, status: "open", createdAt: "2026-04-07T09:10:00.000Z", updatedAt: "2026-04-07T09:10:00.000Z" },
  { id: "default-6", title: "Microsoft misrepresents legal and compliance documentation", description: "I manage around 100 pages of compliance and process guidance for a large community. Microsoft and search engines frequently misrepresent national requirements as local ones, as though only our institution requires them.", category: "hallucination", severity: "critical", email: null, status: "open", createdAt: "2026-04-07T09:20:00.000Z", updatedAt: "2026-04-07T09:20:00.000Z" },
  { id: "default-7", title: "Broken Windows 11 File Explorer", description: "Opening File Explorer, creating or closing tabs, and opening context menus all feel sluggish. Dark mode also still throws flashbangs in File Explorer.", category: "ui", severity: "high", email: null, status: "open", createdAt: "2026-04-07T09:30:00.000Z", updatedAt: "2026-04-07T09:30:00.000Z" },
  { id: "default-8", title: "Forced AI appearance in Office on web, without any way to disable it", description: "Turning off optional connected experiences used to disable Copilot features, but now it does not. It wastes space and hurts the user experience, especially for school districts where some users are too young to use it.", category: "ui", severity: "high", email: null, status: "open", createdAt: "2026-04-07T09:40:00.000Z", updatedAt: "2026-04-07T09:40:00.000Z" },
  { id: "default-9", title: "Windows updates", description: "Microslop wants Copilot to keep existing because they will make money, but I am certain they would get way more customers if they shift+deleted Copilot and bloatware from Windows.", category: "hallucination", severity: "medium", email: null, status: "open", createdAt: "2026-04-07T09:50:00.000Z", updatedAt: "2026-04-07T09:50:00.000Z" },
  { id: "default-10", title: "New Win11 account auto-adds Copilot button to taskbar", description: "When you make a new Windows account it auto-adds the Copilot button to the taskbar, even on PCs that are not Copilot+ PCs.", category: "ui", severity: "medium", email: null, status: "open", createdAt: "2026-04-07T10:00:00.000Z", updatedAt: "2026-04-07T10:00:00.000Z" },
  { id: "default-11", title: "Copilot and Edge making your PC slower", description: "Edge and Copilot both have AI slop that seems to make your PC slower by a lot. Removing them made my PC faster by 40% according to benchmarks.", category: "ui", severity: "high", email: null, status: "open", createdAt: "2026-04-07T10:10:00.000Z", updatedAt: "2026-04-07T10:10:00.000Z" },
  { id: "default-1", title: "Bing AI Summary Fabricated a Product Recall", description: "The AI summary confidently stated the product was recalled in March 2025 with a link to a press release. The link was dead, the product was never recalled, and the press release never existed. It appeared above all real search results.", category: "search", severity: "critical", email: null, status: "open", createdAt: "2026-03-15T10:30:00.000Z", updatedAt: "2026-03-15T10:30:00.000Z" },
  { id: "default-2", title: "Copilot Suggested Deleting Critical System Files", description: "Asked Copilot how to free up disk space. It suggested a command that would delete the entire WindowsApps folder, breaking all Store apps including Windows Security. Presented as safe, with no warning.", category: "hallucination", severity: "critical", email: null, status: "reviewing", createdAt: "2026-03-12T14:20:00.000Z", updatedAt: "2026-03-18T09:15:00.000Z" },
  { id: "default-3", title: "Word Copilot Button Cannot Be Permanently Disabled", description: "Every Word update brings the Copilot button back to the ribbon despite being disabled. No group policy or registry key suppresses it across updates.", category: "ui", severity: "medium", email: null, status: "open", createdAt: "2026-03-08T08:45:00.000Z", updatedAt: "2026-03-08T08:45:00.000Z" },
  { id: "default-4", title: "AI-Generated Tech Blog Ranked Above Official Docs", description: "Top 3 results for an Azure error code were AI blogs with fabricated code examples. Official docs sat on page 2.", category: "content", severity: "high", email: null, status: "resolved", createdAt: "2026-02-28T16:00:00.000Z", updatedAt: "2026-03-10T11:30:00.000Z" },
];

function loadAdmin(): Complaint[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return [];
    const p = JSON.parse(raw);
    return Array.isArray(p) ? p : [];
  } catch { return []; }
}
function saveAdmin(c: Complaint[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(c)); } catch { /* silent fail */ }
}
function merge(): Complaint[] {
  const all = [...loadAdmin(), ...DEFAULT_COMPLAINTS];
  const seen = new Set<string>();
  const d = all.filter((c) => { if (seen.has(c.id)) return false; seen.add(c.id); return true; });
  const pinned = d.find((c) => c.id === PINNED_COMPLAINT_ID);
  if (!pinned) return d;
  return [pinned, ...d.filter((c) => c.id !== PINNED_COMPLAINT_ID)];
}

const SEV: Record<string, string> = {
  critical: "text-signal", high: "text-signal", medium: "text-neutral-400", low: "text-neutral-500",
};

export function Board() {
  const [complaints, setComplaints] = useState<Complaint[]>(DEFAULT_COMPLAINTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(PINNED_COMPLAINT_ID);
  const formRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState("");
  const [d, setD] = useState("");
  const [cat, setCat] = useState("general");
  const [sev, setSev] = useState("medium");
  const [url, setUrl] = useState("");

  useEffect(() => { setComplaints(merge()); }, []);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setIsAdmin((p) => {
          setNotice(p ? null : "Editor mode on. Grade and bin at will.");
          if (p) setShowForm(false);
          return !p;
        });
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(id);
  }, [notice]);

  const refresh = useCallback(() => setComplaints(merge()), []);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!t.trim() || !d.trim()) return;
    const now = new Date().toISOString();
    saveAdmin([{ id: generateId(), title: t.trim(), description: d.trim(), category: cat, severity: sev, url: url.trim() || null, email: null, status: "open", createdAt: now, updatedAt: now }, ...loadAdmin()]);
    refresh();
    setT(""); setD(""); setCat("general"); setSev("medium"); setUrl("");
    setShowForm(false);
    setNotice("Pinned to the board.");
  };

  return (
    <section id="board" className="relative border-b border-neutral-900 bg-abyss py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <span className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
          <span className="h-2 w-2 bg-signal" />
          Public evidence board // {complaints.length} clippings
        </span>
        <h2 className="glitch-hover mb-4 cursor-default font-display text-[62px] font-bold leading-[0.88] tracking-tight sm:text-[82px] md:text-[92px]">
          <span className="block text-white">Filed by</span>
          <span className="block text-signal">readers.</span>
        </h2>
        <p className="mb-10 max-w-2xl font-mono text-sm leading-relaxed text-neutral-400">
          Kept as received. Spelling mistakes preserved out of respect.
        </p>

        {notice && (
          <p className="mb-6 inline-block border border-signal bg-signal/10 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-signal">
            {notice}
          </p>
        )}
        {isAdmin && (
          <div className="mb-8">
            <button type="button" onClick={() => { setShowForm((v) => !v); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50); }} className="bg-signal px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-crimson">
              {showForm ? "Close the form" : "Pin a new card"}
            </button>
          </div>
        )}
        {isAdmin && showForm && (
          <div ref={formRef} className="mb-10 border border-white/10 bg-coal p-5">
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Headline" value={t} onChange={(e) => setT(e.target.value)} required maxLength={140} className="border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:border-signal focus:outline-none sm:col-span-2" />
              <textarea rows={3} placeholder="Clipping" value={d} onChange={(e) => setD(e.target.value)} required className="border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:border-signal focus:outline-none sm:col-span-2" />
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white focus:border-signal focus:outline-none">
                {["general", "search", "ui", "hallucination", "content", "other"].map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={sev} onChange={(e) => setSev(e.target.value)} className="border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white focus:border-signal focus:outline-none">
                {["low", "medium", "high", "critical"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <input type="url" placeholder="Link (optional) https://" value={url} onChange={(e) => setUrl(e.target.value)} className="border border-white/20 bg-black px-3 py-2.5 font-mono text-sm text-white placeholder-neutral-600 focus:border-signal focus:outline-none sm:col-span-2" />
              <button type="submit" className="bg-signal px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-crimson sm:col-span-2">Pin it</button>
            </form>
          </div>
        )}

        <div className="mt-12 border-t border-white/10">
          {complaints.map((c, i) => {
            const open = openId === c.id;
            const code = `FILE-${String(i + 1).padStart(3, "0")}`;
            const critical = c.severity === "critical" || c.severity === "high";
            return (
              <div key={c.id} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : c.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-5 py-5 text-left sm:gap-8"
                >
                  <span
                    aria-hidden
                    className={`font-display text-5xl font-bold leading-none sm:text-7xl ${
                      critical ? "text-signal" : "text-transparent [-webkit-text-stroke:1.5px_#52525b]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      {code} {c.id === PINNED_COMPLAINT_ID && <span className="text-signal">· Pinned file</span>}
                    </span>
                    <span className={`mt-1 block font-display text-xl font-bold uppercase leading-tight tracking-tight sm:text-3xl ${open ? "text-white" : "text-neutral-300"}`}>
                      {c.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`hidden shrink-0 -rotate-6 border-2 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] sm:inline-block ${
                      critical ? "border-signal text-signal" : "border-neutral-600 text-neutral-400"
                    }`}
                  >
                    {c.severity}
                  </span>
                  <span aria-hidden className="shrink-0 font-mono text-xl text-signal">
                    {open ? "–" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="pb-7 pl-[4.5rem] pr-2 sm:pl-[6.5rem]">
                    <p className="max-w-3xl font-mono text-sm leading-relaxed text-neutral-300">
                      {c.description}
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
                      {c.category} · {c.status}
                      {c.url && (
                        <span>
                          {" · "}
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-bold text-signal underline">
                            evidence ↗
                          </a>
                        </span>
                      )}
                    </p>
                    {isAdmin && (
                      <div className="mt-3 flex items-center gap-2">
                        <select aria-label="Change status" value={c.status} onChange={(e) => { const a = loadAdmin(); if (a.some((x) => x.id === c.id)) saveAdmin(a.map((x) => x.id === c.id ? { ...x, status: e.target.value } : x)); setComplaints((p) => p.map((x) => x.id === c.id ? { ...x, status: e.target.value } : x)); }} className="border border-white/20 bg-black px-2 py-1 font-mono text-xs uppercase text-white">
                          {["open", "reviewing", "resolved", "dismissed"].map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <button type="button" onClick={() => { saveAdmin(loadAdmin().filter((x) => x.id !== c.id)); refresh(); setNotice("Card binned."); }} className="font-mono text-xs font-bold uppercase text-signal underline">Bin it</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
