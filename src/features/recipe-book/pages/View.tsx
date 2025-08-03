import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import useAxios from "../../../shared/hooks/axiosFetch";

import {
  RecipeTags,
  useRecipeTags,
  IngredientsTable,
  StepsTable,
  RecipeDetailImage,
} from "../../../shared/components/ui";

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
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <VStack align="stretch" spacing={4}>
            <Heading size="lg">{recipe?.name}</Heading>
            <Text>{recipe?.description}</Text>
            <RecipeTags tags={recipeTags} size="lg" spacing={3} my={4} />
            <Flex justify="center" w="100%">
              <RecipeDetailImage
                src={
                  recipe?.thumbnail ||
                  "https://via.placeholder.com/400x300?text=Recipe+Image"
                }
                alt={recipe?.name || "Recipe image"}
                borderColor={borderColor}
                fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
                mx="auto"
                display="block"
              />
            </Flex>
          </VStack>
        </GridItem>

        <GridItem>
          <Heading mb={4}>Ingredientes</Heading>
          <IngredientsTable
            ingredients={recipe?.ingredients || []}
            interactive={true}
            checkedItems={checkedIngredients}
            onToggleItem={toggleIngredient}
            checkboxColor={checkboxBorderColor}
          />
          <Heading my={4}>Pasos de la Receta</Heading>
          <StepsTable
            steps={recipe?.steps || []}
            interactive={true}
            completedSteps={completedSteps}
            onToggleStep={toggleStep}
            checkboxColor={checkboxBorderColor}
          />
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
