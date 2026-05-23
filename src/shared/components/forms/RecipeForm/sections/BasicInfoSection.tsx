import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";

import { ImageUpload } from "../../../ui/ImageUpload";
import { BasicInfoSectionProps } from "../types";

const BasicInfoSection = ({
  register,
  errors,
  thumbnailFile,
  setThumbnailFile,
  existingThumbnailUrl,
}: BasicInfoSectionProps) => {
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

      <FormControl>
        <FormLabel>Imagen</FormLabel>
        <ImageUpload
          value={thumbnailFile}
          onChange={setThumbnailFile}
          existingUrl={existingThumbnailUrl}
        />
      </FormControl>
    </VStack>
  );
};

export default BasicInfoSection;
