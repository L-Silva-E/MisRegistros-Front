import { ImageProps } from "@chakra-ui/react";

export interface RecipeImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  aspectRatio?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onError?: () => void;
}
