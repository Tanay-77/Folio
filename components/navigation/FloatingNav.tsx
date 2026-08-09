export function FloatingNav() {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-between gap-8 px-5 py-2 bg-neutral-100/80 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide text-neutral-900 border border-black/5">
        <span>Tanay&reg;</span>
        <span className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">≡</span>
      </div>
    </div>
  );
}
