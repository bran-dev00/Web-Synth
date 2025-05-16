import { Note, SynthTypes } from "../../types/types";
import "./Key.css";

interface KeyProps {
  note: Note;
  isActive: boolean;

  //Event Handlers
  onKeyPress: (note: Note) => void;
  onKeyRelease: (note: Note) => void;

  keyType: "white" | "black";
  label?: string; // Optional Label on the key
}

// Hardcoded to only polysynth for now
const Key: React.FC<KeyProps> = ({
  onKeyRelease,
  onKeyPress,
  note,
  isActive,
  keyType,
}) => {
  const keyStyle = {
    backgroundColor: keyType === "white" ? "white" : "black",
    color: keyType == "white" ? "black" : "white",
  };

  return (
    <>
      <div className="key">
        <button
          onMouseDown={onKeyPress}
          onMouseUp={onKeyRelease}
          onMouseLeave={onKeyRelease}
          style={keyStyle}
        >
          {note.name}
        </button>
      </div>
    </>
  );
};

export default Key;
