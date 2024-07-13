const SelectTheme = {
  baseStyle: {
    field: {
      backgroundColor: "inherit",
      borderColor: "blackAlpha.400",
      borderWidth: 2,
      color: "gray.600",
      ":focus": {
        borderColor: "green.500",
        backgroundColor: "green.50",
      },
      ":hover": {
        borderColor: "green.500",
      },
      _dark: {
        backgroundColor: "inherit",
        borderColor: "whiteAlpha.400",
        borderWidth: 2,
        color: "gray.300",
        ":focus": {
          borderColor: "green.500",
          backgroundColor: "green.900",
        },
        ":hover": {
          borderColor: "green.500",
        },
      },
    },
    icon: {
      color: "green",
    },
  },
  sizes: {},
  variants: {
    selected: {
      field: {
        backgroundColor: "green.50",
        borderColor: "green.200",
        _dark: {
          backgroundColor: "green.900",
          borderColor: "green.700",
        },
      },
    },
  },
  defaultProps: {
    variant: null,
  },
};

export default SelectTheme;
