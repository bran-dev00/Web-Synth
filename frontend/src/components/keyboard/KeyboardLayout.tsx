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

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMouseDownGlobally, setIsMouseDownGlobally] =
    useState<boolean>(false);

  const octave: Note[] = getNotesByOctave(4, 5);

  //Handle Global Mouse Up Release Note
  // const handleGlobalMouseUp = () => {};
  // useEffect(() => {
  //   window.addEventListener("mouseup");
  // }, []);
  //
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

  //TODO: Place Notes in 2 octaves
  // How do we do this?  [C3,C#3D,E,F,G,A,B,C,D,E,F,G,A,B,C2]
  // write a function getNotesByOctave(startOctave, endingOctave)  => returns an array or an object of notes.
  //

  return (
    <div>
      <h1>Keyboard</h1>
      <Container style={{ border: "1px white solid" }}>
        <Flex direction={"row"} style={{ border: "1px yellow solid" }}>
          {/* TODO: How to setup a key for each element, we might need to add a ul and li elements to be able to style this easier */}
          {octave.map((note: Note) => {
            return (
              <Key
                key={note.name}
                isActive={true}
                onMouseUp={() => handleMouseUp(note)}
                onMouseDown={() => handleMouseDown(note)}
                onMouseDrag={() => handleMouseDragging(note)}
                onMouseLeave={() => handleMouseLeave(note)}
                //This might need to be changed if I decide to add frequency instead of just note names
                keyType={note.name.includes("#") ? "black" : "white"}
                note={note}
                label={false}
              />
            );
          })}
        </Flex>
      </Container>
    </div>
  );
};

export default KeyboardLayout;
