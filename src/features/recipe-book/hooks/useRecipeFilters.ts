import { useState, useCallback } from "react";
import { Category, Origin } from "../types";
import { SearchForm } from "../../../shared/types/searchForm";
import { API_BASE_URL } from "../../../shared/constants/environment";

const defaultFilterRecipe = { searchText: "" };
const defaultCategory = { id: 0, name: "", createdAt: "", updatedAt: "" };
const defaultOrigin = { id: 0, name: "", createdAt: "", updatedAt: "" };

const makeRecipeUrl = (
  filterRecipe: SearchForm,
  selectedCategory: Category,
  selectedOrigin: Origin,
  sortBy: string,
  sortDirection: string,
  onlyMine: boolean,
) => {
  let url = `${API_BASE_URL}/recipe`;
  let params = [];

  if (onlyMine) {
    params.push("idUser=me");
  }
  if (filterRecipe.searchText !== "") {
    params.push(`name=${filterRecipe.searchText}`);
  }
  if (selectedCategory.id !== 0) {
    params.push(`idCategory=${selectedCategory.id}`);
  }
  if (selectedOrigin.id !== 0) {
    params.push(`idOrigin=${selectedOrigin.id}`);
  }
  if (sortBy !== "") {
    params.push(`orderByField=${sortBy}`);
    params.push(`orderBy=${sortDirection}`);
  }

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  return url;
};

export const useRecipeFilters = () => {
  const [filterRecipe, setFilterRecipe] =
    useState<SearchForm>(defaultFilterRecipe);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(defaultOrigin);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [onlyMine, setOnlyMine] = useState(false);

  const buildRecipeUrl = useCallback(() => {
    return makeRecipeUrl(
      filterRecipe,
      selectedCategory,
      selectedOrigin,
      sortBy,
      sortDirection,
      onlyMine,
    );
  }, [
    filterRecipe,
    selectedCategory,
    selectedOrigin,
    sortBy,
    sortDirection,
    onlyMine,
  ]);

  const updateSearch = useCallback((data: SearchForm) => {
    setFilterRecipe(data);
  }, []);

  const updateCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const updateOrigin = useCallback((origin: Origin) => {
    setSelectedOrigin(origin);
  }, []);

  const updateSort = useCallback((field: string) => {
    setSortBy(field);
  }, []);

  const toggleSortDirection = useCallback(() => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const toggleOnlyMine = useCallback(() => {
    setOnlyMine((prev) => !prev);
  }, []);

  const resetFilters = useCallback(() => {
    setFilterRecipe(defaultFilterRecipe);
    setSelectedCategory(defaultCategory);
    setSelectedOrigin(defaultOrigin);
    setSortBy("");
    setSortDirection("asc");
    setOnlyMine(false);
  }, []);

  return {
    // State
    filterRecipe,
    selectedCategory,
    selectedOrigin,
    sortBy,
    sortDirection,
    onlyMine,

    // Actions
    updateSearch,
    updateCategory,
    updateOrigin,
    updateSort,
    toggleSortDirection,
    toggleOnlyMine,
    resetFilters,
    buildRecipeUrl,

    // Utils
    defaultCategory,
    defaultOrigin,
  };
};
