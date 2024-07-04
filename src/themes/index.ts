import { extendTheme } from "@chakra-ui/react";
import tableTheme from "./table";

const theme = extendTheme({
  components: {
    Table: tableTheme,
  },
});

export default theme;
