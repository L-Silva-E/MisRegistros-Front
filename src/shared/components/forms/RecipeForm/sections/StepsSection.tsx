import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";

import { StepsSectionProps } from "../types";

const StepsSection = ({ register, errors }: StepsSectionProps) => {
  return (
    <FormControl isInvalid={!!errors?.steps}>
      <FormLabel>Pasos</FormLabel>
      <Textarea
        {...register("steps")}
        rows={7}
        size="sm"
        resize="none"
        placeholder="Separar cada paso con un 'Enter' o 'Salto de línea'"
      />
      <FormErrorMessage>{errors?.steps?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default StepsSection;
