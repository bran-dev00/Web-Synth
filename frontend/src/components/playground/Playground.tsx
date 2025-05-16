import { Container, Box, Flex } from "@chakra-ui/react";
import DebugPanel from "./DebugPanel";
import { Note } from "@/types/types";

import Key from "@/components/keyboard/Key";
import KeyboardLayout from "@/components/keyboard/KeyboardLayout";

const Playground = () => {
  const note: Note = { name: "A4" };
  const note2: Note = { name: "B4" };
  const playNote = () => {
    console.log("play note");
  };
  const stopNote = () => {
    console.log("stop note");
  };

  return (
    <div>
      <Container>
        <h1>Playground</h1>
        <Flex>
          <Box>
            <Key
              onKeyPress={playNote}
              onKeyRelease={stopNote}
              note={note}
              isActive={true}
              keyType={"white"}
            />
            <Key
              onKeyPress={playNote}
              onKeyRelease={stopNote}
              note={note2}
              isActive={true}
              keyType={"black"}
            />
          </Box>
        </Flex>
        <KeyboardLayout />
        <Box>
          <DebugPanel data={{ name: "hello" }} />
        </Box>
      </Container>
    </div>
  );
};

export default Playground;
