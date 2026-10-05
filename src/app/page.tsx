"use client";

import { useState, useEffect, useRef } from "react";

const WINE_FINISHES = [
  {
    id: "borgona",
    name: "Borgoña Imperial",
    edition: "Grand Cru • 1889",
    desc: "Titanio cepillado con tinte de vino tinto profundo",
    hex: "#6b1124",
    glow: "rgba(107, 17, 36, 0.7)",
    gradient: "from-[#8a1831] via-[#5c0b1c] to-[#2d050d]",
    border: "border-rose-900/60",
    badge: "bg-[#6b1124]",
    svgGradStart: "#a31d3d",
    svgGradEnd: "#450613",
  },
  {
    id: "rubi-noir",
    name: "Rubí Nocturno",
    edition: "Zafiro Negro & Granate",
    desc: "Zafiro ahumado con destellos granate intenso",
    hex: "#8b152d",
    glow: "rgba(139, 21, 45, 0.75)",
    gradient: "from-[#b81d3d] via-[#750d22] to-[#36040e]",
    border: "border-red-900/60",
    badge: "bg-[#8b152d]",
    svgGradStart: "#cf2b50",
    svgGradEnd: "#520716",
  },
  {
    id: "velvet-black",
    name: "Terciopelo Noir",
    edition: "Obsidiana Pura",
    desc: "Negro obsidiana con reflejos vino y sombra de cava",
    hex: "#3b0713",
    glow: "rgba(70, 10, 24, 0.65)",
    gradient: "from-[#4f0918] via-[#24030a] to-[#0d0104]",
    border: "border-rose-950/80",
    badge: "bg-[#3b0713]",
    svgGradStart: "#6b1023",
    svgGradEnd: "#1a0206",
  },
  {
    id: "rose-champagne",
    name: "Cava & Ciruela",
    edition: "Oro Rosé Vintage",
    desc: "Aleación pulida de oro rosa y vino añejo",
    hex: "#962b46",
    glow: "rgba(150, 43, 70, 0.65)",
    gradient: "from-[#b93958] via-[#781e35] to-[#3e0c19]",
    border: "border-pink-900/60",
    badge: "bg-[#962b46]",
    svgGradStart: "#dc4b70",
    svgGradEnd: "#5c1325",
  },
];

const RHYTHMS = [
  { label: "Susurro", bpm: 58, desc: "Reposo sereno y elegancia en calma" },
  { label: "Deseo", bpm: 88, desc: "La cadencia sensual del encuentro" },
  { label: "Fervor", bpm: 132, desc: "Pasión desbordada a flor de piel" },
];

