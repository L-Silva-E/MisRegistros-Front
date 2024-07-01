import {
  Heading,
  Image,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  List,
} from "@chakra-ui/react";
import { Recipe } from "../types";

type Props = {
  data: Recipe;
};

const joinIngredients = (data: Recipe) => {
  let ingredientsList = [];

  for (let i = 0; i < data.ingredients.length; i++) {
    ingredientsList.push(
      `${data.ingredients[i].quantity} ${data.ingredients[i].ingredient.unit} - ${data.ingredients[i].ingredient.name}`
    );
  }

  return ingredientsList;
};

const joinSteps = (data: Recipe) => {
  let stepsList = [];

  for (let i = 0; i < data.steps.length; i++) {
    stepsList.push(`${data.steps[i].number}. ${data.steps[i].instruction}`);
  }

  return stepsList;
};

function RecipeModelContent({ data }: Props) {
  const ingredients = joinIngredients(data);
  const steps = joinSteps(data);

  return (
    <>
      <ModalHeader color="green.100" fontWeight="bold">
        {data.name}
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Image
          alt={data.name}
          width="100%"
          borderRadius="lg"
          src={data.thumbnail}
        ></Image>

        <Heading mt="4" mb="4" size="md" color="green.100">
          ・Ingredientes
        </Heading>
        <List>
          {ingredients.map((ingredient, index) => (
            <ListItem color="green.100" key={index}>
              {ingredient}
            </ListItem>
          ))}
        </List>

        <Heading mt="4" mb="4" size="md" color="green.100">
          ・Pasos
        </Heading>
        <List color="green.100">
          {steps.map((step, index) => (
            <ListItem key={index}>{step}</ListItem>
          ))}
        </List>
      </ModalBody>
    </>
  );
}

export default RecipeModelContent;
