import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import "./App.css";

interface Note {
  name: string;
  duration: string;
}

function Key({
  note,
  synth,
  synthRef,
}: {
  note: Note;
  synth: Tone.AMSynth;
  synthRef: React.RefObject<Tone.AMSynth | null>;
}) {
  return (
    <>
      <div>
        <button
          onMouseDown={() => synth?.triggerAttack(note.name, note.duration)}
          onMouseUp={() => synth?.triggerRelease()}
          onMouseLeave={() => synth?.triggerRelease()}
        >
          {note.name}
        </button>
      </div>
    </>
  );
}

function App() {
  const synth = new Tone.AMSynth().toDestination();
  const synthRef = useRef<Tone.AMSynth | null>(null);

  const [count, setCount] = useState(0);
  const [currSynthName, setCurrSynthName] = useState(synth.name);
  const [isActive, setIsActive] = useState(false);

  synth.debug = true;

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

  useEffect(() => {
    synthRef.current = new Tone.AMSynth().toDestination();
    return () => {
      synthRef.current?.dispose();
    };
  }, []);

  const SynthRelease = () => {
    synthRef.current?.triggerRelease();
  };

  const handleToggle = (note: Note) => {
    if (!isActive) {
      synthRef.current?.triggerAttack(note.name, note.duration, 0.8);
    } else {
      synthRef.current?.triggerRelease();
    }
    console.log(synthRef.current);
    console.log(`note ${note.name}: ${isActive}`);
    setIsActive(!isActive);
  };

  const listNotes = notes.map((note: Note) => (
    <button
      key={note.name}
      // onClick={() => handleToggle(note)}
      onMouseDown={() =>
        synthRef.current?.triggerAttack(note.name, note.duration)
      }
      onMouseUp={() => synthRef.current?.triggerRelease()}
      onMouseLeave={() => synthRef.current?.triggerRelease()}
    >
      {note.name}
    </button>
  ));

  return (
    <>
      <h1>Current Synth: {currSynthName}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button
          onMouseDown={() => {
            synth.triggerAttack("C4", "8n");
          }}
          onMouseUp={() => synth.triggerRelease()}
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
      </div>

      <Key
        note={{ name: "C4", duration: "8n" }}
        synth={synth}
        synthRef={synthRef}
      ></Key>

      <div>{listNotes}</div>
    </>
  );
}

export default App;
