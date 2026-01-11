import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.ferihui.my.id';

    // Use a fixed date or current date for lastModified. 
    // Ideally, this should come from your data source (e.g., database or git commit time).
    // For now, using new Date() effectively means "now", which is fine for dynamic routes,
    // but Google might prefer stable dates if content hasn't changed.
    const currentDate = new Date();

    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/dashboard`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];
}
