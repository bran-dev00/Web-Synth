import { useEffect, useState, useContext } from "react";
import * as Tone from "tone";
import "./App.css";
import useKeyboardSynth from "./hooks/useKeyboardSynth";

import { SynthContext } from "@/contexts/SynthContext";
import { SynthTypes, Note } from "@/types/types";
// import SynthSelect from "@/components/synth/SynthSelect";
// import SynthSettings from "@/components/synth/SynthSettings";
import Playground from "@/components/playground/Playground";
import DebugPanel from "@/components/playground/DebugPanel";

function App() {
  const {
    synthRef,
    // currentSynthType,
  } = useContext(SynthContext);

  //keyboard IO handling
  useKeyboardSynth();

  // const [sliderValue, setSliderValue] = useState([40]);
  const [currSynthName, setCurrSynthName] = useState(synthRef?.current?.name);

  useEffect(() => {
    setCurrSynthName(synthRef?.current?.name);
  }, [synthRef?.current]);

  const [debugStatus, setDebugStatus] = useState<boolean>(true);

  return (
    <>
      <h1>Current Synth: {currSynthName}</h1>
      <div>
        {/* <SynthSelect /> */}
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
