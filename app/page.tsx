
import { ExpandButton } from '@/components/navigation/ExpandButton';
import { PinterestGallery } from '@/components/gallery/PinterestGallery';
import { FolioText } from '@/components/gallery/FolioText';

export default function Home() {
  return (
    <div className="h-[600vh] bg-white">
      <div className="sticky top-0 w-full h-screen font-sans">
        <main className="relative w-full h-full bg-white overflow-hidden flex flex-col items-center justify-between">

          <ExpandButton />
          
          <FolioText />

          <div className="w-full h-full absolute inset-0 flex flex-col justify-center overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 z-30">
             <PinterestGallery />
          </div>
        </main>
      </div>
    </div>
  );
}
