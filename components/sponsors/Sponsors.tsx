'use client';

import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Sponsors() {
    return (
        <section id="sponsors" className="bg-zinc-50 dark:bg-zinc-900 py-24 border-y border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-6 text-center">
                <SectionHeader
                    title="PROUD PARTNERS"
                    subtitle="Didukung oleh brand terbaik."
                    className="items-center text-center mb-16"
                />

                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Sponsor 1 */}
                    <Reveal delay={0.2}>
                        <div className="relative w-48 h-24 hover:scale-110 transition-transform">
                            <Image
                                src="/assets/sponsor/obsbot.png"
                                alt="OBSBOT Sponsor"
                                fill
                                sizes="200px"
                                className="object-contain"
                            />
                        </div>
                    </Reveal>

                    {/* Sponsor 2 */}
                    <Reveal delay={0.4}>
                        <div className="relative w-48 h-24 hover:scale-110 transition-transform">
                            <Image
                                src="/assets/sponsor/id2fjgY5xB_logos.png"
                                alt="Sponsor Logo"
                                fill
                                sizes="200px"
                                className="object-contain"
                            />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
