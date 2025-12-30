export default function Loading() {
    return (
        <div className="h-screen w-full relative bg-white dark:bg-zinc-950 overflow-hidden">
            {/* 
        Center strictly with absolute positioning to match Hero 
        Hero Ring is centered at top-1/2 left-1/2
      */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                {/* 
            Spinner Ring 
            Size: 64px (w-16)
            We want this to look like the "seed" that grows into the Hero ring.
        */}
                <div className="w-16 h-16 rounded-full border-[4px] border-indigo-500/50 border-t-indigo-500 animate-spin shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
            </div>
        </div>
    );
}
