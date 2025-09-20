import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { API_BASE_URL, API_KEY } from "../../../shared/constants/environment";

export interface DuplicateRecipeResponse {
  idCategory: number;
  idOrigin: number;
  name: string;
  description: string;
  thumbnail?: string;
  score: number;
  time: number;
  servings: number;
  ingredients: Array<{
    id: number;
    name: string;
    unit: string;
    quantity: number;
  }>;
  steps: Array<{
    number: number;
    instruction: string;
  }>;
}

export const useRecipeDuplicate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const duplicateRecipe = async (recipeId: number, recipeName: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/recipe/${recipeId}/duplicate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": API_KEY,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al duplicar la receta");
      }

      const { data } = await response.json();

      toast({
        position: "top",
        title: "Receta duplicada",
        description: `"${recipeName}" se ha duplicado exitosamente. Ahora puedes editarla.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/recipes/create", {
        state: {
          duplicatedData: data,
          originalName: recipeName,
          isDuplicate: true,
        },
      });
    } catch (error) {
      console.error("Error duplicating recipe:", error);

      toast({
        position: "top",
        title: "Error al duplicar",
        description:
          error instanceof Error
            ? error.message
            : "Por favor intente nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    duplicateRecipe,
    isLoading,
  };
};
