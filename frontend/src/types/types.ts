import * as Tone from "tone";

export interface Note {
  name: string;
  duration?: Tone.Unit.Time;
}

export type SynthTypes =
  | Tone.AMSynth
  | Tone.DuoSynth
  | Tone.FMSynth
  | Tone.MembraneSynth
  | Tone.MetalSynth
  | Tone.MonoSynth
  | Tone.NoiseSynth
  | Tone.PluckSynth
  | Tone.PolySynth
  | Tone.Sampler
  | Tone.Synth;


export type PolyCompatibleSynth =
| typeof Tone.Synth
| typeof Tone.AMSynth
| typeof Tone.FMSynth
| typeof Tone.MonoSynth;
