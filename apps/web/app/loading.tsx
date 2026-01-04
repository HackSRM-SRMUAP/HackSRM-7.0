import GlitchText from "@/components/effects/GlitchText";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="border-2 border-red-600 bg-black/85 px-4 py-3 shadow-[0_0_16px_rgba(255,0,0,0.65)]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-6 bg-red-600 animate-blink" />
            <GlitchText text="SYSTEM INITIALIZING" className="text-rose-500 font-bold text-lg glow-text" />
          </div>
          <div className="mt-3 text-sm text-[#33ff00] glow-text">Loading HACKSRM 7.0. Please wait.</div>
          <div className="mt-3 h-3 bg-[#111] border border-gray-700">
            <div className="h-full w-2/3 bg-red-600 animate-pulse" />
          </div>
        </div>
        <div className="h-2 bg-[repeating-linear-gradient(135deg,rgba(255,0,0,1)_0px,rgba(255,0,0,1)_10px,transparent_10px,transparent_20px)]" />
      </div>
    </div>
  );
}
