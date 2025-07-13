import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaCheckSquare } from "react-icons/fa";

import useAxios from "../../../shared/hooks/axiosFetch";
import { RecipeTags, useRecipeTags } from "../../../shared/components/ui";

import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";
import { Recipe } from "../types";

const ViewRecipePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const borderColor = useColorModeValue("gray.400", "gray.600");
  const checkboxBorderColor = useColorModeValue("gray.400", "gray.500");

  const { data: recipe, axiosFetch: axiosFetchRecipe } = useAxios<Recipe>();
  const recipeTags = useRecipeTags(recipe!);

  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set()
  );

  const toggleIngredient = (ingredientId: string) => {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      newSet.has(ingredientId)
        ? newSet.delete(ingredientId)
        : newSet.add(ingredientId);
      return newSet;
    });
  };

  useEffect(() => {
    axiosFetchRecipe(HTTP_METHODS.GET, `${API_BASE_URL}/recipe/?id=${id}`);
  }, []);

  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      return newSet;
    });
  };

  return (
    <Box p={8}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <VStack align="stretch" spacing={4}>
            <Heading size="lg">{recipe?.name}</Heading>
            <Text>{recipe?.description}</Text>
            <RecipeTags tags={recipeTags} size="lg" spacing={3} my={4} />
            <Center>
              <Image
                src={recipe?.thumbnail}
                alt={recipe?.name}
                width="100%"
                maxHeight="400px"
                border="3px solid"
                borderRadius="lg"
                borderColor={borderColor}
                objectFit="contain"
                maxW="xl"
              />
            </Center>
          </VStack>
        </GridItem>

        <GridItem>
          <Heading mb={4}>Ingredientes</Heading>
          <TableContainer borderRadius="md">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th width={12}>
                    <HStack justify="center">
                      <FaCheckSquare />
                    </HStack>
                  </Th>
                  <Th width="10%">Cantidad</Th>
                  <Th>Ingrediente</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recipe?.ingredients.map((ingredient, index) => (
                  <Tr
                    key={index}
                    color={
                      checkedIngredients.has(index.toString())
                        ? "green.500"
                        : "inherit"
                    }
                  >
                    <Td>
                      <Checkbox
                        colorScheme="green"
                        borderColor={checkboxBorderColor}
                        isChecked={checkedIngredients.has(index.toString())}
                        onChange={() => toggleIngredient(index.toString())}
                        size="lg"
                      />
                    </Td>
                    <Td textAlign="right">
                      {ingredient.quantity + " "}
                      {ingredient.ingredient.unit}
                    </Td>
                    <Td>{ingredient.ingredient.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Heading my={4}>Pasos de la Receta</Heading>
          <TableContainer borderRadius="md">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th width={12}>
                    <HStack justify="center">
                      <FaCheckSquare />
                    </HStack>
                  </Th>
                  <Th width={12} textAlign="center">
                    Paso
                  </Th>
                  <Th>Instrucción</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recipe?.steps.map((step) => (
                  <Tr
                    key={step.number}
                    color={
                      completedSteps.has(step.number) ? "green.500" : "inherit"
                    }
                    textDecoration={
                      completedSteps.has(step.number) ? "line-through" : "none"
                    }
                  >
                    <Td>
                      <Checkbox
                        colorScheme="green"
                        borderColor={checkboxBorderColor}
                        isChecked={completedSteps.has(step.number)}
                        onChange={() => toggleStep(step.number)}
                        size="lg"
                      ></Checkbox>
                    </Td>
                    <Td textAlign="center">{step.number}</Td>
                    <Td>{step.instruction}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
      </Grid>

      <Flex justify="flex-end">
        <Button
          mt={6}
          onClick={() => navigate("/recipes")}
          variant="greenButton"
        >
          Volver
        </Button>
      </Flex>
    </Box>
  );
};

export default ViewRecipePage;
