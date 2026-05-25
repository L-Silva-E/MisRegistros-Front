const LinkTheme = {
  baseStyle: {
    color: "gray.800",
    _hover: {
      textDecoration: "none",
    },
    _dark: {
      color: "gray.200",
      _hover: {
        textDecoration: "none",
      },
    },
  },
  variants: {
    selected: {
      backgroundColor: "green.600",
      color: "green.50",
      fontWeight: "bold",
      _dark: {
        backgroundColor: "green.600",
        color: "green.50",
        fontWeight: "bold",
      },
    },
  },
};

export default LinkTheme;
