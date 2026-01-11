import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.ferihui.my.id';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/api/',
            },
            {
                userAgent: [
                    'Amazonbot',
                    'Applebot-Extended', // Targeting Apple's AI scraper specifically if possible, or just Applebot if desired. The list says "Applebot".
                    'Applebot',
                    'anthropic-ai',
                    'ClaudeBot',
                    'Claude-Web',
                    'cohere-ai',
                    'Bytespider',
                    'CCBot',
                    'ChatGPT-User',
                    'Diffbot',
                    'FacebookBot',
                    'FriendlyCrawler',
                    'Google-Extended',
                    'Google-CloudVertexBot',
                    'GPTBot',
                    'ICC-Crawler',
                    'ImagesiftBot',
                    'img2dataset',
                    'Kangaroo Bot',
                    'Meta-ExternalAgent',
                    'Meta-ExternalFetcher',
                    'OAI-SearchBot',
                    'PerplexityBot',
                    'PetalBot',
                    'Scrapy',
                    'Timpibot',
                    'VelenPublicWebCrawler',
                    'YouBot'
                ],
                disallow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
