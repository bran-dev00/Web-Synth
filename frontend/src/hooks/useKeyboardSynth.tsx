import { useEffect, useRef, createContext, useContext } from "react";
import * as Tone from "tone";
import { Note, SynthTypes } from "../types/types";
import { keyNoteMap } from "@/utils/utils";
import { SynthContext } from "@/contexts/SynthContext";

// const keyNoteMap = new Map<string, Note>([
//   ["a", { name: "C3", duration: "8n" }],
//   ["w", { name: "C#3", duration: "8n" }],
//   ["s", { name: "D3", duration: "8n" }],
//   ["e", { name: "D#3", duration: "8n" }],
//   ["d", { name: "E3", duration: "8n" }],
//   ["f", { name: "F3", duration: "8n" }],
//   ["t", { name: "F#3", duration: "8n" }],
//   ["g", { name: "G3", duration: "8n" }],
//   ["y", { name: "G#3", duration: "8n" }],
//   ["h", { name: "A3", duration: "8n" }],
//   ["u", { name: "A#3", duration: "8n" }],
//   ["j", { name: "B3", duration: "8n" }],
//   ["k", { name: "C4", duration: "8n" }],
//   ["o", { name: "C#4", duration: "8n" }],
//   ["l", { name: "D4", duration: "8n" }],
//   ["p", { name: "D#4", duration: "8n" }],
//   [";", { name: "E4", duration: "8n" }],
// ]);

const handleKeyDown = (
  e: KeyboardEvent,
  synthRef: SynthTypes | null,
  playNote: (synthRef: SynthTypes, note: Note) => void
) => {
  if (synthRef) {
    const note = keyNoteMap.get(e.key.toLowerCase());
    if (note) {
      playNote(synthRef, note);
    }
  }
};

const handleKeyUp = (
  e: KeyboardEvent,
  synthRef: SynthTypes | null,
  releaseNote: (synthRef: SynthTypes, note: Note) => void
) => {
  if (synthRef) {
    const note = keyNoteMap.get(e.key.toLowerCase());

    if (note) {
      releaseNote(synthRef, note);
    }
  }
};

export const useKeyboardSynth = () => {
  const { synthRef, playNote, releaseNote } = useContext(SynthContext);
  // const synthRef = useRef<SynthTypes | null>(null);

  useEffect(() => {
    //TODO: later change the event listener to a specific component
    if (!synthRef?.current) {
      console.error("SynthRef is null");
    } else {
      window.addEventListener("keydown", (e) => {
        handleKeyDown(e, synthRef?.current, playNote);
      });

      window.addEventListener("keyup", (e) =>
        handleKeyUp(e, synthRef?.current, releaseNote)
      );
    }

    //Cleanup function to remove event listeners and dispose of the synth
    return () => {
      synthRef?.current?.dispose();
      window.removeEventListener("keydown", (e) =>
        handleKeyDown(e, synthRef?.current, playNote)
      );
      window.removeEventListener("keyup", (e) =>
        handleKeyUp(e, synthRef?.current, releaseNote)
      );
    };
  }, []);

  return {
    handleKeyDown,
    handleKeyUp,
  };
};

export default useKeyboardSynth;
