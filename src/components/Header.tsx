import { FaFileImport, FaMoon, FaSun } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {};

const currentName = "Lucas Silva";

function Header({}: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center">
      <Box p="2">
        <HStack ml="4">
          <Icon
            as={FaFileImport}
            color={useColorModeValue("green.800", "green.200")}
            boxSize={6}
          />
          <Heading ml="2" size="md">
            MisRegistros
          </Heading>
        </HStack>
      </Box>
      <Spacer />
      <HStack align="center" gap="16px" mr="4">
        <Button onClick={toggleColorMode} variant="themeToggle">
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Avatar
          name={currentName}
          backgroundColor="green.800"
          color="green.50"
        />
      </HStack>
    </Flex>
  );
}

export default Header;
