"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function FolioText() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!textRef.current || !scrollRef.current || !bgRef.current || !fgRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Instantly hide the entire hero section on scroll
      gsap.to([textRef.current, scrollRef.current, bgRef.current, fgRef.current], {
        opacity: 0,
        scrollTrigger: {
          trigger: document.body,
          start: 'top -150px', // Wait until scrolled 150px before fading
          end: '+=200', // Smooth fade out behind the images
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Background Image (Sky/Back) */}
      <img
        ref={bgRef}
        src="/image copy.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Text Layer (Middle) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1
          ref={textRef}
          className="text-[25vw] md:text-[28vw] font-serif leading-none tracking-tighter text-white drop-shadow-2xl flex items-start will-change-transform mb-[10vh]"
        >
          Folio
          <span className="text-[6vw] md:text-[7vw] mt-[4vw] md:mt-[3vw] ml-1 font-sans font-medium">®</span>
        </h1>
      </div>

      {/* Foreground Masking Image */}
      <img
        ref={fgRef}
        src="/forground.png"
        alt="Foreground Mask"
        className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
      />

      <div ref={scrollRef} className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-center text-xs tracking-widest uppercase text-white drop-shadow-md z-30 font-medium pointer-events-none">
        Scroll Down
        <div className="mt-2 text-[10px]">↓</div>
      </div>
    </>
  );
}
