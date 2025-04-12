import * as Tone from "tone";
import { SynthType, Note } from "../types/types";

const playNote = (synth: SynthType, note: Note) => {
  if (synth) {
    synth.triggerAttack(note.name);
  }
};

const stopNote = (synth: SynthType, note: Note) => {
  if (synth) {
    synth.triggerRelease(note.name);
  }
};
