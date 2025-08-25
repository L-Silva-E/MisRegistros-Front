import RecipeImage from "./RecipeImage";

import { RecipeImageProps } from "./types";

export const RecipeCardImage = (
  props: Omit<RecipeImageProps, "aspectRatio">
) => (
  <RecipeImage
    aspectRatio={16 / 9}
    objectFit="cover"
    borderRadius="lg"
    {...props}
  />
);

export const RecipeDetailImage = (props: RecipeImageProps) => (
  <RecipeImage
    objectFit="contain"
    maxHeight="400px"
    border="3px solid"
    borderRadius="lg"
    maxW="xl"
    {...props}
  />
);

export const RecipeModalImage = (props: RecipeImageProps) => (
  <RecipeImage
    width="100%"
    height="300px"
    objectFit="cover"
    borderRadius="lg"
    {...props}
  />
);

export const RecipeThumbnail = (
  props: Omit<RecipeImageProps, "aspectRatio">
) => (
  <RecipeImage
    aspectRatio={1}
    objectFit="cover"
    borderRadius="md"
    boxSize="60px"
    {...props}
  />
);
