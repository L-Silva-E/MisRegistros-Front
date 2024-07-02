import {
  Heading,
  Image,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  List,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
      <ModalHeader color="green.100" fontWeight="bold">
        {data.name}
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Image
          alt={data.name}
          width="100%"
          height="300px"
          borderRadius="lg"
          src={data.thumbnail}
        ></Image>

        <Heading mt="5" mb="3" size="md" color="green.100">
          ・Ingredientes
        </Heading>
        <List>
          <TableContainer>
            <Table size="sm" variant="simple" colorScheme="green">
              <Thead>
                <Tr>
                  <Th color="green.200">Cantidad</Th>
                  <Th color="green.200">Ingrediente</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.ingredients.map((ingredient, index) => (
                  <Tr key={index}>
                    <Td width="100px" textAlign="right" color="green.100">
                      {ingredient.quantity} {ingredient.ingredient.unit}
                    </Td>
                    <Td color="green.100">{ingredient.ingredient.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </List>
        <Heading mt="5" mb="3" size="md" color="green.100">
          ・Pasos
        </Heading>
        <List color="green.100">
          {steps.map((step, index) => (
            <ListItem key={index}>{step}</ListItem>
          ))}
        </List>
      </ModalBody>
    </>
  );
}

export default RecipeModalContent;
