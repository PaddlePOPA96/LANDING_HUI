import { checkLiveStatus } from "@/lib/videoUtils";

export async function LiveHeaderIndicator() {
    const isLive = await checkLiveStatus('UCt_Mm5sdOOYG8wgi9r2MnAg');

    if (!isLive) return null;

    return (
        <a
            href="https://www.youtube.com/@FeriHui/live"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600/90 backdrop-blur-md border border-red-500/50 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-600 hover:scale-105 transition-all animate-pulse"
        >
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            Live Now
        </a>
    );
}
