import DebugPanel from "./DebugPanel";
import { Note, EffectType, PolyCompatibleSynth } from "@/types/types";

import { useContext, useEffect, useState } from "react";
import { SynthContext } from "@/contexts/SynthContext";

import Key from "@/components/pianoKeyboard/Key";
import PianoKeyboardLayout from "@/components/pianoKeyboard/PianoKeyboardLayout";
import styles from "./Playground.module.css"
import SynthSelect from "../synth/SynthSelect";
import { EffectRack } from "../effectRack/EffectRack"

import { createPolySynth } from "../../utils/utils"

import * as Tone from "tone";


const Playground = () => {

  let testData = { data: "Test Data" };

  const {
    synthRef,
    changeSynth,
    effects,
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


  //How to make an instrument?


  // //Add Chorus 
  // const addChorus = () =>{
  //   if(!synthRef?.current) return;

  //   const chorus = new Tone.Chorus();
  //   chorus.toDestination();

  //   synthRef.current.connect(chorus);

  //   const effect: EffectType = {
  //     instance: chorus,
  //     name: "Chorus"
  //   }
  //   console.log(effects);
  //   //Add the effect to the effects array
  //   effects.set(effect.name, effect);
  //   console.log(effects)
  // }

  // const removeChorus = () =>{
  //   if(!synthRef?.current) return;

  //   if (effects){
  //     if(effects.has("Chorus")){
  //       console.log("Remove Chorus", effects);

  //       const chorus = effects.get("Chorus");
  //       chorus?.instance.disconnect();
  //       effects.delete("Chorus");
  //       return;
  //     }
  //   }

  // }



  return (
    <div>
      <div className={styles["playground-container"]}>
        <h1>Playground</h1>
        {/* <div>
            <Key
              onKeyPress={playNote}
              onKeyRelease={stopNote}
              note={note}
              isActive={true}
              keyType={"white"}
            />
            <Key
              onKeyPress={playNote}
              onKeyRelease={stopNote}
              note={note2}
              isActive={true}
              keyType={"black"}
            />
       </div> */}

        <div>
          <SynthSelect />

          <p>Base name: {baseName ?? "Null"}</p>
          <button onClick={() => togglePolyphony()}>
            toggle polyphonic
          </button>
          <div>
            {isPolyphonicToggled ? "ON" : "OFF"}
          </div>

          <EffectRack />

          <div>
            {/* {synthRef?.current?.name} */}
          </div>

          <PianoKeyboardLayout />
        </div>
        <div >
          <DebugPanel data={{ data: `${synthRef?.current?.get()}`, name: baseName }} />
        </div>
      </div>
    </div>
  );
};

export default Playground;
