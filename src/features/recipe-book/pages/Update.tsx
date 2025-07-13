import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  Center,
  Heading,
  Flex,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import useAxios from "../../../shared/hooks/axiosFetch";
import {
  RecipeForm,
  RecipeFormData,
  RecipeFormButtons,
} from "../../../shared/components/forms";
import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";
import { Recipe } from "../types";

const UpdateRecipePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();

  const {
    data: recipe,
    loading: isLoadingRecipe,
    axiosFetch: fetchRecipe,
  } = useAxios<Recipe>();

  const { loading: isUpdating, axiosFetch: updateRecipe } = useAxios();

  useEffect(() => {
    if (id) {
      fetchRecipe(HTTP_METHODS.GET, `${API_BASE_URL}/recipe/?id=${id}`);
    }
  }, [id, fetchRecipe]);

  const handleSubmit = async (formData: RecipeFormData) => {
    const bodyRecipe = {
      idCategory: formData.selectedCategory?.id,
      idOrigin: formData.selectedOrigin?.id,
      name: formData.name,
      description: formData.description,
      score: parseInt(formData.score),
      time: parseInt(formData.time),
      servings: formData.servings,
      ...(formData.thumbnail?.trim() && { thumbnail: formData.thumbnail }),
      ingredients:
        formData.ingredients?.map((ingredient) => ({
          id: parseInt(ingredient.id),
          quantity: parseFloat(ingredient.quantity),
        })) || [],
      steps: formData.steps.split("\n").map((step: string, index: number) => ({
        number: index + 1,
        instruction: step,
      })),
    };

    try {
      await updateRecipe(
        HTTP_METHODS.PATCH,
        `${API_BASE_URL}/recipe/${id}`,
        bodyRecipe
      );

      toast({
        position: "top",
        title: "Receta actualizada",
        description: `La receta "${formData.name}" ha sido actualizada exitosamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/recipes");
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        description:
          "Hubo un error al actualizar la receta. Inténtalo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    navigate("/recipes");
  };

  if (isLoadingRecipe) {
    return (
      <Center h="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!recipe) {
    return (
      <Center h="50vh">
        <Heading size="lg">Receta no encontrada</Heading>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Editar Receta</Heading>
        <RecipeFormButtons
          submitButtonText="Actualizar Receta"
          cancelAction={handleCancel}
          isLoading={isUpdating}
        />
      </Flex>
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} />
    </Box>
  );
};

export default UpdateRecipePage;
