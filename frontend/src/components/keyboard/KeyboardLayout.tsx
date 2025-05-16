import Key from "./Key.tsx";
import { SynthContext } from "@/contexts/SynthContext.tsx";
import { useEffect, useRef, useContext } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Note } from "@/types/types";
import { getNotesByOctave } from "@/utils/utils.tsx";

interface KeyboardLayoutProps {
  startingOctave: number;
  endingOctave: number;
}

const KeyboardLayout = () => {
  const { synthRef, playNote, releaseNote } = useContext(SynthContext);
  const n1: Note = { name: "D4" };

  const octave = getNotesByOctave(2, 3);

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
          {octave.map((note: Note) => {
            return (
              <Key
                isActive={true}
                onKeyRelease={() => handleMouseUp(note)}
                onKeyPress={() => handleMouseDown(note)}
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
