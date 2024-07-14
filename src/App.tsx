import "./App.css";
import { Fragment } from "react";
import {
  Grid,
  GridItem,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import RecipeModal from "./components/RecipeModal";

import getDetailAxios from "./hooks/getDetailAxios";

import { API_BASE_URL } from "./constants/environment";
import { Recipe } from "./types";

function App() {
  const {
    isOpen: isOpenRecipeContent,
    onOpen: onOpenRecipeContent,
    onClose: onCloseRecipeContent,
  } = useDisclosure();

  const {
    loading: loadingRecipeDetail,
    data: dataRecipeDetail,
    getAxios,
  } = getDetailAxios<Recipe>();

  const searchRecipeDetails = (recipe: Recipe) => {
    onOpenRecipeContent();
    getAxios(`${API_BASE_URL}/recipe?id=${recipe.id}`);
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
          area={"header"}
          bg={useColorModeValue("gray.200", "gray.900")}
        >
          <Header />
        </GridItem>
        <GridItem
          boxShadow="xl"
          pos="sticky"
          top="60px"
          left="0"
          p="5"
          area={"nav"}
          bg={useColorModeValue("gray.200", "gray.900")}
          height="calc(100vh - 60px)"
          overflow="auto"
        >
          <SideNav />
        </GridItem>
        <GridItem
          pt="5"
          px="16"
          bg={useColorModeValue("gray.50", "gray.800")}
          area={"main"}
        >
          <MainContent openRecipe={searchRecipeDetails} />
        </GridItem>
      </Grid>
      <RecipeModal
        data={dataRecipeDetail}
        loading={loadingRecipeDetail}
        isOpen={isOpenRecipeContent}
        onClose={onCloseRecipeContent}
      />
    </Fragment>
  );
}

export default App;
