import { Box, useDisclosure } from "@chakra-ui/react";
import MainContent from "../components/MainContent";
import RecipeModal from "../components/RecipeModal";
import { Recipe } from "../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <Box px={8} py={4}>
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
