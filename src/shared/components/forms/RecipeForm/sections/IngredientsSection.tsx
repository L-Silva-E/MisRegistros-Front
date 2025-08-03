import {
  VStack,
  HStack,
  Button,
  IconButton,
  Text,
  Box,
  Select,
  NumberInput,
  NumberInputField,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { IngredientsSectionProps, IngredientFormData } from "../types";

const IngredientsSection = ({
  ingredients,
  setIngredients,
  availableIngredients,
  isLoadingIngredients = false,
}: IngredientsSectionProps) => {
  // Colores adaptativos al tema
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const unitBg = useColorModeValue("gray.100", "gray.600");
  const unitTextColor = useColorModeValue("gray.800", "gray.200");
  const errorBorderColor = useColorModeValue("red.300", "red.400");

  const addIngredient = () => {
    setIngredients([...ingredients, { id: "0", quantity: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (
    index: number,
    field: keyof IngredientFormData,
    value: string
  ) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(newIngredients);
  };

  const getSelectedIngredient = (id: string) => {
    return availableIngredients.find(
      (ingredient) => ingredient.id.toString() === id
    );
  };

  const getAvailableOptions = (currentIndex: number) => {
    const selectedIds = ingredients
      .map((ingredient, index) =>
        index !== currentIndex ? ingredient.id : null
      )
      .filter((id) => id !== null && id !== "0");

    return availableIngredients.filter(
      (ingredient) => !selectedIds.includes(ingredient.id.toString())
    );
  };

  if (isLoadingIngredients) {
    return (
      <VStack align="stretch" spacing={4}>
        <Text>Ingredientes</Text>
        <Flex justify="center" py={4}>
          <Spinner size="md" />
        </Flex>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" spacing={4}>
      <FormLabel>Ingredientes</FormLabel>

      {ingredients.map((ingredient, index) => {
        const selectedIngredient = getSelectedIngredient(ingredient.id);
        const availableOptions = getAvailableOptions(index);
        const isInvalidSelection = ingredient.id !== "0" && !selectedIngredient;
        const isQuantityEmpty = !ingredient.quantity.trim();

        return (
          <HStack
            key={index}
            spacing={3}
            p={3}
            mt={index === 0 ? -4 : 2}
            borderWidth={2}
            borderRadius="md"
            bg={cardBg}
            borderColor={borderColor}
            align="flex-start"
            _hover={{
              borderColor: "green.700",
            }}
          >
            <FormControl flex={4} minH="60px" isRequired>
              <FormLabel fontSize="xs" fontWeight="medium" mb={1}>
                Ingrediente
              </FormLabel>
              <Select
                value={ingredient.id}
                onChange={(e) => updateIngredient(index, "id", e.target.value)}
                placeholder="Seleccione un ingrediente"
                bg={bgColor}
                borderColor={
                  isInvalidSelection ? errorBorderColor : borderColor
                }
                _hover={{
                  borderColor: isInvalidSelection
                    ? errorBorderColor
                    : "gray.300",
                }}
              >
                {availableOptions.map((option) => (
                  <option key={option.id} value={option.id.toString()}>
                    {option.name}
                  </option>
                ))}
              </Select>
              <Box minH="20px">
                {isInvalidSelection && (
                  <FormErrorMessage fontSize="xs" mt={1}>
                    Ingrediente requerido
                  </FormErrorMessage>
                )}
              </Box>
            </FormControl>

            <FormControl flex={1} minH="60px" isRequired>
              <FormLabel fontSize="xs" fontWeight="medium" mb={1}>
                Cantidad
              </FormLabel>
              <Tooltip
                label="La cantidad es obligatoria"
                isDisabled={!isQuantityEmpty}
                hasArrow
              >
                <NumberInput
                  value={ingredient.quantity}
                  onChange={(value) =>
                    updateIngredient(index, "quantity", value)
                  }
                  min={0}
                  step={0.1}
                  precision={2}
                  bg={bgColor}
                >
                  <NumberInputField
                    placeholder="0.00"
                    borderColor={
                      isQuantityEmpty ? errorBorderColor : borderColor
                    }
                    _hover={{
                      borderColor: isQuantityEmpty
                        ? errorBorderColor
                        : "gray.300",
                    }}
                    _focus={{
                      borderColor: isQuantityEmpty
                        ? errorBorderColor
                        : "blue.500",
                    }}
                  />
                </NumberInput>
              </Tooltip>
            </FormControl>

            <Box flex={0.5} minH="60px">
              <FormLabel fontSize="xs" fontWeight="medium" mb={1}>
                Unidad
              </FormLabel>
              <Text
                p={2}
                bg={unitBg}
                borderRadius="md"
                minH="40px"
                display="flex"
                alignItems="center"
                fontSize="sm"
                color={selectedIngredient ? unitTextColor : "gray.500"}
                textAlign="center"
                justifyContent="center"
              >
                {selectedIngredient?.unit || "-"}
              </Text>
            </Box>

            <Box minH="60px">
              <FormLabel
                fontSize="xs"
                fontWeight="medium"
                mb={1}
                visibility="hidden"
              >
                Acción
              </FormLabel>
              <IconButton
                aria-label="Eliminar ingrediente"
                icon={<DeleteIcon />}
                variant="redButton"
                isDisabled={ingredients.length === 1}
                onClick={() => removeIngredient(index)}
              />
            </Box>
          </HStack>
        );
      })}

      <Button
        leftIcon={<AddIcon />}
        onClick={addIngredient}
        variant="blueButton"
        alignSelf="flex-start"
      >
        Agregar Ingrediente
      </Button>
    </VStack>
  );
};

export default IngredientsSection;
