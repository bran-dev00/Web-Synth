import { useEffect, useContext } from "react";
import { Note, SynthInstance } from "../types/types";
import { keyNoteMapByOctave } from "@/utils/utils";
import { SynthContext } from "@/contexts/SynthContext";


const handleKeyDown = (
  e: KeyboardEvent,
  synthRef: SynthInstance | null | undefined,
  playNote: (synthRef: SynthInstance, note: Note) => void,
  updateOctave: (newOctave: number) => void,
  currentOctave: number
) => {
  if (!synthRef) return;

  if (e.shiftKey && e.key === "ArrowUp") {
    e.preventDefault();
    if (currentOctave >= 7) {
      console.warn("Already at maximum octave. Cannot shift up.");
      return;
    }
    updateOctave(currentOctave + 1);
    return;
  }

  if (e.shiftKey && e.key === "ArrowDown") {
    e.preventDefault();
    if (currentOctave <= 1) {
      console.warn("Already at minimum octave. Cannot shift down.");
      return;
    }
    updateOctave(currentOctave - 1);
    return;
  }

  const note = keyNoteMapByOctave(currentOctave).get(e.key.toLowerCase());
  if (note) {
    playNote(synthRef, note);
  }
};

const handleKeyUp = (
  e: KeyboardEvent,
  synthRef: SynthInstance | null | undefined,
  releaseNote: (synthRef: SynthInstance, note: Note) => void,
  currentOctave: number
) => {
  if (synthRef) {

    const note = keyNoteMapByOctave(currentOctave).get(e.key.toLowerCase());

    if (note) {
      releaseNote(synthRef, note);
    }
  }
};

export const useKeyboardSynth = () => {
  const { synthRef, playNote, releaseNote, currentOctave, updateOctave } = useContext(SynthContext);

  useEffect(() => {
    if (!synthRef?.current) {
      console.error("SynthRef is null");
      return;
    }

    const onKeyDown = (e: KeyboardEvent) =>
      handleKeyDown(e, synthRef.current, playNote, updateOctave, currentOctave);
    const onKeyUp = (e: KeyboardEvent) =>
      handleKeyUp(e, synthRef.current, releaseNote, currentOctave);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [synthRef, playNote, releaseNote, updateOctave, currentOctave]);

  return {
    handleKeyDown,
    handleKeyUp,
  };
};

export default useKeyboardSynth;
