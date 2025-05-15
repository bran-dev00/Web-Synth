import { Container, Code, Box } from "@chakra-ui/react";

interface DebugPanelProps {
  data: any;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ data }) => {
  return (
    <div>
      <Container>
        <Box>
          <Code>{JSON.stringify(data)}</Code>
        </Box>
      </Container>
    </div>
  );
};

export default DebugPanel;
