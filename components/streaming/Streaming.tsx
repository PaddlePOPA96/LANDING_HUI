'use client';

import Image from "next/image";
import { Play } from 'lucide-react';
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

interface Stream {
    id: number;
    videoId: string;
    title: string;
    views: string;
    time: string;
    image: string;
}

interface StreamingProps {
    streams: Stream[];
}

export function Streaming({ streams }: StreamingProps) {
    // If no streams, we can still show the section or handle empty state gracefully. 
    // For now assuming parent handles fetching.


    return (
        <section id="streaming" className="container mx-auto px-6 py-24 bg-white dark:bg-zinc-950">
            <div className="flex flex-col mb-16">
                <SectionHeader
                    title="LATEST STREAMS"
                    subtitle="Highlight dan rekaman live streaming terbaru."
                    className="mb-4"
                />
                <Reveal width="100%">
                    <a
                        href="https://www.youtube.com/@FeriHui/streams"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-red-600 transition-colors uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2"
                    >
                        View All on YouTube <Play size={16} fill="currentColor" />
                    </a>
                </Reveal>
            </div>

            <Reveal width="100%" delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
                    {streams.map((stream, index) => (
                        <a
                            key={stream.id}
                            href={`https://www.youtube.com/watch?v=${stream.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative block rounded-2xl overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20 will-change-transform ${index < 2 ? 'md:col-span-1 lg:col-span-1' : '' /* Standard grid */
                                }`}
                        >
                            <Image
                                src={stream.image}
                                alt={stream.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Play fill="white" className="text-white ml-1" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2 uppercase italic">{stream.title}</h3>
                                <div className="flex items-center gap-3 text-xs font-medium text-zinc-300">
                                    <span className="bg-red-600 px-2 py-0.5 rounded text-white">VOD</span>
                                    <span>{stream.views}</span>
                                    <span>•</span>
                                    <span>{stream.time}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}
