export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <h1 className="text-5xl font-extrabold text-white animate-pulse drop-shadow-lg tracking-widest">
        <span className="text-fuchsia-500 animate-shimmer">Ag3nt</span>
      </h1>
      <style>{`
        @keyframes shimmer {
          0% { filter: brightness(1); }
          50% { filter: brightness(2); text-shadow: 0 0 24px #d946ef, 0 0 48px #a21caf; }
          100% { filter: brightness(1); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
