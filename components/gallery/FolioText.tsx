"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function FolioText() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        opacity: 0,
        filter: 'blur(20px)',
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <h1 
        ref={textRef}
        className="text-[25vw] md:text-[28vw] font-serif leading-none tracking-tighter text-[#0f0f0f] flex items-start will-change-transform"
      >
        Folio
        <span className="text-[6vw] md:text-[7vw] mt-[4vw] md:mt-[3vw] ml-1 font-sans font-medium">®</span>
      </h1>
    </div>
  );
}
