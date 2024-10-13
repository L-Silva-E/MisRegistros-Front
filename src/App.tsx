import "./App.css";
import { Fragment, useEffect } from "react";
import {
  Grid,
  GridItem,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import RecipeModal from "./components/RecipeModal";
import RecipeModalCreate from "./components/RecipeModalCreate";

import useAxios from "./hooks/axiosFetch";

import { API_BASE_URL } from "./constants/environment";
import { HTTP_METHODS } from "./constants/httpMethods";
import { Recipe } from "./types";

function App() {
  const toast = useToast();

  useEffect(() => {
    const toastData = localStorage.getItem("toast");

    if (toastData) {
      const { title, description, status, duration, isClosable } =
        JSON.parse(toastData);

      toast({
        position: "top",
        title,
        description,
        status,
        duration,
        isClosable,
      });

      localStorage.removeItem("toast");
    }
  }, [toast]);

  const {
    isOpen: isOpenRecipeContent,
    onOpen: onOpenRecipeContent,
    onClose: onCloseRecipeContent,
  } = useDisclosure();
  const {
    isOpen: isOpenRecipeCreate,
    onOpen: onOpenRecipeCreate,
    onClose: onCloseRecipeCreate,
  } = useDisclosure();

  const {
    axiosFetch,
    loading: loadingRecipeDetail,
    data: dataRecipeDetail,
  } = useAxios<Recipe>();

  const searchRecipeDetails = (recipe: Recipe) => {
    onOpenRecipeContent();
    axiosFetch(HTTP_METHODS.GET, `${API_BASE_URL}/recipe/?id=${recipe.id}`);
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
          <MainContent
            openRecipe={searchRecipeDetails}
            openRecipeCreate={onOpenRecipeCreate}
          />
        </GridItem>
      </Grid>
      <RecipeModal
        data={dataRecipeDetail}
        loading={loadingRecipeDetail}
        isOpen={isOpenRecipeContent}
        onClose={onCloseRecipeContent}
      />
      <RecipeModalCreate
        isOpen={isOpenRecipeCreate}
        onClose={onCloseRecipeCreate}
      />
    </Fragment>
  );
}

export default App;
