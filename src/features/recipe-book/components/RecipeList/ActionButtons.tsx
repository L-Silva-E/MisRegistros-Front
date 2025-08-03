import { memo } from "react";
import { HStack, Button } from "@chakra-ui/react";
import { FaCog, FaPlusSquare } from "react-icons/fa";

interface ActionButtonsProps {
  onNavigateToMeta: () => void;
  onOpenRecipeCreate: () => void;
}

const ActionButtons = memo(
  ({ onNavigateToMeta, onOpenRecipeCreate }: ActionButtonsProps) => {
    return (
      <HStack mt={4} mb={8} gap={4}>
        <Button
          leftIcon={<FaCog />}
          onClick={onNavigateToMeta}
          variant="greenButton"
        >
          Administrar
        </Button>

        <Button
          leftIcon={<FaPlusSquare />}
          variant="greenButton"
          ml="2"
          onClick={onOpenRecipeCreate}
        >
          Crear Receta
        </Button>
      </HStack>
    );
  }
);

ActionButtons.displayName = "ActionButtons";

export { ActionButtons };
