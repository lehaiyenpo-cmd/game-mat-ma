let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfx: GainNode | null = null;
let muted = false;

function graph() {
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC({ latencyHint: "interactive" });
    master = ctx.createGain();
    sfx = ctx.createGain();
    sfx.connect(master);
    master.connect(ctx.destination);
    master.gain.value = muted ? 0 : 0.72;
    sfx.gain.value = 0.9;
  }
  return { ctx, master: master!, sfx: sfx! };
}

export function unlockAudio() {
  const { ctx: audio } = graph();
  if (audio.state === "suspended") {
    void audio.resume();
  }
}

export function resumeAudioIfNeeded() {
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  if (!ctx || !master) return;
  master.gain.setTargetAtTime(next ? 0 : 0.72, ctx.currentTime, 0.03);
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  peak = 0.18,
  start = 0,
  freqEnd?: number,
) {
  const { ctx: audio, sfx: bus } = graph();
  const t = audio.currentTime + start;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (freqEnd != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), t + duration);
  }
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain);
  gain.connect(bus);
  osc.start(t);
  osc.stop(t + duration + 0.02);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

/** Crisp synth-ting — correct answer. */
export function playTing() {
  unlockAudio();
  tone(880, 0.22, "sine", 0.2, 0, 1760);
  tone(1320, 0.28, "triangle", 0.08, 0.02, 1980);
  tone(1760, 0.18, "sine", 0.06, 0.05);
}

/** Low buzz — wrong answer. */
export function playBuzz() {
  unlockAudio();
  tone(92, 0.22, "sawtooth", 0.14, 0, 56);
  tone(48, 0.28, "square", 0.06, 0.02, 36);
}

/** Soft click — open a vault. */
export function playClick() {
  unlockAudio();
  tone(420, 0.07, "triangle", 0.08, 0, 280);
}

/** Artifact unlock arpeggio. */
export function playUnlock() {
  unlockAudio();
  tone(523.25, 0.16, "sine", 0.12, 0);
  tone(659.25, 0.18, "sine", 0.12, 0.07);
  tone(783.99, 0.28, "sine", 0.14, 0.14, 1174);
}

/** Timeout warning. */
export function playTimeout() {
  unlockAudio();
  tone(180, 0.18, "square", 0.1, 0, 90);
  tone(140, 0.22, "sawtooth", 0.08, 0.12, 70);
}

export function attachAudioLifecycle() {
  if (typeof window === "undefined") return () => {};
  const onFirst = () => unlockAudio();
  window.addEventListener("pointerdown", onFirst, { once: true });
  window.addEventListener("keydown", onFirst, { once: true });
  const onVis = () => {
    if (document.visibilityState === "visible") resumeAudioIfNeeded();
  };
  document.addEventListener("visibilitychange", onVis);
  return () => {
    window.removeEventListener("pointerdown", onFirst);
    window.removeEventListener("keydown", onFirst);
    document.removeEventListener("visibilitychange", onVis);
  };
}
