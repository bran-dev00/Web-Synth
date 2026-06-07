import { useEffect, useContext } from "react";
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

  useEffect(() => {
    if (!synthRef?.current) {
      console.error("SynthRef is null");
      return;
    }

    const onKeyDown = (e: KeyboardEvent) =>
      handleKeyDown(e, synthRef.current, playNote);
    const onKeyUp = (e: KeyboardEvent) =>
      handleKeyUp(e, synthRef.current, releaseNote);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [synthRef, playNote, releaseNote]);

  return {
    handleKeyDown,
    handleKeyUp,
  };
};

export default useKeyboardSynth;
