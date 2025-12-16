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

    // Gear State
    const [gear, setGear] = useState({
        mouse: '',
        mouseLink: '',
        mouseImage: '',
        keyboard: '',
        keyboardLink: '',
        keyboardImage: '',
        headset: '',
        headsetLink: '',
        headsetImage: '',
        monitor: '',
        monitorLink: '',
        monitorImage: '',
        mousepad: '',
        mousepadLink: '',
        mousepadImage: ''
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

                const gearSnap = await getDoc(doc(db, "settings", "gear"));
                if (gearSnap.exists()) setGear(gearSnap.data() as any);
            };
            fetchData();
        }
    }, [user, loading, router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "settings", "valorant"), valSettings);
            await setDoc(doc(db, "settings", "gear"), gear);
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Valorant Settings Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 text-red-500">
                            Valorant Settings
                        </h2>
                        <div className="space-y-4">
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
                            <div>
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

                    {/* Gear Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 text-indigo-500">
                            Streaming Gear
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Mouse</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    value={gear.mouse}
                                    onChange={e => setGear({ ...gear, mouse: e.target.value })}
                                    placeholder="Device Name"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.mouseLink || ''}
                                        onChange={e => setGear({ ...gear, mouseLink: e.target.value })}
                                        placeholder="Buy Link (URL)"
                                    />
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.mouseImage || ''}
                                        onChange={e => setGear({ ...gear, mouseImage: e.target.value })}
                                        placeholder="Image URL"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Keyboard</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    value={gear.keyboard}
                                    onChange={e => setGear({ ...gear, keyboard: e.target.value })}
                                    placeholder="Device Name"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.keyboardLink || ''}
                                        onChange={e => setGear({ ...gear, keyboardLink: e.target.value })}
                                        placeholder="Buy Link (URL)"
                                    />
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.keyboardImage || ''}
                                        onChange={e => setGear({ ...gear, keyboardImage: e.target.value })}
                                        placeholder="URL"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Headset</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    value={gear.headset}
                                    onChange={e => setGear({ ...gear, headset: e.target.value })}
                                    placeholder="Device Name"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.headsetLink || ''}
                                        onChange={e => setGear({ ...gear, headsetLink: e.target.value })}
                                        placeholder="Buy Link (URL)"
                                    />
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.headsetImage || ''}
                                        onChange={e => setGear({ ...gear, headsetImage: e.target.value })}
                                        placeholder="Image URL"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Monitor</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    value={gear.monitor}
                                    onChange={e => setGear({ ...gear, monitor: e.target.value })}
                                    placeholder="Device Name"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.monitorLink || ''}
                                        onChange={e => setGear({ ...gear, monitorLink: e.target.value })}
                                        placeholder="Buy Link (URL)"
                                    />
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.monitorImage || ''}
                                        onChange={e => setGear({ ...gear, monitorImage: e.target.value })}
                                        placeholder="Image URL"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Mousepad</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                                    value={gear.mousepad}
                                    onChange={e => setGear({ ...gear, mousepad: e.target.value })}
                                    placeholder="Device Name"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.mousepadLink || ''}
                                        onChange={e => setGear({ ...gear, mousepadLink: e.target.value })}
                                        placeholder="Buy Link (URL)"
                                    />
                                    <input
                                        type="text"
                                        className="w-1/2 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={gear.mousepadImage || ''}
                                        onChange={e => setGear({ ...gear, mousepadImage: e.target.value })}
                                        placeholder="Image URL"
                                    />
                                </div>
                            </div>
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
