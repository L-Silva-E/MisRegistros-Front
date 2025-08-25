import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { FaCheckSquare } from "react-icons/fa";

import { IngredientsTableProps } from "./types";

const IngredientsTable = ({
  ingredients,
  size = "sm",
  variant = "unstyled",
  interactive = false,
  checkedItems = new Set(),
  onToggleItem,
  checkboxColor = "gray.500",
  ...containerProps
}: IngredientsTableProps) => {
  return (
    <TableContainer borderRadius="md" {...containerProps}>
      <Table size={size} variant={variant}>
        <Thead>
          <Tr>
            {interactive && (
              <Th width={12}>
                <HStack justify="center">
                  <FaCheckSquare />
                </HStack>
              </Th>
            )}
            <Th width={interactive ? "10%" : "100px"}>Cantidad</Th>
            <Th>Ingrediente</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ingredients.map((ingredient, index) => (
            <Tr
              key={index}
              color={
                interactive && checkedItems.has(index.toString())
                  ? "green.500"
                  : "inherit"
              }
            >
              {interactive && (
                <Td>
                  <Checkbox
                    colorScheme="green"
                    borderColor={checkboxColor}
                    isChecked={checkedItems.has(index.toString())}
                    onChange={() => onToggleItem?.(index.toString())}
                    size="lg"
                  />
                </Td>
              )}
              <Td textAlign="right">
                {ingredient.quantity} {ingredient.ingredient.unit}
              </Td>
              <Td>{ingredient.ingredient.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default IngredientsTable;
