import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { Recipe } from "../types";
import { FaStar } from "react-icons/fa";

type Props = {
  recipe: Recipe;
  openRecipe: () => void;
};

function RecipeCard({ recipe, openRecipe }: Props) {
  return (
    <Card boxShadow="lg" bgColor="gray.50" border="2px solid" borderColor="gray.200">
      <CardBody>
        <Image
          src={recipe.thumbnail}
          alt={recipe.name}
          width="100%"
          height="300px"
          borderRadius="lg"
        />
        <Heading mt="4" size="md" color="green.900">
          <Text>{recipe.name}</Text>
        </Heading>
      </CardBody>
      <CardFooter pt="0">
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Button onClick={openRecipe} color="white" bgColor="green.500">
            Ver Receta
          </Button>
          <Tag size="lg" key="lg" variant="solid" bgColor="yellow.500">
            <TagLeftIcon boxSize="12px" as={FaStar} />
            <TagLabel>{recipe.score}</TagLabel>
          </Tag>
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
