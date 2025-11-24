'use server';

export async function fetchLatestVideos() {
    try {
        const response = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=UCzMZ3wV6FJKPRO_PPTOC3Pg', {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch YouTube feed');
        }

        const xmlText = await response.text();

        // Simple regex parsing to avoid heavy XML parser dependencies
        // This is sufficient for the simple structure of the YouTube RSS feed
        const entries = [];
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        let match;

        while ((match = entryRegex.exec(xmlText)) !== null) {
            if (entries.length >= 3) break;
            const entryContent = match[1];

            const titleMatch = /<title>(.*?)<\/title>/.exec(entryContent);
            const linkMatch = /<link rel="alternate" href="(.*?)"\/>/.exec(entryContent);
            const idMatch = /<yt:videoId>(.*?)<\/yt:videoId>/.exec(entryContent);

            if (titleMatch && linkMatch && idMatch) {
                const title = titleMatch[1];
                const link = linkMatch[1];
                // Filter out Shorts (usually have #shorts in title or /shorts/ in URL)
                if (title.toLowerCase().includes('#shorts') || link.includes('/shorts/')) {
                    continue;
                }

                entries.push({
                    title: title,
                    link: link,
                    thumbnail: `https://i.ytimg.com/vi/${idMatch[1]}/mqdefault.jpg`,
                });
            }
        }

        return entries;
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return [];
    }
}
