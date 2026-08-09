"use client";
import { PinData } from '@/lib/pinterest/types';
import Image from 'next/image';

export function GalleryImage({ pin }: { pin: PinData }) {
  return (
    <div className="w-full relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0" style={{ paddingBottom: `${(pin.height / pin.width) * 100}%` }}>
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
