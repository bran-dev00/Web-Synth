import { useEffect, useState, useContext } from "react";
import * as Tone from "tone";
import "./App.css";
import useKeyboardSynth from "./hooks/useKeyboardSynth";

import { Slider } from "@/components/ui/slider";
import { SynthContext } from "@/contexts/SynthContext";
import { SynthTypes, Note } from "@/types/types";
import SynthSelect from "@/components/Synth/SynthSelect";

function App() {
  // const { synthRef, playNote } = useKeyboardSynth();

  const {
    synthRef,
    currentSynthType,
    playNote,
    releaseNote,
    triggerAttackRelease,
  } = useContext(SynthContext);

  //keyboard mapping handling
  useKeyboardSynth();

  const [sliderValue, setSliderValue] = useState([40]);
  const [currSynthName, setCurrSynthName] = useState(synthRef?.current?.name);

  useEffect(() => {
    setCurrSynthName(synthRef?.current?.name);
  }, [synthRef?.current]);

  const notes: Note[] = [
    { name: "C2", duration: "8n" },
    { name: "D2", duration: "8n" },
    { name: "E2", duration: "8n" },
    { name: "F2", duration: "8n" },
    { name: "G2", duration: "8n" },
    { name: "A2", duration: "8n" },
    { name: "B2", duration: "8n" },
    { name: "C3", duration: "8n" },
    { name: "D3", duration: "8n" },
    { name: "E3", duration: "8n" },
    { name: "F3", duration: "8n" },
    { name: "G3", duration: "8n" },
    { name: "A4", duration: "8n" },
    { name: "B4", duration: "8n" },
    { name: "C4", duration: "8n" },
    { name: "D4", duration: "8n" },
    { name: "E4", duration: "8n" },
    { name: "F4", duration: "8n" },
    { name: "G4", duration: "8n" },
    { name: "A5", duration: "8n" },
    { name: "B5", duration: "8n" },
  ];

  const listNotes = notes.map((note: Note) => (
    <button
      key={note.name}
      // onClick={() => handleToggle(note)}
      onMouseDown={() => {
        if (synthRef?.current) {
          playNote(synthRef.current, note);
        }
      }}
      onMouseUp={() => {
        if (synthRef?.current) {
          releaseNote(synthRef.current, note);
        }
      }}
      onMouseLeave={() => {
        if (synthRef?.current) {
          releaseNote(synthRef.current, note);
        }
      }}
    >
      {note.name}
    </button>
  ));

  return (
    <>
      <h1>Current Synth: {currSynthName}</h1>
      <div>
        <SynthSelect />
      </div>

      <div className="card">
        <button
          onMouseDown={() => {
            synthRef?.current?.triggerAttackRelease("C4", "8n");
          }}
          onMouseUp={() => synthRef?.current?.triggerRelease("C4")}
        >
          Start Sound
        </button>
        <button
          //Play note C4 for a duration of an 8th note
          onClick={() => {
            // This stops "C4" from playing, until a new render is triggered for some reason.
            // Weird bug that I need to figure out.
            synthRef?.current?.dispose();
            console.log("STOP ALL SOUNDS CLICKED");
          }}
        >
          STOP ALL SOUNDS!!
        </button>
      </div>

      <div>{listNotes}</div>

      <div>
        <Slider
          label="Frequency Slider"
          width={"200px"}
          defaultValue={[40]}
          value={sliderValue}
          onValueChange={(e: EventTarget) => setSliderValue(e.value)}
        ></Slider>

        <p>{sliderValue}</p>
      </div>

      <div>
        {/* <ul>
          <li>
            <p>{synthRef.current?.name}</p>
          </li>
          <li>
            <p>{synthRef.current?.name}</p>
          </li>
          <li>
            <p>{synth.output.toString()}</p>
          </li>
          <li>
            <p>{synth.volume.value.toString()}</p>
          </li>
        </ul> */}
      </div>
    </>
  );
}

export default App;
