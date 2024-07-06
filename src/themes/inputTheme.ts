const InputTheme = {
  baseStyle: {
    field: {
      background: "white",
      borderColor: "gray.600",
      borderWidth: 2,
      ":focus": {
        borderColor: "green.500",
      },
      ":hover": {
        borderColor: "green.500",
      },
      _dark: {
        background: "inherit",
        borderColor: "gray.500",
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
  variants: {},
  defaultProps: {
    variant: null,
  },
};

export default InputTheme;
