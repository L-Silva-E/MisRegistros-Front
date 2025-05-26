import {
  Box,
  Grid,
  GridItem,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  HStack,
  Center,
  useColorModeValue,
  Button,
  Flex,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/axiosFetch";
import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { useState, useEffect } from "react";
import { Category, IngredientDetail, Origin, Recipe } from "../types";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const defaultCategory = { id: 0, name: "", createdAt: "", updatedAt: "" };
const defaultOrigin = { id: 0, name: "", createdAt: "", updatedAt: "" };
const defaultIngredientState = { id: "0", quantity: "" };

const UpdateRecipePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const { axiosFetch } = useAxios();

  const { register, handleSubmit, setValue, watch } = useForm();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(defaultOrigin);
  const [ingredients, setIngredients] = useState([defaultIngredientState]);

  const { data: dataCategories, axiosFetch: axiosFetchCategories } =
    useAxios<Category[]>();
  const { data: dataOrigins, axiosFetch: axiosFetchOrigins } =
    useAxios<Origin[]>();
  const { data: dataIngredients, axiosFetch: axiosFetchIngredients } =
    useAxios<IngredientDetail[]>();
  const { data: recipe, axiosFetch: axiosFetchRecipe } = useAxios<Recipe>();

  useEffect(() => {
    axiosFetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
    axiosFetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
    axiosFetchIngredients(HTTP_METHODS.GET, `${API_BASE_URL}/ingredient`);
    axiosFetchRecipe(HTTP_METHODS.GET, `${API_BASE_URL}/recipe/?id=${id}`);
  }, []);

  useEffect(() => {
    if (recipe) {
      setValue("name", recipe.name);
      setValue("description", recipe.description);
      setValue("thumbnail", recipe.thumbnail);
      setValue("score", recipe.score.toString());
      setValue("time", recipe.time.toString());
      setValue("servings", recipe.servings);
      setSelectedCategory(recipe.category);
      setSelectedOrigin(recipe.origin);
      setIngredients(
        recipe.ingredients.map((ingredient) => ({
          id: ingredient.ingredient.id.toString(),
          quantity: ingredient.quantity.toString(),
        }))
      );
      setValue(
        "steps",
        recipe.steps.map((step) => step.instruction).join("\n")
      );
    }
  }, [recipe]);

  const addIngredientRow = () => {
    setIngredients([...ingredients, defaultIngredientState]);
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index
        ? { ...ingredient, [field]: value === "" ? "0" : value }
        : ingredient
    );
    setIngredients(newIngredients);
  };

  const removeIngredientRow = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const onSubmit = async (dataForm: any) => {
    const bodyRecipe = {
      idCategory: selectedCategory.id,
      idOrigin: selectedOrigin.id,
      name: dataForm.name,
      description: dataForm.description,
      score: parseInt(dataForm.score),
      time: parseInt(dataForm.time),
      servings: parseInt(dataForm.servings),
      thumbnail: dataForm.thumbnail
        ? dataForm.thumbnail
        : "https://placehold.co/900x600/1C4532/C6F6D5?text=Imagen+de\\nla+Receta",
      ingredients: ingredients.map((ingredient) => ({
        id: parseInt(ingredient.id),
        quantity: parseFloat(ingredient.quantity),
      })),
      steps: dataForm.steps.split("\n").map((step: string, index: number) => ({
        number: index + 1,
        instruction: step,
      })),
    };

    try {
      await axiosFetch(
        HTTP_METHODS.PATCH,
        `${API_BASE_URL}/recipe/${id}`,
        bodyRecipe
      );
      toast({
        position: "top",
        title: "Receta editada.",
        description: `La receta "${dataForm.name}" ha sido editada exitosamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/recipes");
    } catch (error) {
      toast({
        position: "top",
        title: "Error al actualizar receta",
        description:
          "Ocurrió un error al actualizar la receta. Por favor, inténtalo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Error updating recipe: ", error);
    }
  };

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size="lg" mb={6}>
          Editar Receta
        </Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <VStack align="stretch" spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input {...register("name")} autoComplete="off" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  size="sm"
                  resize="none"
                  {...register("description")}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Imagen</FormLabel>
                <Input
                  placeholder="Link de la imagen"
                  {...register("thumbnail")}
                />
              </FormControl>

              <Flex gap={4}>
                <FormControl isRequired>
                  <FormLabel>Puntuación</FormLabel>
                  <Select placeholder="-" {...register("score")}>
                    <option value="5">5 - ★★★★★</option>
                    <option value="4">4 - ★★★★</option>
                    <option value="3">3 - ★★★</option>
                    <option value="2">2 - ★★</option>
                    <option value="1">1 - ★</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    placeholder="-"
                    value={selectedCategory.name}
                    onChange={(e) =>
                      setSelectedCategory(
                        dataCategories?.find(
                          (category) => category.name === e.target.value
                        ) || defaultCategory
                      )
                    }
                  >
                    {dataCategories?.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Origen</FormLabel>
                  <Select
                    placeholder="-"
                    value={selectedOrigin.name}
                    onChange={(e) =>
                      setSelectedOrigin(
                        dataOrigins?.find(
                          (origin) => origin.name === e.target.value
                        ) || defaultOrigin
                      )
                    }
                  >
                    {dataOrigins?.map((origin) => (
                      <option key={origin.id} value={origin.name}>
                        {origin.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Tiempo</FormLabel>
                  <Input
                    {...register("time")}
                    autoComplete="off"
                    placeholder="Minutos"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Porciones</FormLabel>
                  <NumberInput
                    min={1}
                    max={100}
                    value={watch("servings") || 1}
                    onChange={(valueString) =>
                      setValue("servings", valueString)
                    }
                  >
                    <NumberInputField {...register("servings")} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>

              <FormControl isRequired mt={4}>
                <FormLabel>Pasos</FormLabel>
                <Textarea
                  rows={7}
                  size="sm"
                  resize="none"
                  placeholder="Separar cada paso con un 'Enter' o 'Salto de línea'"
                  {...register("steps")}
                />
              </FormControl>
            </VStack>
          </GridItem>

          <GridItem>
            <FormControl isRequired mt={4}>
              <FormLabel>Ingredientes</FormLabel>
              <Box maxH="515px" mt={-2} overflowY="auto">
                {ingredients.map((ingredient, index) => (
                  <HStack key={index} mt={2}>
                    <Select
                      placeholder="-"
                      value={ingredient.id}
                      onChange={(e) =>
                        handleIngredientChange(index, "id", e.target.value)
                      }
                    >
                      {dataIngredients?.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </Select>
                    <Input
                      width="30%"
                      placeholder="Cantidad"
                      value={ingredient.quantity}
                      autoComplete="off"
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                    <Center
                      h={10}
                      width="10%"
                      color={useColorModeValue("gray.800", "white")}
                      backgroundColor={useColorModeValue(
                        "gray.300",
                        "gray.600"
                      )}
                      borderRadius={5}
                    >
                      {ingredients[index].id === "0"
                        ? "-"
                        : dataIngredients?.find(
                            (item) =>
                              item.id === parseInt(ingredients[index].id)
                          )?.unit}
                    </Center>
                    <Button
                      variant="deleteButton"
                      h={10}
                      width="10%"
                      onClick={() => removeIngredientRow(index)}
                    >
                      <FaTrash color={useColorModeValue("#1A202C", "white")} />
                    </Button>
                  </HStack>
                ))}
              </Box>
              <Button
                h={8}
                width="100%"
                mt={2}
                variant="addRowButton"
                onClick={addIngredientRow}
              >
                <FaPlus color={useColorModeValue("#1A202C", "white")} />
              </Button>
            </FormControl>
          </GridItem>
        </Grid>

        <Flex justify="flex-end">
          <Button
            mt={6}
            onClick={() => navigate("/recipes")}
            variant="redButton"
          >
            Cancelar
          </Button>
          <Button mt={6} ml={4} type="submit" variant="greenButton">
            Guardar Cambios
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default UpdateRecipePage;
