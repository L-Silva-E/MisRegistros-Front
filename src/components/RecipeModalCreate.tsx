import React, { useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import getDataAxios from "../hooks/getDataAxios";
import { API_BASE_URL } from "../constants/environment";
import { Category, IngredientDetail, Origin } from "../types";
import { FaPlus, FaTrash } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const defaultCategory = { id: 0, name: "" };
const defaultOrigin = { id: 0, name: "" };
const defaultIngredientState = { id: 0, amount: "" };

function RecipeModalCreate({ isOpen, onClose }: Props) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // ~ States: Category, Origin, Ingredient
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(defaultCategory);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin>(defaultOrigin);
  const [ingredients, setIngredients] = useState([defaultIngredientState]);

  // ~ GetDataAxios: Category, Origin, Ingredient
  const { loading: loadingCategories, data: dataCategories } =
    getDataAxios<Category>(`${API_BASE_URL}/category?page=0&limit=100`);
  const { loading: loadingOrigins, data: dataOrigins } = getDataAxios<Origin>(
    `${API_BASE_URL}/origin?page=0&limit=100`
  );
  const { loading: loadingIngredients, data: dataIngredients } =
    getDataAxios<IngredientDetail>(
      `${API_BASE_URL}/ingredient?page=0&limit=250`
    );

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
        ? { ...ingredient, [field]: value === "" ? 0 : value }
        : ingredient
    );
    setIngredients(newIngredients);
  };

  const removeIngredientRow = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
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
          <ModalHeader>Crear Receta</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input ref={initialRef} placeholder="" />
            </FormControl>

            <FormControl mt={4}>
              <HStack>
                <FormLabel>Descripción</FormLabel>
                <FormHelperText
                  ml={-4}
                  mb={1}
                  color="gray.500"
                  fontStyle="italic"
                >
                  *Opcional
                </FormHelperText>
              </HStack>
              <Textarea placeholder="" size="sm" resize="none" />
            </FormControl>

            <HStack mt={4}>
              <VStack flex={1}>
                <FormControl>
                  <FormLabel>Categoría</FormLabel>
                  <Select width="100%" placeholder="-">
                    {loadingCategories && (
                      <option value="emptyCategory">Cargando...</option>
                    )}
                    {!loadingCategories &&
                      dataCategories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </VStack>
              <VStack flex={1}>
                <FormControl>
                  <FormLabel>Origen</FormLabel>
                  <Select width="100%" placeholder="-">
                    {loadingOrigins && (
                      <option value="emptyOrigin">Cargando...</option>
                    )}
                    {!loadingOrigins &&
                      dataOrigins.map((origin) => (
                        <option key={origin.id} value={origin.name}>
                          {origin.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </VStack>
            </HStack>

            <FormControl mt={4}>
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
                      dataIngredients.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </option>
                      ))}
                  </Select>
                  <Input
                    width="30%"
                    placeholder="Cantidad"
                    value={ingredient.amount}
                    inputMode="numeric"
                    onChange={(e) =>
                      handleIngredientChange(index, "amount", e.target.value)
                    }
                  />
                  <Center
                    h={10}
                    width="15%"
                    color={useColorModeValue("gray.800", "white")}
                    backgroundColor={useColorModeValue("gray.300", "gray.600")}
                    borderRadius={5}
                  >
                    {ingredients[index].id === 0
                      ? "-"
                      : dataIngredients[ingredients[index].id - 1].unit}
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

            <FormControl mt={4}>
              <FormLabel>Pasos</FormLabel>
              <Textarea
                size="sm"
                resize="none"
                placeholder="Separar cada paso con un 'Enter' o 'Salto de línea'"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="greenButton">
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModalCreate;
