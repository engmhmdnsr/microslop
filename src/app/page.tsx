"use client";

import { TelemetryBar, SiteNav, CursorFollower } from "@/components/slop/chrome";
import { Hero } from "@/components/slop/hero";
import { Audit } from "@/components/slop/audit";
import { Charges, Diagnostics, Mission } from "@/components/slop/sections";
import { Log, Report, Footer, MobileNav, PWAInstallBanner } from "@/components/slop/close";
import { Board } from "@/components/slop/board";

export default function Home() {
  return (
    <div className="min-h-screen bg-abyss text-white">
      <div className="scanline-overlay" aria-hidden />
      <div className="grain-overlay" aria-hidden />
      <CursorFollower />
      <TelemetryBar />
      <SiteNav />
      <main>
        <Hero />
        <Audit />
        <Charges />
        <Diagnostics />
        <Mission />
        <Log />
        <Board />
        <Report />
      </main>
      <Footer />
      <MobileNav />
      <PWAInstallBanner />
    </div>
  );
}
