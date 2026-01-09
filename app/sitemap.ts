import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    // Ensure the URL always uses https://
    const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.ferihui.my.id').replace(/^http:\/\//, 'https://');
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
