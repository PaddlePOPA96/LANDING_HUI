export function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-950 py-12 border-t border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                <p className="text-zinc-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Ferihui Gaming. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
