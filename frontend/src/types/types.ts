import * as Tone from "tone";

export interface Note {
  name: string;
  duration?: Tone.Unit.Time;
}

//Synth types

export type SynthTypes =
  | Tone.MonoSynth
  | Tone.AMSynth
  | Tone.FMSynth
  | Tone.DuoSynth
  | Tone.Sampler
  | Tone.NoiseSynth
  | Tone.MembraneSynth
  | Tone.PluckSynth
  | Tone.Synth
  | Tone.MetalSynth
  | Tone.PolySynth;
