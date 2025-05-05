import {
  Box,
  Grid,
  GridItem,
  Heading,
  VStack,
  HStack,
  Center,
  Button,
  Flex,
  Image,
  Text,
  Tag,
  TagRightIcon,
  TagLabel,
  Checkbox,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import useAxios from "../hooks/axiosFetch";
import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { useEffect, useState } from "react";
import { IngredientDetail, Recipe } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckSquare, FaClock, FaStar, FaUsers } from "react-icons/fa";

const defaultIngredientState = { id: "0", quantity: "" };

const ViewRecipePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ingredients, setIngredients] = useState([defaultIngredientState]);
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    thumbnail: "",
    score: "",
    steps: "",
    category: "",
    origin: "",
  });

  const { data: dataIngredients, axiosFetch: axiosFetchIngredients } =
    useAxios<IngredientDetail[]>();
  const { data: recipe, axiosFetch: axiosFetchRecipe } = useAxios<Recipe>();

  // Add state for checked ingredients
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set()
  );

  // Add toggle handler
  const toggleIngredient = (ingredientId: string) => {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ingredientId)) {
        newSet.delete(ingredientId);
      } else {
        newSet.add(ingredientId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    axiosFetchIngredients(HTTP_METHODS.GET, `${API_BASE_URL}/ingredient`);
    axiosFetchRecipe(HTTP_METHODS.GET, `${API_BASE_URL}/recipe/?id=${id}`);
  }, []);

  useEffect(() => {
    if (recipe) {
      setRecipeData({
        name: recipe.name,
        description: recipe.description,
        thumbnail: recipe.thumbnail,
        score: recipe.score.toString(),
        steps: recipe.steps.map((step) => step.instruction).join("\n"),
        category: recipe.category.name,
        origin: recipe.origin.name,
      });
      setIngredients(
        recipe.ingredients.map((ingredient) => ({
          id: ingredient.ingredient.id.toString(),
          quantity: ingredient.quantity.toString(),
        }))
      );
    }
  }, [recipe]);

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
          <Heading size="lg" mb={6}>
            {recipeData.name}
          </Heading>
          <VStack align="stretch" spacing={4}>
            <Text>{recipeData.description}</Text>
            <HStack>
              <Tag colorScheme="yellow">
                <TagLabel>{recipeData.score}</TagLabel>
                <TagRightIcon mr={1} boxSize="16px" as={FaStar} />
              </Tag>
              <Tag colorScheme="gray">
                <TagLabel>{recipeData.category}</TagLabel>
              </Tag>
              <Tag colorScheme="gray">
                <TagLabel>{recipeData.origin}</TagLabel>
              </Tag>
              <Tag colorScheme="gray">
                <TagLabel>1 hr 30 min</TagLabel>
                <TagRightIcon mr={1} boxSize="16px" as={FaClock} />
              </Tag>
              <Tag colorScheme="gray">
                <TagLabel>4</TagLabel>
                <TagRightIcon mr={1} boxSize="20px" as={FaUsers} />
              </Tag>
            </HStack>
            <Center>
              <Image
                src={recipeData.thumbnail}
                alt={recipeData.name}
                width="100%"
                height="300px"
                borderRadius="lg"
                objectFit="cover"
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
                {ingredients.map((ingredient, index) => (
                  <Tr
                    key={index}
                    color={
                      checkedIngredients.has(ingredient.id)
                        ? "green.500"
                        : "inherit"
                    }
                  >
                    <Td>
                      <Checkbox
                        colorScheme="green"
                        borderColor={useColorModeValue("gray.400", "gray.500")}
                        isChecked={checkedIngredients.has(ingredient.id)}
                        onChange={() => toggleIngredient(ingredient.id)}
                        size="lg"
                      />
                    </Td>
                    <Td textAlign="right">
                      {ingredient.quantity + " "}
                      {
                        dataIngredients?.find(
                          (item) => item.id === parseInt(ingredient.id)
                        )?.unit
                      }
                    </Td>
                    <Td>
                      {
                        dataIngredients?.find(
                          (item) => item.id === parseInt(ingredient.id)
                        )?.name
                      }
                    </Td>
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
                        borderColor={useColorModeValue("gray.400", "gray.500")}
                        isChecked={completedSteps.has(step.number)}
                        onChange={() => toggleStep(step.number)}
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
