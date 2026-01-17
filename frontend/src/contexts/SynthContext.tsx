import React, { createContext, useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { SynthTypes, Note} from "../types/types";


//Keep track of effects with an effects array

export type SynthContextType = {
  synthRef: React.RefObject<SynthTypes | null> | null;
  currentSynthType: string;
  isPolyphonic: boolean;
  effects:[];

  changeSynth: (newSynth: string) => void;
  playNote: (synth: SynthTypes, note: Note) => void;
  releaseNote: (synth: SynthTypes, note: Note) => void;
  triggerAttackRelease: (synth: SynthTypes, note: Note) => void;
  
}


export const SynthContext = createContext<SynthContextType>({
  synthRef: null,
  currentSynthType: "",
  isPolyphonic: false,
  effects: [],
  changeSynth: () => {},
  playNote: () => {},
  releaseNote: () => {},
  triggerAttackRelease: () => {},
});

type SynthProviderProps = {
  children: React.ReactNode;
}


export const SynthProvider: React.FC<SynthProviderProps> = ({ children }) => {
  const synthRef = useRef<SynthTypes | null>(null);
 
  const [currentSynthType, setCurrentSynthType] = useState<string>(
    synthRef.current?.name || "",
  );

 
  const [isPolyphonic, setIsPolyphonic] = useState<boolean>(true);
  const currentNotesPressed = useRef<string[]>([]);

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
  const playNote = (synth: SynthTypes, note: Note) => {
    if(!synth || !note) return

    //prevents duplicate notes
    if(currentNotesPressed.current.includes(note.name)) return;

    currentNotesPressed.current.push(note.name);
    synth.triggerAttack(note.name);
  };

  const releaseNote = (synth: SynthTypes, note: Note) => {
    //Do nothing 
    if(!synth || !note) return;
    
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
  };

  const triggerAttackRelease = (synth: SynthTypes, note: Note) => {
    if (synth) {
      synth.triggerAttackRelease(note.name, "8n");
    }
  };

  //Create the synthValue object that will be passed as the Context's value with everything initialized
  const synthValue: SynthContextType = {
    synthRef: synthRef,
    currentSynthType: currentSynthType,
    isPolyphonic: isPolyphonic,
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
