"use client";
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

  if (loading) return <div className="h-[60vh] flex items-center justify-center text-sm text-neutral-400 animate-pulse">Loading gallery...</div>;
  if (pins.length === 0) return null;

  const cols: PinData[][] = [[], [], [], []];
  pins.forEach((pin, i) => cols[i % 4].push(pin));

  return (
    <div 
      className="w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 overflow-hidden relative z-10"
    >
      <InfiniteColumn pins={cols[0]} direction="up" speed={0.9} />
      <InfiniteColumn pins={cols[1]} direction="down" speed={1.0} />
      <InfiniteColumn pins={cols[2]} direction="up" speed={0.85} className="hidden md:flex" />
      <InfiniteColumn pins={cols[3]} direction="down" speed={0.95} className="hidden xl:flex" />
    </div>
  );
}
