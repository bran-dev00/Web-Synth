import { Note } from "../../types/types";
import { PolySynth } from "tone";

// Hardcoded to only polysynth for now
const Key = ({
  note,
  synthRef,
}: {
  note: Note;
  synth: PolySynth | null;
  synthRef: React.RefObject<PolySynth | null>;
}) => {
  return (
    <>
      <div>
        <button
          onMouseDown={() =>
            synthRef.current?.triggerAttack(note.name, note.duration)
          }
          onMouseUp={() => synthRef.current?.triggerRelease(note.name)}
          onMouseLeave={() => synthRef.current?.triggerRelease(note.name)}
        >
          {note.name}
        </button>
      </div>
    </>
  );
};

export default Key;
