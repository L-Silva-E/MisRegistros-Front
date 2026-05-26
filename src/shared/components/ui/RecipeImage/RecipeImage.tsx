import { useState, useEffect } from "react";
import {
  Box,
  Icon,
  Image,
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaImage, FaTriangleExclamation } from "react-icons/fa6";

import { RecipeImageProps } from "./types";

const RecipeImage = ({
  src,
  alt,
  fallbackSrc,
  showSkeleton = true,
  aspectRatio,
  objectFit = "cover",
  onLoad,
  onError,
  ...imageProps
}: RecipeImageProps) => {
  const [isLoading, setIsLoading] = useState(!!src);
  const [hasError, setHasError] = useState(!src);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      setIsLoading(!!src);
      setHasError(!src);
    }
  }, [src]);

  const fallbackBg = useColorModeValue("gray.100", "gray.700");
  const fallbackColor = useColorModeValue("gray.500", "gray.400");

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);

    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    setHasError(true);
    onError?.();
  };

  const renderFallback = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={fallbackBg}
      color={fallbackColor}
      width="100%"
      height="100%"
      minHeight="200px"
      {...imageProps}
    >
      <VStack spacing={2}>
        <Icon
          as={hasError ? FaTriangleExclamation : FaImage}
          boxSize={8}
          color={hasError ? "red.400" : fallbackColor}
        />
        <Text fontSize="sm" textAlign="center">
          {hasError ? "Error al cargar imagen" : "Cargando..."}
        </Text>
      </VStack>
    </Box>
  );

  if (hasError) {
    return renderFallback();
  }

  return (
    <Box position="relative" width="100%" height="100%">
      {/* Skeleton mientras carga */}
      {isLoading && showSkeleton && (
        <Skeleton
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          borderRadius={imageProps.borderRadius}
        />
      )}

      {/* Imagen */}
      <Image
        src={currentSrc}
        alt={alt}
        objectFit={objectFit}
        style={{
          aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        }}
        onLoad={handleLoad}
        onError={handleError}
        opacity={isLoading ? 0 : 1}
        transition="opacity 0.3s ease-in-out"
        {...imageProps}
      />
    </Box>
  );
};

export default RecipeImage;
