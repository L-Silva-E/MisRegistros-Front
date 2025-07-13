import { useNavigate } from "react-router-dom";
import { Box, Heading, Flex, useToast } from "@chakra-ui/react";

import {
  RecipeForm,
  RecipeFormButtons,
} from "../../../shared/components/forms";
import useAxios from "../../../shared/hooks/axiosFetch";
import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { axiosFetch } = useAxios();

  const handleSubmit = async (data: any) => {
    try {
      // Validar que se hayan seleccionado categoría y origen
      if (!data.selectedCategory || data.selectedCategory.id === 0) {
        toast({
          position: "top",
          title: "Error",
          description: "Por favor selecciona una categoría",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (!data.selectedOrigin || data.selectedOrigin.id === 0) {
        toast({
          position: "top",
          title: "Error",
          description: "Por favor selecciona un origen",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validar ingredientes
      if (!data.ingredients || data.ingredients.length === 0) {
        toast({
          position: "top",
          title: "Error",
          description: "Por favor agrega al menos un ingrediente",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validar que todos los ingredientes tengan datos válidos
      const invalidIngredients = data.ingredients.filter(
        (ingredient: any) =>
          ingredient.id === "0" || !ingredient.quantity.trim()
      );

      if (invalidIngredients.length > 0) {
        toast({
          position: "top",
          title: "Error",
          description: "Por favor completa todos los ingredientes",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const bodyRecipe = {
        idCategory: data.selectedCategory.id,
        idOrigin: data.selectedOrigin.id,
        name: data.name,
        description: data.description,
        score: parseInt(data.score),
        time: parseInt(data.time),
        servings: data.servings,
        ...(data.thumbnail?.trim() && { thumbnail: data.thumbnail }),
        ingredients: data.ingredients.map((ingredient: any) => ({
          id: parseInt(ingredient.id),
          quantity: parseFloat(ingredient.quantity),
        })),
        steps: data.steps.split("\n").map((step: string, index: number) => ({
          number: index + 1,
          instruction: step,
        })),
      };

      await axiosFetch(HTTP_METHODS.POST, `${API_BASE_URL}/recipe`, bodyRecipe);

      toast({
        position: "top",
        title: "Receta creada",
        description: `La receta "${data.name}" ha sido creada exitosamente`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/recipes");
    } catch (error) {
      toast({
        position: "top",
        title: "Error al crear receta",
        description:
          "No se pudo crear la receta. Por favor intente nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Error creating recipe: ", error);
    }
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Crear Nueva Receta</Heading>
        <RecipeFormButtons
          submitButtonText="Guardar Receta"
          cancelAction={() => navigate("/recipes")}
        />
      </Flex>
      <RecipeForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default CreateRecipePage;
