import { useEffect, useState, useContext, useRef } from "react";
import "./styles/layout.css"
import "./App.css";
import useKeyboardSynth from "./hooks/useKeyboardSynth";
import { SynthContext } from "@/contexts/SynthContext";
import { panels } from "./data/Panels.ts";

import EffectsHeaderActions from "./components/effects/effectsRack/EffectsHeaderActions";
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
              panels={panels}
              headerActions={{
                "Effects": <EffectsHeaderActions />,
              }}
              onToggleCollapse={setIsPanelCollapsed}
            />

            {/* numOctaves is exclusive */}
            <PianoKeyboardLayout
              numOctaves={6}
              panelCollapsed={isPanelCollapsed}
              onOpenHelp={() => helpDialogRef.current?.showModal()}
            />
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
