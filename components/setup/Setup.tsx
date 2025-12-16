'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MousePointer2, Keyboard, Headphones, Monitor, Square, Crosshair, Mouse } from 'lucide-react';

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

    return (
        <section id="setup" className="container mx-auto px-6 py-24 bg-zinc-50 dark:bg-zinc-900/50">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase text-center mb-16">
                My <span className="text-indigo-600">Setup</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                {/* VALORANT SETTINGS */}
                {valSettings && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold uppercase flex items-center gap-3 text-red-500">
                            <Crosshair size={24} /> Valorant Settings
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Sensitivity</label>
                                <div className="font-mono text-xl font-bold">{valSettings.sens || '-'}</div>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">DPI</label>
                                <div className="font-mono text-xl font-bold">{valSettings.dpi || '-'}</div>
                            </div>
                        </div>
                        {valSettings.crosshair && (
                            <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                                <label className="text-xs font-bold text-zinc-500 uppercase block mb-1">Crosshair Code</label>
                                <code className="text-xs text-zinc-600 dark:text-zinc-400 break-all">{valSettings.crosshair}</code>
                            </div>
                        )}
                    </div>
                )}

                {/* GEAR */}
                {gear && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold uppercase flex items-center gap-3 text-indigo-500">
                            <Keyboard size={24} /> Gear
                        </h3>
                        <div className="space-y-3">
                            <GearItem icon={<Mouse size={18} />} label="Mouse" value={gear.mouse} link={gear.mouseLink} image={gear.mouseImage} />
                            <GearItem icon={<Keyboard size={18} />} label="Keyboard" value={gear.keyboard} link={gear.keyboardLink} image={gear.keyboardImage} />
                            <GearItem icon={<Headphones size={18} />} label="Headset" value={gear.headset} link={gear.headsetLink} image={gear.headsetImage} />
                            <GearItem icon={<Monitor size={18} />} label="Monitor" value={gear.monitor} link={gear.monitorLink} image={gear.monitorImage} />
                            <GearItem icon={<Square size={18} />} label="Mousepad" value={gear.mousepad} link={gear.mousepadLink} image={gear.mousepadImage} />
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
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:border-indigo-500/50">
            {image && (
                <img
                    src={image}
                    alt={value}
                    className="w-16 h-16 object-cover rounded-lg border border-zinc-200 dark:border-zinc-700"
                />
            )}
            <div className="flex-1 flex items-center gap-3">
                <div className="text-zinc-500">
                    {icon}
                </div>
                <div className="flex flex-col flex-1">
                    <span className="text-xs font-bold uppercase text-zinc-500">{label}</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{value}</span>
                </div>
            </div>
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                    Check Price
                </a>
            )}
        </div>
    );
}
