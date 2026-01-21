'use client';

import Image from "next/image";
import { Gamepad2 } from 'lucide-react';
import { StatCard } from "../ui/StatCard";
import { Reveal } from "../ui/Reveal";

export function About() {
    return (
        <section id="about" className="container mx-auto px-6 py-24 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 space-y-6">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 text-indigo-500 font-bold tracking-wider uppercase text-sm">
                            <Gamepad2 size={18} /> About Me
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-black italic">
                            MORE THAN JUST <br /> <span className="text-indigo-600 dark:text-indigo-500">GAMING.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Ferihui is a content creator and streamer with over 5 years of experience. Formerly part of <strong className="text-indigo-600 dark:text-indigo-400">Deddy Corbuzier&apos;s Team (Close The Door)</strong>, he combines professional broadcast quality with high-level <strong>Valorant</strong> gameplay and entertaining variety streams.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <StatCard number="50K+" label="Followers" />
                        </div>
                    </Reveal>
                </div>

                <div className="flex justify-end relative">
                    <div className="relative w-full max-w-sm">
                        <Image
                            src="/assets/profile.webp"
                            alt="Ferihui Profile - Professional Caster and Content Creator"
                            width={600}
                            height={800}
                            className="object-contain drop-shadow-2xl mask-image-gradient"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
