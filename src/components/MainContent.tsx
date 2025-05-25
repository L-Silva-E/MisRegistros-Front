import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCog,
  FaPlusSquare,
  FaSearch,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
} from "react-icons/fa";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

import RecipeCard from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

import useAxios from "../hooks/axiosFetch";

import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { Category, Origin, Recipe, SearchForm } from "../types";

type Props = {
  openRecipe: (recipe: Recipe) => void;
  openRecipeCreate: () => void;
};

const defaultFilterRecipe = { searchText: "" };
const defaultCategory = { id: 0, name: "", createdAt: "", updatedAt: "" };
const defaultOrigin = { id: 0, name: "", createdAt: "", updatedAt: "" };

const makeRecipeUrl = (
  filterRecipe: SearchForm,
  selectedCategory: Category,
  selectedOrigin: Origin,
  sortBy: string,
  sortDirection: string
) => {
  let url = `${API_BASE_URL}/recipe`;
  let params = [];

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

  console.log(url);

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
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
      HTTP_METHODS.GET,
      makeRecipeUrl(
        filterRecipe,
        selectedCategory,
        selectedOrigin,
        sortBy,
        sortDirection
      )
    );
    axiosFetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
    axiosFetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
  }, [filterRecipe, selectedCategory, selectedOrigin, sortBy, sortDirection]);

  const onSubmit = (data: SearchForm) => {
    setFilterRecipe(data);
    axiosFetchRecipe(
      HTTP_METHODS.GET,
      makeRecipeUrl(
        data,
        selectedCategory,
        selectedOrigin,
        sortBy,
        sortDirection
      )
    );
  };

  return (
    <>
      <HStack align="center" justify="flex-start" gap="10px">
        <HStack mt="4" mb="8" gap="25px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
              backgroundColor={
                filterRecipe.searchText ? "green.800" : "inherit"
              }
            >
              <InputLeftElement pointerEvents="none" color="gray.500">
                <FaSearch />
              </InputLeftElement>
              <Input
                type="text"
                width="250px"
                placeholder="Nombre de la Receta"
                autoComplete="off"
                {...register("searchText", { required: false })}
              />
            </InputGroup>
          </form>
          <Select
            placeholder="Categoría"
            value={selectedCategory.name || ""}
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
            value={selectedOrigin.name || ""}
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

          <Select
            placeholder="Orden"
            value={sortBy}
            variant={sortBy === "" ? "" : "selected"}
            onChange={(e) => {
              setSortBy(e.target.value);
              axiosFetchRecipe(
                HTTP_METHODS.GET,
                makeRecipeUrl(
                  filterRecipe,
                  selectedCategory,
                  selectedOrigin,
                  e.target.value,
                  sortDirection
                )
              );
            }}
          >
            <option value="id">Id</option>
            <option value="name">Nombre</option>
            <option value="score">Mejor Valoradas</option>
            <option value="createdAt">Fecha Creación</option>
          </Select>
          <IconButton
            aria-label="Toggle sort direction"
            ml={-5}
            backgroundColor={
              sortDirection === "asc"
                ? useColorModeValue("#c0c0c0", "inherit")
                : useColorModeValue("#c0c0c0", "green.800")
            }
            borderColor={
              sortDirection === "asc"
                ? useColorModeValue("#c0c0c0", "#51555e")
                : useColorModeValue("#c0c0c0", "green.700")
            }
            borderWidth={2}
            icon={
              sortDirection === "asc" ? (
                <FaSortAlphaDown color="#38A169" size={24} />
              ) : (
                <FaSortAlphaDownAlt color="#9AE6B4" size={24} />
              )
            }
            _hover={{
              borderColor: useColorModeValue("#c0c0c0", "green.400"),
            }}
            onClick={() => {
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
              axiosFetchRecipe(
                HTTP_METHODS.GET,
                makeRecipeUrl(
                  filterRecipe,
                  selectedCategory,
                  selectedOrigin,
                  sortBy,
                  sortDirection === "asc" ? "desc" : "asc"
                )
              );
            }}
          />
        </HStack>

        <Spacer />

        <HStack mt="4" mb="8" gap="25px">
          <Button
            leftIcon={<FaCog />}
            onClick={navigateToMetaPage}
            variant="greenButton"
          >
            Administrar
          </Button>

          <Button
            leftIcon={<FaPlusSquare />}
            variant="greenButton"
            ml="2"
            onClick={openRecipeCreate}
          >
            Crear Receta
          </Button>
        </HStack>
      </HStack>
      <SimpleGrid columns={[2, null, 3]} spacing="40px" mb={16}>
        {loadingRecipe &&
          skeletons.map((skeleton) => <RecipeCardSkeleton key={skeleton} />)}
        {!loadingRecipe &&
          dataRecipe?.map((recipe) => (
            <Box
              key={recipe.id}
              onDoubleClick={() => openRecipe(recipe)}
              cursor="pointer"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)" }}
            >
              <RecipeCard recipe={recipe} />
            </Box>
          ))}
      </SimpleGrid>
    </>
  );
}

export default MainContent;
