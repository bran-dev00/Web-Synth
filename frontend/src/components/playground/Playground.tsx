import { Container, Box } from "@chakra-ui/react";
import DebugPanel from "./DebugPanel";
import { Note } from "@/types/types";

import Key from "@/components/keyboard/Key";

const Playground = () => {
  const note: Note = { name: "A4" };
  return (
    <div>
      <Container>
        <h1>Playground</h1>
        <Box>
          <Key note={note} isActive={true} keyType={"white"} />
        </Box>
        <Box>
          <DebugPanel data={{ name: "hello" }} />
        </Box>
      </Container>
    </div>
  );
};

export default Playground;
