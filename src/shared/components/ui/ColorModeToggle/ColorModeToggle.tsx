import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type Props = Omit<IconButtonProps, "aria-label" | "icon" | "onClick">;

function ColorModeToggle(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Cambiar tema"
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      variant="themeToggle"
      {...props}
    />
  );
}

export default ColorModeToggle;
