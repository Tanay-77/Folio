import { NextResponse } from 'next/server';
import { PinData } from '@/lib/pinterest/types';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const rssUrl = 'https://in.pinterest.com/tanaymahajan7/best-work.rss';
    
    // Fetch the RSS feed
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pinterest RSS: ${response.status} ${response.statusText}`);
    }
    
    const xml = await response.text();

    // Parse XML using regex since it's a simple flat list
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items = [];
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
      items.push(match[1]);
    }

    const pins: PinData[] = items.map((item, index) => {
      // Extract image URL from description
      // Description typically looks like: &lt;img src=&quot;https://i.pinimg.com/236x/...&quot;&gt;
      const imgRegex = /src=&quot;([^&]+)&quot;/i;
      const imgMatch = item.match(imgRegex);
      
      let imageUrl = imgMatch ? imgMatch[1] : '';
      
      // Pinterest thumbnails in RSS are usually 236x. To get high-res, replace '236x' with '736x' or 'originals'
      // 736x is usually the most reliable high-quality format that still loads reasonably fast
      if (imageUrl) {
        imageUrl = imageUrl.replace(/\/\d+x\//, '/736x/');
      }

      // Extract link to Pinterest pin
      const linkRegex = /<link>([^<]+)<\/link>/i;
      const linkMatch = item.match(linkRegex);
      const pinterestUrl = linkMatch ? linkMatch[1] : undefined;
      
      // Extract title
      const titleRegex = /<title>([^<]+)<\/title>/i;
      const titleMatch = item.match(titleRegex);
      const title = titleMatch ? titleMatch[1].trim() : undefined;

      // Generate pseudo-random aspect ratios for masonry layout effect since RSS doesn't provide them
      const heights = [500, 600, 700, 800, 550, 650, 750];
      const randomHeight = heights[index % heights.length];

      return {
        id: `pin-${index}-${Date.now()}`,
        imageUrl,
        width: 500,
        height: randomHeight,
        pinterestUrl,
        title,
      };
    }).filter(pin => pin.imageUrl !== ''); // Remove any pins where image parsing failed

    return NextResponse.json({ pins });
  } catch (error) {
    console.error('Pinterest fetch error:', error);
    return NextResponse.json({ pins: [], error: 'Failed to fetch pins' }, { status: 500 });
  }
}
