"use client";
import { PinData } from '@/lib/pinterest/types';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export function GalleryImage({ pin }: { pin: PinData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  return (
    <>
      <div 
        className="w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0 cursor-pointer group"
        onClick={() => setIsExpanded(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pin.imageUrl}
          alt={pin.title || 'Portfolio Image'}
          className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 z-10 pointer-events-none"
            >
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-pointer pointer-events-auto"
                onClick={() => setIsExpanded(false)}
              />
              
              {/* Modal Content - Invisible Wrapper */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none z-10"
              >
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-2 right-2 sm:top-6 sm:right-6 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-20 pointer-events-auto"
                >
                  <X size={18} />
                </button>
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pin.imageUrl}
                  alt={pin.title || 'Portfolio Image'}
                  className="w-full h-full object-contain drop-shadow-2xl pointer-events-auto rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
