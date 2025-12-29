'use client';

import { useState } from 'react';
import Image from "next/image";
import { Youtube, Instagram, Heart } from 'lucide-react';
import { SocialButton } from "../ui/SocialButton";
import { motion } from "framer-motion";

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

interface Socials {
    donate?: string;
    youtube?: string;
    tiktok?: string;
    instagram?: string;
}

interface HeroProps {
    initialSocials?: Socials;
}

export function Hero({ initialSocials = {} }: HeroProps) {
    const [socials] = useState({
        donate: initialSocials.donate || '',
        youtube: initialSocials.youtube || 'https://www.youtube.com/@FeriHui',
        tiktok: initialSocials.tiktok || 'https://tiktok.com/@feri_hui',
        instagram: initialSocials.instagram || 'https://instagram.com/feri8huis'
    });

    return (
        <section className="sticky top-0 h-screen sm:h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                    alt="Background"
                    fill
                    priority
                    quality={50}
                    className="object-cover opacity-10 blur-sm select-none"
                    draggable={false}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent z-[1]" />

            {/* Overlapping Title - BEHIND IMAGE */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute z-[2] text-[15vw] md:text-[18vw] font-black tracking-tighter text-zinc-200 dark:text-zinc-800 pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] whitespace-nowrap"
            >
                FERIHUI
            </motion.h1>

            {/* Animated Circle Background - WRAPPER FOR POSITION */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] z-[1] pointer-events-none flex items-center justify-center"
            >
                {/* Stroke/Ring Animation */}
                <div className="w-full h-full rounded-full border-[4px] md:border-[8px] border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.5)] md:shadow-[0_0_50px_rgba(99,102,241,0.5)] animate-breathe" />
            </motion.div>

            {/* Main Character Image - BIGGER */}
            <div className="relative z-10 mt-0 md:mt-10 w-full max-w-4xl flex justify-center pointer-events-none select-none">
                {/* LCP Optimization: Remove initial opacity: 0 or ensure it's handled */}
                <motion.div
                    initial={{ y: 0, opacity: 1 }} // Changed from y:100, opacity:0 to instant appearance for LCP
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }} // Transition still exists but since states are same, it might not do much, which is good for LCP.
                // Actually, if we want it to slide up but be visible immediately, we can start opacity 1 but y 100.
                // But for LCP, it's best if it's just THERE. 
                // Let's remove the entry animation for the LCP image completely to be safe, or just make it very subtle.
                // I will make it static for now as per plan to "Remove entry animation".
                >
                    <Image
                        src="/assets/hui.webp"
                        alt="Ferihui Character"
                        width={800}
                        height={900}
                        className="drop-shadow-2xl object-contain h-[55vh] sm:h-[65vh] md:h-[85vh] w-auto select-none"
                        priority
                        draggable={false}
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-[10%] sm:bottom-10 z-20 flex flex-col items-center gap-4"
            >
                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {socials.donate && (
                        <SocialButton href={socials.donate} icon={<Heart fill="currentColor" />} label="Donate" />
                    )}
                    <SocialButton href={socials.youtube} icon={<Youtube />} label="YouTube" />
                    <SocialButton href={socials.tiktok} icon={<TikTokIcon />} label="TikTok" />
                    <SocialButton href={socials.instagram} icon={<Instagram />} label="Instagram" />
                </div>
                <p className="text-zinc-500 font-medium tracking-widest text-sm uppercase">Official Streamer Hub</p>
            </motion.div>
        </section>
    );
}
