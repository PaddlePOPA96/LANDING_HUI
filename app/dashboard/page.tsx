'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Loader2, Save, LogOut, Heart } from 'lucide-react';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Valorant State
    const [valSettings, setValSettings] = useState({
        sens: '',
        dpi: '',
        crosshair: ''
    });

    // Dynamic Gear State
    // Default to an empty array. We will migrate old data structure simply by overwriting it.
    const [gearItems, setGearItems] = useState<Array<{ category: string, name: string, link: string, image: string, id: string }>>([]);

    // Socials State
    const [socials, setSocials] = useState({
        donate: '',
        youtube: 'https://www.youtube.com/@FeriHui',
        tiktok: 'https://tiktok.com/@feri_hui',
        instagram: 'https://instagram.com/feri8huis'
    });

    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        // Fetch Data
        if (user) {
            const fetchData = async () => {
                const valSnap = await getDoc(doc(db, "settings", "valorant"));
                if (valSnap.exists()) setValSettings(valSnap.data() as any);

                const socialSnap = await getDoc(doc(db, "settings", "socials"));
                if (socialSnap.exists()) setSocials(socialSnap.data() as any);

                const gearSnap = await getDoc(doc(db, "settings", "gear"));
                if (gearSnap.exists()) {
                    const data = gearSnap.data();
                    // Check if it's the new array format or old object format
                    if (Array.isArray(data.items)) {
                        setGearItems(data.items);
                    } else {
                        // If old format, we just start fresh or could try to migrate, but user agreed to reset.
                        // However, let's try to be nice and migrate if possible, or just start manual.
                        // Given instruction, we'll start with an empty list or migration if desired.
                        // Let's just start with an empty list as agreed, but maybe add one example if empty.
                        setGearItems([]);
                    }
                }
            };
            fetchData();
        }
    }, [user, loading, router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "settings", "valorant"), valSettings);
            await setDoc(doc(db, "settings", "socials"), socials);
            // Save as an object containing the array, for future extensibility
            await setDoc(doc(db, "settings", "gear"), { items: gearItems });
            setMsg('Saved successfully!');
            setTimeout(() => setMsg(''), 3000);
        } catch (e) {
            console.error(e);
            setMsg('Error saving!');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/login');
    }

    const addGearItem = () => {
        setGearItems([...gearItems, { category: '', name: '', link: '', image: '', id: Date.now().toString() }]);
    };

    const updateGearItem = (index: number, field: string, value: string) => {
        const newItems = [...gearItems];
        (newItems[index] as any)[field] = value;
        setGearItems(newItems);
    };

    const removeGearItem = (index: number) => {
        const newItems = [...gearItems];
        newItems.splice(index, 1);
        setGearItems(newItems);
    };

    if (loading || !user) return <div className="h-screen flex items-center justify-center dark:text-white"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 p-6 md:p-12 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                            Dashboard
                        </h1>
                        <p className="text-zinc-500 font-medium">Welcome back, <span className="text-zinc-800 dark:text-zinc-200 font-bold">{user.email}</span></p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-900/30 px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                        <LogOut size={18} className="transition-transform group-hover:-translate-x-1" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-10">

                    {/* Valorant Settings Card */}
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                            <h2 className="text-9xl font-black text-rose-500 rotate-12 translate-x-10 -translate-y-10">VAL</h2>
                        </div>

                        <h2 className="relative z-10 text-2xl font-black uppercase mb-8 flex items-center gap-3 text-rose-500 tracking-wide">
                            <span className="p-2 bg-rose-500/10 rounded-lg"><Loader2 size={24} className={saving ? "animate-spin" : ""} /></span>
                            Valorant Settings
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Sensitivity</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-lg dark:text-white outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                    value={valSettings.sens}
                                    onChange={e => setValSettings({ ...valSettings, sens: e.target.value })}
                                    placeholder="0.35"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">DPI</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-lg dark:text-white outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                    value={valSettings.dpi}
                                    onChange={e => setValSettings({ ...valSettings, dpi: e.target.value })}
                                    placeholder="800"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Crosshair Code</label>
                                <textarea
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-xs dark:text-white outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all h-28 resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                    value={valSettings.crosshair}
                                    onChange={e => setValSettings({ ...valSettings, crosshair: e.target.value })}
                                    placeholder="0;s;1;P;c;5;h;0;m;1;0l;4;0o;2;0a;1;0f;0;1b;0;S;c;4;o;1..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Socials Card */}
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black uppercase flex items-center gap-3 text-pink-500 tracking-wide">
                                <span className="p-2 bg-pink-500/10 rounded-lg"><Heart size={24} /></span>
                                Social Links
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Donate / Saweria</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-sm dark:text-white outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                    value={socials.donate}
                                    onChange={e => setSocials({ ...socials, donate: e.target.value })}
                                    placeholder="https://saweria.co/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">YouTube</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-sm dark:text-white outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                    value={socials.youtube}
                                    onChange={e => setSocials({ ...socials, youtube: e.target.value })}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">TikTok</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-sm dark:text-white outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                    value={socials.tiktok}
                                    onChange={e => setSocials({ ...socials, tiktok: e.target.value })}
                                    placeholder="https://tiktok.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Instagram</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-sm dark:text-white outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                                    value={socials.instagram}
                                    onChange={e => setSocials({ ...socials, instagram: e.target.value })}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gear Card (Dynamic) */}
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-black/50">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black uppercase flex items-center gap-3 text-indigo-500 tracking-wide">
                                <span className="p-2 bg-indigo-500/10 rounded-lg"><Save size={24} /></span>
                                Streaming Gear
                            </h2>
                            <button
                                onClick={addGearItem}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                            >
                                + Add Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            {gearItems.map((item, index) => (
                                <div key={item.id} className="bg-white dark:bg-black/40 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 relative group hover:border-indigo-500/30 transition-colors shadow-sm">
                                    <button
                                        onClick={() => removeGearItem(index)}
                                        className="absolute top-4 right-4 text-zinc-300 hover:text-rose-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-rose-200 shadow-sm"
                                        title="Remove Item"
                                    >
                                        <LogOut size={16} />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b-2 border-zinc-100 dark:border-zinc-800 focus:border-indigo-500 py-2 text-sm font-bold dark:text-zinc-200 outline-none transition-colors placeholder:text-zinc-300"
                                                value={item.category}
                                                onChange={e => updateGearItem(index, 'category', e.target.value)}
                                                placeholder="e.g. Mouse"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Device Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b-2 border-zinc-100 dark:border-zinc-800 focus:border-indigo-500 py-2 text-sm font-bold dark:text-zinc-200 outline-none transition-colors placeholder:text-zinc-300"
                                                value={item.name}
                                                onChange={e => updateGearItem(index, 'name', e.target.value)}
                                                placeholder="e.g. G Pro X Superlight"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Link</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b-2 border-zinc-100 dark:border-zinc-800 focus:border-indigo-500 py-2 text-xs text-zinc-600 dark:text-zinc-400 outline-none transition-colors placeholder:text-zinc-300 font-mono"
                                                value={item.link}
                                                onChange={e => updateGearItem(index, 'link', e.target.value)}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Image</label>
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b-2 border-zinc-100 dark:border-zinc-800 focus:border-indigo-500 py-2 text-xs text-zinc-600 dark:text-zinc-400 outline-none transition-colors placeholder:text-zinc-300 font-mono"
                                                value={item.image}
                                                onChange={e => updateGearItem(index, 'image', e.target.value)}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {gearItems.length === 0 && (
                                <div className="text-center p-12 border-3 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-zinc-400 bg-zinc-50/50 dark:bg-black/20">
                                    <p className="font-medium">No gear items added yet</p>
                                    <button onClick={addGearItem} className="text-indigo-500 text-sm font-bold mt-2 hover:underline">Add one now</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end gap-4 z-50">
                {msg && (
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl shadow-emerald-500/30 animate-fade-in flex items-center gap-2">
                        <span className="bg-white/20 p-1 rounded-full"><Loader2 size={12} className="opacity-0" /></span> {/* Placeholder for icon if needed */}
                        {msg}
                    </div>
                )}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="group bg-zinc-900 dark:bg-white text-white dark:text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-black/20 hover:scale-110 active:scale-90 transition-all disabled:opacity-70 disabled:scale-100 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                    {saving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                </button>
            </div>
        </div>
    );
}
