import { FaMoon, FaSun } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {};

const currentName = "Lucas Silva";

function Header({}: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      alignItems="center"
      bg={useColorModeValue("gray.200", "gray.900")}
      py={2}
      boxShadow="xl"
    >
      <Box p={2}>
        <HStack ml="4">
          <Box
            bg={useColorModeValue("gray.300", "gray.700")}
            borderRadius="full"
            borderWidth={2}
            borderColor={useColorModeValue("gray.400", "gray.600")}
            p={2}
            mr={-2}
            my={-2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src="/icon.png" alt="MisRegistros Icon" boxSize={8} />
          </Box>
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
