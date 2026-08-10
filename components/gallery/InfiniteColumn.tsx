"use client";
import { useEffect, useRef } from 'react';
import { PinData } from '@/lib/pinterest/types';
import { GalleryImage } from './GalleryImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function InfiniteColumn({ pins, direction, speed, className = '' }: { pins: PinData[]; direction: 'up' | 'down'; speed: number; className?: string }) {
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = columnRef.current;
    if (!el || pins.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Adjusted the multiplier to match the new 600vh page height (so speed feels similar)
      const targetY = -45 * speed;

      if (direction === 'up') {
        gsap.fromTo(el,
          { y: '100vh', yPercent: 0 },
          {
            y: '0vh',
            yPercent: targetY,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            }
          }
        );
      } else {
        gsap.fromTo(el,
          { y: '0vh', yPercent: -100 },
          {
            y: '100vh',
            yPercent: -100 - targetY,
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            }
          }
        );
      }
    }, columnRef);

    return () => ctx.revert();
  }, [pins, direction, speed]);

  // Duplicate the pins enough times to span a very long scroll without running out
  const duplicatedPins = [...pins, ...pins, ...pins, ...pins, ...pins, ...pins, ...pins, ...pins, ...pins, ...pins];

  return (
    <div className={`relative h-full overflow-visible ${className}`}>
      <div ref={columnRef} className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full absolute top-0 left-0 will-change-transform">
        {duplicatedPins.map((pin, idx) => (
          <GalleryImage key={`${pin.id}-${idx}`} pin={pin} />
        ))}
      </div>
    </div>
  );
}
