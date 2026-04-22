// Genera un sonido relajante tipo cuenco tibetano/singing bowl con
// la Web Audio API — sin assets binarios.

let ctx: AudioContext | null = null;

const getCtx = (): AudioContext => {
  if (!ctx) {
    const W = window as unknown as { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? W.webkitAudioContext!;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

// Despierta el contexto de audio en el primer gesto del usuario para
// cumplir con las políticas de autoplay móvil.
export const primeAudio = () => {
  try {
    getCtx();
  } catch {
    /* noop */
  }
};

const playBell = (freq: number, delay: number, duration = 4.5) => {
  const ac = getCtx();
  const t0 = ac.currentTime + delay;

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, t0);
  master.gain.exponentialRampToValueAtTime(0.9, t0 + 0.06);
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  master.connect(ac.destination);

  // Armónicos de un cuenco: fundamental + múltiplos con leve desafinación.
  const partials = [
    { mult: 1, gain: 1 },
    { mult: 2.01, gain: 0.55 },
    { mult: 3.02, gain: 0.32 },
    { mult: 4.97, gain: 0.18 },
    { mult: 6.7, gain: 0.1 },
  ];

  partials.forEach((p) => {
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq * p.mult;

    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(p.gain, t0 + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration * 0.95);

    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + duration);
  });
};

export const playRelaxingChime = () => {
  // Tres campanas espaciadas en un intervalo agradable.
  playBell(528, 0, 5.5); // Do aprox.
  playBell(660, 0.45, 5);
  playBell(792, 1.0, 5);
};
