import { useEffect, useRef, createContext, useContext } from "react";
import * as Tone from "tone";
import { Note, SynthTypes } from "../types/types";

interface UseKeyboardSynth {
  synthRef: React.RefObject<SynthTypes | null>;
  playNote: (synth: SynthTypes, note: Note) => void;
}

const currentNotesPressed: string[] = [];

const keyNoteMap = new Map<string, Note>([
  ["a", { name: "C3", duration: "8n" }],
  ["w", { name: "C#3", duration: "8n" }],
  ["s", { name: "D3", duration: "8n" }],
  ["e", { name: "D#3", duration: "8n" }],
  ["d", { name: "E3", duration: "8n" }],
  ["f", { name: "F3", duration: "8n" }],
  ["t", { name: "F#3", duration: "8n" }],
  ["g", { name: "G3", duration: "8n" }],
  ["y", { name: "G#3", duration: "8n" }],
  ["h", { name: "A3", duration: "8n" }],
  ["u", { name: "A#3", duration: "8n" }],
  ["j", { name: "B3", duration: "8n" }],
  ["k", { name: "C4", duration: "8n" }],
  ["o", { name: "C#4", duration: "8n" }],
  ["l", { name: "D4", duration: "8n" }],
  ["p", { name: "D#4", duration: "8n" }],
  [";", { name: "E4", duration: "8n" }],
]);

const monoSynthPlayNote = (synthRef: SynthTypes | null, note: Note) => {
  if (synthRef) {
    synthRef.triggerAttack(note.name, note.duration);
  }
};

const polySynthPlayNote = (synthRef: SynthTypes | null, note: Note) => {
  if (synthRef) {
    if (currentNotesPressed.includes(note.name)) {
      // console.log("Note already pressed");
      return;
    } else {
      currentNotesPressed.push(note.name);
      synthRef.triggerAttack(note.name, note.duration as Tone.Unit.Time);
    }
  }
};

const monoSynthStopNote = (synthRef: SynthTypes | null) => {
  if (synthRef) {
    synthRef.triggerRelease();
  }
};

const polySynthStopNote = (e: EventTarget, synthRef: SynthTypes | null) => {
  if (currentNotesPressed.length === 0) {
    return;
  }

  const Note = keyNoteMap.get(e.key.toLowerCase());

  if (!Note) {
    console.log("Note not found");
    return;
  }

  const noteIndex = currentNotesPressed.findIndex((note) => note === Note.name);
  if (noteIndex === -1) {
    // console.log("Note not found in current notes pressed");
    return;
  } else {
    // Remove the note from the array
    synthRef?.triggerRelease(currentNotesPressed[noteIndex]);
    currentNotesPressed.splice(noteIndex, 1);
  }
};

const handleKeyDown = (e: KeyboardEvent, synthRef: SynthTypes | null) => {
  if (synthRef) {
    if (synthRef.name !== "PolySynth") {
      monoSynthPlayNote(synthRef, keyNoteMap.get(e.key.toLowerCase()) as Note);
    } else {
      polySynthPlayNote(synthRef, keyNoteMap.get(e.key.toLowerCase()) as Note);
    }
  }
};

const handleKeyUp = (e: EventTarget, synthRef: SynthTypes | null) => {
  if (synthRef) {
    if (synthRef.name !== "PolySynth") {
      monoSynthStopNote(synthRef);
    } else {
      polySynthStopNote(e, synthRef);
    }
  }
};

const useKeyboardSynth = (): UseKeyboardSynth => {
  const synthRef = useRef<SynthTypes | null>(null);

  useEffect(() => {
    Tone.start();
    //AMSynth is the default synth
    synthRef.current = new Tone.AMSynth().toDestination();

    if (!synthRef.current) {
      console.error("SynthRef is null");
    } else {
      window.addEventListener("keydown", (e) => {
        handleKeyDown(e, synthRef?.current);
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
    playNote: (synth: SynthTypes, note: Note) => {
      if (synth) {
        if (synth.name !== "PolySynth") {
          monoSynthPlayNote(synth, note);
        } else {
          polySynthPlayNote(synth, note);
        }
      }
    },
  };
};

export default useKeyboardSynth;
