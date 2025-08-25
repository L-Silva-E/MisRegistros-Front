import { Heading, ModalBody, ModalHeader } from "@chakra-ui/react";

import { Recipe } from "../types";

import {
  RecipeTags,
  useRecipeTags,
  IngredientsTable,
  StepsTable,
  RecipeModalImage,
} from "../../../shared/components/ui";

type Props = {
  data: Recipe;
};

function RecipeModalContent({ data }: Props) {
  const recipeTags = useRecipeTags(data);

  return (
    <>
      <ModalHeader fontSize="3xl" fontWeight="bold">
        {data.name}
      </ModalHeader>

      <ModalBody>
        <Heading size="sm" fontWeight="normal" mb={4}>
          {data.description}
        </Heading>

        <RecipeTags tags={recipeTags} spacing={4} mb={4} />

        <RecipeModalImage src={data.thumbnail} alt={data.name} />

        <Heading mt="5" mb="3" size="md">
          Ingredientes
        </Heading>
        <IngredientsTable
          ingredients={data.ingredients}
          size="sm"
          variant="unstyled"
        />

        <Heading mt="5" mb="3" size="md">
          Pasos de la Receta
        </Heading>
        <StepsTable steps={data.steps} size="sm" />
      </ModalBody>
    </>
  );
}

export default RecipeModalContent;
