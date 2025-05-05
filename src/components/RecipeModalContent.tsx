import {
  Heading,
  Image,
  ModalBody,
  ModalHeader,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";

import { Recipe } from "../types";
import {
  FaClock,
  FaGlobeAmericas,
  FaStar,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { setTimeText } from "../utils/utilities";

type Props = {
  data: Recipe;
};

function RecipeModalContent({ data }: Props) {
  return (
    <>
      <ModalHeader fontSize="3xl" fontWeight="bold">
        {data.name}
      </ModalHeader>

      <ModalBody>
        <Heading size="sm" fontWeight="normal" mb={4}>
          {data.description}
        </Heading>

        <HStack mb={4}>
          <Tag colorScheme="yellow">
            <TagLabel>{data.score}</TagLabel>
            <TagRightIcon mr={1} boxSize="16px" as={FaStar} />
          </Tag>
          <Tag colorScheme="gray">
            <TagLabel>{data.category?.name}</TagLabel>
            <TagRightIcon mr={1} boxSize="16px" as={FaUtensils} />
          </Tag>
          <Tag colorScheme="gray">
            <TagLabel>{data.origin?.name}</TagLabel>
            <TagRightIcon mr={1} boxSize="16px" as={FaGlobeAmericas} />
          </Tag>
          <Tag colorScheme="gray">
            <TagLabel>{setTimeText(data.time)}</TagLabel>
            <TagRightIcon mr={1} boxSize="16px" as={FaClock} />
          </Tag>
          <Tag colorScheme="gray">
            <TagLabel>{data.servings}</TagLabel>
            <TagRightIcon mr={1} boxSize="20px" as={FaUsers} />
          </Tag>
        </HStack>

        <Image
          alt={data.name}
          width="100%"
          height="300px"
          borderRadius="lg"
          src={data.thumbnail}
        ></Image>

        <Heading mt="5" mb="3" size="md">
          Ingredientes
        </Heading>
        <TableContainer borderRadius="md">
          <Table size="sm" variant="unstyled">
            <Thead>
              <Tr>
                <Th>Cantidad</Th>
                <Th>Ingrediente</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.ingredients.map((ingredient, index) => (
                <Tr key={index}>
                  <Td width="100px" textAlign="right">
                    {ingredient.quantity} {ingredient.ingredient.unit}
                  </Td>
                  <Td>{ingredient.ingredient.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Heading mt="5" mb="3" size="md">
          Pasos de la Receta
        </Heading>
        <TableContainer borderRadius="md">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Paso</Th>
                <Th>Instrucción</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.steps.map((step, index) => (
                <Tr key={index}>
                  <Td width={"10px"} textAlign="center">
                    {step.number}
                  </Td>
                  <Td whiteSpace="normal">{step.instruction}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </ModalBody>
    </>
  );
}

export default RecipeModalContent;
