import Key from "./Key.tsx";
import { SynthContext } from "@/contexts/SynthContext.tsx";
import { useEffect, useRef, useState, useContext } from "react";
import { Container, Flex, Center } from "@chakra-ui/react";
import { Note, OctaveGroup } from "@/types/types";
import {
  getNotesByOctave,
  getOctaveGroups,
  getBlackKeyOffset,
} from "@/utils/utils.tsx";

interface KeyboardLayoutProps {
  startingOctave: number;
  endingOctave: number;
}

const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({
  startingOctave = 2,
  endingOctave = 4,
}) => {
  const { synthRef, playNote, releaseNote } = useContext(SynthContext);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const octaveGroups: OctaveGroup[] = getOctaveGroups(
    startingOctave,
    endingOctave,
  );

  //flatten all octaves
  const allWhiteKeys = octaveGroups.flatMap((group) => group.whiteKeys);
  const allBlackKeys = octaveGroups.flatMap((group) => group.blackKeys);

  console.log("blackKeys: ", allBlackKeys);
  console.log("octaveGroups", octaveGroups);

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
    <div>
      <h1>Keyboard</h1>
      <Container style={{ border: "1px white solid" }}>
        <Center>
          <Flex position={"relative"} direction={"row"}>
            {/* TODO: How to setup a key for each element, we might need to add a ul and li elements to be able to style this easier */}

            {allWhiteKeys.map((note: Note) => (
              <Key
                key={note.name}
                isActive={true}
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
                      isActive={true}
                      onMouseUp={() => handleMouseUp(note)}
                      onMouseDown={() => handleMouseDown(note)}
                      onMouseDrag={() => handleMouseDragging(note)}
                      onMouseLeave={() => handleMouseLeave(note)}
                      keyType="black"
                      note={note}
                      label={true}
                    />
                  </div>
                );
              }),
            )}
          </Flex>
        </Center>
      </Container>
    </div>
  );
};

export default KeyboardLayout;
