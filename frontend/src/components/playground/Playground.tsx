import DebugPanel from "./DebugPanel";
import { Note, EffectType, PolyCompatibleSynth } from "@/types/types";

import React, { useContext, useEffect, useState } from "react";
import { SynthContext } from "@/contexts/SynthContext";

import PianoKeyboardLayout from "@/components/pianoKeyboard/PianoKeyboardLayout";
import styles from "./Playground.module.css"
import Knob from "../shared/controls/Knob";

import { createPolySynth } from "../../utils/utils"

import * as Tone from "tone";
import { PiNewspaperDuotone } from "react-icons/pi";


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

  const [value, setValue] = useState(10);

  const handleChange = (value: number) => {
    console.log("value: ", value);
    setValue(value)
  }

  // make and start a 440hz sine tone
  // const osc = new Tone.Oscillator(440, "sine").toDestination().start();
  const osc = new Tone.Oscillator(440, "sine").toDestination();
  const amOsc = new Tone.AMOscillator(440, "sine", "sine10").toDestination();

  const envelope = new Tone.Envelope({
    attack: 0.4,
    decay: 0.2,
    sustain: 0.5,
    release: 0.3
  }).toDestination();


  // return Tone.Offline(() => {
  //   const lfo = new Tone.LFO("4n", 400, 4000).start().toDestination();
  // }, 0.5, 1);
  //

  const handleEnvelopeChange = (param: string, value: number) => {
    envelope.set({ [param]: value });
    envelope.triggerAttackRelease(.5);
  }

  const lfoWaveTypes = ["sine", "square", "triangle", "sawtooth"];


  const lfo = new Tone.LFO("5n", 20, 2000).start();
  lfo.type = "sawtooth";
  // lfo.connect(osc.detune);

  lfo.connect(osc.frequency);
  envelope.connect(osc.volume);

  // console.log("Osc as array: ", osc.asArray());
  console.log(osc.get());
  console.log("osc type:", osc.get().type);

  console.log("lfo", lfo.get());
  console.log("lfo.type", lfo.get().type);

  const changeLfoWaveType = (waveType: string) => {
    // lfo.set({ type: waveType });
    lfo.type = waveType;
  };

  const handleLfoFreqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const freq = e.target.value;
    lfo.set({ frequency: freq });
  };

  // console.log("amOsc get:", amOsc.get());

  // amOsc.start();
  // amOsc.stop();

  const handleOscFreqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const freq = e.target.value;
    // console.log(e.target.value, typeof e.target.value);
    osc.set({
      frequency: freq
    });
  }

  const handleLfoPhaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const phase = e.target.value;
    lfo.phase = parseFloat(phase);
    // lfo.set({ phase: phase });
  };

  const handleLfoAmplitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const amplitude = e.target.value;
    lfo.set({ amplitude: parseFloat(amplitude) });
    // lfo.amplitude = parseFloat(amplitude);
  };

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
          <p>Base name: {baseName ?? "Null"}</p>
          <button onClick={() => togglePolyphony()}>
            toggle polyphonic
          </button>
          <div>
            {isPolyphonicToggled ? "ON" : "OFF"}
          </div>

          <div style={{ border: "1px solid white", padding: "8px" }}>
            <button style={{ backgroundColor: "black", color: "white", margin: "2px", padding: "4px" }}
              onClick={() => osc.start()}>play osc</button>
            <button style={{ backgroundColor: "black", color: "white", margin: "2px", padding: "4px" }}
              onClick={() => osc.stop()}>stop osc</button>

            <div>
              <h3>LFO</h3>

              <label htmlFor="frequency">Frequency</label>
              <input onChange={(e) => handleLfoFreqChange(e)} type="range" name="frequency" id="frequency" step={0.1} min={0} max={10} />
              <label htmlFor="phase">Phase</label>
              <input onChange={(e) => handleLfoPhaseChange(e)} type="range" name="phase" id="phase" min={0} max={10} />

              <label htmlFor="amplitude">Amplitude</label>
              <input onChange={(e) => handleLfoAmplitudeChange(e)} type="range" name="amplitude" id="amplitude" min={0} max={1} step={0.1} />

              <label htmlFor="waveType">Wave Type</label>
              <select onChange={(e) => changeLfoWaveType(e.target.value)} name="waveType" id="waveType">
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>

            <div>
              <h4>Oscillator Params:</h4>

              <label htmlFor="frequency">Frequency</label>
              <input onChange={handleOscFreqChange} type="range" name="frequency" id="frequency" min={50} max={1000} />


              <div>
                <label htmlFor="attack">Attack</label>
                <input onChange={(e) => handleEnvelopeChange("attack", parseFloat(e.target.value))} type="range" name="attack" id="attack" min={0} max={1} step={0.1} />

                <label htmlFor="decay">Decay</label>
                <input onChange={(e) => handleEnvelopeChange("decay", parseFloat(e.target.value))} type="range" name="decay" id="decay" min={0} max={1} step={0.1} />

                <label htmlFor="sustain">Sustain</label>
                <input onChange={(e) => handleEnvelopeChange("sustain", parseFloat(e.target.value))} type="range" name="sustain" id="sustain" min={0} max={1} step={0.1} />

                <label htmlFor="release">Release</label>
                <input onChange={(e) => handleEnvelopeChange("release", parseFloat(e.target.value))} type="range" name="release" id="release" min={0} max={1} step={0.1} />
              </div>

            </div>
          </div>


        </div>

        <div className={styles["knob-wrapper"]}>
          <label htmlFor="volume">Volume</label>
          <Knob size={50} min={0} max={100} startDeg={-135} endDeg={135} value={value} onChange={handleChange} />
          <span className={styles["knob-value"]}>{Math.round(value)}</span>
        </div>

        <div >
          <DebugPanel data={{ data: `${synthRef?.current?.get()}`, name: baseName }} />
        </div>
      </div>
    </div>
  );
};

export default Playground;
