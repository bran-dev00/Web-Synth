import * as Tone from "tone";
import { SynthTypes } from "@/types/types";
import { useState, useContext } from "react";
import { SynthContext } from "@/contexts/SynthContext";

const SynthSelect = () => {
  // const synth = useContext(SynthContext);
  // const [currentSynth, setCurrentSynth] = useState<string | null>("PolySynth");
  const { synthRef, changeSynth } = useContext(SynthContext);
  const [currSelected, setCurrSelected] = useState<string | null>("polySynth");

  // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedSynth = e.target.value;
  //   switch (selectedSynth) {
  //     case "polySynth":
  //       synth?.dispose();
  //       synth = new Tone.PolySynth().toDestination();
  //       setCurrSelected("polySynth");
  //       break;
  //     case "amSynth":
  //       synth?.dispose();
  //       synth = new Tone.AMSynth().toDestination();
  //       setCurrSelected("amSynth");
  //       break;
  //     case "fmSynth":
  //       synth?.dispose();
  //       synth = new Tone.FMSynth().toDestination();
  //       setCurrSelected("fmSynth");
  //       break;
  //     case "duoSynth":
  //       synth?.dispose();
  //       synth = new Tone.DuoSynth().toDestination();
  //       setCurrSelected("duoSynth");
  //       break;
  //     case "monoSynth":
  //       synth?.dispose();
  //       synth = new Tone.MonoSynth().toDestination();
  //       setCurrSelected("monoSynth");
  //       break;
  //     case "synth":
  //       synth?.dispose();
  //       synth = new Tone.Synth().toDestination();
  //       setCurrSelected("synth");
  //       break;
  //     case "metalSynth":
  //       synth?.dispose();
  //       synth = new Tone.MetalSynth().toDestination();
  //       setCurrSelected("metalSynth");
  //       break;
  //     default:
  //       synth?.dispose();
  //       synth = new Tone.PolySynth().toDestination();
  //       setCurrSelected("polySynth");
  //       break;
  //   }
  // };

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
              setCurrSelected(selectedSynth);
              changeSynth(selectedSynth);
              console.log("Selected Synth: ", selectedSynth);
              console.log(synthRef?.current?.name);
            }}
          >
            <option value="Synth">Synth</option>
            <option value="PolySynth">Poly Synth</option>
            <option value="AMSynth">AM Synth</option>
            <option value="FMSynth">FM Synth</option>
            <option value="DuoSynth">Duo Synth</option>
            <option value="MonoSynth">Mono Synth</option>
            <option value="MetalSynth">Metal Synth</option>
          </select>
        </label>

        <p>{currSelected}</p>
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
