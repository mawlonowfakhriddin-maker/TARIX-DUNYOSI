let sharedCtx: AudioContext | null = null;
let stopCurrentTimer: number | null = null;
let animFrameId: number | null = null;

function getAudioContext(): AudioContext {
  if (!sharedCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedCtx = new Ctx();
  }
  if (sharedCtx.state === 'suspended') {
    sharedCtx.resume();
  }
  return sharedCtx;
}

export function playFeedChime() {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);
      gain.gain.setValueAtTime(0, t + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.14, t + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.24);
    });
  } catch {
    // Ignore audio errors if blocked by browser
  }
}

export function playSceneChime(sceneIndex: number) {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    const chords = [
      [392.0, 493.88, 587.33],
      [440.0, 554.37, 659.25],
      [493.88, 622.25, 739.99],
      [523.25, 659.25, 783.99],
    ];
    const chord = chords[sceneIndex % chords.length];
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.045);
      gain.gain.setValueAtTime(0, t + i * 0.045);
      gain.gain.linearRampToValueAtTime(0.06, t + i * 0.045 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.045 + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + i * 0.045);
      osc.stop(t + i * 0.045 + 0.44);
    });
  } catch {
    // Ignore audio errors
  }
}

let ambienceSource: AudioBufferSourceNode | null = null;
let ambienceGain: GainNode | null = null;
let ambienceLfo: OscillatorNode | null = null;

export function stopNatureAmbience() {
  try {
    ambienceSource?.stop();
    ambienceLfo?.stop();
    ambienceGain?.disconnect();
  } catch {
    // Ignore already stopped
  }
  ambienceSource = null;
  ambienceGain = null;
  ambienceLfo = null;
}

export function startNatureAmbience(biome: string) {
  stopNatureAmbience();
  try {
    const ctx = getAudioContext();
    const dur = 3;
    const bufSize = ctx.sampleRate * dur;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    // Soft pink-ish filtered noise
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < bufSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.06;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = biome === 'ocean' || biome === 'river' ? 420 : 680;

    const gain = ctx.createGain();
    gain.gain.value = 0.065;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = biome === 'ocean' ? 0.22 : 0.14;
    lfoGain.gain.value = 0.03;

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    src.start();
    lfo.start();
    ambienceSource = src;
    ambienceGain = gain;
    ambienceLfo = lfo;
  } catch {
    // Ignore audio errors
  }
}

export interface SoundCallbacks {
  onLevel?: (levels: number[]) => void;
  onEnd?: () => void;
}

