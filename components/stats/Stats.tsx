'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const agents = [
    {
        name: "SOVA",
        role: "INITIATOR",
        matches: 482,
        winRate: 51.0,
        image: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/fullportrait.png",
        color: "from-blue-400 to-indigo-500"
    },
    {
        name: "BREACH",
        role: "INITIATOR",
        matches: 155,
        winRate: 58.1,
        image: "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/fullportrait.png",
        color: "from-orange-500 to-amber-600"
    },
    {
        name: "RAZE",
        role: "DUELIST",
        matches: 94,
        winRate: 56.4,
        image: "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/fullportrait.png",
        color: "from-orange-400 to-red-500"
    },
    {
        name: "OMEN",
        role: "CONTROLLER",
        matches: 81,
        winRate: 48.1,
        image: "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/fullportrait.png",
        color: "from-purple-600 to-blue-900"
    }
];

export function Stats() {
    return (
        <section id="stats" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <Reveal width="100%">
                    <SectionHeader
                        title="AGENT PROFILE"
                        subtitle="Statistik dan peran favorit di dalam game."
                        className="items-center text-center"
                    />
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {agents.map((agent, index) => (
                        <Reveal key={agent.name} delay={index * 0.1} width="100%">
                            <div className="group relative aspect-[3/4] bg-zinc-900 border-l-4 border-red-600 overflow-hidden shadow-2xl hover:shadow-red-900/20 transition-all duration-500">

                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Character Image - Properly fitted */}
                                <div className="absolute inset-0 z-0 flex items-end justify-center">
                                    <div className="relative w-full h-full transform translate-y-8 group-hover:translate-y-4 transition-transform duration-500 ease-out">
                                        <Image
                                            src={agent.image}
                                            alt={agent.name}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                                    {/* Header */}
                                    <div>
                                        <h3 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase mb-2 drop-shadow-lg">{agent.name}</h3>
                                        <span className="inline-block bg-red-600 text-white font-bold tracking-[0.2em] text-[10px] px-3 py-1 uppercase">{agent.role}</span>
                                    </div>

                                    {/* Footer Stats */}
                                    <div className="space-y-4 pt-10">
                                        <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                                            <div>
                                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Win Rate</p>
                                                <p className="text-5xl font-black text-white tracking-tighter">{agent.winRate}<span className="text-2xl text-red-600">%</span></p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Matches</p>
                                                <p className="text-2xl font-black text-zinc-300">{agent.matches}</p>
                                            </div>
                                        </div>

                                        {/* Performance Bar */}
                                        <div>
                                            <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-600 mb-1">
                                                <span>Performance</span>
                                            </div>
                                            <div className="h-1 w-full bg-zinc-800">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${agent.winRate}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                    className="h-full bg-red-600"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
