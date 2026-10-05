"use client";

import { useState } from "react";

const FINISHES = [
  {
    id: "crimson",
    name: "Titanio Carmesí",
    gradient: "from-rose-500 via-red-600 to-red-700",
    glow: "rgba(225, 29, 72, 0.45)",
    badgeColor: "bg-red-500",
    svgFill: "#ef4444",
    svgSecondary: "#dc2626",
  },
  {
    id: "magenta",
    name: "Rosa Cósmico",
    gradient: "from-pink-500 via-rose-500 to-fuchsia-600",
    glow: "rgba(244, 63, 94, 0.45)",
    badgeColor: "bg-pink-500",
    svgFill: "#ec4899",
    svgSecondary: "#be185d",
  },
  {
    id: "violet",
    name: "Medianoche Violeta",
    gradient: "from-purple-500 via-indigo-600 to-purple-800",
    glow: "rgba(147, 51, 234, 0.45)",
    badgeColor: "bg-purple-600",
    svgFill: "#a855f7",
    svgSecondary: "#7e22ce",
  },
  {
    id: "gold",
    name: "Oro Solar",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    glow: "rgba(245, 158, 11, 0.45)",
    badgeColor: "bg-amber-400",
    svgFill: "#f59e0b",
    svgSecondary: "#ea580c",
  },
];

