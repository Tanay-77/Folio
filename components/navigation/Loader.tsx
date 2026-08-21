"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch images for the loader animation
    fetch('/api/pinterest/pins')
      .then(res => res.json())
      .then(data => {
        if (data.pins && data.pins.length > 0) {
          // Get up to 10 images for the smooth sequence
          setImages(data.pins.slice(0, 10).map((pin: any) => pin.imageUrl));
        }
      })
      .catch(err => console.error("Failed to load loader images", err));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (images.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 800); // Slower interval for smooth transitions
    }
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
        },
      });

      tl.to({ val: 0 }, {
        val: 100,
        duration: 3, // slightly longer to enjoy the smooth images
        ease: "power3.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      });

      tl.to(
        [contentRef.current, progressRef.current],
        {
          y: -50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.inOut",
        },
        "+=0.2"
      );

      tl.to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 1.4,
          ease: "expo.inOut",
        },
        "-=0.6"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-[#f3f3f3]"
    >
      <div ref={contentRef} className="flex flex-col items-center justify-center">

        {/* Smooth Image Crossfade Container */}
        <div className="w-48 h-64 md:w-72 md:h-[350px] mb-10 relative overflow-hidden bg-[#111] flex items-center justify-center rounded-sm shadow-2xl">
          {images.length > 0 ? (
            images.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt="Loading..."
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-in-out ${idx === currentImageIndex
                  ? 'opacity-100 scale-105'
                  : 'opacity-0 scale-100'
                  }`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-[#1a1a1a] animate-pulse" />
          )}
        </div>

        <h1 className="text-[12vw] md:text-[6vw] font-serif leading-none tracking-tighter flex items-start">
          Tanay
          <span className="text-[4vw] md:text-[2vw] mt-[0.5vw] ml-1 font-sans font-medium">®</span>
        </h1>
        <div className="mt-4 text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-500">
          Photography Portfolio
        </div>
      </div>

      <div
        ref={progressRef}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[15vw] md:text-[8vw] font-serif tabular-nums leading-none flex items-baseline"
      >
        {progress}
        <span className="text-[5vw] md:text-[2vw] ml-2 text-gray-500 font-sans">%</span>
      </div>
    </div>
  );
}
