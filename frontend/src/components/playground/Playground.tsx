import DebugPanel from "./DebugPanel";
import { Note } from "@/types/types";

import Key from "@/components/keyboard/Key";
import KeyboardLayout from "@/components/keyboard/KeyboardLayout";
import styles from "./Playground.module.css"

const Playground = () => {
  const note: Note = { name: "A4" };
  const note2: Note = { name: "B4" };
  const playNote = () => {
    console.log("play note");
  };
  const stopNote = () => {
    console.log("stop note");
  };

  return (
    <div>
      <div className={styles["playground-container"]}>
        <h1>Playground</h1>
        {/* <div>
            <Key
              onKeyPress={playNote}
              onKeyRelease={stopNote}
              note={note}
              isActive={true}
              keyType={"white"}
            />
            <Key
              onKeyPress={playNote}
              onKeyRelease={stopNote}
              note={note2}
              isActive={true}
              keyType={"black"}
            />
       </div> */}
       <div>
        <KeyboardLayout />
       </div>
        <div >
          <DebugPanel data={{ name: "hello" }} />
        </div>
      </div>
    </div>
  );
};

export default Playground;