const MODES = [
  { label: "Calma", bpm: 60, desc: "Modo Zen y descanso reparador" },
  { label: "Pasión", bpm: 95, desc: "Ritmo perfecto del día a día" },
  { label: "Euforia", bpm: 140, desc: "Amor a primera vista y adrenalina" },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [currentBpm, setCurrentBpm] = useState(95);
  const [isLiked, setIsLiked] = useState(false);

  const beatDuration = (60 / currentBpm).toFixed(2);

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-700 selection:bg-red-500 selection:text-white ${
        isDark ? "bg-[#000000] text-zinc-100" : "bg-[#fbfbfd] text-zinc-900"
      }`}
    >
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.14); }
          28% { transform: scale(1); }
          42% { transform: scale(1.08); }
          70% { transform: scale(1); }
        }
        .apple-heartbeat {
          animation: heartbeat ${beatDuration}s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(0.95); }
          50% { opacity: 0.75; transform: scale(1.08); }
        }
        .glow-pulse {
          animation: pulseGlow ${beatDuration}s ease-in-out infinite;
        }
      `}</style>

      {/* Global Apple Navigation Bar */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
          isDark
            ? "bg-black/75 border-zinc-800/80 text-zinc-200"
            : "bg-white/80 border-zinc-200/80 text-zinc-800"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between text-xs tracking-tight">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1.5 font-semibold text-sm hover:opacity-80 transition">
              {/* Apple-styled Heart Logo */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Heart Pro</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-zinc-400">
              <a href="#overview" className="hover:text-zinc-100 transition">Visión general</a>
              <a href="#experience" className="hover:text-zinc-100 transition">Experiencia háptica</a>
              <a href="#tech" className="hover:text-zinc-100 transition">Bionic H2</a>
              <a href="#compare" className="hover:text-zinc-100 transition">Comparar</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-1.5 rounded-full border transition-all duration-300 ${
                isDark
                  ? "bg-zinc-900 border-zinc-700 text-amber-400 hover:bg-zinc-800"
                  : "bg-zinc-100 border-zinc-300 text-indigo-600 hover:bg-zinc-200"
              }`}
              title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              aria-label="Cambiar tema"
            >
              {isDark ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <a
              href="#buy"
              className="px-3.5 py-1 bg-red-600 hover:bg-red-500 text-white font-medium rounded-full text-xs transition shadow-sm"
            >
              Comprar
            </a>
          </div>
        </div>
      </header>

      {/* Sub-bar ribbon */}
      <div className={`py-2 text-center text-xs tracking-tight border-b transition-colors ${
        isDark ? "bg-zinc-900/60 border-zinc-800 text-zinc-400" : "bg-zinc-100/70 border-zinc-200 text-zinc-600"
      }`}>
        Obtén 3 meses gratis de <i>Apple Heart+</i> con tu compra. <a href="#buy" className="text-red-500 hover:underline">Comprar ahora &gt;</a>
      </div>

      {/* HERO SECTION */}
      <section id="overview" className="relative pt-20 pb-28 px-6 text-center overflow-hidden">
        {/* Glow ambient background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[130px] pointer-events-none transition-all duration-700 glow-pulse"
          style={{ backgroundColor: selectedFinish.glow }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500 mb-3">
            Nuevo lanzamiento
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            Corazón Pro.
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-zinc-400 mb-6">
            Diseñado para latir con una fuerza sobrehumana.
          </p>
          <p className="text-base sm:text-lg max-w-xl mx-auto text-zinc-500 mb-10 leading-relaxed">
            Estructura de titanio aeroespacial. Chip neuronal de sincronía emocional H2. 
            Y una pantalla biométrica que siente cada suspiro antes que tú.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-16">
            <a
              href="#buy"
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-medium transition shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95"
            >
              Comprar desde $999
            </a>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                isLiked
                  ? "bg-red-500/10 border-red-500 text-red-500"
                  : isDark
                  ? "border-zinc-700 text-zinc-300 hover:bg-zinc-900"
                  : "border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <span>{isLiked ? "Enamorado ♥" : "Guardar favorito"}</span>
            </button>
          </div>

          {/* INTERACTIVE HEART STAGE */}
          <div className="relative py-12 flex flex-col items-center justify-center">
            {/* Concentric soundwaves / magnetic rings */}
            <div className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed animate-spin transition-colors duration-700 ${
              isDark ? "border-zinc-800" : "border-zinc-300"
            }`} style={{ animationDuration: "35s" }} />
            <div className={`absolute w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full border border-zinc-500/20`} />

            {/* Main Interactive Heart */}
            <div
              onClick={() => setCurrentBpm((prev) => (prev >= 140 ? 60 : prev + 35))}
              className="relative cursor-pointer group"
              title="Haz clic para acelerar el ritmo"
            >
              <div className="apple-heartbeat transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  className="w-48 h-48 sm:w-60 sm:h-60 transition-all duration-700 drop-shadow-[0_20px_50px_var(--glow)]"
                  style={{
                    filter: `drop-shadow(0 0 45px ${selectedFinish.glow})`,
                  }}
                >
                  <defs>
                    <linearGradient id="appleHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={selectedFinish.svgFill} />
                      <stop offset="100%" stopColor={selectedFinish.svgSecondary} />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#appleHeartGrad)"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </div>

              {/* Pulsing Core Info Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-white drop-shadow-md">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter">
                  {currentBpm}
                </span>
                <span className="text-[10px] uppercase tracking-widest opacity-80 font-semibold">
                  BPM LIVE
                </span>
              </div>
            </div>

            {/* Real-time ECG Graph Wave */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <svg className="w-44 h-8 text-red-500 overflow-visible" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path
                  d="M0 20 L40 20 L55 20 L65 5 L75 35 L85 10 L95 25 L105 20 L150 20 L160 8 L170 32 L180 20 L200 20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-80"
                />
              </svg>
              <span className="text-xs font-mono text-zinc-400">
                Sincronizado a {beatDuration}s/latido
              </span>
            </div>

            {/* Controls: Finish selector & Rhythm mode */}
            <div className={`mt-10 p-4 rounded-3xl backdrop-blur-lg border flex flex-col sm:flex-row items-center gap-6 transition-colors ${
              isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white/70 border-zinc-200 shadow-lg shadow-zinc-200/50"
            }`}>
              {/* Color finishes */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Acabado: {selectedFinish.name}
                </span>
                <div className="flex items-center gap-2.5">
                  {FINISHES.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      className={`w-7 h-7 rounded-full transition-all duration-300 ${finish.badgeColor} ${
                        selectedFinish.id === finish.id
                          ? "ring-2 ring-offset-2 ring-red-500 scale-110"
                          : "opacity-70 hover:opacity-100"
                      } ${isDark ? "ring-offset-black" : "ring-offset-white"}`}
                      aria-label={finish.name}
                    />
                  ))}
                </div>
              </div>

              <div className={`h-8 w-px hidden sm:block ${isDark ? "bg-zinc-800" : "bg-zinc-300"}`} />

              {/* BPM Selector Modes */}
              <div className="flex flex-col items-center sm:items-start gap-2">
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Ritmo Cardíaco
                </span>
                <div className="flex items-center gap-2">
                  {MODES.map((mode) => (
                    <button
                      key={mode.bpm}
                      onClick={() => setCurrentBpm(mode.bpm)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        currentBpm === mode.bpm
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                          : isDark
                          ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                      }`}
                    >
                      {mode.label} ({mode.bpm})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLE BENTO GRID: REVOLUTIONARY SPECS */}
      <section id="tech" className={`py-24 px-6 border-t transition-colors ${
        isDark ? "bg-zinc-950/50 border-zinc-800" : "bg-zinc-50 border-zinc-200"
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500 mb-2">
              Ingeniería Emocional
            </h2>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Poder que puedes sentir en el pecho.
            </p>
            <p className="text-zinc-500 text-base">
              Cada componente ha sido calibrado milimétricamente para entregar el latido más puro de la industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Large feature */}
            <div className={`md:col-span-2 p-8 sm:p-10 rounded-3xl border flex flex-col justify-between overflow-hidden relative transition-all ${
              isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <div className="relative z-10 max-w-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                  Microarquitectura H2 Bionic
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2 mb-4">
                  100,000 latidos diarios. Sin interrupciones.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  El nuevo motor neuronal procesa emociones a la velocidad de la luz. Ajusta el flujo cardíaco instantáneamente según la música que escuchas o la persona que tienes frente a ti.
                </p>
                <div className="flex items-center gap-6 text-xs text-zinc-400 font-mono">
                  <div>
                    <span className="block text-xl font-bold text-red-500">+40%</span>
                    <span>Sensibilidad háptica</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-red-500">0.02ms</span>
                    <span>Latencia de respuesta</span>
                  </div>
                </div>
              </div>

              {/* Decorative graphic */}
              <div className="mt-8 flex justify-end">
                <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-red-600/30 to-rose-400/10 blur-xl absolute -bottom-10 -right-10 pointer-events-none" />
                <div className="relative p-6 rounded-2xl border border-zinc-700/40 bg-black/40 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono font-medium text-emerald-400">Ritmo Sinusal Óptimo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Titanium Body */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
              isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                  Materiales
                </span>
                <h3 className="text-2xl font-bold tracking-tight mt-2 mb-3">
                  Titanio Grado 5.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Forjado con la misma aleación usada en naves espaciales. Ultraligero, resistente a la corrosión y biocompatible al 100%.
                </p>
              </div>

              <div className="mt-8 py-6 text-center">
                <span className="text-5xl font-black tracking-tighter bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                  Ti-6Al-4V
                </span>
                <p className="text-xs text-zinc-500 mt-2 font-mono">Estructura indestructible</p>
              </div>
            </div>

            {/* Bento Card 3: Dynamic Sync */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
              isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                  Resonancia
                </span>
                <h3 className="text-2xl font-bold tracking-tight mt-2 mb-3">
                  Sincronía Dual.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Une dos corazones a distancia con ShareHeart. Siente el latido de esa persona especial en tiempo real en tu pecho.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 text-sm">
                  ♥
                </div>
                <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-rose-500 animate-pulse" />
                <div className="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-sm">
                  ♥
                </div>
              </div>
            </div>

            {/* Bento Card 4: Battery & Life */}
            <div className={`md:col-span-2 p-8 sm:p-10 rounded-3xl border flex flex-col justify-between transition-all ${
              isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
            }`}>
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                  Batería Cinética
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2 mb-3">
                  Autonomía infinita impulsada por tu propia vida.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Se recarga automáticamente con cada paso, respiración y emoción. Diseñado para acompañarte más de 100 años sin necesidad de enchufes.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-4 rounded-md border-2 border-emerald-500 p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-500 rounded-sm" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-400">Carga al 100% perpetua</span>
                </div>
                <span className="text-xs text-zinc-500">Certificación Carbono Cero</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLE COMPARISON SECTION */}
      <section id="compare" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.25em] font-semibold text-red-500 mb-2">
            Elige tu modelo
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight">
            ¿Cuál es el corazón ideal para ti?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Heart SE */}
          <div className={`p-8 rounded-3xl border text-center flex flex-col justify-between transition-all ${
            isDark ? "bg-zinc-900/30 border-zinc-800" : "bg-white border-zinc-200"
          }`}>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 text-zinc-400">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Corazón SE</h3>
              <p className="text-xs text-zinc-500 mt-1">Todo lo esencial. A un latido accesible.</p>
              <p className="text-2xl font-bold mt-4">$499</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-400 text-left border-t pt-6 border-zinc-800">
                <li className="flex items-center gap-2">✓ Caja de aluminio reciclado</li>
                <li className="flex items-center gap-2">✓ Chip H1 Emotion</li>
                <li className="flex items-center gap-2">✓ Sensor de pulso estándar</li>
                <li className="flex items-center gap-2 text-zinc-600">✕ Sin sincronía a distancia</li>
              </ul>
            </div>

            <button className="mt-8 w-full py-2.5 rounded-full border border-zinc-600 hover:bg-zinc-800 text-xs font-semibold transition">
              Seleccionar
            </button>
          </div>

          {/* Heart Pro (Featured) */}
          <div className={`p-8 rounded-3xl border-2 border-red-500 text-center flex flex-col justify-between relative shadow-xl shadow-red-500/10 transition-all ${
            isDark ? "bg-zinc-900/80" : "bg-white"
          }`}>
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-600 text-[10px] font-bold uppercase tracking-wider text-white rounded-full">
              Más popular
            </span>
            <div>
              <div className="w-14 h-14 mx-auto mb-4 text-red-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Corazón Pro</h3>
              <p className="text-xs text-zinc-500 mt-1">El equilibrio definitivo de arte e innovación.</p>
              <p className="text-2xl font-bold mt-4">$999</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-300 text-left border-t pt-6 border-zinc-800">
                <li className="flex items-center gap-2">✓ Caja de titanio aeroespacial</li>
                <li className="flex items-center gap-2">✓ Chip H2 Bionic Neural</li>
                <li className="flex items-center gap-2">✓ ShareHeart sincronía remota</li>
                <li className="flex items-center gap-2">✓ Cristal de zafiro irrompible</li>
              </ul>
            </div>

            <button className="mt-8 w-full py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition shadow-md shadow-red-600/30">
              Comprar Pro
            </button>
          </div>

          {/* Heart Ultra */}
          <div className={`p-8 rounded-3xl border text-center flex flex-col justify-between transition-all ${
            isDark ? "bg-zinc-900/30 border-zinc-800" : "bg-white border-zinc-200"
          }`}>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 text-amber-500">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Corazón Ultra</h3>
              <p className="text-xs text-zinc-500 mt-1">Para emociones extremas y atletas del amor.</p>
              <p className="text-2xl font-bold mt-4">$1,499</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-400 text-left border-t pt-6 border-zinc-800">
                <li className="flex items-center gap-2">✓ Doble cámara de bombeo hiperbárico</li>
                <li className="flex items-center gap-2">✓ Resistencia a 200 BPM continuo</li>
                <li className="flex items-center gap-2">✓ Botón de Acción Háptica naranja</li>
                <li className="flex items-center gap-2">✓ Antena satelital de emergencia</li>
              </ul>
            </div>

            <button className="mt-8 w-full py-2.5 rounded-full border border-zinc-600 hover:bg-zinc-800 text-xs font-semibold transition">
              Seleccionar
            </button>
          </div>
        </div>
      </section>

      {/* CTA PRE-ORDER SECTION */}
      <section id="buy" className={`py-24 px-6 text-center border-t transition-colors ${
        isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-100 border-zinc-200"
      }`}>
        <div className="max-w-2xl mx-auto">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-500 mx-auto mb-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Siente el futuro hoy.
          </h2>
          <p className="text-zinc-500 text-base mb-8">
            Envío gratis. Devoluciones en 14 días. Configuración personalizada de latidos en tienda.
          </p>
          <button className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-medium rounded-full text-base transition shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95">
            Reservar Corazón Pro ahora
          </button>
        </div>
      </section>

      {/* APPLE STYLE FOOTER */}
      <footer className={`py-12 px-6 text-[11px] leading-relaxed border-t transition-colors ${
        isDark ? "bg-black border-zinc-900 text-zinc-500" : "bg-zinc-50 border-zinc-200 text-zinc-500"
      }`}>
        <div className="max-w-5xl mx-auto space-y-4">
          <p>
            1. La duración de la batería se basa en una estimación de 100 años con un ritmo promedio de 75 BPM. Los resultados reales pueden variar según el nivel de amor, emociones intensas y ejercicios aeróbicos.
          </p>
          <p>
            2. ShareHeart requiere ambos dispositivos actualizados a HeartOS 2.0 o superior con conexión a red neuronal activa.
          </p>
          <div className="border-t border-zinc-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Copyright © 2025 Heart Inc. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="#" className="hover:underline">Privacidad</a>
              <a href="#" className="hover:underline">Ventas y Reembolsos</a>
              <a href="#" className="hover:underline">Legal</a>
              <a href="#" className="hover:underline">Mapa del sitio</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
