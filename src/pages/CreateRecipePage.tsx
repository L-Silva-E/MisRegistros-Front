import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/axiosFetch";
import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { useState, useEffect } from "react";
import { Category, IngredientDetail, Origin } from "../types";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { axiosFetch } = useAxios();

  const { register, handleSubmit } = useForm();
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "",
    createdAt: "",
    updatedAt: "",
  });
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>({
    id: 0,
    name: "",
    createdAt: "",
    updatedAt: "",
  });
  const [ingredients, setIngredients] = useState([{ id: "0", quantity: "" }]);

  const { data: dataCategories, axiosFetch: axiosFetchCategories } =
    useAxios<Category[]>();
  const { data: dataOrigins, axiosFetch: axiosFetchOrigins } =
    useAxios<Origin[]>();
  const { data: dataIngredients, axiosFetch: axiosFetchIngredients } =
    useAxios<IngredientDetail[]>();

  useEffect(() => {
    axiosFetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
    axiosFetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
    axiosFetchIngredients(HTTP_METHODS.GET, `${API_BASE_URL}/ingredient`);
  }, []);

  const addIngredientRow = () => {
    setIngredients([...ingredients, { id: "0", quantity: "" }]);
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
      ...(dataForm.thumbnail && dataForm.thumbnail.trim() !== "" && { thumbnail: dataForm.thumbnail }),
      ingredients: ingredients.map((ingredient) => {
        return {
          id: parseInt(ingredient.id),
          quantity: parseFloat(ingredient.quantity),
        };
      }),
      steps: dataForm.steps.split("\n").map((step: string, index: number) => {
        return {
          number: index + 1,
          instruction: step,
        };
      }),
    };

    console.log(bodyRecipe);

    try {
      await axiosFetch(HTTP_METHODS.POST, `${API_BASE_URL}/recipe`, bodyRecipe);

      toast({
        position: "top",
        title: "Receta creada",
        description: `La receta "${dataForm.name}" ha sido creada exitosamente`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/recipes");
    } catch (error) {
      toast({
        position: "top",
        title: "Error al crear receta",
        description:
          "No se pudo crear la receta. Por favor intente nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Error creating recipe: ", error);
    }
  };

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size="lg" mb={6}>
          Crear Nueva Receta
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
                    onChange={(e) =>
                      setSelectedCategory(
                        dataCategories?.find(
                          (category) => category.name === e.target.value
                        ) || { id: 0, name: "", createdAt: "", updatedAt: "" }
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
                    onChange={(e) =>
                      setSelectedOrigin(
                        dataOrigins?.find(
                          (origin) => origin.name === e.target.value
                        ) || { id: 0, name: "", createdAt: "", updatedAt: "" }
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
                  <NumberInput defaultValue={1} min={1} max={100}>
                    <NumberInputField {...register("servings")} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>

              <FormControl isRequired>
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
            <FormControl isRequired>
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
            Guardar Receta
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default CreateRecipePage;
