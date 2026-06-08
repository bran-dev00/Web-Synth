import Key from "./Key.tsx";
import styles from "./PianoKeyboard.module.css"
import { SynthContext } from "@/contexts/SynthContext.tsx";
import { useEffect, useRef, useState, useContext } from "react";
import { Note } from "@/types/types";
import {
  getOctaveGroups,
  getBlackKeyOffset,
} from "@/utils/utils.tsx";

interface PianoKeyboardLayoutProps {
  numOctaves: number;
  startingOctave?: number;
  endingOctave?: number;
}


//Handles the 'piano keyboard' rendering and IO keyboard & mouse events 
const PianoKeyboardLayout: React.FC<PianoKeyboardLayoutProps> = ({
  startingOctave = 2,
  numOctaves,
  endingOctave = startingOctave + (numOctaves - startingOctave),
}) => {
  const { synthRef, playNote, releaseNote, activeNoteNames } = useContext(SynthContext);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const octaveGroups = getOctaveGroups(
    startingOctave,
    endingOctave,
  );

  //flatten all octaves
  const allWhiteKeys = octaveGroups.flatMap((group) => group.whiteKeys);
  // const allBlackKeys = octaveGroups.flatMap((group) => group.blackKeys);

  // console.log("blackKeys: ", allBlackKeys);
  // console.log("octaveGroups", octaveGroups);

  const handleMouseDown = (note: Note) => {
    if (synthRef?.current) {
      setIsDragging(true);
      playNote(synthRef.current, note);
    }
  };

  const handleMouseUp = (note: Note) => {
    if (synthRef?.current) {
      setIsDragging(false);
      releaseNote(synthRef.current, note);
    }
  };

  //TODO: When the mouse leaves a note and it's not another note on
  //return it acts like the mouse is still being held down
  const handleMouseLeave = (note: Note) => {
    if (isDragging) {
      // console.log(e.currentTarget);
      if (synthRef?.current) {
        releaseNote(synthRef?.current, note);
      }
    }
  };

  const handleMouseDragging = (note: Note) => {
    if (isDragging) {
      // console.log("Mouse is being held down", note.name);
      if (synthRef?.current) {
        playNote(synthRef.current, note);
      }
    }
  };



  return (
    <div className={styles["container"]}>
      <div className={`${styles["piano-keyboard-layout"]} `}>
        {allWhiteKeys.map((note: Note) => (
          <Key
            key={note.name}
            isActive={activeNoteNames.includes(note.name)}
            onMouseUp={() => handleMouseUp(note)}
            onMouseDown={() => handleMouseDown(note)}
            onMouseDrag={() => handleMouseDragging(note)}
            onMouseLeave={() => handleMouseLeave(note)}
            keyType="white"
            note={note}
            label={true}
          />
        ))}

        {/* Render black keys with proper positioning */}
        {octaveGroups.map((octaveGroup, octaveIndex) =>
          octaveGroup.blackKeys.map((note: Note) => {
            const left = getBlackKeyOffset(note.name, 50, octaveIndex);

            return (
              <div
                key={note.name}
                style={{
                  position: "absolute",
                  left: `${left}px`,
                  zIndex: 2,
                }}
              >
                <Key
                  isActive={activeNoteNames.includes(note.name)}
                  onMouseUp={() => handleMouseUp(note)}
                  onMouseDown={() => handleMouseDown(note)}
                  onMouseDrag={() => handleMouseDragging(note)}
                  onMouseLeave={() => handleMouseLeave(note)}
                  keyType="black"
                  note={note}
                  label={false}
                />
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default PianoKeyboardLayout;
