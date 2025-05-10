import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import ButtonTheme from "./buttonTheme";
import CardTheme from "./cardTheme";
import InputTheme from "./inputTheme";
import HeadingTheme from "./headingTheme";
import LinkTheme from "./linkTheme";
import ListTheme from "./listTheme";
import NumberInputTheme from "./inputNumberTheme";
import ModalTheme from "./modalTheme";
import SelectTheme from "./selectTheme";
import TableTheme from "./tableTheme";
import TextTheme from "./textTheme";
import TextareaTheme from "./textareaTheme";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const customTheme = extendTheme({
  config,
  colors: {
    light: {
      background: "gray.200",
      text: "black",
    },
    dark: {
      background: "black",
      text: "white",
    },
  },
  components: {
    Button: ButtonTheme,
    Card: CardTheme,
    Input: InputTheme,
    Heading: HeadingTheme,
    Link: LinkTheme,
    List: ListTheme,
    NumberInput: NumberInputTheme,
    Modal: ModalTheme,
    Select: SelectTheme,
    Table: TableTheme,
    Text: TextTheme,
    Textarea: TextareaTheme,
  },
});

export default customTheme;
