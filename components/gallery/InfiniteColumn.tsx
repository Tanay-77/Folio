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
      // Reduce the base multiplier from 33.33 to 15 to slow down the parallax scrolling distance
      const targetY = -15 * speed;

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
            yPercent: -100 - targetY, // targetY is negative, so this is -100 - (-33.33) = -66.66 
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

  const duplicatedPins = [...pins, ...pins, ...pins];

  return (
    <div className={`relative h-full overflow-visible ${className}`}>
      <div ref={columnRef} className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full absolute top-0 left-0 will-change-transform">
        {duplicatedPins.map((pin, idx) => (
          <GalleryImage key={`${pin.id}-${idx}`} pin={pin} />
        ))}
      </div>
    </div>
  );
}
