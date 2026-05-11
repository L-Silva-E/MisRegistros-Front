import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HStack, Spacer } from "@chakra-ui/react";

import { SearchFilters, ActionButtons, RecipeGrid } from "./RecipeList";
import { useRecipeFilters } from "../hooks/useRecipeFilters";

import useAxios from "../../../shared/hooks/axiosFetch";

import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";
import { Category, Origin, Recipe } from "../types";
import { SearchForm } from "../../../shared/types/searchForm";

type Props = {
  openRecipe: (recipe: Recipe) => void;
  openRecipeCreate: () => void;
};

function MainContent({ openRecipe, openRecipeCreate }: Props) {
  const navigate = useNavigate();

  const {
    filterRecipe,
    selectedCategory,
    selectedOrigin,
    sortBy,
    sortDirection,
    onlyMine,
    updateSearch,
    updateCategory,
    updateOrigin,
    updateSort,
    toggleSortDirection,
    toggleOnlyMine,
    resetFilters,
    buildRecipeUrl,
    defaultCategory,
    defaultOrigin,
  } = useRecipeFilters();

  const {
    loading: loadingRecipe,
    data: dataRecipe,
    axiosFetch: axiosFetchRecipe,
  } = useAxios<Recipe[]>();

  const {
    loading: loadingCategories,
    data: dataCategories,
    axiosFetch: axiosFetchCategories,
  } = useAxios<Category[]>();

  const {
    loading: loadingOrigins,
    data: dataOrigins,
    axiosFetch: axiosFetchOrigins,
  } = useAxios<Origin[]>();

  useEffect(() => {
    const url = buildRecipeUrl();
    axiosFetchRecipe(HTTP_METHODS.GET, url);
    axiosFetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
    axiosFetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
  }, [
    filterRecipe,
    selectedCategory,
    selectedOrigin,
    sortBy,
    sortDirection,
    onlyMine,
  ]);

  const handleSearchSubmit = (data: SearchForm) => {
    updateSearch(data);
  };

  const handleCategoryChange = (category: Category) => {
    updateCategory(category);
  };

  const handleOriginChange = (origin: Origin) => {
    updateOrigin(origin);
  };

  const handleSortChange = (field: string) => {
    updateSort(field);
  };

  const handleSortDirectionToggle = () => {
    toggleSortDirection();
  };

  const handleClearFilters = () => {
    resetFilters();
  };

  const navigateToMetaPage = () => {
    navigate("/recipe/meta");
  };

  return (
    <>
      <HStack align="center" justify="flex-start">
        <SearchFilters
          filterRecipe={filterRecipe}
          selectedCategory={selectedCategory}
          selectedOrigin={selectedOrigin}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onlyMine={onlyMine}
          categories={dataCategories || []}
          origins={dataOrigins || []}
          loadingCategories={loadingCategories}
          loadingOrigins={loadingOrigins}
          defaultCategory={defaultCategory}
          defaultOrigin={defaultOrigin}
          onSearchSubmit={handleSearchSubmit}
          onCategoryChange={handleCategoryChange}
          onOriginChange={handleOriginChange}
          onSortChange={handleSortChange}
          onSortDirectionToggle={handleSortDirectionToggle}
          onToggleOnlyMine={toggleOnlyMine}
          onClearFilters={handleClearFilters}
        />

        <Spacer />

        <ActionButtons
          onNavigateToMeta={navigateToMetaPage}
          onOpenRecipeCreate={openRecipeCreate}
        />
      </HStack>

      <RecipeGrid
        recipes={dataRecipe}
        loading={loadingRecipe}
        onRecipeClick={openRecipe}
      />
    </>
  );
}

export default MainContent;
