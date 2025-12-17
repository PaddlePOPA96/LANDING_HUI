'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MousePointer2, Keyboard, Headphones, Monitor, Square, Crosshair, Mouse, Zap, Camera, Mic } from 'lucide-react';

export function Setup() {
    const [valSettings, setValSettings] = useState<any>(null);
    const [gear, setGear] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const valSnap = await getDoc(doc(db, "settings", "valorant"));
                if (valSnap.exists()) setValSettings(valSnap.data());

                const gearSnap = await getDoc(doc(db, "settings", "gear"));
                if (gearSnap.exists()) setGear(gearSnap.data());
            } catch (e) {
                console.error("Error loading setup data", e);
            }
        }
        fetchData();
    }, []);

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
        <section id="setup" className="container mx-auto px-6 py-24 bg-zinc-50 dark:bg-zinc-900/50">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-center mb-16">
                My <span className="text-indigo-600">Setup</span>
            </h2>

            <div className="max-w-6xl mx-auto space-y-20">

                {/* VALORANT SETTINGS */}
                {valSettings && (
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h3 className="text-3xl font-bold uppercase flex items-center gap-3 text-red-500 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            <Crosshair size={32} /> Valorant Settings
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <label className="text-sm font-bold text-zinc-500 uppercase block mb-2">Sensitivity</label>
                                <div className="font-mono text-3xl font-black tracking-tighter">{valSettings.sens || '-'}</div>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                <label className="text-sm font-bold text-zinc-500 uppercase block mb-2">DPI</label>
                                <div className="font-mono text-3xl font-black tracking-tighter">{valSettings.dpi || '-'}</div>
                            </div>
                        </div>
                        {valSettings.crosshair && (
                            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                                <label className="text-sm font-bold text-zinc-500 uppercase block mb-2">Crosshair Code</label>
                                <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl">
                                    <code className="text-sm text-zinc-600 dark:text-zinc-400 break-all font-mono">{valSettings.crosshair}</code>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* GEAR */}
                {gear && (gear.items || gear.mouse) && (
                    <div className="space-y-8">
                        <h3 className="text-3xl font-bold uppercase flex items-center gap-3 text-indigo-500 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            <Keyboard size={32} /> Gear
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                )}

            </div>
        </section>
    );
}

function GearItem({ icon, label, value, link, image }: { icon: any, label: string, value: string, link?: string, image?: string }) {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-4 p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all hover:border-indigo-500 hover:shadow-lg group text-center h-full">
            <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative">
                {image ? (
                    <img
                        src={image}
                        alt={value}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform backface-hidden"
                    />
                ) : (
                    <div className="text-zinc-300 dark:text-zinc-700">
                        {icon}
                    </div>
                )}
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                        <span className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full">
                            Check Price
                        </span>
                    </a>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-center gap-2 text-indigo-500 mb-2">
                        {icon}
                        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                    </div>
                    <h4 className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight mb-2">
                        {value}
                    </h4>
                </div>
            </div>
        </div>
    );
}
