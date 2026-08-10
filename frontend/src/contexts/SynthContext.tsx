import React, { createContext, useState, useRef, useEffect, useMemo } from "react";
import * as Tone from "tone";
import { SynthInstance, Note, EffectType, SynthRef } from "../types/types";
import { createPolySynth, getPolyConstructor } from "../utils/utils";
import { connectEffectChain } from "@/utils/utils";


export type SynthContextType = {
  synthRef: SynthRef;
  masterGainRef: React.RefObject<Tone.Gain | null>;
  currentSynthType: string;
  polyphonicMode: boolean;
  canBePolyphonic: boolean;
  effectChain: EffectType[];
  activeNoteNames: string[];
  currentOctave: number;
  volume: number;

  setEffectChain: React.Dispatch<React.SetStateAction<EffectType[]>>;
  setVolume: (volume: number) => void;

  updateOctave: (newOctave: number) => void;
  changeSynth: (newSynth: string) => void;
  togglePolyphony: () => void;
  setPolyphonyOn: () => void;
  setPolyphonyOff: () => void;
  playNote: (synth: SynthInstance, note: Note) => void;
  releaseNote: (synth: SynthInstance, note: Note) => void;
  triggerAttackRelease: (synth: SynthInstance, note: Note) => void;
}


export const SynthContext = createContext<SynthContextType>({
  synthRef: null,
  masterGainRef: { current: null },
  currentSynthType: "",
  polyphonicMode: false,
  canBePolyphonic: false,
  effectChain: [],
  activeNoteNames: [],
  currentOctave: 4,
  volume: 1,

  setEffectChain: () => { },
  setVolume: () => { },
  updateOctave: () => { },
  changeSynth: () => { },
  togglePolyphony: () => { },
  setPolyphonyOn: () => { },
  setPolyphonyOff: () => { },
  playNote: () => { },
  releaseNote: () => { },
  triggerAttackRelease: () => { },
});

type SynthProviderProps = {
  children: React.ReactNode;
}


