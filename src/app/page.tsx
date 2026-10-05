"use client";

import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  return (
    <main
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden select-none transition-colors duration-500 ${
        isDark ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-900"
      }`}
    >
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

      {/* Theme Switcher Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 shadow-sm backdrop-blur-md cursor-pointer ${
            isDark
              ? "bg-zinc-900/80 border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700"
              : "bg-white/80 border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 shadow-zinc-200"
          }`}
          aria-label="Cambiar tema"
        >
          {isDark ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-amber-400"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <span>Modo Claro</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-indigo-500"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <span>Modo Oscuro</span>
            </>
          )}
        </button>
      </div>

      {/* Ambient glow */}
      <div
        className={`absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isDark ? "bg-red-600/15" : "bg-red-400/25"
        }`}
      />

      {/* Heart */}
      <div className="relative flex items-center justify-center heart-beat cursor-pointer transition-transform hover:brightness-110">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-36 h-36 text-red-500 transition-all duration-500 ${
            isDark
              ? "drop-shadow-[0_0_35px_rgba(239,68,68,0.6)]"
              : "drop-shadow-[0_12px_30px_rgba(239,68,68,0.35)]"
          }`}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </main>
  );
}
