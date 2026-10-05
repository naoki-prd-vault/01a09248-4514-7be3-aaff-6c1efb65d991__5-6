"use client";

import { useState } from "react";

const WINE_FINISHES = [
  {
    id: "borgona",
    name: "Borgoña Imperial",
    desc: "Titanio cepillado con tinte de vino tinto profundo",
    hex: "#6b1124",
    glow: "rgba(107, 17, 36, 0.65)",
    gradient: "from-[#8a1831] via-[#5c0b1c] to-[#2d050d]",
    border: "border-rose-900/60",
    badge: "bg-[#6b1124]",
    svgGradStart: "#9e1c3a",
    svgGradEnd: "#450613",
  },
  {
    id: "rubi-noir",
    name: "Rubí Nocturno",
    desc: "Zafiro ahumado con destellos granate intenso",
    hex: "#8b152d",
    glow: "rgba(139, 21, 45, 0.7)",
    gradient: "from-[#b81d3d] via-[#750d22] to-[#36040e]",
    border: "border-red-900/60",
    badge: "bg-[#8b152d]",
    svgGradStart: "#c72548",
    svgGradEnd: "#520716",
  },
  {
    id: "velvet-black",
    name: "Terciopelo Noir",
    desc: "Negro obsidiana con reflejos vino y sombra de cava",
    hex: "#3b0713",
    glow: "rgba(70, 10, 24, 0.6)",
    gradient: "from-[#4f0918] via-[#24030a] to-[#0d0104]",
    border: "border-rose-950/80",
    badge: "bg-[#3b0713]",
    svgGradStart: "#5e0e1e",
    svgGradEnd: "#1a0206",
  },
  {
    id: "rose-champagne",
    name: "Cava & Ciruela",
    desc: "Aleación pulida de oro rosa y vino añejo",
    hex: "#962b46",
    glow: "rgba(150, 43, 70, 0.6)",
    gradient: "from-[#b93958] via-[#781e35] to-[#3e0c19]",
    border: "border-pink-900/60",
    badge: "bg-[#962b46]",
    svgGradStart: "#d14467",
    svgGradEnd: "#5c1325",
  },
];

const RHYTHMS = [
  { label: "Susurro", bpm: 58, desc: "Reposo sereno y elegancia silenciosa" },
  { label: "Deseo", bpm: 88, desc: "La cadencia sensual del encuentro" },
  { label: "Fervor", bpm: 132, desc: "Pasión desbordada a flor de piel" },
];

