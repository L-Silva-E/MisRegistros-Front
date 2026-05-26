import {
  IconButton,
  IconButtonProps,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa6";

type Props = Omit<IconButtonProps, "aria-label" | "icon" | "onClick">;

function ColorModeToggle(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      openDelay={500}
      label={
        colorMode === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"
      }
      hasArrow
      placement="top"
    >
      <IconButton
        px={4}
        aria-label="Cambiar tema"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="themeToggle"
        {...props}
      />
    </Tooltip>
  );
}

export default ColorModeToggle;
