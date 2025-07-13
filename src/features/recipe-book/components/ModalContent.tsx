import {
  Heading,
  Image,
  ModalBody,
  ModalHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { Recipe } from "../types";
import { RecipeTags, useRecipeTags } from "../../../shared/components/ui";

type Props = {
  data: Recipe;
};

function RecipeModalContent({ data }: Props) {
  const recipeTags = useRecipeTags(data);

  return (
    <>
      <ModalHeader fontSize="3xl" fontWeight="bold">
        {data.name}
      </ModalHeader>

      <ModalBody>
        <Heading size="sm" fontWeight="normal" mb={4}>
          {data.description}
        </Heading>

        <RecipeTags tags={recipeTags} spacing={4} mb={4} />

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
