import { Note, SynthTypes } from "../../types/types";
import { useRef } from "react";
import styles from "./Key.module.css";

interface KeyProps {
  note: Note;
  isActive: boolean;

  //Event Handlers
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onMouseDrag: () => void;

  keyType: "white" | "black";
  label?: boolean; // Optional Label on the key
}

const Key: React.FC<KeyProps> = ({
  onMouseDown,
  onMouseUp,
  onMouseDrag,
  onMouseLeave,
  note,
  keyType,
  label,
}) => {
  // const keyRef = useRef(null);

  return (
    <>
      <div className={styles["key"]}>
        <button
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseDrag}
          className={keyType === "white" ? styles["white-key"] : styles["black-key"]}
        >
          {label && <span className={keyType === "white" ? styles["label-bottom"] : styles["label-center"]}>{note.name}</span>}
        </button>
      </div>
    </>
  );
};

export default Key;
