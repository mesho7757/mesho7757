import { mediaStorage } from './mediaStorage';

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.55;
  private masterGain: GainNode | null = null;
  private intervalId: any = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioName: string = '';
  private noteIndex: number = 0;

  constructor() {
    // Attempt auto-restore stored audio
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.restoreSavedAudio();
      }, 500);
    }
  }

  private async restoreSavedAudio() {
    try {
      const saved = await mediaStorage.getCustomAudio();
      if (saved && saved.dataUrl) {
        this.loadCustomDataUrl(saved.dataUrl, saved.name);
      }
    } catch {
      // ignore
    }
  }


  // Emotional, peaceful romantic chord progression (Db - Fm - Bbm - Gb - Ebm - Ab)
  private melodyNotes: { freq: number; dur: number; octave: number }[] = [
    { freq: 277.18, dur: 1.6, octave: 4 }, // Db4
    { freq: 349.23, dur: 1.2, octave: 4 }, // F4
    { freq: 415.30, dur: 2.0, octave: 4 }, // Ab4
    { freq: 554.37, dur: 2.4, octave: 5 }, // Db5
    { freq: 523.25, dur: 1.4, octave: 5 }, // C5
    { freq: 415.30, dur: 1.8, octave: 4 }, // Ab4
    { freq: 349.23, dur: 2.2, octave: 4 }, // F4
    { freq: 311.13, dur: 1.6, octave: 4 }, // Eb4
    { freq: 277.18, dur: 2.8, octave: 4 }, // Db4
    { freq: 233.08, dur: 1.8, octave: 3 }, // Bb3
    { freq: 349.23, dur: 1.6, octave: 4 }, // F4
    { freq: 466.16, dur: 2.6, octave: 4 }, // Bb4
    { freq: 415.30, dur: 2.0, octave: 4 }, // Ab4
    { freq: 369.99, dur: 1.8, octave: 4 }, // Gb4
    { freq: 349.23, dur: 2.4, octave: 4 }, // F4
    { freq: 311.13, dur: 3.0, octave: 4 }, // Eb4
  ];

  private padChords: number[][] = [
    [138.59, 207.65, 277.18, 349.23], // Db Maj
    [174.61, 261.63, 349.23, 415.30], // Fm
    [116.54, 174.61, 233.08, 277.18], // Bbm
    [185.00, 277.18, 369.99, 466.16], // Gb Maj
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public play() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.customAudio) {
      this.customAudio.play().catch(() => {});
      this.isPlaying = true;
      return;
    }

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.startAmbientLoop();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.muted = mute;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public async loadCustomFile(file: File) {
    this.customAudioName = file.name;
    try {
      const dataUrl = await mediaStorage.saveCustomAudio(file);
      this.loadCustomDataUrl(dataUrl, file.name);
    } catch {
      const url = URL.createObjectURL(file);
      this.loadCustomDataUrl(url, file.name);
    }
  }

  public loadCustomDataUrl(url: string, name?: string) {
    if (name) this.customAudioName = name;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.customAudio.muted = this.isMuted;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.isPlaying) {
      this.customAudio.play().catch(() => {});
    }
  }

  public getCustomAudioName(): string {
    return this.customAudioName;
  }


  private startAmbientLoop() {
    if (!this.ctx || !this.masterGain) return;

    let chordIdx = 0;

    // Play pad chord swell
    const playChordSwell = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const notes = this.padChords[chordIdx % this.padChords.length];
      chordIdx++;

      notes.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 2.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 8.0);
      });
    };

    // Play piano-like romantic chime
    const playPianoNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const note = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.noteIndex++;

      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, this.ctx.currentTime);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(note.freq * 2, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.dur + 1.2);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + note.dur + 1.5);
      oscHarmonic.stop(now + note.dur + 1.5);
    };

    playChordSwell();
    playPianoNote();

    this.intervalId = setInterval(() => {
      if (Math.random() > 0.3) {
        playPianoNote();
      }
      if (this.noteIndex % 4 === 0) {
        playChordSwell();
      }
    }, 1800);
  }
}

export const romanticAudio = new RomanticAudioEngine();
