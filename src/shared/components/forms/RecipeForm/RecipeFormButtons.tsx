import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { RecipeFormButtonsProps } from "./types";
import { FaArrowLeft } from "react-icons/fa6";

const RecipeFormButtons = ({
  submitIcon,
  submitTooltip = "Guardar",
  cancelAction,
  isLoading = false,
  formId = "recipe-form",
}: RecipeFormButtonsProps) => {
  return (
    <Flex gap={4}>
      <Tooltip openDelay={500} label={submitTooltip} hasArrow placement="top">
        <Button
          px={4}
          type="submit"
          form={formId}
          variant="greenButton"
          isLoading={isLoading}
          loadingText="Guardando..."
        >
          {submitIcon}
        </Button>
      </Tooltip>
      {cancelAction && (
        <Tooltip
          openDelay={500}
          label="Volver al recetario"
          hasArrow
          placement="top"
        >
          <Button px={4} onClick={cancelAction} variant="redButton">
            <FaArrowLeft />
          </Button>
        </Tooltip>
      )}
    </Flex>
  );
};

export default RecipeFormButtons;
