'use client';

import { Hero } from "../components/hero/Hero";
import { About } from "../components/about/About";
import { Streaming } from "../components/streaming/Streaming";
import { Setup } from "../components/setup/Setup";
import { Sponsors } from "../components/sponsors/Sponsors";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ParticlesBackground } from "../components/ui/ParticlesBackground";

export default function Home() {
  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">

      {/* Fixed Header */}
      <Header />

      {/* Particle Background */}
      <ParticlesBackground />

      {/* 
        HERO SECTION 
        Is 'sticky' inside the component, so it stays fixed while we scroll.
      */}
      <Hero />

      {/* 
        CONTENT OVERLAY
        This div has a background color and z-index to cover the Hero as it scrolls up.
        It creates the "curtain" or "parallax overlap" effect.
        NOW WITH BLUR/GLASS EFFECT
      */}
      <div className="relative z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_-50px_100px_rgba(0,0,0,0.5)] border-t border-white/10">
        <About />
        <Setup />
        <Streaming />
        <Sponsors />
        <Footer />
      </div>

    </div>
  );
}
