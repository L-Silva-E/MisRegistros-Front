import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaKitchenSet } from "react-icons/fa6";

import { Recipe } from "../types";
import { RecipeCardImage, RecipeTags } from "../../../shared/components/ui";
import { useRecipeTags } from "../../../shared/components/ui/RecipeTags/useRecipeTags";

type Props = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: Props) {
  const navigate = useNavigate();
  const allTags = useRecipeTags(recipe);

  // Filtrar solo los tags que queremos mostrar: score, time, servings
  const cardTags = allTags.filter((_, index) => {
    // Basado en el orden del hook: [score, category, origin, time, servings]
    // Queremos: score (0), time (3), servings (4)
    return index === 0 || index === 3 || index === 4;
  });

  return (
    <Card p={2} userSelect="none">
      <CardBody>
        <RecipeCardImage src={recipe.thumbnail} alt={recipe.name} />
        <Heading mt="4" size="md">
          {recipe.name}
        </Heading>
        <Text mt={2} isTruncated>
          {recipe.description}
        </Text>
      </CardBody>
      <CardFooter pt="0">
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Tooltip
            openDelay={500}
            label="Preparar receta"
            hasArrow
            placement="top"
          >
            <Button
              variant="greenButton"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <FaKitchenSet size={20} />
            </Button>
          </Tooltip>

          <RecipeTags tags={cardTags} size="md" />
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
