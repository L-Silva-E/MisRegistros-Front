import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Recipe } from "../types";

type Props = {
  recipe: Recipe;
  openRecipe: () => void;
};

function RecipeCard({ recipe, openRecipe }: Props) {
  return (
    <Card boxShadow="lg" bgColor="green.700">
      <CardBody>
        <Image src={recipe.thumbnail} alt={recipe.name} borderRadius="lg" />
        <Heading mt="4" size="md" color="green.100">
          <Text>{recipe.name}</Text>
        </Heading>
      </CardBody>
      <CardFooter pt="0">
        <Button onClick={openRecipe} color="white" bgColor="green.500">
          Ver Receta
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
