import * as Tone from "tone";

export interface Note {
  name: string;
  duration?: Tone.Unit.Time;
}

export type SynthRef = React.RefObject<SynthInstance | null> | null;

export type SynthInstance = 
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


//Keeping it to simple effects for now
export type EffectInstance = 
| Tone.Chorus
| Tone.Filter
| Tone.Reverb
| Tone.Phaser
| Tone.Distortion

export type EffectType<T extends EffectTypeName = EffectTypeName> = {
  id: number,
  instance: EffectInstance,
  nickname: string,
  effectTypeName : T,
  settings?: object
};

export type EffectMap ={
  [K in EffectTypeName]: EffectType<K>[]
};

export type EffectTypeName =
  | "Chorus"
  | "Filter"
  | "Distortion"
  | "Reverb"
  | "Phaser"

export type ParamType = 'number' | 'boolean' | 'select';

export interface EffectParameterConfig{
  label: string;
  property: string; 
  min?: number;
  max?: number;
  step?: number;
  type: ParamType;
  options?: string[]; // for drop downs with several options
}

export interface EffectSchema {
  name: string;
  params: EffectParameterConfig[];
}

// Type Guards 

export const isPolySynth = (synth: SynthInstance): synth is Tone.PolySynth =>{
  return synth instanceof Tone.PolySynth;
}