export default function Home() {
  const [finish, setFinish] = useState(WINE_FINISHES[0]);
  const [bpm, setBpm] = useState(88);
  const [reserved, setReserved] = useState(false);

  // TAP TEMPO / BPM METER STATE
  const [tapTimestamps, setTapTimestamps] = useState<number[]>([]);
  const [tapStatus, setTapStatus] = useState<string>("Toca para medir");
  const [tapFlash, setTapFlash] = useState<boolean>(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const beatSpeed = (60 / bpm).toFixed(2);

  // Handle click on heart or sensor pad to calculate BPM
  const handleTap = () => {
    const now = Date.now();

    // Trigger visual flash
    setTapFlash(true);
    setTimeout(() => setTapFlash(false), 140);

    // Clear auto-reset timer
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    setTapTimestamps((prev) => {
      // If last tap was more than 3 seconds ago, start fresh
      const lastTap = prev[prev.length - 1];
      const isFresh = !lastTap || now - lastTap > 3000;
      const updated = isFresh ? [now] : [...prev, now];

      if (updated.length === 1) {
        setTapStatus("Toca de nuevo para calcular...");
      } else {
        // Calculate rolling average interval between consecutive taps
        const intervals: number[] = [];
        for (let i = 1; i < updated.length; i++) {
          intervals.push(updated[i] - updated[i - 1]);
        }
        // Take up to last 8 intervals for smooth precision
        const recentIntervals = intervals.slice(-8);
        const avgInterval = recentIntervals.reduce((a, b) => a + b, 0) / recentIntervals.length;

        if (avgInterval > 0) {
          const calculated = Math.round(60000 / avgInterval);
          const clamped = Math.min(220, Math.max(40, calculated));
          setBpm(clamped);
          setTapStatus(`${updated.length} pulsos • ${clamped} BPM detectados`);
        }
      }

      return updated;
    });

    // Reset session message after 3.5 seconds of inactivity
    resetTimerRef.current = setTimeout(() => {
      setTapStatus("Toca para medir");
      setTapTimestamps([]);
    }, 3500);
  };

  const handleResetBpm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTapTimestamps([]);
    setBpm(88);
    setTapStatus("Restablecido a 88 BPM");
  };

  // Rhythm classification label
  const getBpmClassification = (val: number) => {
    if (val < 62) return "Cadencia Serena • Calma Meditativa";
    if (val <= 85) return "Pulso Óptimo • Seducción Silenciosa";
    if (val <= 110) return "Atracción • Deseo Creciente";
    if (val <= 140) return "Fervor • Pasión Intensa";
    return "Éxtasis • Amor a Primera Vista";
  };

  return (
    <div className="min-h-screen bg-[#030204] text-zinc-100 selection:bg-[#721224] selection:text-white font-sans-luxury overflow-x-hidden antialiased">
      <style>{`
        @keyframes sexyBeat {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 35px ${finish.glow});
          }
          14% {
            transform: scale(1.15) rotate(-0.5deg);
            filter: drop-shadow(0 0 70px ${finish.glow});
          }
          28% {
            transform: scale(1.02);
            filter: drop-shadow(0 0 45px ${finish.glow});
          }
          42% {
            transform: scale(1.1) rotate(0.5deg);
            filter: drop-shadow(0 0 60px ${finish.glow});
          }
          65% {
            transform: scale(1);
            filter: drop-shadow(0 0 35px ${finish.glow});
          }
        }
        .sensual-heartbeat {
          animation: sexyBeat ${beatSpeed}s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
        }
        @keyframes auraBreath {
          0%, 100% { opacity: 0.35; transform: scale(0.95); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        .aura-breathing {
          animation: auraBreath ${beatSpeed}s ease-in-out infinite;
        }
      `}</style>

      {/* LUXURY FROSTED NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#030204]/80 backdrop-blur-2xl border-b border-[#2d0a14]/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-xs">
          <div className="flex items-center gap-10">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#8a1831] group-hover:text-[#cf2b50] transition-colors drop-shadow-[0_0_10px_rgba(207,43,80,0.8)]">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="font-cinzel text-sm tracking-[0.25em] font-medium text-white">
                HEART <span className="font-serif-luxury italic text-base text-[#cf2b50] font-normal tracking-normal">Atelier</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-[11px] font-cinzel tracking-[0.2em] text-zinc-400">
              <a href="#medidor" className="hover:text-rose-200 transition-colors">MEDIDOR BPM</a>
              <a href="#anatomia" className="hover:text-rose-200 transition-colors">ANATOMÍA</a>
              <a href="#artesania" className="hover:text-rose-200 transition-colors">ARTESANÍA</a>
              <a href="#reserva" className="hover:text-rose-200 transition-colors">ATELIER PRIVÉ</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[10px] font-cinzel text-zinc-500 tracking-[0.3em]">
              ÉDITION VINTAGE
            </span>
            <a
              href="#reserva"
              className="px-5 py-2 rounded-full text-[11px] font-cinzel tracking-[0.2em] uppercase font-medium bg-gradient-to-r from-[#7a1228] to-[#450814] text-rose-100 hover:text-white border border-[#9e1c3a]/50 shadow-[0_0_20px_rgba(122,18,40,0.5)] hover:shadow-[0_0_30px_rgba(207,43,80,0.7)] transition-all duration-300"
            >
              Encargar Pieza
            </a>
          </div>
        </div>
      </header>

      {/* AMBIENT VELVET BACKLIGHT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[170px] aura-breathing transition-all duration-1000"
          style={{ background: `radial-gradient(circle, ${finish.glow} 0%, rgba(10,2,5,0) 70%)` }}
        />
        <div className="absolute -bottom-40 left-1/4 w-[550px] h-[550px] rounded-full bg-[#3d0611]/35 blur-[190px]" />
        <div className="absolute -top-40 right-10 w-[500px] h-[500px] rounded-full bg-[#520918]/30 blur-[170px]" />
      </div>

      {/* HERO SECTION WITH INTERACTIVE TAP TEMPO */}
      <section id="medidor" className="relative z-10 pt-20 pb-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#5c0e20]/60 bg-[#140307]/80 backdrop-blur-md mb-8 shadow-[0_0_25px_rgba(92,14,32,0.35)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cf2b50] animate-pulse" />
            <span className="font-cinzel text-[10px] uppercase tracking-[0.32em] font-semibold text-rose-200">
              Sensor Biométrico Activo • Haz Clic para Medir
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="font-serif-luxury text-6xl sm:text-8xl lg:text-9xl font-light tracking-tight text-white mb-6 leading-[0.95]">
            Corazón{" "}
            <span className="italic font-normal bg-gradient-to-r from-rose-200 via-[#e05377] to-[#8a1831] bg-clip-text text-transparent">
              Pro Noir
            </span>
          </h1>

          <p className="font-serif-luxury italic text-2xl sm:text-3xl lg:text-4xl font-normal text-rose-100/80 max-w-2xl mx-auto mb-4 tracking-tight leading-snug">
            "Sincroniza el latido con cada clic de tus dedos."
          </p>

          <p className="font-sans-luxury text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-10 font-light tracking-wide leading-relaxed">
            Haz clic repetidamente al compás de tu respiración, emoción o música para calibrar la frecuencia de latidos en tiempo real.
          </p>

          {/* SCULPTED LUXURY HEART VESSEL (CLICKABLE TAP TARGET) */}
          <div className="relative py-8 flex flex-col items-center justify-center">
            {/* Fine Astronomical/Compass Rings */}
            <div
              className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full border border-[#420a16]/40 animate-spin pointer-events-none"
              style={{ animationDuration: "55s" }}
            />
            <div className="absolute w-64 h-64 sm:w-88 sm:h-88 rounded-full border border-dashed border-[#570d1e]/30 pointer-events-none" />

            {/* Ripple wave when tapped */}
            {tapFlash && (
              <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full border-2 border-[#cf2b50] animate-ping pointer-events-none" />
            )}

            {/* The Heart (Clickable) */}
            <div
              onClick={handleTap}
              className={`relative cursor-pointer group p-6 select-none transition-transform duration-150 active:scale-95 ${
                tapFlash ? "scale-105" : ""
              }`}
              title="¡Haz clic repetidas veces aquí para medir tu ritmo cardíaco!"
            >
              <div className="sensual-heartbeat transition-transform duration-500 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="w-56 h-56 sm:w-72 sm:h-72 transition-all duration-700"
                >
                  <defs>
                    <radialGradient id="wineRadial" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor={finish.svgGradStart} />
                      <stop offset="60%" stopColor={finish.svgGradEnd} />
                      <stop offset="100%" stopColor="#080103" />
                    </radialGradient>
                    <linearGradient id="specularGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                      <stop offset="25%" stopColor="rgba(255,255,255,0.06)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.65)" />
                    </linearGradient>
                  </defs>

                  <path
                    fill="url(#wineRadial)"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />

                  <path
                    fill="url(#specularGlint)"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    className="mix-blend-overlay opacity-80"
                  />
                </svg>
              </div>

              {/* Central Chronometer HUD */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-serif-luxury italic text-5xl sm:text-6xl font-light tracking-tight text-white/95 drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                  {bpm}
                </span>
                <span className="font-cinzel text-[9px] uppercase tracking-[0.35em] font-medium text-rose-300/80 drop-shadow">
                  BPM LIVE
                </span>
              </div>
            </div>

            {/* Rhythm Classification Badge */}
            <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#140307]/70 border border-[#3b0b17] text-rose-200/90 text-xs font-serif-luxury italic">
              <span>{getBpmClassification(bpm)}</span>
            </div>

            {/* Glowing Wine ECG Wave */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <svg className="w-56 h-7 text-[#cf2b50] overflow-visible" viewBox="0 0 240 30" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="M0 15 L50 15 L65 15 L75 3 L85 27 L95 8 L105 22 L115 15 L170 15 L180 5 L190 25 L200 15 L240 15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90 drop-shadow-[0_0_10px_rgba(207,43,80,0.8)]"
                />
              </svg>
              <span className="text-[11px] font-mono text-zinc-500 tracking-wider">
                {beatSpeed}s CADENCIA
              </span>
            </div>

            {/* DEDICATED TAP TEMPO BIOMETRIC SENSOR PAD */}
            <div className="mt-8 w-full max-w-md mx-auto">
              <button
                onClick={handleTap}
                className={`w-full py-5 px-6 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
                  tapFlash
                    ? "bg-gradient-to-r from-[#9e1c3a] to-[#5c0b1c] border-[#cf2b50] scale-[0.98] shadow-[0_0_40px_rgba(207,43,80,0.8)]"
                    : "bg-[#090306]/90 border-[#3b0b17] hover:border-[#7a1228] hover:bg-[#120409]"
                }`}
              >
                {/* Fingerprint / Tap Icon */}
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full border transition-colors ${
                    tapFlash ? "border-white bg-white/20 text-white" : "border-[#7a1228] bg-[#24060e] text-[#cf2b50]"
                  }`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69" />
                      <path d="M12 6a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3.5 5.5" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="font-cinzel text-xs tracking-[0.25em] font-semibold text-white block uppercase">
                      Sensor Táctil de Pulso (Tap BPM)
                    </span>
                    <span className="font-sans-luxury text-[11px] text-zinc-400 font-light">
                      Haz clic rítmicamente para medir tu frecuencia
                    </span>
                  </div>
                </div>

                {/* Real-time Tap Count and Live Feedback */}
                <div className="mt-2 flex items-center justify-between w-full pt-3 border-t border-[#24060e] text-xs">
                  <span className="font-mono text-[11px] text-rose-300/90 font-medium">
                    {tapStatus}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-cinzel text-zinc-500 uppercase tracking-wider">
                      {tapTimestamps.length > 0 ? `${tapTimestamps.length} toques` : "Listo"}
                    </span>
                    {tapTimestamps.length > 0 && (
                      <span
                        onClick={handleResetBpm}
                        className="text-[10px] font-cinzel text-rose-400 hover:text-white underline cursor-pointer"
                        title="Restablecer a 88 BPM"
                      >
                        Reiniciar
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </div>

            {/* FINISH & PRESETS CONTROL PILL */}
            <div className="mt-8 p-5 rounded-3xl bg-[#090306]/90 border border-[#3b0b17] shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col md:flex-row items-center gap-8 z-20">
              {/* Color finishes */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium">
                    Acabado:
                  </span>
                  <span className="font-serif-luxury italic text-sm text-rose-200">
                    {finish.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-cinzel">({finish.edition})</span>
                </div>
                <div className="flex items-center gap-3">
                  {WINE_FINISHES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFinish(item)}
                      className={`relative w-8 h-8 rounded-full transition-all duration-300 border ${
                        finish.id === item.id
                          ? "scale-110 ring-2 ring-[#bd2445] ring-offset-2 ring-offset-black border-white/40 shadow-[0_0_15px_rgba(189,36,69,0.7)]"
                          : "opacity-60 hover:opacity-100 border-white/10"
                      }`}
                      style={{ background: item.hex }}
                      aria-label={item.name}
                      title={item.desc}
                    />
                  ))}
                </div>
              </div>

              <div className="h-10 w-px bg-[#26070f] hidden md:block" />

              {/* Quick Preset Rhythms */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium">
                  Preajustes Sensoriales
                </span>
                <div className="flex items-center gap-2">
                  {RHYTHMS.map((r) => (
                    <button
                      key={r.bpm}
                      onClick={() => {
                        setBpm(r.bpm);
                        setTapTimestamps([]);
                        setTapStatus(`Preajuste: ${r.label}`);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-light tracking-wide transition-all ${
                        bpm === r.bpm
                          ? "bg-gradient-to-r from-[#7a1228] to-[#450814] text-white border border-[#9e1c3a]/70 shadow-[0_0_15px_rgba(122,18,40,0.6)]"
                          : "bg-[#140408] text-zinc-400 hover:text-zinc-200 border border-[#2b0710]"
                      }`}
                    >
                      <span className="font-serif-luxury italic text-sm">{r.label}</span>{" "}
                      <span className="text-[10px] text-zinc-500 font-mono">({r.bpm})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE INTERLUDE */}
      <section className="relative z-10 py-20 px-6 border-y border-[#260810]/70 bg-[#060205]/60 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-cinzel text-xs tracking-[0.35em] text-[#cf2b50] uppercase block mb-4">
            Manifiesto del Atelier
          </span>
          <blockquote className="font-serif-luxury italic text-3xl sm:text-5xl font-light text-zinc-200 leading-snug tracking-tight">
            "No inventamos el amor. Simplemente creamos el primer instrumento digno de sostenerlo."
          </blockquote>
          <p className="font-cinzel text-xs tracking-[0.25em] text-zinc-500 mt-6 uppercase">
            — Atelier de Haute Horlogerie Biologique, París
          </p>
        </div>
      </section>

      {/* BENTO GRID: INGENIERÍA DEL DESEO */}
      <section id="anatomia" className="relative z-10 py-28 px-6 bg-gradient-to-b from-[#030204] via-[#080206] to-[#030204]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] font-medium text-[#cf2b50] mb-2 block">
              Ingeniería del Deseo
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light tracking-tight text-white mb-4">
              Cada suspiro, perfectamente orquestado.
            </h2>
            <p className="font-sans-luxury text-zinc-400 text-sm sm:text-base font-light tracking-wide">
              Materia noble y microacústica de precisión para una experiencia íntima, silenciosa y visceral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Large feature */}
            <div className="md:col-span-2 p-8 sm:p-12 rounded-3xl bg-[#090306]/85 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#6e182e]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#8f1631]/30 transition-all duration-700" />

              <div className="relative z-10 max-w-lg">
                <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] font-semibold text-[#cf2b50]">
                  Cápsula de Titanio Vino
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light text-white tracking-tight mt-3 mb-4 leading-tight">
                  Forjado en negro obsidiana. Bañado en borgoña eterno.
                </h3>
                <p className="font-sans-luxury text-zinc-400 font-light text-sm leading-relaxed mb-8">
                  Tratado con deposición física de vapor (PVD) a 900°C para fundir el matiz vino profundo en la estructura molecular del titanio. Suave como el satén al tacto, inmune al paso del tiempo.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#24060e]">
                  <div>
                    <span className="font-serif-luxury italic text-3xl sm:text-4xl font-light text-white tracking-tight">
                      0.001 μm
                    </span>
                    <p className="font-cinzel text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Tolerancia de pulido a mano</p>
                  </div>
                  <div>
                    <span className="font-serif-luxury italic text-3xl sm:text-4xl font-light text-rose-300 tracking-tight">
                      99.98%
                    </span>
                    <p className="font-cinzel text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Afinidad hipoalergénica con la piel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Haptic Resonance */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090306]/85 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] font-semibold text-[#cf2b50]">
                  Tacto Acústico
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white tracking-tight mt-3 mb-3">
                  Resonancia Háptica Velvet.
                </h3>
                <p className="font-sans-luxury text-zinc-400 font-light text-sm leading-relaxed">
                  Un micro-actuador cerámico reproduce la textura exacta de un pulso humano en el pecho con 128 niveles de intensidad imperceptible al oído.
                </p>
              </div>

              <div className="mt-8 py-5 px-4 rounded-2xl bg-[#040103] border border-[#24060e] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#cf2b50] animate-ping" />
                  <span className="font-cinzel text-[11px] text-rose-200 uppercase tracking-wider">Pulso Silencioso</span>
                </div>
                <span className="font-serif-luxury italic text-sm text-zinc-500">0 dB</span>
              </div>
            </div>

            {/* Bento Card 3: Intimate Pairing */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090306]/85 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] font-semibold text-[#cf2b50]">
                  Conexión Inédita
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-white tracking-tight mt-3 mb-3">
                  Sincronía Íntima a Distancia.
                </h3>
                <p className="font-sans-luxury text-zinc-400 font-light text-sm leading-relaxed">
                  Enlaza dos Corazones mediante encriptación cuántica privada. Cuando la otra persona piensa en ti, su latido vibra suavemente contra el tuyo.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 py-4">
                <div className="w-11 h-11 rounded-full bg-[#3b0a15] border border-[#7a1228] flex items-center justify-center text-rose-300 text-sm shadow-[0_0_15px_rgba(122,18,40,0.5)]">
                  ♥
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#7a1228] via-[#cf2b50] to-[#7a1228] animate-pulse" />
                <div className="w-11 h-11 rounded-full bg-[#3b0a15] border border-[#7a1228] flex items-center justify-center text-rose-300 text-sm shadow-[0_0_15px_rgba(122,18,40,0.5)]">
                  ♥
                </div>
              </div>
            </div>

            {/* Bento Card 4: Kinetic Immortality */}
            <div className="md:col-span-2 p-8 sm:p-12 rounded-3xl bg-[#090306]/85 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between">
              <div className="max-w-xl">
                <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] font-semibold text-[#cf2b50]">
                  Autonomía Perpetua
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-light text-white tracking-tight mt-3 mb-4 leading-tight">
                  Alimentado por tu propia energía biológica.
                </h3>
                <p className="font-sans-luxury text-zinc-400 font-light text-sm leading-relaxed">
                  Un micro-generador piezoeléctrico transforma el calor corporal y el movimiento en energía inagotable. Sin cables, sin enchufes. Solo la continuidad ininterrumpida de tu pasión.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#24060e] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-4 rounded-md border border-[#cf2b50] p-0.5 flex items-center">
                    <div className="w-full h-full bg-[#cf2b50] rounded-[2px]" />
                  </div>
                  <span className="font-cinzel text-[11px] text-rose-200 uppercase tracking-wider">3,000 Millones de Pulsos</span>
                </div>
                <span className="font-cinzel text-[10px] text-zinc-500 uppercase tracking-widest">Garantía Atelier Vitalicia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER EDITIONS COMPARISON */}
      <section id="artesania" className="relative z-10 py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] font-medium text-[#cf2b50] mb-2 block">
            Colección Privada
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light tracking-tight text-white">
            Tres interpretaciones del deseo.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Edition 1: Corazón Noir */}
          <div className="p-8 rounded-3xl bg-[#070205] border border-[#290710] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 text-[#570d1e] mb-5">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="font-serif-luxury text-2xl font-light text-white">Corazón Noir</h3>
              <p className="font-sans-luxury text-xs text-zinc-500 mt-1 font-light">Acabado negro mate y pulso esencial.</p>
              <p className="font-serif-luxury italic text-3xl font-light text-zinc-200 mt-4">$1,200</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-400 font-light border-t border-[#1f050c] pt-6">
                <li className="flex items-center gap-2">✓ Caja de titanio negro grafito</li>
                <li className="flex items-center gap-2">✓ Sensor de cadencia emocional</li>
                <li className="flex items-center gap-2">✓ Resonancia háptica estándar</li>
              </ul>
            </div>

            <a
              href="#reserva"
              className="mt-8 block text-center w-full py-3 rounded-full border border-[#3b0b17] hover:border-[#6e182e] text-[11px] font-cinzel uppercase tracking-[0.2em] text-zinc-300 font-medium transition"
            >
              Seleccionar
            </a>
          </div>

          {/* Edition 2: Corazón Pro Borgoña (Flagship) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#140409] to-[#090205] border-2 border-[#7a1228] shadow-[0_0_40px_rgba(122,18,40,0.3)] flex flex-col justify-between relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#8f1631] to-[#540a1b] font-cinzel text-[9px] uppercase tracking-[0.25em] font-semibold text-rose-100 border border-[#bd2445]/60 shadow">
              La Pieza Insignia
            </span>

            <div>
              <div className="w-12 h-12 text-[#cf2b50] mb-5 drop-shadow-[0_0_15px_rgba(207,43,80,0.8)]">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="font-serif-luxury text-2xl font-light text-white">Corazón Pro Borgoña</h3>
              <p className="font-sans-luxury text-xs text-rose-300/70 mt-1 font-light">Titanio bañado en vino y zafiro oscuro.</p>
              <p className="font-serif-luxury italic text-3xl font-light text-white mt-4">$1,850</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-300 font-light border-t border-[#3b0b17] pt-6">
                <li className="flex items-center gap-2">✓ Titanio grado 5 tinte vino borgoña</li>
                <li className="flex items-center gap-2">✓ Sincronía Íntima Dual a distancia</li>
                <li className="flex items-center gap-2">✓ Motor háptico de 128 niveles</li>
                <li className="flex items-center gap-2">✓ Cristal de zafiro negro ahumado</li>
              </ul>
            </div>

            <a
              href="#reserva"
              className="mt-8 block text-center w-full py-3 rounded-full bg-gradient-to-r from-[#8a1831] to-[#540a1b] text-white text-[11px] font-cinzel uppercase tracking-[0.2em] font-semibold border border-[#bd2445]/80 shadow-[0_0_20px_rgba(138,24,49,0.5)] hover:shadow-[0_0_30px_rgba(207,43,80,0.7)] transition"
            >
              Adquirir Pro Borgoña
            </a>
          </div>

          {/* Edition 3: Bespoke Atelier */}
          <div className="p-8 rounded-3xl bg-[#070205] border border-[#290710] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 text-[#962b46] mb-5">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="font-serif-luxury text-2xl font-light text-white">Atelier Bespoke</h3>
              <p className="font-sans-luxury text-xs text-zinc-500 mt-1 font-light">Calibrado a medida con tu firma biológica.</p>
              <p className="font-serif-luxury italic text-3xl font-light text-zinc-200 mt-4">$3,500</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-400 font-light border-t border-[#1f050c] pt-6">
                <li className="flex items-center gap-2">✓ Grabado láser de monograma en oro</li>
                <li className="flex items-center gap-2">✓ Doble cámara de resonancia de seda</li>
                <li className="flex items-center gap-2">✓ Entrega en cofre de ébano y terciopelo</li>
              </ul>
            </div>

            <a
              href="#reserva"
              className="mt-8 block text-center w-full py-3 rounded-full border border-[#3b0b17] hover:border-[#6e182e] text-[11px] font-cinzel uppercase tracking-[0.2em] text-zinc-300 font-medium transition"
            >
              Consultar Atelier
            </a>
          </div>
        </div>
      </section>

      {/* PRIVATE RESERVATION CTA */}
      <section id="reserva" className="relative z-10 py-32 px-6 text-center border-t border-[#260810]/80 bg-gradient-to-b from-[#030204] via-[#0c0307] to-[#020102]">
        <div className="max-w-xl mx-auto">
          <div className="w-10 h-10 mx-auto mb-6 text-[#8a1831] drop-shadow-[0_0_15px_rgba(138,24,49,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl font-light tracking-tight text-white mb-4">
            Posee el latido más exclusivo del mundo.
          </h2>
          <p className="font-sans-luxury text-zinc-400 font-light text-sm sm:text-base mb-10 leading-relaxed">
            Cada pieza se ensambla a mano en número limitado. Incluye servicio de conserje biológico 24/7 y estuche de ébano con interior en terciopelo vino.
          </p>

          {reserved ? (
            <div className="p-6 rounded-2xl bg-[#1a050d] border border-[#7a1228] text-rose-200">
              <span className="font-cinzel text-xs uppercase tracking-widest font-semibold block mb-1">
                ✓ Invitación cursada con éxito
              </span>
              <p className="font-sans-luxury text-xs text-zinc-400">Un embajador del Atelier se comunicará de manera confidencial.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReserved(true);
              }}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Ingresa tu correo privado..."
                className="w-full px-5 py-3.5 rounded-full bg-[#120409] border border-[#3b0b17] text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#8f1631] transition font-sans-luxury"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8a1831] to-[#540a1b] text-white text-[11px] font-cinzel tracking-[0.2em] uppercase font-semibold whitespace-nowrap border border-[#bd2445]/80 shadow-[0_0_20px_rgba(138,24,49,0.5)] hover:shadow-[0_0_35px_rgba(207,43,80,0.7)] transition duration-300"
              >
                Solicitar Acceso
              </button>
            </form>
          )}

          <p className="font-cinzel text-[10px] text-zinc-600 mt-6 tracking-widest uppercase">
            Disponibilidad sujeta a lista de espera. Entrega confidencial asegurada.
          </p>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="relative z-10 py-14 px-6 text-[11px] leading-relaxed border-t border-[#1c040b] bg-black text-zinc-600 font-light">
        <div className="max-w-5xl mx-auto space-y-6">
          <p className="text-zinc-600">
            1. Corazón Pro Noir es una obra de diseño sensorial y alta ingeniería. La resonancia háptica opera bajo los estándares biológicos más estrictos de biocompatibilidad con titanio Ti-6Al-4V Grado 5.
          </p>
          <div className="border-t border-[#170308] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-cinzel text-[10px] tracking-wider">
            <p className="text-zinc-500 font-sans-luxury">Copyright © 2025 Heart Atelier Inc. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6 text-zinc-500">
              <a href="#" className="hover:text-rose-300 transition-colors">Privacidad y Sigilo</a>
              <a href="#" className="hover:text-rose-300 transition-colors">Términos del Atelier</a>
              <a href="#" className="hover:text-rose-300 transition-colors">Certificación Biológica</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
