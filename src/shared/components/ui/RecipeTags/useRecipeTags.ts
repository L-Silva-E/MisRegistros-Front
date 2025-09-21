import {
  FaStar,
  FaUtensils,
  FaGlobeAmericas,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import { TagData } from "./types";
import { Recipe } from "../../../../features/recipe-book/types";
import { setTimeText } from "../../../../features/recipe-book/utils/setTimeText";

export const useRecipeTags = (recipe: Recipe): TagData[] => {
  if (!recipe) return [];

  return [
    {
      label:
        recipe.score.toString() === "0"
          ? "Sin calificar"
          : recipe.score.toString(),
      icon: FaStar,
      colorScheme: "yellow",
      iconSize: "16px",
    },
    {
      label: recipe.category?.name || "Sin categoría",
      icon: FaUtensils,
      colorScheme: "gray",
      iconSize: "16px",
    },
    {
      label: recipe.origin?.name || "Sin origen",
      icon: FaGlobeAmericas,
      colorScheme: "gray",
      iconSize: "16px",
    },
    {
      label: setTimeText(recipe.time),
      icon: FaClock,
      colorScheme: "gray",
      iconSize: "16px",
    },
    {
      label: recipe.servings.toString(),
      icon: FaUsers,
      colorScheme: "gray",
      iconSize: "20px",
    },
  ];
};
