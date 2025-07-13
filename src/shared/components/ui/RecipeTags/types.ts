import { IconType } from "react-icons";

export interface TagData {
  label: string;
  icon: IconType;
  colorScheme?: string;
  iconSize?: string;
}

export interface RecipeTagsProps {
  tags: TagData[];
  size?: "sm" | "md" | "lg";
  spacing?: number;
  wrap?: boolean;
}
