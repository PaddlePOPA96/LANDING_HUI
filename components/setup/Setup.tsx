'use client';

import { MousePointer2, Keyboard, Headphones, Monitor, Square, Crosshair, Mouse, Zap, Camera, Mic } from 'lucide-react';
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

interface SetupProps {
    valorant: any;
    gear: any;
}

export function Setup({ valorant: valSettings, gear }: SetupProps) {
    if (!valSettings && !gear) return null; // Don't show if empty

    // Helper to get icon based on category name
    const getIcon = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes('mouse') && !cat.includes('pad')) return <Mouse size={18} />;
        if (cat.includes('keyboard')) return <Keyboard size={18} />;
        if (cat.includes('headset') || cat.includes('audio') || cat.includes('sound')) return <Headphones size={18} />;
        if (cat.includes('monitor') || cat.includes('screen')) return <Monitor size={18} />;
        if (cat.includes('pad') || cat.includes('mat')) return <Square size={18} />;
        if (cat.includes('cam') || cat.includes('webcam')) return <Camera size={18} />;
        if (cat.includes('mic')) return <Mic size={18} />;
        return <Zap size={18} />;
    };

    return (
        <section id="setup" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background pattern matching Stats section */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader
                    title="SETUP & GEAR"
                    subtitle="Perangkat tempur untuk performa maksimal."
                    className="items-center text-center"
                />

                <div className="max-w-6xl mx-auto space-y-20">

                    {/* VALORANT SETTINGS */}
                    {valSettings && (
                        <Reveal delay={0.2} width="100%">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3 text-white border-b border-zinc-800 pb-4">
                                    <span className="text-red-600"><Crosshair size={32} /></span>
                                    Valorant Settings
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-zinc-900 border-l-4 border-red-600 p-6 shadow-2xl hover:bg-zinc-800/80 transition-colors">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Sensitivity</label>
                                        <div className="font-mono text-4xl font-black text-white tracking-tighter">{valSettings.sens || '-'}</div>
                                    </div>
                                    <div className="bg-zinc-900 border-l-4 border-red-600 p-6 shadow-2xl hover:bg-zinc-800/80 transition-colors">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">DPI</label>
                                        <div className="font-mono text-4xl font-black text-white tracking-tighter">{valSettings.dpi || '-'}</div>
                                    </div>
                                </div>
                                {valSettings.crosshair && (
                                    <div className="bg-zinc-900 border-l-4 border-red-600 p-6 shadow-2xl hover:bg-zinc-800/80 transition-colors">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Crosshair Code</label>
                                        <div className="bg-black/50 p-4 border border-zinc-800">
                                            <code className="text-sm text-red-500 break-all font-mono">{valSettings.crosshair}</code>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Reveal>
                    )}

                    {/* GEAR */}
                    {gear && (gear.items || gear.mouse) && (
                        <Reveal delay={0.4} width="100%">
                            <div className="space-y-8">
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3 text-white border-b border-zinc-800 pb-4">
                                    <span className="text-red-600"><Keyboard size={32} /></span>
                                    Gear
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {/* Dynamic Items */}
                                    {gear.items && Array.isArray(gear.items) && gear.items.map((item: any, idx: number) => (
                                        <GearItem
                                            key={item.id || idx}
                                            icon={getIcon(item.category)}
                                            label={item.category}
                                            value={item.name}
                                            link={item.link}
                                            image={item.image}
                                        />
                                    ))}

                                    {/* Fallback for legacy data */}
                                    {!gear.items && gear.mouse && (
                                        <>
                                            <GearItem icon={<Mouse size={24} />} label="Mouse" value={gear.mouse} link={gear.mouseLink} image={gear.mouseImage} />
                                            <GearItem icon={<Keyboard size={24} />} label="Keyboard" value={gear.keyboard} link={gear.keyboardLink} image={gear.keyboardImage} />
                                            <GearItem icon={<Headphones size={24} />} label="Headset" value={gear.headset} link={gear.headsetLink} image={gear.headsetImage} />
                                            <GearItem icon={<Monitor size={24} />} label="Monitor" value={gear.monitor} link={gear.monitorLink} image={gear.monitorImage} />
                                            <GearItem icon={<Square size={24} />} label="Mousepad" value={gear.mousepad} link={gear.mousepadLink} image={gear.mousepadImage} />
                                        </>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    )}

                </div>
            </div>
        </section>
    );
}

function GearItem({ icon, label, value, link, image }: { icon: any, label: string, value: string, link?: string, image?: string }) {
    if (!value) return null;
    return (
        <div className="flex flex-col h-full bg-zinc-900 border-l-4 border-red-600 shadow-xl group hover:-translate-y-1 transition-transform duration-300">
            {/* Image Container with cutout look */}
            <div className="aspect-square w-full bg-black/40 relative overflow-hidden group-hover:bg-black/60 transition-colors border-b border-zinc-800">
                {image ? (
                    <img
                        src={image}
                        alt={value}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                        {icon}
                    </div>
                )}

                {/* Overlay Button */}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm"
                    >
                        <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-red-500 transition-colors clip-path-slant">
                            Check Price
                        </span>
                    </a>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 text-red-500 mb-2">
                        {icon}
                        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-tight uppercase tracking-tight group-hover:text-red-400 transition-colors">
                        {value}
                    </h4>
                </div>
            </div>
        </div>
    );
}
