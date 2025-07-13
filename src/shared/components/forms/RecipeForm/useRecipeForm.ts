import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { RecipeFormData, IngredientFormData } from "./types";
import {
  Recipe,
  Category,
  Origin,
  IngredientDetail,
} from "../../../../features/recipe-book/types";
import useAxios from "../../../hooks/axiosFetch";
import { API_BASE_URL } from "../../../constants/environment";
import { HTTP_METHODS } from "../../../constants/httpMethods";

const defaultCategory: Category = {
  id: 0,
  name: "",
  createdAt: "",
  updatedAt: "",
};
const defaultOrigin: Origin = { id: 0, name: "", createdAt: "", updatedAt: "" };

export const useRecipeForm = (initialData?: Recipe) => {
  const form = useForm<RecipeFormData>({
    defaultValues: {
      name: "",
      description: "",
      thumbnail: "",
      score: "",
      time: "",
      servings: 1,
      steps: "",
    },
  });

  const { setValue, reset, watch } = form;

  // Estados para categorías, orígenes e ingredientes
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(defaultOrigin);
  const [ingredients, setIngredients] = useState<IngredientFormData[]>([
    { id: "0", quantity: "" },
  ]);

  // Hooks para cargar datos de categorías, orígenes e ingredientes
  const {
    data: categories = [],
    loading: isLoadingCategories,
    axiosFetch: fetchCategories,
  } = useAxios<Category[]>();
  const {
    data: origins = [],
    loading: isLoadingOrigins,
    axiosFetch: fetchOrigins,
  } = useAxios<Origin[]>();
  const {
    data: availableIngredients = [],
    loading: isLoadingIngredients,
    axiosFetch: fetchIngredients,
  } = useAxios<IngredientDetail[]>();

  // Cargar categorías, orígenes e ingredientes al montar el componente
  useEffect(() => {
    fetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
    fetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
    fetchIngredients(HTTP_METHODS.GET, `${API_BASE_URL}/ingredient`);
  }, [fetchCategories, fetchOrigins, fetchIngredients]);

  // Cargar datos iniciales cuando se proporciona initialData (para Update)
  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name);
      setValue("description", initialData.description);
      setValue("thumbnail", initialData.thumbnail || "");
      setValue("score", initialData.score.toString());
      setValue("time", initialData.time.toString());
      setValue("servings", initialData.servings);
      setValue(
        "steps",
        initialData.steps.map((step: any) => step.instruction).join("\n")
      );

      // Cargar categoría y origen seleccionados
      if (initialData.category) {
        setSelectedCategory(initialData.category);
      }
      if (initialData.origin) {
        setSelectedOrigin(initialData.origin);
      }

      // Cargar ingredientes
      if (initialData.ingredients && initialData.ingredients.length > 0) {
        const initialIngredients = initialData.ingredients.map(
          (ingredient: any) => ({
            id: ingredient.ingredient.id.toString(),
            quantity: ingredient.quantity.toString(),
          })
        );
        setIngredients(initialIngredients);
      }
    }
  }, [initialData, setValue]);

  // Función para resetear el formulario
  const resetForm = () => {
    reset();
    setSelectedCategory(defaultCategory);
    setSelectedOrigin(defaultOrigin);
    setIngredients([{ id: "0", quantity: "" }]);
  };

  return {
    ...form,
    watch,
    resetForm,
    selectedCategory,
    setSelectedCategory,
    selectedOrigin,
    setSelectedOrigin,
    categories,
    origins,
    isLoadingCategories,
    isLoadingOrigins,
    ingredients,
    setIngredients,
    availableIngredients,
    isLoadingIngredients,
  };
};
