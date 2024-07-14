import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import ButtonTheme from "./buttonTheme";
import CardTheme from "./cardTheme";
import InputTheme from "./inputTheme";
import HeadingTheme from "./gridTheme";
import LinkTheme from "./linkTheme";
import ListTheme from "./listTheme";
import ModalTheme from "./modalTheme";
import SelectTheme from "./selectTheme";
import TableTheme from "./tableTheme";
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
    Modal: ModalTheme,
    Select: SelectTheme,
    Table: TableTheme,
    Textarea: TextareaTheme,
  },
});

export default customTheme;
