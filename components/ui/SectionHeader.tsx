'use client';

import { Reveal } from "./Reveal";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
    return (
        <Reveal width="100%">
            <div className={`flex flex-col mb-12 ${className}`}>
                <div className="flex items-center gap-4 mb-2">
                    {/* Red Slash */}
                    <div className="w-2 h-10 md:h-12 bg-red-600 -skew-x-12" />

                    {/* Title */}
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase text-zinc-900 dark:text-white tracking-tight">
                        {title}
                    </h2>
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm md:text-base max-w-2xl ml-6">
                        {subtitle}
                    </p>
                )}
            </div>
        </Reveal>
    );
}
