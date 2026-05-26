import { memo } from "react";
import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { FaGear, FaPlus } from "react-icons/fa6";

interface ActionButtonsProps {
  onNavigateToMeta: () => void;
  onOpenRecipeCreate: () => void;
}

const ActionButtons = memo(
  ({ onNavigateToMeta, onOpenRecipeCreate }: ActionButtonsProps) => {
    return (
      <HStack mb={8} gap={4}>
        <Tooltip
          openDelay={500}
          hasArrow
          placement="top"
          label="Crear receta"
          aria-label="Create Recipe"
        >
          <IconButton
            px={4}
            aria-label="Create Recipe"
            icon={<FaPlus />}
            variant="greenButton"
            onClick={onOpenRecipeCreate}
          />
        </Tooltip>

        <Tooltip
          openDelay={500}
          hasArrow
          placement="top"
          label="Administrar listas"
          aria-label="Manage Lists"
        >
          <IconButton
            px={4}
            aria-label="Manage Lists"
            icon={<FaGear />}
            onClick={onNavigateToMeta}
            variant="greenButton"
          />
        </Tooltip>
      </HStack>
    );
  },
);

ActionButtons.displayName = "ActionButtons";

export { ActionButtons };
