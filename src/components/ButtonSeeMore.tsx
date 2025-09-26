import { ChevronsDown, ChevronsUp } from "lucide-react";

export default function ButtonSeeMore({ showAll }: { showAll: boolean }) {
  return (
    <button
      className="relative group px-12 py-4 text-lg font-semibold rounded-full
                 bg-gradient-to-b from-cyan-400 to-cyan-600 text-white
                 border border-cyan-300
                 shadow-[0_4px_10px_rgba(0,0,0,0.4),0_0_25px_rgba(0,200,255,0.7),inset_0_2px_6px_rgba(255,255,255,0.3)]
                 hover:from-cyan-300 hover:to-cyan-500 hover:border-cyan-200
                 hover:shadow-[0_6px_15px_rgba(0,0,0,0.6),0_0_40px_rgba(0,200,255,1),inset_0_3px_8px_rgba(255,255,255,0.4)]
                 hover:scale-[1.06] active:scale-[0.95]
                 transition-all duration-300 flex items-center gap-2"
    >
      {/* Highlight kaca atas */}
      <span
        className="absolute top-0 left-0 w-full h-1/2 rounded-full 
                       bg-white/20 blur-md opacity-40"
      />

      {/* Content */}
      <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        {showAll ? "Lihat Sedikit" : "Lihat Semua"}
      </span>
      {showAll ? (
        <ChevronsUp className="relative z-10 w-5 h-5 text-white" />
      ) : (
        <ChevronsDown className="relative z-10 w-5 h-5 text-white" />
      )}
    </button>
  );
}
