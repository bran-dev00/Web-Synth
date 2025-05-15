import { Note } from "../../types/types";
import { PolySynth } from "tone";

interface KeyProps {
  note: Note;
  isActive: boolean;

  //Event Handlers
  onKeyPress: (note: string) => void;
  onKeyRelease: (note: string) => void;

  keyType: "white" | "black";
  label?: string; // Optional Label on the key
}

// Hardcoded to only polysynth for now
const Key: React.FC<KeyProps> = ({ note, isActive, keyType }) => {
  const keyStyle = {
    backgroundColor: keyType === "white" ? "white" : "black",
    color: keyType == "white" ? "black" : "white",
  };

  return (
    <>
      <div>
        <button style={keyStyle}>{note.name}</button>
      </div>
    </>
  );
};

export default Key;
