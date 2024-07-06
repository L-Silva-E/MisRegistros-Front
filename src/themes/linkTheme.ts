const LinkTheme = {
  baseStyle: {
    color: "green.700",
    _hover: {
      textDecoration: "none",
    },
    _dark: {
      color: "green.200",
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
