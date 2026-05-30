import {
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";

import { MetadataSectionProps } from "../types";
import { StarRating } from "../../../ui/StarRating";

const MetadataSection = ({
  register,
  setValue,
  watch,
  errors,
  categories,
  origins,
  selectedCategory,
  setSelectedCategory,
  selectedOrigin,
  setSelectedOrigin,
  isLoadingCategories = false,
  isLoadingOrigins = false,
}: MetadataSectionProps) => {
  const servingsValue = watch("servings") || 1;

  return (
    <Flex gap={4}>
      <FormControl isRequired isInvalid={!!errors?.score}>
        <FormLabel>Puntuación</FormLabel>
        <input
          type="hidden"
          {...register("score", { required: "La puntuación es requerida" })}
        />
        <StarRating
          value={Number(watch("score") || 0)}
          onChange={(v) => setValue("score", String(v), { shouldValidate: true })}
        />
        <FormErrorMessage>{errors?.score?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Categoría</FormLabel>
        <Select
          placeholder="-"
          value={selectedCategory.name || ""}
          onChange={(e) => {
            const category = categories.find(
              (cat) => cat.name === e.target.value
            ) || { id: 0, name: "", createdAt: "", updatedAt: "" };
            setSelectedCategory(category);
          }}
          isDisabled={isLoadingCategories}
        >
          {isLoadingCategories && <option value="">Cargando...</option>}
          {!isLoadingCategories &&
            categories.map((category) => (
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
          value={selectedOrigin.name || ""}
          onChange={(e) => {
            const origin = origins.find(
              (orig) => orig.name === e.target.value
            ) || { id: 0, name: "", createdAt: "", updatedAt: "" };
            setSelectedOrigin(origin);
          }}
          isDisabled={isLoadingOrigins}
        >
          {isLoadingOrigins && <option value="">Cargando...</option>}
          {!isLoadingOrigins &&
            origins.map((origin) => (
              <option key={origin.id} value={origin.name}>
                {origin.name}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.time}>
        <FormLabel>Tiempo</FormLabel>
        <Input
          type="number"
          min={1}
          max={480}
          {...register("time", {
            required: "El tiempo es requerido",
            min: {
              value: 1,
              message: "El tiempo debe ser al menos 1 minuto",
            },
            max: {
              value: 480,
              message: "El tiempo no puede ser mayor a 8 horas",
            },
          })}
          autoComplete="off"
          placeholder="Minutos"
        />
        <FormErrorMessage>{errors?.time?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.servings}>
        <FormLabel>Porciones</FormLabel>
        <NumberInput
          min={1}
          max={100}
          value={servingsValue}
          onChange={(valueString) => {
            const value = parseInt(valueString) || 1;
            setValue("servings", value);
          }}
        >
          <NumberInputField
            {...register("servings", {
              required: "Las porciones son requeridas",
              min: {
                value: 1,
                message: "Debe ser al menos 1 porción",
              },
              max: {
                value: 100,
                message: "No puede ser mayor a 100 porciones",
              },
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors?.servings?.message}</FormErrorMessage>
      </FormControl>
    </Flex>
  );
};

export default MetadataSection;
