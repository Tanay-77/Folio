export function FloatingNav() {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-between w-[280px] px-6 py-3 bg-black/25 backdrop-blur-xl rounded-full text-[13px] font-semibold tracking-wide text-white border border-white/10 shadow-lg">
        <span>Tanay&reg;</span>
        <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-lg leading-none mb-0.5">=</span>
      </div>
    </div>
  );
}