export const SynthProvider: React.FC<SynthProviderProps> = ({ children }) => {
  const synthRef = useRef<SynthInstance | null>(null);
  const masterGainRef = useRef<Tone.Gain | null>(null);

  const [currentSynthType, setCurrentSynthType] = useState<string>(
    synthRef.current?.name || "",
  );

  const [volume, setVolumeState] = useState<number>(1);

  //The current State of the synths mode either poly on or off.
  const [polyphonicMode, setPolyphonicMode] = useState<boolean>(false);

  //Remembers old synth when toggling polyphony on, so it can be restored when toggling off
  const [baseSynthName, setBaseSynthName] = useState<string | null>(null);
  const currentNotesPressed = useRef<string[]>([]);
  const [activeNoteNames, setActiveNoteNames] = useState<string[]>([]);
  const [currentOctave, setCurrentOctave] = useState<number>(4);


  const [effectChain, setEffectChain] = useState<EffectType[]>([]);

  // const effects = new Map<EffectTypeName, EffectType[]>();

  //Initialize synthRef and masterGainRef on load/initial render
  useEffect(() => {
    Tone.start();
    const masterGain = new Tone.Gain(1).toDestination();
    masterGainRef.current = masterGain;

    const initialSynth = new Tone.Synth().connect(masterGain);

    synthRef.current = initialSynth;
    setCurrentSynthType(synthRef.current.name);

    //Clean up
    return () => {
      if (synthRef?.current) {
        synthRef.current.dispose();
      }
      if (masterGainRef.current) {
        masterGainRef.current.dispose();
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

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = newVolume;
    }
  }

  const canBePolyphonic = useMemo(() => {
    if (polyphonicMode) return true;
    const name = synthRef.current?.name;
    return !!getPolyConstructor(name || "");
  }, [currentSynthType, polyphonicMode]);

  const setPolyphonyOn = () => {
    if (!synthRef?.current) return;

    const synthName = synthRef.current.name;
    const constructor = getPolyConstructor(synthName);
    if (!constructor) {
      console.warn(`Synth type ${synthName} is not poly-compatible`);
      return;
    }

    setBaseSynthName(
      synthName === "PolySynth" ? (baseSynthName ?? "Synth") : synthName,
    );

    synthRef.current.dispose();
    const polySynth = createPolySynth(constructor);
    synthRef.current = polySynth;

    // Connect effects chain to the new poly synth
    try {
      connectEffectChain(synthRef.current as unknown as Tone.ToneAudioNode, masterGainRef.current as Tone.Gain | null, effectChain);
    } catch (err) {
      console.error("Error connecting effect chain for poly synth:", err);
      // Fallback: connect directly to masterGain
      if (masterGainRef.current) {
        try { (synthRef.current as unknown as Tone.ToneAudioNode).connect(masterGainRef.current); } catch (e) { }
      }
    }

    setPolyphonicMode(true);
  };

  const setPolyphonyOff = () => {
    if (!synthRef?.current) return;

    const synthToRestore = baseSynthName ?? "Synth";
    changeSynth(synthToRestore);
  };

  const togglePolyphony = () => {
    if (polyphonicMode) {
      setPolyphonyOff();
    } else {
      setPolyphonyOn();
    }
  };

  const changeSynth = (newSynth: string) => {
    setPolyphonicMode(false);
    setBaseSynthName(null);

    if (synthRef?.current) {
      synthRef?.current.dispose();

      const gainNode = masterGainRef.current;
      if (!gainNode) return;

      switch (newSynth) {
        case "Synth":
          setCurrentSynthType("Synth");
          synthRef.current = new Tone.Synth().connect(gainNode);
          break;
        case "AMSynth":
          setCurrentSynthType("AMSynth");
          synthRef.current = new Tone.AMSynth().connect(gainNode);
          break;
        case "FMSynth":
          setCurrentSynthType("FMSynth");
          synthRef.current = new Tone.FMSynth().connect(gainNode);
          break;
        case "PolySynth":
          setCurrentSynthType("PolySynth");
          synthRef.current = new Tone.PolySynth(Tone.AMSynth).connect(gainNode);
          break;
        case "MonoSynth":
          setCurrentSynthType("MonoSynth");
          synthRef.current = new Tone.MonoSynth().connect(gainNode);
          break;
        case "MembraneSynth":
          setCurrentSynthType("MembraneSynth");
          synthRef.current = new Tone.MembraneSynth().connect(gainNode);
          break;
        case "PluckSynth":
          setCurrentSynthType("PluckSynth");
          synthRef.current = new Tone.PluckSynth().connect(gainNode);
          break;
        case "NoiseSynth":
          setCurrentSynthType("NoiseSynth");
          synthRef.current = new Tone.NoiseSynth().connect(gainNode);
          break;
        case "MetalSynth":
          setCurrentSynthType("MetalSynth");
          synthRef.current = new Tone.MetalSynth().connect(gainNode);
          break;
        case "DuoSynth":
          setCurrentSynthType("DuoSynth");
          synthRef.current = new Tone.DuoSynth().connect(gainNode);
          break;
        default:
          setCurrentSynthType("Synth");
          synthRef.current = new Tone.Synth().connect(gainNode);
          break;
      }

      // console.log("Synth changed:", newSynth);
      // console.log("Effect Chain:", effectChain);
      // Reconnect audio chain directly here so we use the latest effectChain and refs
      try {
        if (synthRef.current) {
          connectEffectChain(synthRef.current as unknown as Tone.ToneAudioNode, masterGainRef.current as Tone.Gain | null, effectChain);
        }
      } catch (error) {
        console.error("Error reconnecting audio chain after synth change:", error);
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
    masterGainRef: masterGainRef,
    currentSynthType: currentSynthType,
    polyphonicMode: polyphonicMode,
    canBePolyphonic: canBePolyphonic,
    effectChain: effectChain,
    activeNoteNames: activeNoteNames,
    currentOctave: currentOctave,
    volume: volume,

    setEffectChain: setEffectChain,
    setVolume: setVolume,
    updateOctave: updateOctave,
    changeSynth: changeSynth,
    togglePolyphony: togglePolyphony,
    setPolyphonyOn: setPolyphonyOn,
    setPolyphonyOff: setPolyphonyOff,
    playNote: playNote,
    releaseNote: releaseNote,
    triggerAttackRelease: triggerAttackRelease,
  };

  return (
    <SynthContext.Provider value={synthValue}>{children}</SynthContext.Provider>
  );
};
export default SynthProvider;
