import { memo } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import RecipeCard from "../Card";
import RecipeCardSkeleton from "../CardSkeleton";
import { Recipe } from "../../types";

interface RecipeGridProps {
  recipes?: Recipe[];
  loading: boolean;
  onRecipeClick: (recipe: Recipe) => void;
}

const RecipeGrid = memo(
  ({ recipes, loading, onRecipeClick }: RecipeGridProps) => {
    const skeletons = Array.from({ length: 6 }, (_, i) => i);

    return (
      <SimpleGrid columns={[2, null, 3]} spacing="40px" mb={16}>
        {loading &&
          skeletons.map((skeleton) => <RecipeCardSkeleton key={skeleton} />)}
        {!loading &&
          recipes?.map((recipe) => (
            <Box
              key={recipe.id}
              onClick={() => onRecipeClick(recipe)}
              cursor="pointer"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)" }}
            >
              <RecipeCard recipe={recipe} />
            </Box>
          ))}
      </SimpleGrid>
    );
  }
);

RecipeGrid.displayName = "RecipeGrid";

export { RecipeGrid };
