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
    loginFlow: {
      color: "green.400",
      fontSize: "sm",
      fontWeight: "bold",
      _hover: {
        textDecoration: "underline",
      },
      _dark: {
        color: "green.400",
        fontSize: "sm",
        fontWeight: "bold",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
};

export default LinkTheme;
