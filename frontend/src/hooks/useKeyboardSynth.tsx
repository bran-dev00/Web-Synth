import { useEffect, useContext } from "react";
// import * as Tone from "tone";
import { Note, SynthInstance } from "../types/types";
import { keyNoteMap } from "@/utils/utils";
import { SynthContext } from "@/contexts/SynthContext";


const handleKeyDown = (
  e: KeyboardEvent,
  synthRef: SynthInstance | null | undefined,
  playNote: (synthRef: SynthInstance, note: Note) => void
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
  synthRef: SynthInstance | null | undefined,
  releaseNote: (synthRef: SynthInstance, note: Note) => void
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
  // const synthRef = useRef<SynthInstance | null>(null);

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
