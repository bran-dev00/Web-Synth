import { useEffect, useState, useContext } from "react";
import * as Tone from "tone";
import "./styles/layout.css"
import "./App.css";
import useKeyboardSynth from "./hooks/useKeyboardSynth";
import SynthParameters from "./components/synth/SynthParameters"
import { SynthContext } from "@/contexts/SynthContext";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import EffectsRack from "./components/effects/effectsRack/EffectRack";

import { SynthInstance, Note } from "@/types/types";
import Playground from "@/components/playground/Playground";
import PianoKeyboardLayout from "./components/pianoKeyboard/PianoKeyboardLayout";

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

  const [debugStatus, setDebugStatus] = useState<boolean>(true);

  return (
    <>
      <div className="main-container">
        <header className="header">
          <Header />
        </header>
        <aside className="sidebar">
          <Sidebar />
        </aside>

        <main className="main-content">
          <EffectsRack />
          <PianoKeyboardLayout />
        </main>
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
