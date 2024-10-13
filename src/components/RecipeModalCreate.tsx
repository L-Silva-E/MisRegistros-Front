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
import { Category, IngredientDetail, Origin } from "../types";
import { refreshWindow } from "../utils/utilities";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const defaultCategory = { id: 0, name: "" };
const defaultOrigin = { id: 0, name: "" };
const defaultIngredientState = { id: "0", quantity: "" };

function RecipeModalCreate({ isOpen, onClose }: Props) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { register, handleSubmit } = useForm();

  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(defaultOrigin);
  const [ingredients, setIngredients] = useState([defaultIngredientState]);

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

  const { axiosFetch } = useAxios();

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
      ingredients: ingredients.map((ingredient) => {
        return {
          id: parseInt(ingredient.id),
          quantity: parseInt(ingredient.quantity),
        };
      }),
      steps: dataForm.steps.split("\n").map((step: string, index: number) => {
        return {
          number: index + 1,
          instruction: step,
        };
      }),
    };

    try {
      await axiosFetch(HTTP_METHODS.POST, `${API_BASE_URL}/recipe`, bodyRecipe);

      localStorage.setItem(
        "toast",
        JSON.stringify({
          title: "Receta creada.",
          description: `La receta "${dataForm.name}" ha sido creada exitosamente.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      );

      onClose();
      refreshWindow();
    } catch (error) {
      console.error("Error creating recipe: ", error);
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
          <ModalHeader>
            Crear Receta
            <ModalCloseButton />
          </ModalHeader>
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
                      <FaTrash color={useColorModeValue("#1A202C", "white")} />
                    </Button>
                  </HStack>
                ))}
              </FormControl>
              <Button
                h={8}
                width="100%"
                mt={2}
                variant="addRowButton"
                onClick={addIngredientRow}
              >
                <FaPlus color={useColorModeValue("#1A202C", "white")} />
              </Button>
              <FormControl isRequired mt={4}>
                <FormLabel>Pasos</FormLabel>
                <Textarea
                  size="sm"
                  resize="none"
                  placeholder="Separar cada paso con un 'Enter' o 'Salto de línea'"
                  {...register("steps")}
                />
              </FormControl>
              <Button mt={4} type="submit" variant="greenButton">
                Guardar
              </Button>
              <Button mt={4} ml={4} onClick={onClose}>
                Cancelar
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModalCreate;
