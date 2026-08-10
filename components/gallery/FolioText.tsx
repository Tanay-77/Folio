"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function FolioText() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !scrollRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      gsap.to([textRef.current, scrollRef.current], {
        opacity: 0,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=800', // Fades out completely after 800px of scrolling
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 
          ref={textRef}
          className="text-[25vw] md:text-[28vw] font-serif leading-none tracking-tighter text-[#0f0f0f] flex items-start will-change-transform"
        >
          Folio
          <span className="text-[6vw] md:text-[7vw] mt-[4vw] md:mt-[3vw] ml-1 font-sans font-medium">®</span>
        </h1>
      </div>
      <div ref={scrollRef} className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-center text-xs tracking-widest uppercase text-black/60 z-10 font-medium pointer-events-none">
        Scroll Down
        <div className="mt-2 text-[10px] animate-bounce">↓</div>
      </div>
    </>
  );
}
