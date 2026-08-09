import { FloatingNav } from '@/components/navigation/FloatingNav';
import { ExpandButton } from '@/components/navigation/ExpandButton';
import { PinterestGallery } from '@/components/gallery/PinterestGallery';

export default function Home() {
  return (
    <div className="h-[200vh] bg-white">
      <div className="sticky top-0 w-full h-screen font-sans">
        <main className="relative w-full h-full bg-white overflow-hidden flex flex-col items-center justify-between">
          <FloatingNav />
          <ExpandButton />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
             <h1 className="text-[25vw] md:text-[28vw] font-serif leading-none tracking-tighter text-[#0f0f0f] flex items-start">
               Folio
               <span className="text-[6vw] md:text-[7vw] mt-[4vw] md:mt-[3vw] ml-1 font-sans font-medium">®</span>
             </h1>
          </div>

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
