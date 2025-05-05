const TableTheme = {
  baseStyle: {
    table: {
      border: "3px solid",
      borderColor: "green.200",
      backgroundColor: "green.200",
      _dark: {
        border: "3px solid",
        borderColor: "green.800",
        backgroundColor: "green.800",
      },
    },
    thead: {
      th: {
        backgroundColor: "green.200",
        borderColor: "green.200",
        color: "green.900",
        _dark: {
          backgroundColor: "green.800",
          borderColor: "green.800",
          color: "green.100",
        },
      },
    },
    tbody: {
      tr: {
        _even: {
          backgroundColor: "gray.50",
          _dark: {
            backgroundColor: "gray.600",
          },
        },
        _odd: {
          backgroundColor: "gray.200",
          _dark: {
            backgroundColor: "gray.700",
          },
        },
      },
    },
  },
};

export default TableTheme;
