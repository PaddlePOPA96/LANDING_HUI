import { NextResponse } from 'next/server';

const CHANNEL_ID = 'UCt_Mm5sdOOYG8wgi9r2MnAg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export async function GET() {
    try {
        const response = await fetch(RSS_URL);
        const text = await response.text();

        const streams = [];
        // Simple regex parsing to avoid heavy xml libraries
        // Splitting by entry tag
        const entries = text.split('<entry>');

        // Skip the first part (header)
        for (let i = 1; i < entries.length; i++) {
            const entry = entries[i];

            const titleMatch = entry.match(/<title>(.*?)<\/title>/);
            const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
            const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
            const viewsMatch = entry.match(/<media:statistics views="(\d+)"/);

            if (titleMatch && videoIdMatch) {
                streams.push({
                    id: i,
                    videoId: videoIdMatch[1],
                    title: titleMatch[1],
                    // Formatting date nicely
                    time: new Date(publishedMatch ? publishedMatch[1] : Date.now()).toLocaleDateString(),
                    views: viewsMatch ? `${(parseInt(viewsMatch[1]) / 1000).toFixed(1)}K views` : 'New',
                    // Using high quality thumbnail
                    image: `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`
                });
            }
        }

        // Return top 5
        return NextResponse.json(streams.slice(0, 5));
    } catch (error) {
        console.error('Error fetching streams:', error);
        return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 });
    }
}
