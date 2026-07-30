import Key from "./Key.tsx";
import styles from "./PianoKeyboard.module.css"
import { SynthContext } from "@/contexts/SynthContext.tsx";
import { useMemo, useState, useContext } from "react";
import { Note, KeyLabelType } from "@/types/types";
import {
  getOctaveGroups,
  getBlackKeyOffset,
  getNoteToKeyMap,
  noteNames,
  defaultPianoHotkeys,
} from "@/utils/utils.tsx";
import ToggleSwitch from "../shared/controls/ToggleSwitch.tsx";

const labelTypeCycle: KeyLabelType[] = ["note", "keyboard", "none"];

interface PianoKeyboardLayoutProps {
  numOctaves: number;
  startingOctave?: number;
  endingOctave?: number;
  panelCollapsed?: boolean;
}

//Handles the 'piano keyboard' rendering and IO keyboard & mouse events 
const PianoKeyboardLayout: React.FC<PianoKeyboardLayoutProps> = ({
  startingOctave = 2,
  numOctaves,
  endingOctave = startingOctave + (numOctaves - startingOctave),
  panelCollapsed = false,
}) => {
  const { synthRef, playNote, releaseNote, activeNoteNames, polyphonicMode, canBePolyphonic, togglePolyphony, currentOctave } = useContext(SynthContext);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [labelType, setLabelType] = useState<KeyLabelType>("note");

  const octaveGroups = getOctaveGroups(startingOctave, endingOctave);

  const noteToKeyMap = useMemo(
    () => getNoteToKeyMap(currentOctave),
    [currentOctave],
  );

  const cycleLabelType = () => {
    setLabelType((prev) => {
      const idx = labelTypeCycle.indexOf(prev);
      return labelTypeCycle[(idx + 1) % labelTypeCycle.length];
    });
  };

  const allWhiteKeys = octaveGroups.flatMap((group) => group.whiteKeys);

  // console.log("note to key map", noteToKeyMap);

  const isKeyInCurrentOctave = (noteName: string): boolean => {
    const match = noteName.match(/(\d)$/);
    if (!match) return false;

    const octave = parseInt(match[1]);
    if (octave === currentOctave) return true;

    //default keys extends a few notes after the end of a single octave
    if (octave === currentOctave + 1) {
      const noteBase = noteName.replace(/\d$/, "");
      return noteNames.indexOf(noteBase) < 6;
    }
    return false;
  };

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
    <div className={`${styles["container"]} ${panelCollapsed ? styles["panelCollapsed"] : ""}`}>
      <div className={`${styles["piano-keyboard-layout"]} `}>

        <div className={styles["keyboard-settings"]}>
          <div className={styles["control-group"]}>
            <span>Labels:</span>
            <button className={styles["label-toggle"]} onClick={cycleLabelType}>
              {labelType === "none" ? "none" : labelType}
            </button>
          </div>
          {canBePolyphonic && (
            <div className={styles["control-group"]}>
              <ToggleSwitch checked={polyphonicMode} label="Polyphony" handleClick={togglePolyphony} />
            </div>
          )}
        </div>

        <div className={styles["keys-container"]}>
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
              labelType={labelType}
              keyboardKey={isKeyInCurrentOctave(note.name) ? noteToKeyMap.get(note.name) : undefined}
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
                    border: "none",
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
                    labelType={labelType}
                    keyboardKey={isKeyInCurrentOctave(note.name) ? noteToKeyMap.get(note.name) : undefined}
                  />
                </div>
              );
            }),
          )}
        </div>

      </div>
    </div>
  );
};

export default PianoKeyboardLayout;
