import { Hero } from "../components/hero/Hero";
import { About } from "../components/about/About";
import { Streaming } from "../components/streaming/Streaming";
import { Setup } from "../components/setup/Setup";
import { Sponsors } from "../components/sponsors/Sponsors";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ParticlesBackground } from "../components/ui/ParticlesBackground";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Socials {
  donate?: string;
  youtube?: string;
  tiktok?: string;
  instagram?: string;
}

async function getSocials(): Promise<Socials> {
  try {
    const docSnap = await getDoc(doc(db, "settings", "socials"));
    if (docSnap.exists()) {
      return docSnap.data() as Socials;
    }
  } catch (e) {
    console.error("Error fetching socials", e);
  }
  return {};
}

async function getSetupData() {
  try {
    const [valSnap, gearSnap] = await Promise.all([
      getDoc(doc(db, "settings", "valorant")),
      getDoc(doc(db, "settings", "gear"))
    ]);

    return {
      valorant: valSnap.exists() ? valSnap.data() : null,
      gear: gearSnap.exists() ? gearSnap.data() : null
    };
  } catch (e) {
    console.error("Error fetching setup data", e);
    return { valorant: null, gear: null };
  }
}

export default async function Home() {
  const [socials, setupData] = await Promise.all([
    getSocials(),
    getSetupData()
  ]);

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
      <Hero initialSocials={socials} />

      {/* 
        CONTENT OVERLAY
        This div has a background color and z-index to cover the Hero as it scrolls up.
        It creates the "curtain" or "parallax overlap" effect.
        NOW WITH BLUR/GLASS EFFECT
      */}
      <div className="relative z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-[0_-50px_100px_rgba(0,0,0,0.5)] border-t border-white/10">
        <About />

        <Setup valorant={setupData.valorant} gear={setupData.gear} />
        <Streaming />
        <Sponsors />
        <Footer />
      </div>

    </div>
  );
}
