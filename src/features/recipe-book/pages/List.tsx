import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useDisclosure } from "@chakra-ui/react";

import MainContent from "../components/MainContent";
import RecipeModal from "../components/Modal";

import { Recipe } from "../types";

const RecipesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );

  const handleOpenRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    onOpen();
  };

  const navigate = useNavigate();
  const handleOpenRecipeCreate = () => {
    navigate("/recipes/create");
  };

  return (
    <Box>
      <MainContent
        openRecipe={handleOpenRecipe}
        openRecipeCreate={handleOpenRecipeCreate}
      />

      <RecipeModal
        isOpen={isOpen}
        onClose={onClose}
        loading={false}
        data={selectedRecipe}
      />
    </Box>
  );
};
export default RecipesPage;