export function stopAnimalSound() {
  if (stopCurrentTimer !== null) {
    window.clearTimeout(stopCurrentTimer);
    stopCurrentTimer = null;
  }
  if (animFrameId !== null) {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
}

export function playAnimalSound(animalId: string, callbacks: SoundCallbacks = {}) {
  stopAnimalSound();

  try {
    const ctx = getAudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 32;
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.85;
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const updateMeter = () => {
      analyser.getByteFrequencyData(dataArray);
      const bars = [
        dataArray[1] / 255,
        dataArray[2] / 255,
        dataArray[3] / 255,
        dataArray[4] / 255,
        dataArray[5] / 255,
        dataArray[6] / 255,
        dataArray[7] / 255,
        dataArray[8] / 255,
      ];
      callbacks.onLevel?.(bars);
      animFrameId = requestAnimationFrame(updateMeter);
    };
    animFrameId = requestAnimationFrame(updateMeter);

    const durationMs = synthesizeAnimal(ctx, masterGain, animalId);

    stopCurrentTimer = window.setTimeout(() => {
      stopAnimalSound();
      callbacks.onLevel?.([0, 0, 0, 0, 0, 0, 0, 0]);
      callbacks.onEnd?.();
    }, durationMs);
  } catch {
    callbacks.onEnd?.();
  }
}

function synthesizeAnimal(ctx: AudioContext, dest: AudioNode, id: string): number {
  const t = ctx.currentTime;

  switch (id) {
    case 'sigir': {
      // Rich low cow moo with formant filter
      const o = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o2.type = 'triangle';
      o.frequency.setValueAtTime(98, t);
      o.frequency.linearRampToValueAtTime(76, t + 0.45);
      o.frequency.linearRampToValueAtTime(84, t + 1.1);
      o.frequency.linearRampToValueAtTime(64, t + 1.8);
      o2.frequency.setValueAtTime(49, t);
      o2.frequency.linearRampToValueAtTime(38, t + 1.8);
      f.type = 'lowpass';
      f.frequency.setValueAtTime(420, t);
      f.frequency.linearRampToValueAtTime(650, t + 0.6);
      f.frequency.linearRampToValueAtTime(300, t + 1.8);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.45, t + 0.14);
      g.gain.linearRampToValueAtTime(0.36, t + 1.3);
      g.gain.linearRampToValueAtTime(0.001, t + 2.0);
      o.connect(f);
      o2.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o2.start(t);
      o.stop(t + 2.05);
      o2.stop(t + 2.05);
      return 2050;
    }

    case 'qoy': {
      // Sheep baa with vibrato LFO
      const o = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(295, t);
      o.frequency.linearRampToValueAtTime(245, t + 1.2);
      lfo.type = 'sine';
      lfo.frequency.value = 11;
      lg.gain.value = 18;
      f.type = 'bandpass';
      f.frequency.value = 900;
      f.Q.value = 1.6;
      lfo.connect(lg);
      lg.connect(o.frequency);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.42, t + 0.08);
      g.gain.linearRampToValueAtTime(0.32, t + 0.9);
      g.gain.linearRampToValueAtTime(0.001, t + 1.55);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      lfo.start(t);
      o.start(t);
      lfo.stop(t + 1.6);
      o.stop(t + 1.6);
      return 1650;
    }

    case 'echki': {
      for (let i = 0; i < 2; i++) {
        const st = t + i * 0.68;
        const o = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lg = ctx.createGain();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(360 + i * 25, st);
        o.frequency.linearRampToValueAtTime(290, st + 0.45);
        lfo.frequency.value = 16;
        lg.gain.value = 22;
        lfo.connect(lg);
        lg.connect(o.frequency);
        f.type = 'bandpass';
        f.frequency.value = 1100;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.38, st + 0.05);
        g.gain.linearRampToValueAtTime(0.001, st + 0.52);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        lfo.start(st);
        o.start(st);
        lfo.stop(st + 0.54);
        o.stop(st + 0.54);
      }
      return 1400;
    }

    case 'ot': {
      // Horse neigh
      const o = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(420, t);
      o.frequency.linearRampToValueAtTime(920, t + 0.25);
      o.frequency.linearRampToValueAtTime(580, t + 0.75);
      o.frequency.linearRampToValueAtTime(240, t + 1.65);
      lfo.frequency.value = 18;
      lg.gain.value = 28;
      lfo.connect(lg);
      lg.connect(o.frequency);
      f.type = 'bandpass';
      f.frequency.value = 1300;
      f.Q.value = 1.2;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.48, t + 0.06);
      g.gain.linearRampToValueAtTime(0.35, t + 1.0);
      g.gain.linearRampToValueAtTime(0.001, t + 1.85);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      lfo.start(t);
      o.start(t);
      lfo.stop(t + 1.9);
      o.stop(t + 1.9);
      return 1950;
    }

    case 'quyon': {
      // Soft rabbit thump + tiny squeaks
      for (let i = 0; i < 4; i++) {
        const st = t + i * 0.32;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(i % 2 === 0 ? 110 : 720, st);
        o.frequency.exponentialRampToValueAtTime(i % 2 === 0 ? 48 : 540, st + 0.14);
        g.gain.setValueAtTime(0.32, st);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.18);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.2);
      }
      return 1450;
    }

    case 'fil': {
      // Elephant trumpet
      const o = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o2.type = 'sawtooth';
      o.frequency.setValueAtTime(210, t);
      o.frequency.linearRampToValueAtTime(640, t + 0.35);
      o.frequency.linearRampToValueAtTime(760, t + 0.72);
      o.frequency.linearRampToValueAtTime(280, t + 1.45);
      o.frequency.linearRampToValueAtTime(140, t + 1.95);
      o2.frequency.setValueAtTime(214, t);
      o2.frequency.linearRampToValueAtTime(768, t + 0.72);
      o2.frequency.linearRampToValueAtTime(143, t + 1.95);
      f.type = 'bandpass';
      f.frequency.value = 1150;
      f.Q.value = 1.4;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.5, t + 0.12);
      g.gain.linearRampToValueAtTime(0.4, t + 1.2);
      g.gain.linearRampToValueAtTime(0.001, t + 2.05);
      o.connect(f);
      o2.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o2.start(t);
      o.stop(t + 2.1);
      o2.stop(t + 2.1);
      return 2100;
    }

    case 'jirafa': {
      // Deep infrasound-like gentle hum
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(68, t);
      o.frequency.linearRampToValueAtTime(92, t + 0.9);
      o.frequency.linearRampToValueAtTime(65, t + 1.8);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.38, t + 0.25);
      g.gain.linearRampToValueAtTime(0.001, t + 1.9);
      o.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.95);
      return 1950;
    }

    case 'tuya': {
      // Camel groan
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(125, t);
      o.frequency.linearRampToValueAtTime(84, t + 0.55);
      o.frequency.linearRampToValueAtTime(106, t + 1.05);
      o.frequency.linearRampToValueAtTime(72, t + 1.8);
      f.type = 'lowpass';
      f.frequency.value = 480;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.42, t + 0.1);
      g.gain.linearRampToValueAtTime(0.001, t + 1.95);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 2.0);
      return 2000;
    }

    case 'kiyik': {
      // Deer bugle
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(290, t);
      o.frequency.linearRampToValueAtTime(540, t + 0.45);
      o.frequency.linearRampToValueAtTime(420, t + 1.0);
      o.frequency.linearRampToValueAtTime(230, t + 1.75);
      f.type = 'bandpass';
      f.frequency.value = 950;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.45, t + 0.1);
      g.gain.linearRampToValueAtTime(0.001, t + 1.85);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.9);
      return 1900;
    }

    case 'zebra': {
      // Zebra bark-whinny
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.48;
        const o = ctx.createOscillator();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(440, st);
        o.frequency.linearRampToValueAtTime(210, st + 0.3);
        f.type = 'bandpass';
        f.frequency.value = 1100;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.4, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.38);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.4);
      }
      return 1550;
    }

    case 'sher':
    case 'yolbars':
    case 'qoplon': {
      const base = id === 'sher' ? 58 : id === 'yolbars' ? 72 : 95;
      const o = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o2.type = 'square';
      o.frequency.setValueAtTime(base, t);
      o.frequency.linearRampToValueAtTime(base * 2.4, t + 0.28);
      o.frequency.linearRampToValueAtTime(base * 1.5, t + 0.9);
      o.frequency.linearRampToValueAtTime(base * 0.65, t + 1.95);
      o2.frequency.setValueAtTime(base * 0.5, t);
      o2.frequency.linearRampToValueAtTime(base * 0.35, t + 1.95);
      f.type = 'lowpass';
      f.frequency.setValueAtTime(520, t);
      f.frequency.linearRampToValueAtTime(950, t + 0.35);
      f.frequency.linearRampToValueAtTime(320, t + 1.95);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.55, t + 0.12);
      g.gain.linearRampToValueAtTime(0.42, t + 1.35);
      g.gain.linearRampToValueAtTime(0.001, t + 2.05);
      o.connect(f);
      o2.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o2.start(t);
      o.stop(t + 2.1);
      o2.stop(t + 2.1);
      return 2100;
    }

    case 'bori': {
      // Wolf howl
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(220, t);
      o.frequency.linearRampToValueAtTime(580, t + 0.5);
      o.frequency.linearRampToValueAtTime(760, t + 1.05);
      o.frequency.linearRampToValueAtTime(660, t + 1.45);
      o.frequency.linearRampToValueAtTime(350, t + 2.05);
      f.type = 'lowpass';
      f.frequency.value = 1400;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.46, t + 0.15);
      g.gain.linearRampToValueAtTime(0.36, t + 1.5);
      g.gain.linearRampToValueAtTime(0.001, t + 2.15);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 2.2);
      return 2200;
    }

    case 'tulki': {
      // Fox yip
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.46;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(680, st);
        o.frequency.exponentialRampToValueAtTime(320, st + 0.28);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.3, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.34);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.36);
      }
      return 1500;
    }

    case 'gepard': {
      // Cheetah bird-like chirp
      for (let i = 0; i < 4; i++) {
        const st = t + i * 0.34;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(920 - i * 40, st);
        o.frequency.exponentialRampToValueAtTime(650, st + 0.22);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.35, st + 0.03);
        g.gain.linearRampToValueAtTime(0.001, st + 0.26);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.28);
      }
      return 1500;
    }

    case 'sirtlon': {
      // Hyena whoop-laugh
      [510, 640, 480, 740, 430].forEach((freq, i) => {
        const st = t + i * 0.28;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(freq, st);
        o.frequency.linearRampToValueAtTime(freq * 0.72, st + 0.2);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.32, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.24);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.26);
      });
      return 1550;
    }

    case 'timsoh': {
      // Crocodile low bellow + water splash thump
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(68, t);
      o.frequency.linearRampToValueAtTime(42, t + 1.5);
      f.type = 'lowpass';
      f.frequency.value = 320;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.5, t + 0.12);
      g.gain.linearRampToValueAtTime(0.001, t + 1.7);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.75);
      return 1800;
    }

    case 'burgut': {
      // Eagle screech
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      f.type = 'bandpass';
      f.frequency.value = 2600;
      f.Q.value = 2.0;
      o.frequency.setValueAtTime(1350, t);
      o.frequency.linearRampToValueAtTime(1950, t + 0.2);
      o.frequency.linearRampToValueAtTime(980, t + 0.65);
      o.frequency.linearRampToValueAtTime(1500, t + 0.95);
      o.frequency.linearRampToValueAtTime(720, t + 1.55);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.45, t + 0.06);
      g.gain.linearRampToValueAtTime(0.001, t + 1.65);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.7);
      return 1750;
    }

    case 'kenguru': {
      // Elastic bounding thumps + soft cough
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.42;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(145 - i * 10, st);
        o.frequency.exponentialRampToValueAtTime(48, st + 0.2);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.42, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, st + 0.24);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.26);
      }
      return 1450;
    }

    case 'panda': {
      // Gentle panda bleat
      for (let i = 0; i < 2; i++) {
        const st = t + i * 0.72;
        const o = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lg = ctx.createGain();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(340, st);
        o.frequency.linearRampToValueAtTime(280, st + 0.5);
        lfo.frequency.value = 14;
        lg.gain.value = 16;
        lfo.connect(lg);
        lg.connect(o.frequency);
        f.type = 'bandpass';
        f.frequency.value = 820;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.38, st + 0.06);
        g.gain.linearRampToValueAtTime(0.001, st + 0.56);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        lfo.start(st);
        o.start(st);
        lfo.stop(st + 0.58);
        o.stop(st + 0.58);
      }
      return 1450;
    }

    case 'koala': {
      // Deep rumbling koala bellow
      const o = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(74, t);
      o.frequency.linearRampToValueAtTime(52, t + 1.5);
      lfo.frequency.value = 18;
      lg.gain.value = 12;
      lfo.connect(lg);
      lg.connect(o.frequency);
      f.type = 'lowpass';
      f.frequency.value = 320;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.44, t + 0.14);
      g.gain.linearRampToValueAtTime(0.001, t + 1.75);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      lfo.start(t);
      o.start(t);
      lfo.stop(t + 1.8);
      o.stop(t + 1.8);
      return 1850;
    }

    case 'begemot': {
      // Hippo deep resonant honk-grumble
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.52;
        const o = ctx.createOscillator();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(92 - i * 8, st);
        o.frequency.linearRampToValueAtTime(58, st + 0.38);
        f.type = 'lowpass';
        f.frequency.value = 410;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.48, st + 0.05);
        g.gain.linearRampToValueAtTime(0.001, st + 0.44);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.46);
      }
      return 1750;
    }

    case 'karkidon':
    case 'bizon':
    case 'qotos': {
      // Heavy low snort & deep grumble
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(id === 'karkidon' ? 88 : id === 'bizon' ? 76 : 82, t);
      o.frequency.linearRampToValueAtTime(52, t + 1.4);
      f.type = 'lowpass';
      f.frequency.setValueAtTime(480, t);
      f.frequency.linearRampToValueAtTime(240, t + 1.5);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.46, t + 0.1);
      g.gain.linearRampToValueAtTime(0.001, t + 1.65);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.7);
      return 1750;
    }

    case 'alpaka':
    case 'okapi':
    case 'manati': {
      // Gentle melodic hum
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      const base = id === 'alpaka' ? 240 : id === 'okapi' ? 190 : 165;
      o.frequency.setValueAtTime(base, t);
      o.frequency.linearRampToValueAtTime(base * 1.25, t + 0.6);
      o.frequency.linearRampToValueAtTime(base * 0.95, t + 1.45);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.36, t + 0.14);
      g.gain.linearRampToValueAtTime(0.001, t + 1.6);
      o.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.65);
      return 1700;
    }

    case 'olmaxon': {
      // Fast lively squirrel chatter
      [980, 1240, 1120, 1380, 960, 1290].forEach((freq, i) => {
        const st = t + i * 0.16;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, st);
        o.frequency.exponentialRampToValueAtTime(freq * 0.65, st + 0.1);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.3, st + 0.02);
        g.gain.linearRampToValueAtTime(0.001, st + 0.12);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.13);
      });
      return 1250;
    }

    case 'sugur':
    case 'tapir': {
      // Sharp mountain marmot / tapir whistle
      for (let i = 0; i < 2; i++) {
        const st = t + i * 0.68;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        const peak = id === 'sugur' ? 1850 : 1580;
        o.frequency.setValueAtTime(peak * 0.75, st);
        o.frequency.linearRampToValueAtTime(peak, st + 0.15);
        o.frequency.linearRampToValueAtTime(peak * 0.7, st + 0.45);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.35, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.5);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.52);
      }
      return 1450;
    }

    case 'antilopa': {
      // Quick antelope alarm snort
      for (let i = 0; i < 2; i++) {
        const st = t + i * 0.45;
        const o = ctx.createOscillator();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(340, st);
        o.frequency.exponentialRampToValueAtTime(160, st + 0.25);
        f.type = 'bandpass';
        f.frequency.value = 950;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.36, st + 0.03);
        g.gain.linearRampToValueAtTime(0.001, st + 0.3);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.32);
      }
      return 1150;
    }

    case 'eshak': {
      // Iconic two-tone donkey hee-haw bray
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.58;
        const o = ctx.createOscillator();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(520, st);
        o.frequency.linearRampToValueAtTime(210, st + 0.42);
        f.type = 'bandpass';
        f.frequency.value = 1150;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.45, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.48);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.5);
      }
      return 1850;
    }

    case 'oqqush':
    case 'goz':
    case 'pelikan': {
      // Trumpet honk
      for (let i = 0; i < 2; i++) {
        const st = t + i * 0.62;
        const o = ctx.createOscillator();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        const base = id === 'goz' ? 420 : id === 'oqqush' ? 350 : 280;
        o.frequency.setValueAtTime(base, st);
        o.frequency.linearRampToValueAtTime(base * 1.18, st + 0.16);
        o.frequency.linearRampToValueAtTime(base * 0.85, st + 0.42);
        f.type = 'bandpass';
        f.frequency.value = 1200;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.4, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.48);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.5);
      }
      return 1450;
    }

    case 'ordak': {
      // Classic duck quack-quack-quack
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.36;
        const o = ctx.createOscillator();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(410, st);
        o.frequency.linearRampToValueAtTime(290, st + 0.22);
        f.type = 'bandpass';
        f.frequency.setValueAtTime(1400, st);
        f.frequency.linearRampToValueAtTime(850, st + 0.22);
        f.Q.value = 2.5;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.42, st + 0.03);
        g.gain.linearRampToValueAtTime(0.001, st + 0.26);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.28);
      }
      return 1350;
    }

    case 'kakadu':
    case 'totiqush': {
      // Melodic tropical parrot whistles & squawks
      const notes = id === 'kakadu' ? [1100, 1480, 920, 1620] : [880, 1280, 1520, 1080];
      notes.forEach((freq, i) => {
        const st = t + i * 0.34;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, st);
        o.frequency.exponentialRampToValueAtTime(freq * 1.25, st + 0.14);
        o.frequency.exponentialRampToValueAtTime(freq * 0.8, st + 0.26);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.36, st + 0.03);
        g.gain.linearRampToValueAtTime(0.001, st + 0.28);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.3);
      });
      return 1550;
    }

    case 'ayiq':
    case 'yaguar':
    case 'qor_qoploni': {
      // Powerful bear / big cat growl
      const base = id === 'ayiq' ? 62 : id === 'yaguar' ? 68 : 88;
      const o = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o2.type = 'square';
      o.frequency.setValueAtTime(base, t);
      o.frequency.linearRampToValueAtTime(base * 2.1, t + 0.32);
      o.frequency.linearRampToValueAtTime(base * 0.72, t + 1.8);
      o2.frequency.setValueAtTime(base * 0.5, t);
      f.type = 'lowpass';
      f.frequency.setValueAtTime(480, t);
      f.frequency.linearRampToValueAtTime(860, t + 0.35);
      f.frequency.linearRampToValueAtTime(280, t + 1.85);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.5, t + 0.1);
      g.gain.linearRampToValueAtTime(0.001, t + 1.95);
      o.connect(f);
      o2.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o2.start(t);
      o.stop(t + 2.0);
      o2.stop(t + 2.0);
      return 2000;
    }

    case 'puma':
    case 'silovsin':
    case 'serval': {
      // Cougar scream / wildcat yowl
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      const peak = id === 'puma' ? 980 : id === 'silovsin' ? 840 : 1080;
      o.frequency.setValueAtTime(360, t);
      o.frequency.linearRampToValueAtTime(peak, t + 0.32);
      o.frequency.linearRampToValueAtTime(420, t + 1.35);
      f.type = 'bandpass';
      f.frequency.value = 1400;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.4, t + 0.08);
      g.gain.linearRampToValueAtTime(0.001, t + 1.48);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.5);
      return 1550;
    }

    case 'mangust': {
      // Rapid mongoose chittering chirps
      for (let i = 0; i < 5; i++) {
        const st = t + i * 0.22;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(840 + (i % 2) * 240, st);
        o.frequency.exponentialRampToValueAtTime(480, st + 0.14);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.32, st + 0.02);
        g.gain.linearRampToValueAtTime(0.001, st + 0.16);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.18);
      }
      return 1300;
    }

    case 'komodo':
    case 'anakonda':
    case 'kobra': {
      // Menacing reptile hiss using modulated noise buffer
      const dur = 1.6;
      const bufSize = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.setValueAtTime(id === 'kobra' ? 3400 : 2200, t);
      f.Q.value = 1.8;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.42, t + 0.12);
      g.gain.linearRampToValueAtTime(0.34, t + 1.0);
      g.gain.linearRampToValueAtTime(0.001, t + dur);
      noise.connect(f);
      f.connect(g);
      g.connect(dest);
      noise.start(t);
      noise.stop(t + dur);
      return 1650;
    }

    case 'piranya':
    case 'qilichbaliq': {
      // Rapid underwater drum grunts / swift water pulses
      for (let i = 0; i < 4; i++) {
        const st = t + i * 0.28;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(id === 'piranya' ? 140 : 95, st);
        o.frequency.exponentialRampToValueAtTime(42, st + 0.18);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.44, st + 0.03);
        g.gain.linearRampToValueAtTime(0.001, st + 0.22);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.24);
      }
      return 1350;
    }

    case 'delfin': {
      // Joyful dolphin high whistles + echolocation clicks
      [1450, 1850, 2100].forEach((freq, i) => {
        const st = t + i * 0.44;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, st);
        o.frequency.linearRampToValueAtTime(freq + 420, st + 0.18);
        o.frequency.linearRampToValueAtTime(freq - 180, st + 0.34);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.34, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.38);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.4);
      });
      return 1550;
    }

    case 'lochin':
    case 'qirgiy': {
      // Sharp falcon / hawk screech
      const o = ctx.createOscillator();
      const f = ctx.createBiquadFilter();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      f.type = 'bandpass';
      f.frequency.value = 2800;
      f.Q.value = 2.2;
      const startFreq = id === 'lochin' ? 1650 : 1480;
      o.frequency.setValueAtTime(startFreq, t);
      o.frequency.linearRampToValueAtTime(startFreq + 520, t + 0.18);
      o.frequency.linearRampToValueAtTime(920, t + 1.1);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.42, t + 0.05);
      g.gain.linearRampToValueAtTime(0.001, t + 1.35);
      o.connect(f);
      f.connect(g);
      g.connect(dest);
      o.start(t);
      o.stop(t + 1.4);
      return 1450;
    }

    case 'boyogli': {
      // Classic owl "Hoo-hooo" hoot
      const hoots = [
        { st: 0, dur: 0.38, freq: 390 },
        { st: 0.56, dur: 0.78, freq: 340 },
      ];
      hoots.forEach((h) => {
        const st = t + h.st;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(h.freq, st);
        o.frequency.linearRampToValueAtTime(h.freq * 0.88, st + h.dur);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.46, st + 0.06);
        g.gain.linearRampToValueAtTime(0.001, st + h.dur);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + h.dur + 0.04);
      });
      return 1500;
    }

    case 'pingvin': {
      // Playful penguin trumpet bray
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.42;
        const o = ctx.createOscillator();
        const f = ctx.createBiquadFilter();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(310 + i * 30, st);
        o.frequency.linearRampToValueAtTime(240, st + 0.3);
        f.type = 'bandpass';
        f.frequency.value = 980;
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.38, st + 0.04);
        g.gain.linearRampToValueAtTime(0.001, st + 0.34);
        o.connect(f);
        f.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.36);
      }
      return 1450;
    }

    case 'akula':
    default: {
      // Deep ocean water rumble + sonar pulse
      for (let i = 0; i < 3; i++) {
        const st = t + i * 0.52;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(48 + i * 6, st);
        o.frequency.linearRampToValueAtTime(28, st + 0.45);
        g.gain.setValueAtTime(0, st);
        g.gain.linearRampToValueAtTime(0.5, st + 0.06);
        g.gain.linearRampToValueAtTime(0.001, st + 0.48);
        o.connect(g);
        g.connect(dest);
        o.start(st);
        o.stop(st + 0.5);
      }
      return 1650;
    }
  }
}
