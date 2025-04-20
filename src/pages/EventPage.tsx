import { Heading, useColorModeValue, VStack } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <VStack
      spacing={6}
      align="center"
      justify="center"
      h="calc(100vh - 64px)"
      w="100%"
    >
      <Heading size="2xl" color={useColorModeValue("green.800", "green.200")}>
        Eventos
      </Heading>
    </VStack>
  );
};

export default HomePage;
