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

// export type SynthTypes =
//   | { type: Tone.MonoSynth; options: Tone.MonoSynthOptions }
//   | { type: Tone.AMSynth; options: Tone.AMSynthOptions }
//   | { type: Tone.FMSynth; options: Tone.FMSynthOptions }
//   | { type: Tone.DuoSynth; options: Tone.DuoSynthOptions }
//   | { type: Tone.Sampler; options: Tone.SamplerOptions }
//   | { type: Tone.NoiseSynth; options: Tone.NoiseSynthOptions }
//   | { type: Tone.MembraneSynth; options: Tone.MembraneSynthOptions }
//   | { type: Tone.PluckSynth; options: Tone.PluckSynthOptions }
//   | { type: Tone.Synth; options: Tone.SynthOptions }
//   | { type: Tone.MetalSynth; options: Tone.MetalSynthOptions }
//   | { type: Tone.PolySynth; options: Tone.PolySynthOptions<Tone.AMSynth> };

export type polySynthOptions =
  | { options: Tone.PolySynthOptions<Tone.AMSynth> }
  | { options: Tone.PolySynthOptions<Tone.FMSynth> }
  | { options: Tone.PolySynthOptions<Tone.DuoSynth> }
  | { options: Tone.PolySynthOptions<Tone.MembraneSynth> }
  | { options: Tone.PolySynthOptions<Tone.PluckSynth> }
  | { options: Tone.PolySynthOptions<Tone.Synth> }
  | { options: Tone.PolySynthOptions<Tone.MetalSynth> };
