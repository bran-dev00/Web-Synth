import React, { createContext, useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { SynthInstance, Note, EffectType, SynthRef } from "../types/types";


export type SynthContextType = {
  synthRef: SynthRef;
  currentSynthType: string;
  isPolyphonic: boolean;
  effectChain: EffectType[];
  activeNoteNames: string[];
  currentOctave: number;

  setEffectChain: React.Dispatch<React.SetStateAction<EffectType[]>>;


  updateOctave: (newOctave: number) => void;
  changeSynth: (newSynth: string) => void;
  playNote: (synth: SynthInstance, note: Note) => void;
  releaseNote: (synth: SynthInstance, note: Note) => void;
  triggerAttackRelease: (synth: SynthInstance, note: Note) => void;
}


export const SynthContext = createContext<SynthContextType>({
  synthRef: null,
  currentSynthType: "",
  isPolyphonic: false,
  effectChain: [],
  activeNoteNames: [],
  currentOctave: 4, //default octave 

  updateOctave: () => { },
  setEffectChain: () => { },
  changeSynth: () => { },
  playNote: () => { },
  releaseNote: () => { },
  triggerAttackRelease: () => { },
});

type SynthProviderProps = {
  children: React.ReactNode;
}


export const SynthProvider: React.FC<SynthProviderProps> = ({ children }) => {
  const synthRef = useRef<SynthInstance | null>(null);

  const [currentSynthType, setCurrentSynthType] = useState<string>(
    synthRef.current?.name || "",
  );


  const [isPolyphonic, setIsPolyphonic] = useState<boolean>(true);
  const currentNotesPressed = useRef<string[]>([]);
  const [activeNoteNames, setActiveNoteNames] = useState<string[]>([]);
  const [currentOctave, setCurrentOctave] = useState<number>(4);


  const [effectChain, setEffectChain] = useState<EffectType[]>([]);

  // const effects = new Map<EffectTypeName, EffectType[]>();

  //Initialize synthRef on load/initial render
  useEffect(() => {
    Tone.start();
    const initialSynth = new Tone.Synth().toDestination();

    synthRef.current = initialSynth;
    setCurrentSynthType(synthRef.current.name);

    //Clean up
    return () => {
      if (synthRef?.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  const updateOctave = (newOctave: number) => {
    if (newOctave < 1 || newOctave > 7) {
      console.error("Octave out of bounds. Must be between 1 and 7.");
      return;
    }

    setCurrentOctave(newOctave);
  }

  const changeSynth = (newSynth: string) => {
    if (synthRef?.current) {
      synthRef?.current.dispose();

      switch (newSynth) {
        case "Synth":
          setIsPolyphonic(false);
          setCurrentSynthType("Synth");
          synthRef.current = new Tone.Synth().toDestination();
          break;
        case "AMSynth":
          setIsPolyphonic(true);
          setCurrentSynthType("AMSynth");
          synthRef.current = new Tone.AMSynth().toDestination();
          break;
        case "FMSynth":
          setIsPolyphonic(true);
          setCurrentSynthType("FMSynth");
          synthRef.current = new Tone.FMSynth().toDestination();
          break;
        case "PolySynth":
          setIsPolyphonic(true);
          setCurrentSynthType("PolySynth");
          synthRef.current = new Tone.PolySynth(Tone.AMSynth).toDestination();
          break;
        case "MonoSynth":
          setIsPolyphonic(true);
          setCurrentSynthType("MonoSynth");
          synthRef.current = new Tone.MonoSynth().toDestination();
          break;
        case "MembraneSynth":
          setIsPolyphonic(true);
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
          setCurrentSynthType("Synth");
          synthRef.current = new Tone.Synth().toDestination();
          break;
      }
    }
  };


  //TODO: Note-Duration Parameters
  const playNote = (synth: SynthInstance, note: Note) => {
    if (!synth || !note) return

    //prevents duplicate notes
    if (currentNotesPressed.current.includes(note.name)) return;

    currentNotesPressed.current.push(note.name);
    setActiveNoteNames([...currentNotesPressed.current]);
    synth.triggerAttack(note.name);
  };

  const releaseNote = (synth: SynthInstance, note: Note) => {
    //Do nothing 
    if (!synth || !note) return;

    const noteIndex = currentNotesPressed.current.findIndex((n) => n === note.name);
    if (noteIndex === -1) return; // Note not found in pressed notes

    // PolySynth needs note name, others don't
    if (synth.name === "PolySynth") {
      (synth as Tone.PolySynth).triggerRelease(note.name);
    } else {
      // Monophonic synths can call triggerRelease without arguments
      // @ts-expect-error - TypeScript doesn't narrow the union properly, but this is safe at runtime
      synth.triggerRelease();
    }

    currentNotesPressed.current.splice(noteIndex, 1);
    setActiveNoteNames([...currentNotesPressed.current]);
  };

  const triggerAttackRelease = (synth: SynthInstance, note: Note) => {
    if (synth) {
      synth.triggerAttackRelease(note.name, "8n");
    }
  };

  //Create the synthValue object that will be passed as the Context's value with everything initialized
  const synthValue: SynthContextType = {
    synthRef: synthRef,
    currentSynthType: currentSynthType,
    isPolyphonic: isPolyphonic,
    effectChain: effectChain,
    activeNoteNames: activeNoteNames,
    currentOctave: currentOctave,

    setEffectChain: setEffectChain,
    updateOctave: updateOctave,
    changeSynth: changeSynth,
    playNote: playNote,
    releaseNote: releaseNote,
    triggerAttackRelease: triggerAttackRelease,
  };

  return (
    <SynthContext.Provider value={synthValue}>{children}</SynthContext.Provider>
  );
};
export default SynthProvider;
