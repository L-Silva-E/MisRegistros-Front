import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

import useAxios from "../hooks/axiosFetch";

import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { Category, IngredientDetail, Origin, Recipe } from "../types";
import { refreshWindow } from "../utils/utilities";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Recipe | undefined; // Recibe los datos de la receta a editar
};

const defaultCategory = { id: 0, name: "" };
const defaultOrigin = { id: 0, name: "" };
const defaultIngredientState = { id: "0", quantity: "" };

function RecipeModalUpdate({ isOpen, onClose, data }: Props) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // ~ axiosFetch: Patch, Categories, Origins, Ingredients
  const { axiosFetch } = useAxios();

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

  const {
    loading: loadingIngredients,
    data: dataIngredients,
    axiosFetch: axiosFetchIngredients,
  } = useAxios<IngredientDetail[]>();

  useEffect(() => {
    axiosFetchCategories(
      HTTP_METHODS.GET,
      `${API_BASE_URL}/category?page=0&limit=100`
    );
    axiosFetchOrigins(
      HTTP_METHODS.GET,
      `${API_BASE_URL}/origin?page=0&limit=100`
    );
    axiosFetchIngredients(
      HTTP_METHODS.GET,
      `${API_BASE_URL}/ingredient?page=0&limit=250`
    );
  }, []);

  const { register, handleSubmit, setValue } = useForm();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(defaultOrigin);
  const [ingredients, setIngredients] = useState([defaultIngredientState]);

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("description", data.description);
      setValue("thumbnail", data.thumbnail);
      setValue("score", data.score.toString());
      setSelectedCategory(
        dataCategories?.find((cat) => cat.id === data.idCategory) ||
          defaultCategory
      );
      setSelectedOrigin(
        dataOrigins?.find((orig) => orig.id === data.idOrigin) || defaultOrigin
      );
      setIngredients(
        data.ingredients.map((ingredient) => ({
          id: ingredient.ingredient.id.toString(),
          quantity: ingredient.quantity.toString(),
        }))
      );
      setValue("steps", data.steps.map((step) => step.instruction).join("\n"));
    }
  }, [data, dataCategories, dataOrigins, setValue]);

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
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const onSubmit = async (dataForm: any) => {
    const bodyRecipe = {
      idCategory: selectedCategory.id,
      idOrigin: selectedOrigin.id,
      name: dataForm.name,
      description: dataForm.description,
      score: parseInt(dataForm.score),
      thumbnail: dataForm.thumbnail
        ? dataForm.thumbnail
        : "https://placehold.co/800x600/1C4532/C6F6D5",
      ingredients: ingredients.map((ingredient) => ({
        id: parseInt(ingredient.id),
        quantity: parseInt(ingredient.quantity),
      })),
      steps: dataForm.steps.split("\n").map((step: string, index: number) => ({
        number: index + 1,
        instruction: step,
      })),
    };

    try {
      await axiosFetch(
        HTTP_METHODS.PATCH,
        `${API_BASE_URL}/recipe/${data?.id}`,
        bodyRecipe
      );

      localStorage.setItem(
        "toast",
        JSON.stringify({
          title: "Receta actualizada.",
          description: `La receta "${dataForm.name}" ha sido actualizada exitosamente.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      );

      onClose();
      refreshWindow();
    } catch (error) {
      console.error("Error updating recipe: ", error);
    }
  };

  return (
    <>
      <Modal
        size={"xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Receta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input {...register("name")} autoComplete="off" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  size="sm"
                  resize="none"
                  {...register("description")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Imagen</FormLabel>
                <Input
                  placeholder="Link de la imagen"
                  {...register("thumbnail")}
                />
              </FormControl>

              <Flex mt={4}>
                <FormControl isRequired width="60%">
                  <FormLabel>Puntuación</FormLabel>
                  <Select placeholder="-" {...register("score")}>
                    <option value="5">5 - ★★★★★</option>
                    <option value="4">4 - ★★★★</option>
                    <option value="3">3 - ★★★</option>
                    <option value="2">2 - ★★</option>
                    <option value="1">1 - ★</option>
                  </Select>
                </FormControl>

                <FormControl isRequired mx={2}>
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
                    {loadingOrigins && (
                      <option value="emptyOrigin">Cargando...</option>
                    )}
                    {!loadingOrigins &&
                      dataOrigins?.map((origin) => (
                        <option key={origin.id} value={origin.name}>
                          {origin.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </Flex>

              <FormControl isRequired mt={4}>
                <FormLabel>Ingredientes</FormLabel>
                {ingredients.map((ingredient, index) => (
                  <HStack key={index} mt={2}>
                    <Select
                      placeholder="-"
                      value={ingredient.id}
                      onChange={(e) =>
                        handleIngredientChange(index, "id", e.target.value)
                      }
                    >
                      {loadingIngredients && (
                        <option value="emptyIngredient">Cargando...</option>
                      )}
                      {!loadingIngredients &&
                        dataIngredients?.map((ingredient) => (
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
                      width="15%"
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
                      <FaTrash />
                    </Button>
                  </HStack>
                ))}
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

              <FormControl mt={4}>
                <FormLabel>Paso a paso</FormLabel>
                <Textarea
                  placeholder="Escribe cada paso en una línea separada"
                  {...register("steps")}
                />
              </FormControl>

              <Flex justifyContent="end" mt={6}>
                <Button onClick={onClose} mr={3}>
                  Cancelar
                </Button>
                <Button type="submit" variant="greenButton">
                  Guardar Cambios
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModalUpdate;
