import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";

import { BasicInfoSectionProps } from "../types";

const BasicInfoSection = ({ register, errors }: BasicInfoSectionProps) => {
  return (
    <VStack align="stretch" spacing={4}>
      <FormControl isRequired isInvalid={!!errors?.name}>
        <FormLabel>Nombre</FormLabel>
        <Input
          {...register("name", {
            required: "El nombre es requerido",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
          })}
          autoComplete="off"
          placeholder="Ingresa el nombre de la receta"
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors?.description}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          {...register("description", {
            required: "La descripción es requerida",
          })}
          size="sm"
          resize="none"
          rows={4}
          placeholder="Describe brevemente tu receta"
        />
        <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors?.thumbnail}>
        <FormLabel>Imagen (URL)</FormLabel>
        <Input
          {...register("thumbnail", {
            pattern: {
              value:
                /^https?:\/\/[^\s]+$/,
              message: "Ingresa una URL válida que comience con http:// o https://",
            },
          })}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        <FormErrorMessage>{errors?.thumbnail?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default BasicInfoSection;
