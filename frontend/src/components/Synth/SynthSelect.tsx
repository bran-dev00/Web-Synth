import * as Tone from "tone";
import { SynthTypes } from "@/types/types";
import { useState, useContext } from "react";
import { SynthContext } from "@/contexts/SynthContext";

const SynthSelect = () => {
  const { changeSynth } = useContext(SynthContext);
  // const [currSelected, setCurrSelected] = useState<string | null>(null);

  return (
    <div>
      <h2>Select a Synth</h2>

      <form action="">
        <label htmlFor="">
          Change Synth:
          <select
            name="selectSynth"
            id="selectSynth"
            onChange={(e) => {
              const selectedSynth = e.target.value;
              // setCurrSelected(selectedSynth);
              changeSynth(selectedSynth);
              console.log("Selected Synth: ", selectedSynth);
              // console.log(synthRef?.current?.name);
            }}
          >
            <option value="Synth">Synth</option>
            <option value="PolySynth">Poly Synth</option>
            <option value="AMSynth">AM Synth</option>
            <option value="FMSynth">FM Synth</option>
            <option value="DuoSynth">Duo Synth</option>
            <option value="MonoSynth">Mono Synth</option>
            <option value="MetalSynth">Metal Synth</option>
            <option value="MembraneSynth">Membrane Synth</option>
            <option value="PluckSynth">Pluck Synth</option>
            <option value="NoiseSynth">Noise Synth</option>
          </select>
        </label>

        <button
          type="submit"
          onSubmit={() => {
            console.log("submitted");
          }}
        >
          Change
        </button>
      </form>

      {/* If the option is different than the current synth
          we can change the button's color to red or something
          as an indicator that the user has selected a new synth */}
      {/* <button style={{ backgroundColor: currentSynth !== synth ? "red" : "green" }} onClick={() => setCurrentSynth(synth)}>save</button>
       */}
    </div>
  );
};

export default SynthSelect;
