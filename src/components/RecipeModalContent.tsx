import {
  Heading,
  Image,
  ListItem,
  ModalBody,
  ModalHeader,
  List,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Tag,
} from "@chakra-ui/react";

import { Recipe } from "../types";

type Props = {
  data: Recipe;
};

const joinSteps = (data: Recipe) => {
  let stepsList = [];

  for (let i = 0; i < data.steps.length; i++) {
    stepsList.push(`${data.steps[i].number}. ${data.steps[i].instruction}`);
  }

  return stepsList;
};

function RecipeModalContent({ data }: Props) {
  const steps = joinSteps(data);

  return (
    <>
      <ModalHeader fontSize="3xl" mb={-4} fontWeight="bold">
        {data.name}
      </ModalHeader>

      <ModalBody>
        <Heading size="sm" fontWeight="normal" mb={4}>
          {data.description}
        </Heading>
        <HStack mb={4}>
          <Tag colorScheme="green">{data.category?.name}</Tag>
          <Tag colorScheme="green">{data.origin?.name}</Tag>
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
        <TableContainer>
          <Table size="sm" variant="simple">
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
          Pasos
        </Heading>
        <List>
          {steps.map((step, index) => (
            <ListItem key={index}>{step}</ListItem>
          ))}
        </List>
      </ModalBody>
    </>
  );
}

export default RecipeModalContent;
