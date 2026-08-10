import DebugPanel from "./DebugPanel";
import { Note, EffectType, PolyCompatibleSynth } from "@/types/types";

import { useContext, useEffect, useState } from "react";
import { SynthContext } from "@/contexts/SynthContext";

import styles from "./Playground.module.css"
import { createPolySynth } from "../../utils/utils"
import * as Tone from "tone";


const Playground = () => {
  const {
    synthRef,
    changeSynth,
  } = useContext(SynthContext);


  const [isPolyphonicToggled, setIsPolyphonicToggled] = useState(false);
  const [baseName, setBaseName] = useState(synthRef?.current?.name);

  useEffect(() => {
    if (synthRef?.current) {
      setBaseName(synthRef?.current.name);
    }
  }, [changeSynth])

  const togglePolyphony = () => {
    //Revert back to normal
    if (isPolyphonicToggled) {
      if (baseName) {
        changeSynth(baseName);
        setIsPolyphonicToggled(false);
        return;
      }
    }

    if (!synthRef?.current) return;

    const currentSynth = synthRef.current;
    const synthName = currentSynth.name;

    // Save baseName before converting to polyphonic
    if (!baseName || synthName !== "PolySynth") {
      setBaseName(synthName);
    }

    // Map instance name to constructor for poly-compatible synths
    let synthConstructor: PolyCompatibleSynth | null = null;

    if (synthName === "Synth") {
      synthConstructor = Tone.Synth;
    } else if (synthName === "AMSynth") {
      synthConstructor = Tone.AMSynth;
    } else if (synthName === "FMSynth") {
      synthConstructor = Tone.FMSynth;
    } else if (synthName === "MonoSynth") {
      synthConstructor = Tone.MonoSynth;
    }

    if (!synthConstructor) {
      console.warn(`Synth type ${synthName} is not poly-compatible`);
      return;
    }

    currentSynth.dispose();
    const polySynth = createPolySynth(synthConstructor);
    synthRef.current = polySynth.toDestination();

    setIsPolyphonicToggled(true);
  }
  return (
    <div>
      <div className={styles["playground-container"]}>
        <h1>Playground</h1>
        <div>
          <p>Base name: {baseName ?? "Null"}</p>
          <button onClick={() => togglePolyphony()}>
            toggle polyphonic
          </button>
          <div>
            {isPolyphonicToggled ? "ON" : "OFF"}
          </div>
        </div>

        <div >
          <DebugPanel data={{ data: `${synthRef?.current?.get()}`, name: baseName }} />
        </div>
      </div>
    </div >
  );
};

export default Playground;
