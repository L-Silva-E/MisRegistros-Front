const ButtonTheme = {
  baseStyle: {
    borderRadius: "lg",
    fontWeight: "bold",
  },
  variants: {
    themeToggle: {
      backgroundColor: "gray.300",
      color: "gray.900",
      ":hover": {
        backgroundColor: "gray.400",
      },
      _dark: {
        backgroundColor: "gray.700",
        color: "gray.100",
        ":hover": {
          backgroundColor: "gray.600",
        },
      },
    },
    greenButton: {
      backgroundColor: "green.500",
      color: "white",
      ":hover": {
        backgroundColor: "green.600",
      },
    },
  },
};

export default ButtonTheme;
