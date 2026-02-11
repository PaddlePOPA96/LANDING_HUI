import { Hero } from "../components/hero/Hero";
import { About } from "../components/about/About";
import { Streaming } from "../components/streaming/Streaming";
import { Setup } from "../components/setup/Setup";
import { Sponsors } from "../components/sponsors/Sponsors";
import { Stats } from "../components/stats/Stats";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ParticlesBackground } from "../components/ui/ParticlesBackground";
import { LiveHeaderIndicator } from "../components/layout/LiveHeaderIndicator";
import { Suspense } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { checkLiveStatus } from "@/lib/videoUtils";

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

async function getStreams() {
  try {
    const CHANNEL_ID = 'UCt_Mm5sdOOYG8wgi9r2MnAg';
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const response = await fetch(RSS_URL, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const text = await response.text();

    const streams = [];
    const entries = text.split('<entry>');

    for (let i = 1; i < entries.length; i++) {
      const entry = entries[i];
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      const viewsMatch = entry.match(/<media:statistics views="(\d+)"/);

      if (titleMatch && videoIdMatch) {
        streams.push({
          id: i,
          videoId: videoIdMatch[1],
          title: titleMatch[1],
          time: new Date(publishedMatch ? publishedMatch[1] : Date.now()).toLocaleDateString(),
          views: viewsMatch ? `${(parseInt(viewsMatch[1]) / 1000).toFixed(1)}K views` : 'New',
          image: `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`
        });
      }
    }
    return streams.slice(0, 5);
  } catch (error) {
    console.error('Error fetching streams:', error);
    return [];
  }
}

export default async function Home() {
  const [socials, setupData, streams] = await Promise.all([
    getSocials(),
    getSetupData(),
    getStreams()
  ]);

  const liveIndicator = (
    <Suspense fallback={null}>
      <LiveHeaderIndicator />
    </Suspense>
  );

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">

      {/* Fixed Header */}
      <Header liveIndicator={liveIndicator} />

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
      <div className="relative z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-[0_-50px_100px_rgba(0,0,0,0.5)] border-t border-white/10">
        <About />
        <Stats />
        <Setup valorant={setupData.valorant} gear={setupData.gear} />
        <Streaming streams={streams} />
        <Sponsors />
        <Footer />
      </div>

    </div>
  );
}
