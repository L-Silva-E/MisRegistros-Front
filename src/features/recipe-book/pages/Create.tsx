import { useNavigate, useLocation } from "react-router-dom";
import { Box, Heading, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFloppyDisk } from "react-icons/fa6";

import {
  RecipeForm,
  RecipeFormButtons,
} from "../../../shared/components/forms";
import useAxios from "../../../shared/hooks/axiosFetch";
import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";
import {
  RecipeFormSubmissionData,
  IngredientFormData,
} from "../../../shared/components/forms/RecipeForm/types";
import { Recipe } from "../types";

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { axiosFetch } = useAxios();

  const [initialData, setInitialData] = useState<Recipe | null>(null);
  const [pageTitle, setPageTitle] = useState("Crear nueva Receta");

  useEffect(() => {
    if (location.state?.duplicatedData && location.state?.isDuplicate) {
      const { duplicatedData, originalName } = location.state;

      // Convertir 'DuplicateRecipeResponse' a Recipe format
      const recipeData: Recipe = {
        id: 0, // Temporal, será asignado al guardar
        idUser: 0, // Temporal, será asignado al guardar
        idCategory: duplicatedData.idCategory,
        idOrigin: duplicatedData.idOrigin,
        name: duplicatedData.name,
        description: duplicatedData.description,
        thumbnail: duplicatedData.thumbnail || "",
        score: duplicatedData.score,
        time: duplicatedData.time,
        servings: duplicatedData.servings,
        createdAt: "",
        updatedAt: "",
        category: {
          id: duplicatedData.idCategory,
          name: "",
          createdAt: "",
          updatedAt: "",
        },
        origin: {
          id: duplicatedData.idOrigin,
          name: "",
          createdAt: "",
          updatedAt: "",
        },
        ingredients: duplicatedData.ingredients.map((ing: any) => ({
          quantity: ing.quantity,
          ingredient: {
            id: ing.id.toString(),
            name: ing.name,
            unit: ing.unit,
          },
          id: 0,
          idRecipe: 0,
        })),
        steps: duplicatedData.steps.map((step: any) => ({
          id: 0,
          number: step.number,
          instruction: step.instruction,
          idRecipe: 0,
        })),
      };

      setInitialData(recipeData);
      setPageTitle(`Editando copia de "${originalName}"`);
    }
  }, [location.state]);

  const handleSubmit = async (data: RecipeFormSubmissionData) => {
    try {
      // Validar que se hayan seleccionado "categoría" y "origen",
      // y que los ingredientes sean válidos
      let messageError = "";

      if (!data.selectedCategory || data.selectedCategory.id === 0) {
        messageError = "Por favor selecciona una categoría";
      } else if (!data.selectedOrigin || data.selectedOrigin.id === 0) {
        messageError = "Por favor selecciona un origen";
      } else if (!data.ingredients || data.ingredients.length === 0) {
        messageError = "Por favor agrega al menos un ingrediente";
      } else if (
        data.ingredients.some(
          (ingredient: IngredientFormData) =>
            ingredient.id === "0" || !ingredient.quantity.trim(),
        )
      ) {
        messageError = "Por favor completa todos los ingredientes";
      }

      if (messageError) {
        toast({
          position: "top",
          title: "Error",
          description: messageError,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("idCategory", String(data.selectedCategory.id));
      formData.append("idOrigin", String(data.selectedOrigin.id));
      formData.append("score", String(parseInt(data.score)));
      formData.append("time", String(parseInt(data.time)));
      formData.append("servings", String(data.servings));
      formData.append(
        "ingredients",
        JSON.stringify(
          data.ingredients.map((ingredient: IngredientFormData) => ({
            id: parseInt(ingredient.id),
            quantity: parseFloat(ingredient.quantity),
          }))
        )
      );
      formData.append(
        "steps",
        JSON.stringify(
          data.steps
            .split("\n")
            .filter((s: string) => s.trim())
            .map((step: string, index: number) => ({
              number: index + 1,
              instruction: step,
            }))
        )
      );

      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile);
      }

      await axiosFetch(HTTP_METHODS.POST, `${API_BASE_URL}/recipe`, formData);

      toast({
        position: "top",
        title: location.state?.isDuplicate
          ? "Receta duplicada guardada"
          : "Receta creada",
        description: location.state?.isDuplicate
          ? `La copia de "${location.state.originalName}" ha sido guardada exitosamente como "${data.name}"`
          : `La receta "${data.name}" ha sido creada exitosamente`,
        status: "success",
        duration: location.state?.isDuplicate ? 5000 : 3000,
        isClosable: true,
      });

      navigate("/recipes");
    } catch (error: any) {
      const apiMessage = error?.response?.data?.details;
      toast({
        position: "top",
        title: "Error al crear receta",
        description: apiMessage ?? "Por favor intente nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Error creating recipe: ", error);
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">{pageTitle}</Heading>
        <RecipeFormButtons
          submitIcon={<FaFloppyDisk />}
          submitTooltip={location.state?.isDuplicate ? "Guardar copia" : "Guardar receta"}
          cancelAction={() => navigate("/recipes")}
        />
      </Flex>
      <RecipeForm
        onSubmit={handleSubmit}
        initialData={initialData || undefined}
      />
    </Box>
  );
};

export default CreateRecipePage;
