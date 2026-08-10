import { Note, KeyLabelType } from "../../types/types";
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
  labelType?: KeyLabelType;
  keyboardKey?: string;
}

const Key: React.FC<KeyProps> = ({
  onMouseDown,
  onMouseUp,
  onMouseDrag,
  onMouseLeave,
  note,
  keyType,
  labelType,
  keyboardKey,
  isActive,
}) => {
  const keyClass = `${keyType === "white" ? styles["white-key"] : styles["black-key"]} ${isActive ? styles["active"] : ""}`;
  const labelClass = keyType === "white" ? styles["label-bottom"] : styles["label-center"];

  const renderLabel = () => {
    if (!labelType || labelType === "none") return null;
    if (labelType === "keyboard") {
      return keyboardKey ? <span className={labelClass}>{keyboardKey.toUpperCase()}</span> : null;
    }
    return <span className={labelClass}>{note.name}</span>;
  };

  return (
    <>
      <div className={styles["key"]}>
        <button
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseDrag}
          onTouchStart={(e) => {
            e.preventDefault();
            onMouseDown();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onMouseUp();
          }}
          className={keyClass}
        >
          {renderLabel()}
        </button>
      </div>
    </>
  );
};

export default Key;
