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
import { FaSquareCheck } from "react-icons/fa6";

import { StepsTableProps } from "./types";

const StepsTable = ({
  steps,
  size = "sm",
  variant = "simple",
  interactive = false,
  completedSteps = new Set(),
  onToggleStep,
  checkboxColor = "gray.500",
  ...containerProps
}: StepsTableProps) => {
  return (
    <TableContainer borderRadius="md" {...containerProps}>
      <Table size={size} variant={variant}>
        <Thead>
          <Tr>
            {interactive && (
              <Th width={12}>
                <HStack justify="center">
                  <FaSquareCheck />
                </HStack>
              </Th>
            )}
            <Th width={interactive ? 12 : "10px"} textAlign="center">
              Paso
            </Th>
            <Th>Instrucción</Th>
          </Tr>
        </Thead>
        <Tbody>
          {steps.map((step) => (
            <Tr
              key={step.number}
              color={
                interactive && completedSteps.has(step.number)
                  ? "green.500"
                  : "inherit"
              }
              textDecoration={
                interactive && completedSteps.has(step.number)
                  ? "line-through"
                  : "none"
              }
            >
              {interactive && (
                <Td>
                  <Checkbox
                    colorScheme="green"
                    borderColor={checkboxColor}
                    isChecked={completedSteps.has(step.number)}
                    onChange={() => onToggleStep?.(step.number)}
                    size="lg"
                  />
                </Td>
              )}
              <Td textAlign="center">{step.number}</Td>
              <Td whiteSpace={interactive ? "normal" : "normal"}>
                {step.instruction}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StepsTable;
