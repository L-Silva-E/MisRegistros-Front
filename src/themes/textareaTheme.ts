const TextareaTheme = {
  baseStyle: {
    backgroundColor: "inherit",
    borderColor: "blackAlpha.400",
    borderWidth: 2,
    borderRadius: 5,
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
      borderRadius: 5,
      ":focus": {
        borderColor: "green.500",
      },
      ":hover": {
        borderColor: "green.500",
      },
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {
    variant: null,
  },
};

export default TextareaTheme;
