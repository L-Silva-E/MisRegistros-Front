import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { Fragment, useState } from "react";
import { API_BASE_URL, API_KEY } from "./constants/environment";
import { Category, Recipe, SearchForm } from "./types";
import useHttpData from "./hooks/useHttpData";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";
import useFetch from "./hooks/useFetch";

const url = `${API_BASE_URL}/category`;
const defaultCategory = { name: "Otro" };

const makeRecipeUrl = (selectedCategory: Category) =>
  selectedCategory.name === "Otro"
    ? `${API_BASE_URL}/recipe?page=0&limit=100`
    : `${API_BASE_URL}/recipe?idCategory=${selectedCategory.id}`;

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);

  const { loading, data } = useHttpData<Category>(url);

  const {
    data: dataRecipe,
    setData: setRecipes,
    loading: loadingRecipe,
    setLoading: setLoadingRecipe,
  } = useHttpData<Recipe>(makeRecipeUrl(selectedCategory));

  const searchApi = (searchForm: SearchForm) => {
    const url = `${API_BASE_URL}/recipe?name=${searchForm.search}`;

    setLoadingRecipe(true);

    axios
      .get<{ data: Recipe[] }>(url, { headers: { "api-key": API_KEY } })
      .then(({ data }) => setRecipes(data.data))
      .finally(() => setLoadingRecipe(false));
  };

  const {
    fetch,
    loading: loadingRecipeDetail,
    data: dataRecipeDetail,
  } = useFetch<Recipe>();

  const searchRecipeDetails = (recipe: Recipe) => {
    onOpen();
    fetch(`${API_BASE_URL}/recipe?id=${recipe.id}`);
  };

  return (
    <Fragment>
      <Grid
        templateAreas={`"header header" "nav main"`}
        gridTemplateRows={"60px 1fr"}
        gridTemplateColumns={{ sm: "0 1fr", md: "200px 1fr" }}
        fontSize={14}
      >
        <GridItem
          zIndex="1"
          boxShadow="lg"
          pos="sticky"
          top="0px"
          pt="7px"
          bg="gray.800"
          color="white"
          area={"header"}
        >
          <Header onSubmit={searchApi} />
        </GridItem>
        <GridItem
          pos="sticky"
          top="60px"
          left="0"
          p="5"
          area={"nav"}
          bg="gray.700"
          color="green.100"
          height="calc(100vh - 60px)"
          overflow="auto"
        >
          <SideNav
            categories={data}
            loading={loading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </GridItem>
        <GridItem p="5" bg="gray.700" color="white" area={"main"}>
          <MainContent
            openRecipe={searchRecipeDetails}
            loading={loadingRecipe}
            recipes={dataRecipe}
          />
        </GridItem>
      </Grid>
      <RecipeModal
        data={dataRecipeDetail}
        loading={loadingRecipeDetail}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Fragment>
  );
}

export default App;
