import * as Tone from "tone";
import { useRef, useState, useEffect } from "react";
import { SynthTypes } from "../types/types";

// hook that manages the synth state

const useSynth = () => {
  const synthRef = useRef<SynthTypes | null>(null);
  const [currentSynthType, setCurrentSynthType] = useState<string>("Synth");

  useEffect(() => {
    Tone.start();
    async function initSynth() {
      const synth = new Tone.Synth().toDestination();
      synthRef.current = synth;
    }

    initSynth();

    //cleanup
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);
};

export default useSynth;
