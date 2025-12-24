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
                            Ferihui is a content creator and streamer with over 5 years of experience, known for his high-level <strong>Valorant</strong> gameplay and entertaining variety game streams.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <StatCard number="50K+" label="Followers" />
                        </div>
                    </Reveal>
                </div>

                {/* Decorative Image/Element for About */}
                <Reveal width="100%" className="w-full md:w-1/2" variant="slide-in-right" delay={0.4}>
                    <div className="h-[250px] md:h-[400px] bg-zinc-100 dark:bg-zinc-900 rounded-3xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-black z-0" />
                        <Image
                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"
                            alt="Setup"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 relative z-10 opacity-80 select-none"
                            draggable={false}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-20" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
