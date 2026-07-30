import { useEffect, useState, useContext, useRef } from "react";
import * as Tone from "tone";
import "./styles/layout.css"
import "./App.css";
import useKeyboardSynth from "./hooks/useKeyboardSynth";
import { SynthContext } from "@/contexts/SynthContext";

import EffectsRack from "./components/effects/effectsRack/EffectRack";
import Panel from "./components/shared/panel/Panel";


import Playground from "@/components/playground/Playground";
import PianoKeyboardLayout from "./components/pianoKeyboard/PianoKeyboardLayout";
import HelpModal from "./components/shared/helpModal/HelpModal";


function App() {
  const {
    synthRef,
  } = useContext(SynthContext);

  //keyboard IO handling
  useKeyboardSynth();

  const [currSynthName, setCurrSynthName] = useState(synthRef?.current?.name);

  useEffect(() => {
    setCurrSynthName(synthRef?.current?.name);
  }, [synthRef?.current]);

  const [debugStatus, setDebugStatus] = useState<boolean>(false);

  const helpDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="background">
        <div className="main-container">
          <main className="main-content">
            <Panel
              className="panel-wrapper"
              panels={{
                "Effects": <EffectsRack />,
                "Sequencer": <div><h1>Sequencer</h1></div>,
                "Synth Patch": <div><h1>Synth Patch</h1></div>,
              }}
            />
            <PianoKeyboardLayout numOctaves={5} />
            <button className={"help-popup"} onClick={() => helpDialogRef.current?.showModal()}>
              ?
            </button>
            <HelpModal dialogRef={helpDialogRef} closeDialog={() => helpDialogRef.current?.close()} />
          </main>
        </div>
      </div>

      {debugStatus && (
        <>
          <Playground />
        </>
      )}
    </>
  );
}

export default App;
