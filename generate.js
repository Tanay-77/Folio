const fs = require('fs');
const path = require('path');

const dirs = [
  'components/gallery',
  'components/navigation',
  'lib/pinterest',
  'app/api/pinterest/pins'
];

dirs.forEach(dir => fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true }));

fs.writeFileSync('metadata.json', JSON.stringify({
  "name": "Tanay® Portfolio",
  "description": "Minimal, experimental editorial portfolio homepage.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}, null, 2));

fs.writeFileSync('app/layout.tsx', `import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tanay®',
  description: 'Creative Portfolio',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-[#f3f3f3] text-black" suppressHydrationWarning>{children}</body>
    </html>
  );
}
`);

fs.writeFileSync('app/page.tsx', `import { FloatingNav } from '@/components/navigation/FloatingNav';
import { ExpandButton } from '@/components/navigation/ExpandButton';
import { PinterestGallery } from '@/components/gallery/PinterestGallery';

export default function Home() {
  return (
    <div className="h-[200vh] bg-[#f3f3f3]">
      <div className="sticky top-0 p-2 sm:p-4 md:p-6 w-full h-screen font-sans">
        <main className="relative w-full h-full bg-white rounded-[30px] sm:rounded-[40px] overflow-hidden flex flex-col items-center justify-between shadow-2xl">
          <FloatingNav />
          <ExpandButton />
          
          <div className="w-full flex-grow flex flex-col justify-center overflow-hidden py-16 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-24">
             <PinterestGallery />
          </div>

          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-center text-xs tracking-widest uppercase text-black/60 z-10 font-medium">
            Scroll Down
            <div className="mt-2 text-[10px] animate-bounce">↓</div>
          </div>
        </main>
      </div>
    </div>
  );
}
`);

fs.writeFileSync('components/navigation/FloatingNav.tsx', `export function FloatingNav() {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-between gap-8 px-5 py-2 bg-neutral-100/80 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-neutral-900 border border-black/5">
        <span>Tanay&reg;</span>
        <span className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">≡</span>
      </div>
    </div>
  );
}
`);

fs.writeFileSync('components/navigation/ExpandButton.tsx', `export function ExpandButton() {
  return (
    <button className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50 w-9 h-9 bg-[#111] rounded-[10px] flex items-center justify-center text-white hover:bg-black hover:scale-105 transition-all duration-300 shadow-md">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </button>
  );
}
`);

fs.writeFileSync('lib/pinterest/types.ts', `export interface PinData {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
  title?: string;
  pinterestUrl?: string;
}
`);

fs.writeFileSync('app/api/pinterest/pins/route.ts', `import { NextResponse } from 'next/server';
import { PinData } from '@/lib/pinterest/types';

// Diverse set of fallback images mimicking a Pinterest moodboard (portraits, design, abstract, editorial)
const FALLBACK_PINS: PinData[] = [
  { id: '1', imageUrl: 'https://picsum.photos/seed/a1/400/600', width: 400, height: 600 },
  { id: '2', imageUrl: 'https://picsum.photos/seed/a2/600/400', width: 600, height: 400 },
  { id: '3', imageUrl: 'https://picsum.photos/seed/a3/500/750', width: 500, height: 750 },
  { id: '4', imageUrl: 'https://picsum.photos/seed/a4/400/400', width: 400, height: 400 },
  { id: '5', imageUrl: 'https://picsum.photos/seed/a5/450/600', width: 450, height: 600 },
  { id: '6', imageUrl: 'https://picsum.photos/seed/a6/500/500', width: 500, height: 500 },
  { id: '7', imageUrl: 'https://picsum.photos/seed/a7/600/800', width: 600, height: 800 },
  { id: '8', imageUrl: 'https://picsum.photos/seed/a8/700/450', width: 700, height: 450 },
  { id: '9', imageUrl: 'https://picsum.photos/seed/a9/400/650', width: 400, height: 650 },
  { id: '10', imageUrl: 'https://picsum.photos/seed/a10/500/400', width: 500, height: 400 },
  { id: '11', imageUrl: 'https://picsum.photos/seed/a11/600/900', width: 600, height: 900 },
  { id: '12', imageUrl: 'https://picsum.photos/seed/a12/400/400', width: 400, height: 400 },
  { id: '13', imageUrl: 'https://picsum.photos/seed/a13/450/700', width: 450, height: 700 },
  { id: '14', imageUrl: 'https://picsum.photos/seed/a14/550/400', width: 550, height: 400 },
  { id: '15', imageUrl: 'https://picsum.photos/seed/a15/500/600', width: 500, height: 600 },
  { id: '16', imageUrl: 'https://picsum.photos/seed/a16/800/600', width: 800, height: 600 },
  { id: '17', imageUrl: 'https://picsum.photos/seed/a17/400/550', width: 400, height: 550 },
  { id: '18', imageUrl: 'https://picsum.photos/seed/a18/500/500', width: 500, height: 500 },
  { id: '19', imageUrl: 'https://picsum.photos/seed/a19/600/850', width: 600, height: 850 },
  { id: '20', imageUrl: 'https://picsum.photos/seed/a20/700/500', width: 700, height: 500 },
];

export async function GET() {
  // If we had a real PINTEREST_ACCESS_TOKEN, we'd fetch from Pinterest here.
  // We'll return the high-quality fallbacks for this implementation.
  return NextResponse.json({ pins: FALLBACK_PINS, fallback: true });
}
`);

fs.writeFileSync('components/gallery/GalleryImage.tsx', `"use client";
import { PinData } from '@/lib/pinterest/types';
import Image from 'next/image';

export function GalleryImage({ pin }: { pin: PinData }) {
  return (
    <div className="w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0" style={{ paddingBottom: \`\${(pin.height / pin.width) * 100}%\` }}>
      <Image
        src={pin.imageUrl}
        alt={pin.title || 'Moodboard Image'}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover absolute inset-0 w-full h-full"
        referrerPolicy="no-referrer"
        priority
      />
    </div>
  );
}
`);

fs.writeFileSync('components/gallery/InfiniteColumn.tsx', `"use client";
import { useEffect, useRef } from 'react';
import { PinData } from '@/lib/pinterest/types';
import { GalleryImage } from './GalleryImage';
import gsap from 'gsap';

export function InfiniteColumn({ pins, direction, speed, className = '' }: { pins: PinData[]; direction: 'up' | 'down'; speed: number; className?: string }) {
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = columnRef.current;
    if (!el || pins.length === 0) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      const duration = 40 / speed;

      if (direction === 'up') {
        gsap.set(el, { yPercent: 0 });
        tl.to(el, { yPercent: -33.333333, duration, ease: 'none' });
      } else {
        gsap.set(el, { yPercent: -33.333333 });
        tl.to(el, { yPercent: 0, duration, ease: 'none' });
      }
    }, columnRef);

    return () => ctx.revert();
  }, [pins, direction, speed]);

  const duplicatedPins = [...pins, ...pins, ...pins];

  return (
    <div className={\`relative h-full overflow-visible \${className}\`}>
      <div ref={columnRef} className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full absolute top-0 left-0 will-change-transform">
        {duplicatedPins.map((pin, idx) => (
          <GalleryImage key={\`\${pin.id}-\${idx}\`} pin={pin} />
        ))}
      </div>
    </div>
  );
}
`);

fs.writeFileSync('components/gallery/PinterestGallery.tsx', `"use client";
import { useEffect, useState } from 'react';
import { PinData } from '@/lib/pinterest/types';
import { InfiniteColumn } from './InfiniteColumn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function PinterestGallery() {
  const [pins, setPins] = useState<PinData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pinterest/pins').then(res => res.json()).then(data => {
      setPins(data.pins || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || pins.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);
    const speedProxy = { timeScale: 1 };
    
    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity() || 0);
        const targetTimeScale = 1 + Math.min(velocity / 300, 3);
        
        gsap.to(speedProxy, {
          timeScale: targetTimeScale,
          duration: 0.2,
          overwrite: true,
          onUpdate: () => gsap.globalTimeline.timeScale(speedProxy.timeScale)
        });
        
        gsap.to(speedProxy, {
          timeScale: 1,
          duration: 0.8,
          delay: 0.1,
          overwrite: 'auto',
          onUpdate: () => gsap.globalTimeline.timeScale(speedProxy.timeScale)
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.globalTimeline.timeScale(1);
    };
  }, [loading, pins.length]);

  if (loading) return <div className="h-[60vh] flex items-center justify-center text-sm text-neutral-400 animate-pulse">Loading gallery...</div>;
  if (pins.length === 0) return null;

  const cols: PinData[][] = [[], [], [], []];
  pins.forEach((pin, i) => cols[i % 4].push(pin));

  return (
    <div 
      className="w-full h-[65vh] sm:h-[75vh] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 overflow-hidden relative"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <InfiniteColumn pins={cols[0]} direction="up" speed={0.9} />
      <InfiniteColumn pins={cols[1]} direction="down" speed={1.0} />
      <InfiniteColumn pins={cols[2]} direction="up" speed={0.85} className="hidden md:flex" />
      <InfiniteColumn pins={cols[3]} direction="down" speed={0.95} className="hidden xl:flex" />
    </div>
  );
}
`);
