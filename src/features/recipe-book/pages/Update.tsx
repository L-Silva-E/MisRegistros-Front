import { useNavigate, useParams } from "react-router-dom";
import { FaArrowsRotate } from "react-icons/fa6";
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
  RecipeFormSubmissionData,
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

  const handleSubmit = async (formData: RecipeFormSubmissionData) => {
    const body = new FormData();
    body.append("name", formData.name);
    body.append("description", formData.description);
    body.append("idCategory", String(formData.selectedCategory?.id));
    body.append("idOrigin", String(formData.selectedOrigin?.id));
    body.append("score", String(parseInt(formData.score)));
    body.append("time", String(parseInt(formData.time)));
    body.append("servings", String(formData.servings));
    body.append(
      "ingredients",
      JSON.stringify(
        (formData.ingredients ?? []).map((ingredient) => ({
          id: parseInt(ingredient.id),
          quantity: parseFloat(ingredient.quantity),
        })),
      ),
    );
    body.append(
      "steps",
      JSON.stringify(
        formData.steps
          .split("\n")
          .filter((s: string) => s.trim())
          .map((step: string, index: number) => ({
            number: index + 1,
            instruction: step,
          })),
      ),
    );

    if (formData.thumbnailFile) {
      body.append("thumbnail", formData.thumbnailFile);
    }

    try {
      await updateRecipe(
        HTTP_METHODS.PATCH,
        `${API_BASE_URL}/recipe/${id}`,
        body,
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
    } catch (error: any) {
      const apiMessage = error?.response?.data?.details;
      toast({
        position: "top",
        title: "Error",
        description:
          apiMessage ??
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
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Editar Receta</Heading>
        <RecipeFormButtons
          submitIcon={<FaArrowsRotate />}
          submitTooltip="Actualizar receta"
          cancelAction={handleCancel}
          isLoading={isUpdating}
        />
      </Flex>
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} />
    </Box>
  );
};

export default UpdateRecipePage;
