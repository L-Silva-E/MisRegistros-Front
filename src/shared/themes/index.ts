import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import ButtonTheme from "./button";
import CardTheme from "./card";
import HeadingTheme from "./heading";
import InputTheme from "./input";
import LinkTheme from "./link";
import ListTheme from "./list";
import ModalTheme from "./modal";
import NumberInputTheme from "./numberInput";
import SelectTheme from "./select";
import TableTheme from "./table";
import TextTheme from "./text";
import TextareaTheme from "./textarea";

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
    NumberInput: NumberInputTheme,
    Select: SelectTheme,
    Table: TableTheme,
    Text: TextTheme,
    Textarea: TextareaTheme,
  },
});

export default customTheme;
