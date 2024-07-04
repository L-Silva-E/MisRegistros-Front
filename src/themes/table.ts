import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const customTableStyles = definePartsStyle({
  table: {
    border: "1px solid",
    borderColor: "green.200",
  },
  th: {
    bg: "green.50",
  },
  td: {
    bg: "green.50",
    color: "green.700",
  },
});

const tableTheme = defineMultiStyleConfig({
  baseStyle: customTableStyles,
});

export default tableTheme;
