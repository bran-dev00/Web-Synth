import React, { createContext, useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { SynthTypes, Note } from "../types/types";
import { useKeyboardSynth } from "@/hooks/useKeyboardSynth";
// synthtypes

{
  /* 
  SynthTypes = "AMSynth" | "FMSynth" | "PolySynth" | "MonoSynth" |
  "MembraneSynth" | "PluckSynth" | "NoiseSynth" | "MetalSynth" | "DuoSynth";

  Tone.Synth, Tone.AmSynth, Tone.FMSynth, Tone.PolySynth,
  Tone.MonoSynth, Tone.MembraneSynth, Tone.PluckSynth, Tone.NoiseSynth,
  Tone.MetalSynth, Tone.DuoSynth
     

  */
}

export interface SynthContextType {
  synthRef: React.RefObject<SynthTypes | null> | null;
  currentSynthType: string;
  isPolyphonic: boolean;

  changeSynth: (newSynth: string) => void;
  playNote: (synth: SynthTypes, note: Note) => void;
  releaseNote: (synth: SynthTypes, note: Note) => void;
  triggerAttackRelease: (synth: SynthTypes, note: Note) => void;
}

export const SynthContext = createContext<SynthContextType>({
  synthRef: null,
  currentSynthType: "",
  isPolyphonic: false,
  changeSynth: () => {},
  playNote: () => {},
  releaseNote: () => {},
  triggerAttackRelease: () => {},
});

interface SynthProviderProps {
  children: React.ReactNode;
}

export const SynthProvider: React.FC<SynthProviderProps> = ({ children }) => {
  const synthRef = useRef<SynthTypes | null>(null);
  const [currentSynthType, setCurrentSynthType] = useState<string>(
    synthRef.current?.name || ""
  );
  const [isPolyphonic, setIsPolyphonic] = useState<boolean>(true);

  useEffect(() => {
    Tone.start();
    synthRef.current = new Tone.Synth().toDestination();

    return () => {
      if (synthRef?.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  const changeSynth = (newSynth: string) => {
    if (synthRef?.current) {
      synthRef?.current.dispose();

      switch (newSynth) {
        case "AMSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("AMSynth");
          synthRef.current = new Tone.AMSynth().toDestination();
          break;
        case "FMSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("FMSynth");
          synthRef.current = new Tone.FMSynth().toDestination();
          break;
        case "PolySynth":
          setIsPolyphonic(true);
          setCurrentSynthType("PolySynth");
          synthRef.current = new Tone.PolySynth(Tone.FMSynth).toDestination();
          break;
        case "MonoSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("MonoSynth");
          synthRef.current = new Tone.MonoSynth().toDestination();
          break;
        case "MembraneSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("MembraneSynth");
          synthRef.current = new Tone.MembraneSynth().toDestination();
          break;
        case "PluckSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("PluckSynth");
          synthRef.current = new Tone.PluckSynth().toDestination();
          break;
        case "NoiseSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("NoiseSynth");
          synthRef.current = new Tone.NoiseSynth().toDestination();
          break;
        case "MetalSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("MetalSynth");
          synthRef.current = new Tone.MetalSynth().toDestination();
          break;
        case "DuoSynth":
          setIsPolyphonic(false);
          setCurrentSynthType("DuoSynth");
          synthRef.current = new Tone.DuoSynth().toDestination();
          break;
        default:
          setIsPolyphonic(false);
          setCurrentSynthType("AMSynth");
          synthRef.current = new Tone.AMSynth().toDestination();
          break;
      }
    }
  };

  const currentNotesPressed: string[] = [];

  const playNote = (synth: SynthTypes, note: Note) => {
    if (synth) {
      if (synth.name == "PolySynth") {
        if (currentNotesPressed.includes(note.name)) return;
        currentNotesPressed.push(note.name);
        synth.triggerAttack(note.name);
      } else {
        if (currentNotesPressed.includes(note.name)) return;
        currentNotesPressed.push(note.name);
        synth.triggerAttack(note.name);
      }
    }
  };

  const stopNote = (synth: SynthTypes, note: Note) => {
    if (synth) {
      if (synth.name == "PolySynth") {
        if (!note) return;

        const noteIndex = currentNotesPressed.findIndex((n) => n === note.name);
        if (noteIndex !== -1) {
          synth.triggerRelease(note.name);
          currentNotesPressed.splice(noteIndex, 1);
        }
      } else {
        if (!note) return;

        const noteIndex = currentNotesPressed.findIndex((n) => n === note.name);
        if (noteIndex !== -1) {
          // synth.triggerRelease(note.name);
          synth.triggerRelease();
          currentNotesPressed.splice(noteIndex, 1);
        }
      }
    }
  };

  const triggerAttackRelease = (synth: SynthTypes, note: Note) => {
    if (synth) {
      synth.triggerAttackRelease(note.name, "8n");
    }
  };

  const synthValue: SynthContextType = {
    synthRef: synthRef,
    currentSynthType: currentSynthType,
    isPolyphonic: isPolyphonic,
    changeSynth: changeSynth,
    playNote: playNote,
    releaseNote: stopNote,
    triggerAttackRelease: triggerAttackRelease,
  };

  return (
    <SynthContext.Provider value={synthValue}>{children}</SynthContext.Provider>
  );
};

export default SynthProvider;
