"use client";

import Image from "next/image";
import subjectImg from "../../../public/slop-subject.jpg";
import { SlopShader, TiltCard } from "./fx";

export function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-neutral-900 bg-abyss">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <SlopShader />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_6px_#FF1744]" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-neutral-400 md:text-sm">
              Smaller lines. Bigger mess.
            </p>
          </div>
          <h1 className="glitch-hover mb-8 cursor-default select-none font-display text-[78px] font-bold leading-[0.88] tracking-tight sm:text-[104px] md:text-[132px] lg:text-[142px] xl:text-[158px]">
            <span className="block text-white">AI</span>
            <span className="block text-neutral-200">SLOP</span>
            <span className="block text-signal drop-shadow-[0_0_35px_rgba(255,23,68,0.4)]">
              REVEALED.
            </span>
          </h1>
          <p className="mb-8 max-w-md font-mono text-sm leading-relaxed text-neutral-400 sm:text-base md:text-[15px]">
            We build the tools that show what AI really costs: in energy,
            water, carbon, and synthetic digital slop. Microsoft makes most of
            it. We keep the receipts.
          </p>
          <div className="mb-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => go("audit")}
              className="inline-flex items-center gap-3 border border-signal bg-signal px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_20px_rgba(255,23,68,0.45)] transition-all hover:-translate-y-0.5 hover:bg-crimson"
            >
              <span>Calculate slop</span>
              <span className="text-sm">→</span>
            </button>
            <button
              type="button"
              onClick={() => go("charges")}
              className="inline-flex items-center gap-2 border-b border-neutral-700 pb-1 font-mono text-xs uppercase tracking-[0.22em] text-neutral-400 transition-colors hover:border-signal hover:text-white"
            >
              Read the charges
            </button>
          </div>
          <div className="inline-flex w-fit items-center gap-4 rounded border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-neutral-400">
            <span className="text-signal">● Runtime audit</span>
            <span>
              Indexed nodes: <strong className="text-white">128,409</strong>
            </span>
            <span className="hidden sm:inline">
              Accuracy: <strong className="text-white">99.82%</strong>
            </span>
          </div>
        </div>

        <div className="relative flex h-full min-h-[500px] items-center justify-center lg:col-span-6 lg:min-h-[720px]">
          <TiltCard
            id="hero-media-card"
            className="relative h-[540px] w-full overflow-hidden rounded-sm border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.8)] md:h-[660px] lg:h-[720px]"
          >
            <Image
              src={subjectImg}
              alt="Portrait of a person wearing reflective red digital sunglasses in a dark cyberpunk setting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top brightness-[1.7] contrast-110 transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-abyss via-abyss/20 to-transparent opacity-60" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-abyss/20" />
            <div className="absolute left-6 top-6 z-20 flex items-center gap-2 border border-signal/40 bg-black/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-signal backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse bg-signal" />
              Subject #09 // Neural runaway detected
            </div>
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-44 opacity-95 drop-shadow-[0_0_24px_rgba(255,23,68,0.45)] md:w-56" aria-hidden>
              <svg className="h-full w-full" fill="none" viewBox="0 0 160 600" xmlns="http://www.w3.org/2000/svg">
                <path d="M120 0H160V420C160 460 148 480 134 490C118 501 110 525 125 545C135 558 128 575 110 575C95 575 88 560 92 542C97 520 114 495 122 470C132 438 120 395 130 350C142 295 152 245 138 190C128 150 102 110 112 60C116 40 120 20 120 0Z" fill="#FF1744" />
                <circle cx="126" cy="590" fill="#FF1744" r="14" />
                <circle cx="140" cy="530" fill="#FF1744" opacity="0.8" r="7" />
              </svg>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
