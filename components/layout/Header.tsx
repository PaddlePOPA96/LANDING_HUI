'use client';

import { Mail } from 'lucide-react';
import { ReactNode } from 'react';

interface HeaderProps {
    liveIndicator?: ReactNode;
}

export function Header({ liveIndicator }: HeaderProps) {
    const handleContact = () => {
        // Obfuscated number to prevent simple scraping
        const n = atob('NjI4NTE2MjYzOTkyOQ==');
        window.open(`https://wa.me/${n}`, '_blank');
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
            {/* Live Indicator - Left Side */}
            <div className="pointer-events-auto h-10 flex items-center">
                {liveIndicator}
            </div>

            {/* Contact Button - Right Side */}
            <button
                onClick={handleContact}
                className="pointer-events-auto bg-blue-600/90 backdrop-blur-md border border-blue-500/50 text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
                <Mail size={16} />
                Contact Us
            </button>
        </header>
    );
}
