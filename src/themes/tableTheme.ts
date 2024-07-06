const TableTheme = {
  baseStyle: {
    table: {
      border: "2px solid",
      borderColor: "green.200",
      backgroundColor: "green.50",
      color: "green.700",
      _dark: {
        border: "1px solid",
        borderColor: "green.800",
        backgroundColor: "green.900",
        color: "green.200",
      },
    },
    thead: {
      th: {
        backgroundColor: "green.200",
        borderColor: "green.200",
        color: "green.900",
        _dark: {
          backgroundColor: "green.900",
          borderColor: "green.900",
          color: "green.100",
        },
      },
    },
    tbody: {
      td: {
        borderColor: "green.200",
        _dark: {
          borderColor: "green.800",
        },
      },
      tr: {
        _even: {
          backgroundColor: "green.100",
          _dark: {
            backgroundColor: "green.700",
          },
        },
        _odd: {
          backgroundColor: "green.50",
          _dark: {
            backgroundColor: "green.800",
          },
        },
      },
    },
  },
};

export default TableTheme;
