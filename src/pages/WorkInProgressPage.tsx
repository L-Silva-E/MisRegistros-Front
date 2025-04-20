import {
  Box,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
  keyframes,
} from "@chakra-ui/react";

const WorkInProgressPage = () => {
  const stripes = Array(12).fill(0);

  const slideAnimation = keyframes`
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  `;

  return (
    <VStack
      spacing={6}
      align="center"
      justify="center"
      h="calc(100vh - 64px)"
      w="100%"
    >
      <VStack spacing={2}>
        <Heading size="2xl" color={useColorModeValue("green.800", "green.200")}>
          🚧 Work In Progress 🚧
        </Heading>
        <Box
          overflow="hidden"
          w="750px"
          mt={8}
          borderWidth={4}
          borderRadius="xl"
          borderColor={useColorModeValue("gray.300", "gray.700")}
        >
          <HStack
            spacing={0}
            animation={`${slideAnimation} 25s linear infinite`}
            w="fit-content"
          >
            {stripes.map((_, index) => (
              <Box
                key={index}
                w="80px"
                h={12}
                bg={index % 2 === 0 ? "yellow.400" : "black"}
                transform="skew(-45deg)"
              />
            ))}
            {stripes.map((_, index) => (
              <Box
                key={`repeat-${index}`}
                w="80px"
                h={12}
                bg={index % 2 === 0 ? "yellow.400" : "black"}
                transform="skew(-45deg)"
              />
            ))}
          </HStack>
        </Box>
      </VStack>
    </VStack>
  );
};

export default WorkInProgressPage;
