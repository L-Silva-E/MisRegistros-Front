const InputTheme = {
  baseStyle: {
    field: {
      backgroundColor: "inherit",
      borderColor: "blackAlpha.400",
      borderWidth: 2,
      ":focus": {
        borderColor: "green.500",
      },
      ":hover": {
        borderColor: "green.500",
      },
      _dark: {
        backgroundColor: "inherit",
        borderColor: "whiteAlpha.400",
        borderWidth: 2,
        ":focus": {
          borderColor: "green.500",
        },
        ":hover": {
          borderColor: "green.500",
        },
      },
    },
  },
  sizes: {},
  variants: {
    filtered: {
      field: {
        backgroundColor: "green.100",
        borderColor: "green.300",
        borderWidth: 2,
        ":focus": {
          borderColor: "green.500",
          backgroundColor: "green.100",
        },
        ":hover": {
          borderColor: "green.500",
          backgroundColor: "green.100",
        },
        _dark: {
          backgroundColor: "green.800",
          borderColor: "green.600",
          borderWidth: 2,
          ":focus": {
            borderColor: "green.500",
            backgroundColor: "green.800",
          },
          ":hover": {
            borderColor: "green.500",
            backgroundColor: "green.800",
          },
        },
      },
    },
  },
  defaultProps: {
    variant: null,
  },
};

export default InputTheme;
