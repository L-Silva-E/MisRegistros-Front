import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch, FaSortAlphaDown } from "react-icons/fa";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";

import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

import useAxios from "../hooks/axiosFetch";

import { API_BASE_URL } from "../constants/environment";
import { Category, Origin, Recipe, SearchForm } from "../types";

type Props = {
  openRecipe: (recipe: Recipe) => void;
  openRecipeCreate: () => void;
};

const defaultFilterRecipe = { search: "" };
const defaultCategory = { id: 0, name: "" };
const defaultOrigin = { id: 0, name: "" };

const makeRecipeUrl = (
  filterRecipe: SearchForm,
  selectedCategory: Category,
  selectedOrigin: Origin
) => {
  let url = `${API_BASE_URL}/recipe?page=0&limit=100`;

  if (filterRecipe.search !== "") {
    url += `&name=${filterRecipe.search}`;
  }
  if (selectedCategory.id !== 0) {
    url += `&idCategory=${selectedCategory.id}`;
  }
  if (selectedOrigin.id !== 0) {
    url += `&idOrigin=${selectedOrigin.id}`;
  }

  return url;
};

function MainContent({ openRecipe, openRecipeCreate }: Props) {
  const skeletons = Array.from({ length: 6 }, (_, i) => i);

  const { register, handleSubmit } = useForm<SearchForm>();

  // ~ States: Recipe, Category, Origin
  const [filterRecipe, setFilterRecipe] =
    useState<SearchForm>(defaultFilterRecipe);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(defaultOrigin);

  // ~ axiosFetch: Recipe, Category, Origin
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
    axiosFetchRecipe(
      "GET",
      makeRecipeUrl(filterRecipe, selectedCategory, selectedOrigin)
    );
    axiosFetchCategories("GET", `${API_BASE_URL}/category`);
    axiosFetchOrigins("GET", `${API_BASE_URL}/origin`);
  }, []);

  return (
    <>
      <HStack align="center" justify="flex-start" gap="10px">
        <HStack mt="4" mb="8" gap="25px">
          <form onSubmit={handleSubmit(setFilterRecipe)}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <FaSearch />
              </InputLeftElement>
              <Input
                type="text"
                width="250px"
                placeholder="Nombre de la Receta"
                autoComplete="off"
                {...register("search", { required: false })}
              />
            </InputGroup>
          </form>
          <Select icon={<FaSortAlphaDown />} placeholder="Orden">
            <option value="Id">Id</option>
            <option value="Nombre">Nombre</option>
            <option value="Score">Mejor Valoradas</option>
          </Select>
          <Select
            placeholder="Categoría"
            onChange={(e) =>
              setSelectedCategory(
                dataCategories?.find(
                  (category) => category.name === e.target.value
                ) || defaultCategory
              )
            }
            variant={selectedCategory.id === 0 ? "" : "selected"}
          >
            {loadingCategories && (
              <option value="emptyCategory">Cargando...</option>
            )}
            {!loadingCategories &&
              dataCategories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </Select>

          <Select
            placeholder="Origen"
            onChange={(e) =>
              setSelectedOrigin(
                dataOrigins?.find((origin) => origin.name === e.target.value) ||
                  defaultOrigin
              )
            }
            variant={selectedOrigin.id === 0 ? "" : "selected"}
          >
            {loadingOrigins && <option value="emptyOrigin">Cargando...</option>}
            {!loadingOrigins &&
              dataOrigins?.map((origin) => (
                <option key={origin.id} value={origin.name}>
                  {origin.name}
                </option>
              ))}
          </Select>
        </HStack>

        <Spacer />

        <HStack mt="4" mb="8" gap="25px">
          <Button variant="greenButton" ml="2" onClick={openRecipeCreate}>
            Crear Receta
          </Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={[2, null, 3]} spacing="40px" mb={16}>
        {loadingRecipe &&
          skeletons.map((skeleton) => <RecipeCardSkeleton key={skeleton} />)}
        {!loadingRecipe &&
          dataRecipe?.map((recipe) => (
            <RecipeCard
              openRecipe={() => openRecipe(recipe)}
              key={recipe.id}
              recipe={recipe}
            />
          ))}
      </SimpleGrid>
    </>
  );
}

export default MainContent;
