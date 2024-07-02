import { SimpleGrid } from "@chakra-ui/react";
import { Recipe } from "../types";
import RecipeCard from "./RecipeCard";
import SkeletonCard from "./SkeletonCard";

type Props = {
  recipes: Recipe[];
  loading: boolean;
  openRecipe: (recipe: Recipe) => void;
};

function MainContent({ recipes, loading, openRecipe }: Props) {
  const skeletons = Array.from({ length: 6 }, (_, i) => i);

  return (
    <SimpleGrid columns={[2, null, 3]} spacing="20px">
      {loading && skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}
      {!loading &&
        recipes.map((recipe) => (
          <RecipeCard
            openRecipe={() => openRecipe(recipe)}
            key={recipe.id}
            recipe={recipe}
          />
        ))}
    </SimpleGrid>
  );
}

export default MainContent;
