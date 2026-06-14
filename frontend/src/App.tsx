import { useEffect, useState, useContext } from "react";
import * as Tone from "tone";
import "./styles/layout.css"
import "./App.css";
import useKeyboardSynth from "./hooks/useKeyboardSynth";
import { SynthContext } from "@/contexts/SynthContext";

import Header from "./components/header/Header";
import EffectsRack from "./components/effects/effectsRack/EffectRack";
import Panel from "./components/shared/panel/Panel";

import { PanelTypes, SynthInstance, Note } from "@/types/types";
import Playground from "@/components/playground/Playground";
import PianoKeyboardLayout from "./components/pianoKeyboard/PianoKeyboardLayout";
import SynthSelect from "./components/shared/controls/SynthSelect";



function App() {
  const {
    synthRef,
  } = useContext(SynthContext);

  //keyboard IO handling
  useKeyboardSynth();

  const [currSynthName, setCurrSynthName] = useState(synthRef?.current?.name);
  const [activePanel, setActivePanel] = useState<PanelTypes["effects"] | PanelTypes["sequencer"] | PanelTypes["synthPatch"]>("Effects");

  useEffect(() => {
    setCurrSynthName(synthRef?.current?.name);
  }, [synthRef?.current]);

  const [debugStatus, setDebugStatus] = useState<boolean>(false);


  return (
    <>
      <div className="background">
        <div className="main-container">
          <main className="main-content">
            <Panel title={activePanel} className="panel-wrapper effects-panel">

              <EffectsRack />
            </Panel>
            <PianoKeyboardLayout numOctaves={5} />
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