export default function Home() {
  const [finish, setFinish] = useState(WINE_FINISHES[0]);
  const [bpm, setBpm] = useState(88);
  const [reserved, setReserved] = useState(false);

  const beatSpeed = (60 / bpm).toFixed(2);

  return (
    <div className="min-h-screen bg-[#040204] text-zinc-100 selection:bg-[#721224] selection:text-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes sexyBeat {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 35px ${finish.glow});
          }
          15% {
            transform: scale(1.15) rotate(-0.5deg);
            filter: drop-shadow(0 0 65px ${finish.glow});
          }
          28% {
            transform: scale(1.02);
            filter: drop-shadow(0 0 40px ${finish.glow});
          }
          42% {
            transform: scale(1.1) rotate(0.5deg);
            filter: drop-shadow(0 0 55px ${finish.glow});
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
          50% { opacity: 0.65; transform: scale(1.1); }
        }
        .aura-breathing {
          animation: auraBreath ${beatSpeed}s ease-in-out infinite;
        }
      `}</style>

      {/* LUXURY FROSTED NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#040204]/80 backdrop-blur-2xl border-b border-[#2d0a14]/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-xs tracking-wide">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 font-medium tracking-tight text-white group">
              {/* Apple-cut wine heart symbol */}
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#8a1831] group-hover:text-[#b81d3d] transition-colors drop-shadow-[0_0_8px_rgba(138,24,49,0.8)]">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="font-semibold text-sm tracking-tight bg-gradient-to-r from-zinc-100 via-rose-200 to-rose-400 bg-clip-text text-transparent">
                Heart <span className="font-light italic text-[#b81d3d]">Atelier</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-7 text-zinc-400 font-light">
              <a href="#anatomia" className="hover:text-rose-200 transition-colors">Anatomía</a>
              <a href="#artesania" className="hover:text-rose-200 transition-colors">Artesanía</a>
              <a href="#acabados" className="hover:text-rose-200 transition-colors">Gama Borgoña</a>
              <a href="#reserva" className="hover:text-rose-200 transition-colors">Atelier Privé</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[11px] text-zinc-500 font-mono tracking-wider">
              ÉDITION NOIR & VINO
            </span>
            <a
              href="#reserva"
              className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide bg-gradient-to-r from-[#7a1228] to-[#450814] text-rose-100 hover:text-white border border-[#9e1c3a]/50 shadow-[0_0_15px_rgba(122,18,40,0.5)] hover:shadow-[0_0_25px_rgba(158,28,58,0.7)] transition-all duration-300"
            >
              Encargar Pieza
            </a>
          </div>
        </div>
      </header>

      {/* AMBIENT VELVET BACKLIGHT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] aura-breathing transition-all duration-1000"
          style={{ background: `radial-gradient(circle, ${finish.glow} 0%, rgba(10,2,5,0) 70%)` }}
        />
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#3d0611]/30 blur-[180px]" />
        <div className="absolute -top-40 right-10 w-[450px] h-[450px] rounded-full bg-[#520918]/25 blur-[160px]" />
      </div>

      {/* HERO: SEDUCTIVE AND MINIMALIST */}
      <section className="relative z-10 pt-20 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#5c0e20]/60 bg-[#140307]/70 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(92,14,32,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c72548] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-rose-200">
              Colección Alta Joyería Biológica
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-white mb-6">
            Corazón{" "}
            <span className="font-light italic bg-gradient-to-r from-rose-200 via-[#d14467] to-[#7a1228] bg-clip-text text-transparent">
              Pro Noir
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-light text-zinc-300/90 max-w-2xl mx-auto mb-4 tracking-tight leading-relaxed">
            La sensualidad del latido humano vestida en titanio negro noche y vino borgoña profundo.
          </p>

          <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mb-12 font-light">
            Inspirado en la calidez de la piel, la penumbra de la medianoche y la cadencia hipnótica de un pulso que nunca miente.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm mb-16">
            <a
              href="#reserva"
              className="px-8 py-3.5 rounded-full bg-gradient-to-b from-[#8f1631] to-[#540a1b] text-white font-medium border border-[#bd2445]/60 shadow-[0_0_30px_rgba(143,22,49,0.5)] hover:shadow-[0_0_45px_rgba(189,36,69,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Solicitar Audiencia Privada
            </a>
            <a
              href="#anatomia"
              className="px-8 py-3.5 rounded-full bg-[#120408]/80 text-zinc-300 font-light border border-[#3b0d18] hover:border-[#6e182e] hover:text-white transition-all backdrop-blur-md"
            >
              Explorar Diseño ↓
            </a>
          </div>

          {/* SCULPTED HEART VESSEL */}
          <div className="relative py-12 flex flex-col items-center justify-center">
            {/* Subtle rotating obsidian ring */}
            <div
              className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-[#420a16]/40 animate-spin pointer-events-none"
              style={{ animationDuration: "50s" }}
            />
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-[#570d1e]/30 pointer-events-none" />

            {/* The Heart */}
            <div
              onClick={() => setBpm((prev) => (prev === 58 ? 88 : prev === 88 ? 132 : 58))}
              className="relative cursor-pointer group p-6 select-none"
              title="Toca para alterar la frecuencia del deseo"
            >
              <div className="sensual-heartbeat transition-transform duration-500 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="w-52 h-52 sm:w-64 sm:h-64 transition-all duration-700"
                >
                  <defs>
                    {/* Deep wine velvet radial gradient */}
                    <radialGradient id="wineRadial" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor={finish.svgGradStart} />
                      <stop offset="60%" stopColor={finish.svgGradEnd} />
                      <stop offset="100%" stopColor="#080103" />
                    </radialGradient>
                    {/* Specular highlight overlay for glossy glass look */}
                    <linearGradient id="specularGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                      <stop offset="25%" stopColor="rgba(255,255,255,0.05)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
                    </linearGradient>
                  </defs>

                  {/* Main Heart Body */}
                  <path
                    fill="url(#wineRadial)"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />

                  {/* Elegant inner bevel reflection */}
                  <path
                    fill="url(#specularGlint)"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    className="mix-blend-overlay opacity-80"
                  />
                </svg>
              </div>

              {/* Central Chronometer HUD */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl sm:text-4xl font-light tracking-tight text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {bpm}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-rose-300/80 drop-shadow">
                  Pulsos / Min
                </span>
              </div>
            </div>

            {/* Glowing Wine ECG Wave */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <svg className="w-52 h-6 text-[#b81d3d] overflow-visible" viewBox="0 0 240 30" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="M0 15 L50 15 L65 15 L75 3 L85 27 L95 8 L105 22 L115 15 L170 15 L180 5 L190 25 L200 15 L240 15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90 drop-shadow-[0_0_8px_rgba(184,29,61,0.8)]"
                />
              </svg>
              <span className="text-[11px] font-mono text-zinc-500">
                {beatSpeed}s cadencia
              </span>
            </div>

            {/* FINISH & RHYTHM CONTROL PILL */}
            <div className="mt-10 p-5 rounded-3xl bg-[#090306]/90 border border-[#3b0b17] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col md:flex-row items-center gap-8 z-20">
              {/* Color finishes */}
              <div className="flex flex-col items-center md:items-start gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                    Acabado Noir:
                  </span>
                  <span className="text-xs font-semibold text-rose-200">
                    {finish.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {WINE_FINISHES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setFinish(item)}
                      className={`relative w-8 h-8 rounded-full transition-all duration-300 border ${
                        finish.id === item.id
                          ? "scale-110 ring-2 ring-[#bd2445] ring-offset-2 ring-offset-black border-white/40"
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

              {/* Rhythms */}
              <div className="flex flex-col items-center md:items-start gap-2.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  Cadencia Sensorial
                </span>
                <div className="flex items-center gap-2">
                  {RHYTHMS.map((r) => (
                    <button
                      key={r.bpm}
                      onClick={() => setBpm(r.bpm)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-light transition-all ${
                        bpm === r.bpm
                          ? "bg-gradient-to-r from-[#7a1228] to-[#450814] text-white border border-[#9e1c3a]/70 shadow-[0_0_15px_rgba(122,18,40,0.6)]"
                          : "bg-[#140408] text-zinc-400 hover:text-zinc-200 border border-[#2b0710]"
                      }`}
                    >
                      {r.label} ({r.bpm})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID: SEDUCCIÓN TÉCNICA */}
      <section id="anatomia" className="relative z-10 py-28 px-6 border-t border-[#260810]/70 bg-gradient-to-b from-[#040204] via-[#090206] to-[#040204]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#c72548] mb-2 block">
              Ingeniería del Deseo
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
              Cada suspiro, perfectamente orquestado.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light">
              Materia noble y microacústica de precisión para una experiencia de latido íntima y visceral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Large feature */}
            <div className="md:col-span-2 p-8 sm:p-12 rounded-3xl bg-[#090306]/80 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#6e182e]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#8f1631]/30 transition-all duration-700" />

              <div className="relative z-10 max-w-lg">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#c72548]">
                  Cápsula de Titanio Vino
                </span>
                <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mt-3 mb-4">
                  Forjado en negro obsidiana. Bañado en borgoña eterno.
                </h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8">
                  Tratado con deposición física de vapor (PVD) a 900°C para fundir el matiz vino profundo en la estructura molecular del titanio. Suave como el satén al tacto, inmune a cualquier cicatriz.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#24060e]">
                  <div>
                    <span className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                      0.001 μm
                    </span>
                    <p className="text-xs text-zinc-500 mt-1 font-light">Tolerancia de pulido a mano</p>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-light text-rose-300 tracking-tight">
                      99.98%
                    </span>
                    <p className="text-xs text-zinc-500 mt-1 font-light">Afinidad hipoalergénica con la piel</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Haptic Resonance */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090306]/80 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#c72548]">
                  Tacto Acústico
                </span>
                <h3 className="text-2xl font-semibold text-white tracking-tight mt-3 mb-3">
                  Resonancia Háptica Velvet.
                </h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">
                  Un micro-actuador cerámico reproduce la textura exacta de un pulso humano en el pecho con 128 niveles de intensidad silenciosa.
                </p>
              </div>

              <div className="mt-8 py-6 px-4 rounded-2xl bg-[#040103] border border-[#24060e] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c72548] animate-ping" />
                  <span className="text-xs font-mono text-rose-200">Pulso Silencioso</span>
                </div>
                <span className="text-xs font-mono text-zinc-500">0 dB</span>
              </div>
            </div>

            {/* Bento Card 3: Intimate Pairing */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090306]/80 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 flex flex-col justify-between group">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#c72548]">
                  Conexión Inédita
                </span>
                <h3 className="text-2xl font-semibold text-white tracking-tight mt-3 mb-3">
                  Sincronía Íntima a Distancia.
                </h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">
                  Enlaza dos Corazones con encriptación cuántica privada. Cuando la otra persona piensa en ti, su latido vibra suavemente contra el tuyo.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 py-4">
                <div className="w-11 h-11 rounded-full bg-[#3b0a15] border border-[#7a1228] flex items-center justify-center text-rose-300 text-sm shadow-[0_0_15px_rgba(122,18,40,0.5)]">
                  ♥
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#7a1228] via-[#c72548] to-[#7a1228] animate-pulse" />
                <div className="w-11 h-11 rounded-full bg-[#3b0a15] border border-[#7a1228] flex items-center justify-center text-rose-300 text-sm shadow-[0_0_15px_rgba(122,18,40,0.5)]">
                  ♥
                </div>
              </div>
            </div>

            {/* Bento Card 4: Kinetic Immortality */}
            <div className="md:col-span-2 p-8 sm:p-12 rounded-3xl bg-[#090306]/80 border border-[#3b0b17]/80 hover:border-[#6e182e]/80 transition-all duration-500 relative overflow-hidden group flex flex-col justify-between">
              <div className="max-w-xl">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#c72548]">
                  Autonomía Perpetua
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-3 mb-4">
                  Alimentado por tu propia energía biológica.
                </h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">
                  Un micro-generador piezoeléctrico transforma el calor corporal y el movimiento en energía inagotable. No hay cables ni puertos. Solo la continuidad ininterrumpida de tu pasión.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#24060e] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-4 rounded-md border border-[#c72548] p-0.5 flex items-center">
                    <div className="w-full h-full bg-[#c72548] rounded-[2px]" />
                  </div>
                  <span className="text-xs font-mono text-rose-200">Reserva de 3,000 millones de pulsos</span>
                </div>
                <span className="text-xs text-zinc-500 font-light">Garantía Atelier Vitalicia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER EDITIONS COMPARISON */}
      <section id="artesania" className="relative z-10 py-28 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#c72548] mb-2 block">
            Colección Privada
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">
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
              <h3 className="text-lg font-semibold text-white">Corazón Noir</h3>
              <p className="text-xs text-zinc-500 mt-1 font-light">Acabado negro mate y pulso esencial.</p>
              <p className="text-2xl font-light text-zinc-200 mt-4">$1,200</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-400 font-light border-t border-[#1f050c] pt-6">
                <li className="flex items-center gap-2">✓ Caja de titanio negro grafito</li>
                <li className="flex items-center gap-2">✓ Sensor de cadencia emocional</li>
                <li className="flex items-center gap-2">✓ Resonancia háptica estándar</li>
              </ul>
            </div>

            <a
              href="#reserva"
              className="mt-8 block text-center w-full py-2.5 rounded-full border border-[#3b0b17] hover:border-[#6e182e] text-xs text-zinc-300 font-light transition"
            >
              Seleccionar
            </a>
          </div>

          {/* Edition 2: Corazón Pro Borgoña (Flagship) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#140409] to-[#090205] border-2 border-[#7a1228] shadow-[0_0_40px_rgba(122,18,40,0.3)] flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#8f1631] to-[#540a1b] text-[10px] uppercase tracking-widest font-semibold text-rose-100 border border-[#bd2445]/60">
              La Pieza Insignia
            </span>

            <div>
              <div className="w-12 h-12 text-[#b81d3d] mb-5 drop-shadow-[0_0_15px_rgba(184,29,61,0.8)]">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Corazón Pro Borgoña</h3>
              <p className="text-xs text-rose-300/70 mt-1 font-light">Titanio bañado en vino y zafiro oscuro.</p>
              <p className="text-2xl font-light text-white mt-4">$1,850</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-300 font-light border-t border-[#3b0b17] pt-6">
                <li className="flex items-center gap-2">✓ Titanio grado 5 tinte vino borgoña</li>
                <li className="flex items-center gap-2">✓ Sincronía Íntima Dual a distancia</li>
                <li className="flex items-center gap-2">✓ Motor háptico de 128 niveles</li>
                <li className="flex items-center gap-2">✓ Cristal de zafiro negro ahumado</li>
              </ul>
            </div>

            <a
              href="#reserva"
              className="mt-8 block text-center w-full py-2.5 rounded-full bg-gradient-to-r from-[#8a1831] to-[#540a1b] text-white text-xs font-medium border border-[#bd2445]/80 shadow-[0_0_20px_rgba(138,24,49,0.5)] hover:shadow-[0_0_30px_rgba(189,36,69,0.7)] transition"
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
              <h3 className="text-lg font-semibold text-white">Atelier Bespoke</h3>
              <p className="text-xs text-zinc-500 mt-1 font-light">Calibrado a medida con tu firma biológica.</p>
              <p className="text-2xl font-light text-zinc-200 mt-4">$3,500</p>

              <ul className="mt-8 space-y-3 text-xs text-zinc-400 font-light border-t border-[#1f050c] pt-6">
                <li className="flex items-center gap-2">✓ Grabado láser de monograma en oro</li>
                <li className="flex items-center gap-2">✓ Doble cámara de resonancia de seda</li>
                <li className="flex items-center gap-2">✓ Entrega en cofre de ébano y terciopelo</li>
              </ul>
            </div>

            <a
              href="#reserva"
              className="mt-8 block text-center w-full py-2.5 rounded-full border border-[#3b0b17] hover:border-[#6e182e] text-xs text-zinc-300 font-light transition"
            >
              Consultar Atelier
            </a>
          </div>
        </div>
      </section>

      {/* PRIVATE RESERVATION CTA */}
      <section id="reserva" className="relative z-10 py-32 px-6 text-center border-t border-[#260810]/80 bg-gradient-to-b from-[#040204] via-[#0c0307] to-[#020102]">
        <div className="max-w-xl mx-auto">
          <div className="w-10 h-10 mx-auto mb-6 text-[#8a1831] drop-shadow-[0_0_15px_rgba(138,24,49,0.8)]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Posee el latido más exclusivo del mundo.
          </h2>
          <p className="text-zinc-400 font-light text-sm sm:text-base mb-10 leading-relaxed">
            Cada pieza se ensambla a mano en número limitado. Incluye servicio de conserje biológico 24/7 y estuche de ébano con interior en terciopelo vino.
          </p>

          {reserved ? (
            <div className="p-6 rounded-2xl bg-[#1a050d] border border-[#7a1228] text-rose-200">
              <span className="text-sm font-medium">✓ Invitación cursada con éxito.</span>
              <p className="text-xs text-zinc-400 mt-1">Un embajador del Atelier se comunicará de manera confidencial.</p>
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
                className="w-full px-5 py-3.5 rounded-full bg-[#120409] border border-[#3b0b17] text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#8f1631] transition"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8a1831] to-[#540a1b] text-white text-xs font-medium whitespace-nowrap border border-[#bd2445]/80 shadow-[0_0_20px_rgba(138,24,49,0.5)] hover:shadow-[0_0_35px_rgba(189,36,69,0.7)] transition duration-300"
              >
                Solicitar Acceso
              </button>
            </form>
          )}

          <p className="text-[11px] text-zinc-600 mt-6 font-light">
            Disponibilidad sujeta a lista de espera. Entrega confidencial asegurada.
          </p>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="relative z-10 py-12 px-6 text-[11px] leading-relaxed border-t border-[#1c040b] bg-black text-zinc-600 font-light">
        <div className="max-w-5xl mx-auto space-y-5">
          <p className="text-zinc-600">
            1. Corazón Pro Noir es una obra de diseño sensorial y alta ingeniería. La resonancia háptica opera bajo los estándares biológicos más estrictos de biocompatibilidad con titanio Ti-6Al-4V Grado 5.
          </p>
          <div className="border-t border-[#170308] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500">Copyright © 2025 Heart Atelier Inc. Todos los derechos reservados.</p>
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
