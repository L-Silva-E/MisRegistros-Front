import { FaClock, FaStar, FaUsers } from "react-icons/fa";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Image,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";

import { Recipe } from "../types";
import { FaKitchenSet } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type Props = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: Props) {
  const navigate = useNavigate();

  return (
    <Card p={2} userSelect="none">
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
          <Button
            variant="greenButton"
            onClick={() => navigate(`/recipes/${recipe.id}`)}
          >
            <HStack spacing={2}>
              <FaKitchenSet size={20} />
              <Text variant="buttonText">Preparar</Text>
            </HStack>
          </Button>

          <HStack>
            <Tag h={10} key="lg" variant="solid" bgColor="gray.500">
              <TagLabel ml={1} fontSize={16}>
                {"1 hr 30 min"}
              </TagLabel>
              <TagRightIcon mr={1} boxSize="18px" as={FaClock} />
            </Tag>
            <Tag h={10} key="lg" variant="solid" bgColor="gray.500">
              <TagLabel ml={1} fontSize={20}>
                {"4"}
              </TagLabel>
              <TagRightIcon mr={1} boxSize="20px" as={FaUsers} />
            </Tag>
            <Tag h={10} key="lg" variant="solid" bgColor="yellow.500">
              <TagLabel ml={1} fontSize={20}>
                {recipe.score}
              </TagLabel>
              <TagRightIcon mr={1} boxSize="18px" as={FaStar} />
            </Tag>
          </HStack>
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
