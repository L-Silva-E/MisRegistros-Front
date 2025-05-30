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
import { Recipe } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCheckSquare,
  FaClock,
  FaGlobeAmericas,
  FaStar,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { setTimeText } from "../utils/utilities";

const ViewRecipePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const borderColor = useColorModeValue("gray.400", "gray.600");

  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    thumbnail: "",
    score: "",
    time: "",
    servings: "",
    steps: "",
    category: "",
    origin: "",
  });

  const { data: recipe, axiosFetch: axiosFetchRecipe } = useAxios<Recipe>();

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

  useEffect(() => {
    if (recipe) {
      setRecipeData({
        name: recipe.name,
        description: recipe.description,
        thumbnail: recipe.thumbnail,
        score: recipe.score.toString(),
        time: setTimeText(recipe.time),
        servings: recipe.servings.toString(),
        steps: recipe.steps.map((step) => step.instruction).join("\n"),
        category: recipe.category.name,
        origin: recipe.origin.name,
      });
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
          <VStack align="stretch" spacing={4}>
            <Heading size="lg">{recipeData.name}</Heading>
            <Text>{recipeData.description}</Text>
            <HStack my={4} spacing={3}>
              <Tag colorScheme="yellow" size="lg">
                <TagLabel>{recipeData.score}</TagLabel>
                <TagRightIcon mr={1} boxSize="16px" as={FaStar} />
              </Tag>
              <Tag colorScheme="gray" size="lg">
                <TagLabel>{recipeData.category}</TagLabel>
                <TagRightIcon mr={1} boxSize="16px" as={FaUtensils} />
              </Tag>
              <Tag colorScheme="gray" size="lg">
                <TagLabel>{recipeData.origin}</TagLabel>
                <TagRightIcon mr={1} boxSize="16px" as={FaGlobeAmericas} />
              </Tag>
              <Tag colorScheme="gray" size="lg">
                <TagLabel>{recipeData.time}</TagLabel>
                <TagRightIcon mr={1} boxSize="16px" as={FaClock} />
              </Tag>
              <Tag colorScheme="gray" size="lg">
                <TagLabel>{recipeData.servings}</TagLabel>
                <TagRightIcon mr={1} boxSize="20px" as={FaUsers} />
              </Tag>
            </HStack>
            <Center>
              <Image
                src={recipeData.thumbnail}
                alt={recipeData.name}
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
                        borderColor={useColorModeValue("gray.400", "gray.500")}
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
                        borderColor={useColorModeValue("gray.400", "gray.500")}
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
