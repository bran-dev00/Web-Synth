import Key from "./Key.tsx";
import { SynthContext } from "@/contexts/SynthContext.tsx";
import { useEffect, useRef, useState, useContext } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Note } from "@/types/types";
import { getNotesByOctave } from "@/utils/utils.tsx";

interface KeyboardLayoutProps {
  startingOctave: number;
  endingOctave: number;
}

const KeyboardLayout = () => {
  const { synthRef, playNote, releaseNote } = useContext(SynthContext);
  //TODO: Dragging Functionality
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastDraggedNote, setLastDraggedNote] = useState<string | null>(null);

  const octave: Note[] = getNotesByOctave(4, 5);

  const handleMouseDown = (note: Note) => {
    if (synthRef?.current) {
      playNote(synthRef.current, note);
    }
  };

  const handleMouseUp = (note: Note) => {
    if (synthRef?.current) {
      releaseNote(synthRef.current, note);
    }
  };

  //TODO: Place Notes in 2 octaves
  // How do we do this?  [C3,C#3D,E,F,G,A,B,C,D,E,F,G,A,B,C2]
  // write a function getNotesByOctave(startOctave, endingOctave)  => returns an array or an object of notes.
  //

  return (
    <div>
      <h1>Keyboard</h1>
      <Container>
        <Flex direction={"row"}>
          {/* TODO: How to setup a key for each element, we might need to add a ul and li elements to be able to style this easier */}
          {octave.map((note: Note) => {
            return (
              <Key
                isActive={true}
                onKeyRelease={() => handleMouseUp(note)}
                onKeyPress={() => handleMouseDown(note)}
                //This might need to be changed if I decide to add frequency instead of just note names
                keyType={note.name.includes("#") ? "black" : "white"}
                note={note}
              />
            );
          })}
          {/* <Key */}
          {/*   isActive={true} */}
          {/*   onKeyRelease={() => handleMouseUp(n1)} */}
          {/*   onKeyPress={() => handleMouseDown(n1)} */}
          {/*   keyType="white" */}
          {/*   note={n1} */}
          {/* /> */}
        </Flex>
      </Container>
    </div>
  );
};

export default KeyboardLayout;
