"use client";
import { PinData } from '@/lib/pinterest/types';
import Image from 'next/image';

export function GalleryImage({ pin }: { pin: PinData }) {
  return (
    <div className="w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pin.imageUrl}
        alt={pin.title || 'Portfolio Image'}
        className="w-full h-auto block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
