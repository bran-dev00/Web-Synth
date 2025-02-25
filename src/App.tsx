import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import * as Tone from "tone";
import "./App.css";

function App() {
  const synth = new Tone.Synth().toDestination();
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  synth.debug = true;

  interface Note {
    name: string;
    duration: string;
  }

  const notes: Note[] = [
    { name: "C3", duration: "8n" },
    { name: "D3", duration: "8n" },
    { name: "E3", duration: "8n" },
    { name: "F3", duration: "8n" },
    { name: "G3", duration: "8n" },
    { name: "A4", duration: "8n" },
    { name: "B4", duration: "8n" },
    { name: "C4", duration: "8n" },
  ];

  const toggleNote = (note: Note) => {
    if (isActive == true) {
      synth.triggerRelease();
    } else {
      synth.triggerAttack(note.name, note.duration);
    }
    setIsActive(!isActive);
    console.log(isActive);
  };

  const listNotes = notes.map((note: Note) => (
    <button onClick={() => toggleNote(note)}>{note.name}</button>
  ));

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button
          //Play note C4 for a duration of an 8th note
          onClick={() => {
            synth.triggerAttack("C4", "8n");
          }}
        >
          Start Sound
        </button>
        <button
          //Play note C4 for a duration of an 8th note
          onClick={() => {
            synth.triggerRelease();
          }}
        >
          Stop Sound
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>

        {listNotes}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
