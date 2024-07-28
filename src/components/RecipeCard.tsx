import { FaStar } from "react-icons/fa";
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

type Props = {
  recipe: Recipe;
  openRecipe: () => void;
};

function RecipeCard({ recipe, openRecipe }: Props) {
  return (
    <Card p={2}>
      <CardBody>
        <Image
          src={recipe.thumbnail}
          alt={recipe.name}
          width="100%"
          height="300px"
          borderRadius="lg"
        />
        <Heading mt="4" size="md">
          {recipe.name}
        </Heading>
        <Text mt={2} isTruncated>
          {recipe.description}
        </Text>
      </CardBody>
      <CardFooter pt="0">
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Button onClick={openRecipe} variant="greenButton">
            Ver Receta
          </Button>
          <Tag h={10} key="lg" variant="solid" bgColor="yellow.500">
            <TagLeftIcon boxSize="20px" as={FaStar} />
            <TagLabel fontSize={20}>{recipe.score}</TagLabel>
          </Tag>
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
