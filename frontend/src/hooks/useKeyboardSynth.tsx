import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { Note } from "../types/types";

interface UseKeyboardSynth {
  synthRef: React.RefObject<Tone.PolySynth | null>;
  playNote: (note: Note) => void;
}

const currentNotesPressed: string[] = [];

const keyNoteMap = new Map<string, Note>([
  ["a", { name: "C2", duration: "8n" }],
  ["w", { name: "C#2", duration: "8n" }],
  ["s", { name: "D2", duration: "8n" }],
  ["e", { name: "D#2", duration: "8n" }],
  ["d", { name: "E2", duration: "8n" }],
  ["f", { name: "F2", duration: "8n" }],
  ["t", { name: "F#2", duration: "8n" }],
  ["g", { name: "G2", duration: "8n" }],
  ["y", { name: "G#2", duration: "8n" }],
  ["h", { name: "A2", duration: "8n" }],
  ["u", { name: "A#2", duration: "8n" }],
  ["j", { name: "B2", duration: "8n" }],
  ["k", { name: "C3", duration: "8n" }],
  ["o", { name: "C#3", duration: "8n" }],
  ["l", { name: "D3", duration: "8n" }],
  ["p", { name: "D#3", duration: "8n" }],
  [";", { name: "E3", duration: "8n" }],
]);

const playNote = (synthRef: Tone.PolySynth | null, note: Note) => {
  if (synthRef) {
    if (currentNotesPressed.includes(note.name)) {
      // console.log("Note already pressed");
      return;
    } else {
      currentNotesPressed.push(note.name);
      synthRef.triggerAttack(note.name, note.duration);
    }
  }
};

const handleKeyDown = (e: KeyboardEvent, synthRef: Tone.PolySynth | null) => {
  if (synthRef) {
    playNote(synthRef, keyNoteMap.get(e.key.toLowerCase()) as Note);
  }
};

const handleKeyUp = (e: KeyboardEvent, synthRef: Tone.PolySynth | null) => {
  if (synthRef) {
    if (currentNotesPressed.length === 0) {
      return;
    }

    const Note = keyNoteMap.get(e.key.toLowerCase());

    if (!Note) {
      console.log("Note not found");
      return;
    }

    const noteIndex = currentNotesPressed.findIndex(
      (note) => note === Note.name
    );
    if (noteIndex === -1) {
      console.log("Note not found in current notes pressed");
      return;
    } else {
      // Remove the note from the array
      synthRef.triggerRelease(currentNotesPressed[noteIndex]);
      currentNotesPressed.splice(noteIndex, 1);
    }

    // currentNotesPressed.splice(noteIndex, 1);
    // console.log(currentNotesPressed);
  }
};

const useKeyboardSynth = (): UseKeyboardSynth => {
  const synthRef = useRef<Tone.PolySynth | null>(null);

  useEffect(() => {
    Tone.start();
    synthRef.current = new Tone.PolySynth().toDestination();

    if (!synthRef.current) {
      console.error("SynthRef is null");
    } else {
      window.addEventListener("keydown", (e) => {
        handleKeyDown(e, synthRef.current);
      });

      window.addEventListener("keyup", (e) => handleKeyUp(e, synthRef.current));
    }

    //Cleanup function to remove event listeners and dispose of the synth
    return () => {
      synthRef.current?.dispose();
      window.removeEventListener("keydown", (e) =>
        handleKeyDown(e, synthRef.current)
      );
      window.removeEventListener("keyup", (e) =>
        handleKeyUp(e, synthRef.current)
      );
    };
  }, []);

  return {
    synthRef: synthRef,
    playNote: (note: Note) => playNote(synthRef?.current, note),
  };
};

export default useKeyboardSynth;
