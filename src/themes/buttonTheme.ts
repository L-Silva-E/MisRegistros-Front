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
    deleteButton: {
      backgroundColor: "gray.300",
      color: "white",
      ":hover": {
        backgroundColor: "red.500",
      },
      _dark: {
        backgroundColor: "gray.600",
        color: "white",
        ":hover": {
          backgroundColor: "red.500",
        },
      },
    },
    editButton: {
      backgroundColor: "gray.300",
      color: "white",
      ":hover": {
        backgroundColor: "blue.500",
      },
      _dark: {
        backgroundColor: "gray.600",
        color: "white",
        ":hover": {
          backgroundColor: "blue.500",
        },
      },
    },
    addRowButton: {
      backgroundColor: "gray.300",
      color: "white",
      ":hover": {
        backgroundColor: "gray.400",
      },
      _dark: {
        backgroundColor: "gray.600",
        color: "white",
        ":hover": {
          backgroundColor: "gray.500",
        },
      },
    },
  },
};

export default ButtonTheme;
