import Key from "./Key.tsx";
import { PolySynth } from "tone";
import { useEffect, useRef } from "react";

const KeyboardLayout = (synthRef: PolySynth) => {
  return (
    <div>
      <h1>Keyboard</h1>
      <div className="keyboard-layout">
        <div className="white-keys">
          <div className="key">C</div>
          <div className="key">D</div>
          <div className="key">E</div>
          <div className="key">F</div>
          <div className="key">G</div>
          <div className="key">A</div>
          <div className="key">B</div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardLayout;
