import { FloatingNav } from '@/components/navigation/FloatingNav';
import { ExpandButton } from '@/components/navigation/ExpandButton';
import { PinterestGallery } from '@/components/gallery/PinterestGallery';
import { FolioText } from '@/components/gallery/FolioText';

export default function Home() {
  return (
    <div className="h-[200vh] bg-white">
      <div className="sticky top-0 w-full h-screen font-sans">
        <main className="relative w-full h-full bg-white overflow-hidden flex flex-col items-center justify-between">
          <FloatingNav />
          <ExpandButton />
          
          <FolioText />

          <div className="w-full h-full absolute inset-0 flex flex-col justify-center overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 z-10">
             <PinterestGallery />
          </div>

          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-center text-xs tracking-widest uppercase text-black/60 z-10 font-medium">
            Scroll Down
            <div className="mt-2 text-[10px] animate-bounce">↓</div>
          </div>
        </main>
      </div>
    </div>
  );
}
