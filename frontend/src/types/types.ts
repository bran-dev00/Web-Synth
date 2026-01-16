import * as Tone from "tone";

export interface Note {
  name: string;
  duration?: Tone.Unit.Time;
}

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

export type polySynthOptions =
  | { options: Tone.PolySynthOptions<Tone.AMSynth> }
  | { options: Tone.PolySynthOptions<Tone.FMSynth> }
  | { options: Tone.PolySynthOptions<Tone.DuoSynth> }
  | { options: Tone.PolySynthOptions<Tone.MembraneSynth> }
  | { options: Tone.PolySynthOptions<Tone.PluckSynth> }
  | { options: Tone.PolySynthOptions<Tone.Synth> }
  | { options: Tone.PolySynthOptions<Tone.MetalSynth> };
