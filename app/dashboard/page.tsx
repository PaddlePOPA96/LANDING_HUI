'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Loader2, Save, LogOut } from 'lucide-react';

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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-black uppercase italic dark:text-white">Dashboard</h1>
                        <p className="text-zinc-500">Welcome, {user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8">

                    {/* Valorant Settings Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 text-red-500">
                            Valorant Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Sensitivity</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-red-500"
                                    value={valSettings.sens}
                                    onChange={e => setValSettings({ ...valSettings, sens: e.target.value })}
                                    placeholder="e.g. 0.35"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">DPI</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-red-500"
                                    value={valSettings.dpi}
                                    onChange={e => setValSettings({ ...valSettings, dpi: e.target.value })}
                                    placeholder="e.g. 800"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Crosshair Code</label>
                                <textarea
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-red-500 h-24 font-mono text-xs"
                                    value={valSettings.crosshair}
                                    onChange={e => setValSettings({ ...valSettings, crosshair: e.target.value })}
                                    placeholder="0;s;1;P;c;5;h;0;m;1;0l;4;0o;2;0a;1;0f;0;1b;0;S;c;4;o;1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gear Card (Dynamic) */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold uppercase flex items-center gap-2 text-indigo-500">
                                Streaming Gear
                            </h2>
                            <button
                                onClick={addGearItem}
                                className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-lg font-bold text-xs transition-all"
                            >
                                + Add Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            {gearItems.map((item, index) => (
                                <div key={item.id} className="bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 relative group">
                                    <button
                                        onClick={() => removeGearItem(index)}
                                        className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove Item"
                                    >
                                        <LogOut size={16} /> {/* Reusing LogOut icon as remove icon due to limited imports, or import X/Trash if available later */}
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Category (e.g. Mouse)</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                                value={item.category}
                                                onChange={e => updateGearItem(index, 'category', e.target.value)}
                                                placeholder="Category"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Device Name</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                                value={item.name}
                                                onChange={e => updateGearItem(index, 'name', e.target.value)}
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Buy Link</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                                value={item.link}
                                                onChange={e => updateGearItem(index, 'link', e.target.value)}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Image URL</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                                value={item.image}
                                                onChange={e => updateGearItem(index, 'image', e.target.value)}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {gearItems.length === 0 && (
                                <div className="text-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400">
                                    No gear items added yet. Click "Add Item" to start.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end gap-2">
                {msg && <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg animate-fade-in">{msg}</div>}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-zinc-900 dark:bg-white text-white dark:text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <Save />}
                </button>
            </div>
        </div>
    );
}
