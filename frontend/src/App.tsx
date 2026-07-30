import { useEffect, useState, useContext, useRef } from "react";
import * as Tone from "tone";
import "./styles/layout.css"
import "./App.css";
import useKeyboardSynth from "./hooks/useKeyboardSynth";
import { SynthContext } from "@/contexts/SynthContext";

import EffectsRack from "./components/effects/effectsRack/EffectRack";
import EffectsHeaderActions from "./components/effects/EffectsHeaderActions";
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
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

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
              }}
              headerActions={{
                "Effects": <EffectsHeaderActions />,
              }}
              onToggleCollapse={setIsPanelCollapsed}
            />

            {/* numOctaves is exclusive */}
            <PianoKeyboardLayout numOctaves={6} panelCollapsed={isPanelCollapsed} />
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
