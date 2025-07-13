import { BoxProps } from "@chakra-ui/react";

import { Ingredient, Step } from "../../../../features/recipe-book/types";

export interface IngredientsTableProps extends BoxProps {
  ingredients: Ingredient[];
  size?: "sm" | "md" | "lg";
  variant?: "simple" | "striped" | "unstyled";
  interactive?: boolean;
  checkedItems?: Set<string>;
  onToggleItem?: (id: string) => void;
  checkboxColor?: string;
}

export interface StepsTableProps extends BoxProps {
  steps: Step[];
  size?: "sm" | "md" | "lg";
  variant?: "simple" | "striped" | "unstyled";
  interactive?: boolean;
  completedSteps?: Set<number>;
  onToggleStep?: (stepNumber: number) => void;
  checkboxColor?: string;
}
