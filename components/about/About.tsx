'use client';

import Image from "next/image";
import { StatCard } from "../ui/StatCard";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function About() {
    return (
        <section id="about" className="py-24 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-6">
                <Reveal width="100%">
                    <SectionHeader
                        title="ABOUT ME"
                        subtitle="More than just gaming."
                        className="mb-12"
                    />
                </Reveal>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

                    {/* Kolom Teks - Menggunakan tag 'article' untuk konten informasi */}
                    <article className="space-y-6">
                        <Reveal delay={0.2}>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Ferihui is a content creator and streamer with over 5 years of experience. Formerly part of <strong className="text-red-600 dark:text-red-400">Deddy Corbuzier&apos;s Team (Close The Door)</strong>, he combines professional broadcast quality with high-level <strong>Valorant</strong> gameplay and entertaining variety streams.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <StatCard number="50K+" label="Followers" />
                                {/* Tempatkan StatCard kedua di sini jika ada nantinya */}
                            </div>
                        </Reveal>
                    </article>

                    {/* Kolom Gambar - Menggunakan tag 'figure' untuk elemen media */}
                    <Reveal delay={0.4} width="100%">
                        <figure className="relative flex justify-center md:justify-end">
                            <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-800/50 shadow-2xl">
                                <Image
                                    src="/assets/profile.webp"
                                    alt="Ferihui Profile - Professional Caster and Content Creator"
                                    fill // Menggunakan fill agar responsif mengikuti parent aspect-ratio
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>
                        </figure>
                    </Reveal>

                </div>
            </div>
        </section>
    );
}