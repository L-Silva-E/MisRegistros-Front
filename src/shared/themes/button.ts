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
      ":disabled": {
        ":hover": {
          backgroundColor: "green.600",
        },
      },
    },
    redButton: {
      backgroundColor: "red.500",
      color: "white",
      ":hover": {
        backgroundColor: "red.600",
      },
    },
    deleteButton: {
      backgroundColor: "gray.300",
      color: "white",
      ":hover": {
        backgroundColor: "red.500",
      },
      _dark: {
        backgroundColor: "#3C4658",
        color: "white",
        ":hover": {
          backgroundColor: "red.500",
        },
      },
    },
    deleteButtonOutline: {
      backgroundColor: "inherit",
      borderWidth: 2,
      borderColor: "gray.400",
      color: "gray.600",
      ":hover": {
        backgroundColor: "red.100",
        borderColor: "red.500",
        color: "gray.600",
      },
      _dark: {
        backgroundColor: "inherit",
        borderWidth: 2,
        borderColor: "gray.600",
        color: "gray.300",
        ":hover": {
          backgroundColor: "red.900",
          borderColor: "red.500",
          color: "white",
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
        backgroundColor: "#3C4658",
        color: "white",
        ":hover": {
          backgroundColor: "blue.500",
        },
      },
    },
    addRowButton: {
      backgroundColor: "gray.400",
      color: "white",
      ":hover": {
        backgroundColor: "gray.500",
      },
      _dark: {
        backgroundColor: "#3C4658",
        color: "white",
        ":hover": {
          backgroundColor: "gray.500",
        },
      },
    },
    copyButton: {
      backgroundColor: "gray.300",
      color: "white",
      ":hover": {
        backgroundColor: "purple.500",
      },
      _dark: {
        backgroundColor: "#3C4658",
        color: "white",
        ":hover": {
          backgroundColor: "purple.500",
        },
      },
    },
  },
};

export default ButtonTheme;
