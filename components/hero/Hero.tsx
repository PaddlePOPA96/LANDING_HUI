'use client';

import Image from "next/image";
import { Youtube, Instagram } from 'lucide-react';
import { SocialButton } from "../ui/SocialButton";

// Custom TikTok icon since Lucide might not have it or it varies
const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

export function Hero() {
    return (
        <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-950">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    fill
                    priority
                    quality={50}
                    className="object-cover opacity-10 blur-sm"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent z-[1]" />

            {/* Overlapping Title - BEHIND IMAGE */}
            <h1 className="absolute z-[2] text-[18vw] font-black tracking-tighter text-zinc-200 dark:text-zinc-800 pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] opacity-80 whitespace-nowrap">
                FERIHUI
            </h1>

            {/* Animated Circle Background - WRAPPER FOR POSITION */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] z-[1] pointer-events-none flex items-center justify-center">
                {/* Stroke/Ring Animation */}
                <div className="w-full h-full rounded-full border-[8px] border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.5)] animate-breathe" />
            </div>

            {/* Main Character Image - BIGGER */}
            <div className="relative z-10 mt-10 w-full max-w-4xl flex justify-center">
                <Image
                    src="/assets/hui.png"
                    alt="Ferihui Character"
                    width={800}
                    height={900}
                    className="drop-shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-1000 object-contain h-[85vh] w-auto"
                    priority
                />
            </div>

            <div className="absolute bottom-10 z-20 flex flex-col items-center gap-4">
                <div className="flex gap-4">
                    <SocialButton href="https://www.youtube.com/@FeriHui" icon={<Youtube />} label="YouTube" />
                    <SocialButton href="https://tiktok.com/@feri_hui" icon={<TikTokIcon />} label="TikTok" />
                    <SocialButton href="https://instagram.com/feri8huis" icon={<Instagram />} label="Instagram" />
                </div>
                <p className="text-zinc-500 font-medium tracking-widest text-sm uppercase">Official Streamer Hub</p>
            </div>
        </section>
    );
}
