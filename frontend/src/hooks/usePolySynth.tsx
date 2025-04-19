import * as Tone from "tone";
import { Note, SynthTypes } from "../types/types";

const currentNotesPressed: string[] = [];

export const playNote = (synth: SynthTypes, note: Note) => {
  if (synth) {
    if (currentNotesPressed.includes(note.name)) return;
    currentNotesPressed.push(note.name);
    synth.triggerAttack(note.name);
  }
};

export const stopNote = (synth: SynthTypes, note: Note) => {
  if (synth) {
    if (!note) return;

    const noteIndex = currentNotesPressed.findIndex((n) => n === note.name);
    if (noteIndex !== -1) {
      synth.triggerRelease(note.name);
      currentNotesPressed.splice(noteIndex, 1);
    }
  }
};
