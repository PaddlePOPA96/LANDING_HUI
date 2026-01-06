export async function checkLiveStatus(channelId: string): Promise<boolean> {
    try {
        // 1. Check if the /live URL redirects to a specific video
        // This is the most reliable way without an API key.
        // If live: redirects to https://www.youtube.com/watch?v=VIDEO_ID
        // If offline: redirects to https://www.youtube.com/channel/CHANNEL_ID or /featured
        const liveUrl = `https://www.youtube.com/channel/${channelId}/live`;
        const response = await fetch(liveUrl, {
            next: { revalidate: 60 },
            headers: {
                // Use a standard browser UA to ensure we get the desktop version ensuring redirects work as expected
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            redirect: 'manual' // We might want to handle redirects manually to check the status code, but 'follow' is standard. 
            // Actually, checking standard fetch response.url after 'follow' is better.
        });

        // If we handle redirect manually, we can inspect headers.location.
        // But Next.js fetch cache might behave weirdly with manual redirects. 
        // Let's try following it first and checking the final URL.

        // NOTE: For better reliability, we will use a HEAD request or GET and check the URL.
        // However, fetch with 'redirect: follow' updates response.url

        // Let's fetch the full page with 'follow' (default)
        const finalResponse = await fetch(liveUrl, {
            next: { revalidate: 60 },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        });

        const finalUrl = finalResponse.url;
        const isWatchPage = finalUrl.includes('/watch?v=');

        // Logging for debugging (will appear in server console)
        console.log(`[LifeCheck] Checking ${liveUrl}`);
        console.log(`[LifeCheck] Final URL: ${finalUrl}`);
        console.log(`[LifeCheck] Is Watch Page? ${isWatchPage}`);

        if (isWatchPage) {
            return true;
        }

        // Strategy 2: Check content for canonical URL manually if redirect check fails or acts weird
        // Sometimes the fetch follows redirect but the URL property isn't updated in some Next.js environments or middleware.
        // We check the HTML content for <link rel="canonical" href="...">
        const text = await finalResponse.text();
        const isLiveBroadcast = text.includes('"isLiveBroadcast":true');
        const hasCanonicalWatch = text.includes('rel="canonical" href="https://www.youtube.com/watch?v=');

        // Check for "Live" specific metadata often found in the channel page even if not redirected
        // "text":" watching" often appears in the view count like "1.2K watching"
        const hasWatchingText = text.includes('"text":" watching"');

        console.log(`[LifeCheck] Content isLiveBroadcast: ${isLiveBroadcast}`);
        console.log(`[LifeCheck] Content hasCanonicalWatch: ${hasCanonicalWatch}`);
        console.log(`[LifeCheck] Content hasWatchingText: ${hasWatchingText}`);

        if (isWatchPage || isLiveBroadcast || hasCanonicalWatch || hasWatchingText) {
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error checking live status:', error);
        return false;
    }
}
