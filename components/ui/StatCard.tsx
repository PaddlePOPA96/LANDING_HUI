export function StatCard({ number, label }: { number: string, label: string }) {
    return (
        <div className="p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{number}</div>
            <div className="text-xs font-bold text-zinc-500 uppercase">{label}</div>
        </div>
    );
}
