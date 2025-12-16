import { ReactNode } from 'react';

export function SocialButton({ href, icon, label }: { href: string, icon: ReactNode, label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/25"
            aria-label={label}
        >
            {icon}
        </a>
    );
}
