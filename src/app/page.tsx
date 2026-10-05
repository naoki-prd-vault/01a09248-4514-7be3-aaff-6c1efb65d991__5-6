export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden select-none">
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.18); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
          60% { transform: scale(1); }
        }
        .heart-beat {
          animation: heartbeat 1.4s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Heart */}
      <div className="relative flex items-center justify-center heart-beat cursor-pointer transition-transform hover:brightness-110">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-36 h-36 text-red-500 drop-shadow-[0_0_35px_rgba(239,68,68,0.6)]"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </main>
  );
}
