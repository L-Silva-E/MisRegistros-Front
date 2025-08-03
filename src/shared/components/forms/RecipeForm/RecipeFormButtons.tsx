import { Button, Flex } from "@chakra-ui/react";
import { RecipeFormButtonsProps } from "./types";

const RecipeFormButtons = ({
  submitButtonText = "Guardar",
  cancelAction,
  isLoading = false,
  formId = "recipe-form",
}: RecipeFormButtonsProps) => {
  return (
    <Flex gap={6}>
      {cancelAction && (
        <Button onClick={cancelAction} variant="redButton">
          Cancelar
        </Button>
      )}
      <Button
        type="submit"
        form={formId}
        variant="greenButton"
        isLoading={isLoading}
        loadingText="Guardando..."
      >
        {submitButtonText}
      </Button>
    </Flex>
  );
};

export default RecipeFormButtons;
