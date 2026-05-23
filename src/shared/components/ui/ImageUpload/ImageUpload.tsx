import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  FormErrorMessage,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaImage, FaTrash, FaUndo, FaUpload } from "react-icons/fa";

import { ImageUploadProps } from "./types";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ImageUpload = ({
  value,
  onChange,
  existingUrl,
  error,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  useEffect(() => {
    setIsCleared(false);
  }, [existingUrl]);

  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("teal.400", "teal.300");
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.500", "gray.400");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setValidationError(
        "Solo se permiten imágenes en formato JPG, PNG o WebP",
      );
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setValidationError("El archivo no puede superar los 5 MB");
      e.target.value = "";
      return;
    }

    setValidationError(null);
    setIsCleared(false);
    onChange(file);
  };

  // Deshace la selección del archivo nuevo y vuelve a mostrar la imagen existente
  const handleUndo = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Quita la imagen por completo (nueva o existente)
  const handleRemove = () => {
    onChange(null);
    setValidationError(null);
    setIsCleared(true);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayUrl = isCleared ? null : (previewUrl ?? existingUrl ?? null);
  const showUndo = !!previewUrl && !!existingUrl;
  const combinedError = validationError ?? error;

  return (
    <VStack align="stretch" spacing={2}>
      <Input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        display="none"
        onChange={handleFileChange}
      />

      {displayUrl ? (
        <Box position="relative" borderRadius="md" overflow="hidden">
          <Image
            src={displayUrl}
            alt="Vista previa"
            w="100%"
            maxH="220px"
            objectFit="cover"
            borderRadius="md"
          />
          <Box position="absolute" bottom={2} right={2} display="flex" gap={2}>
            <Button
              size="sm"
              leftIcon={<Icon as={FaUpload} />}
              onClick={() => inputRef.current?.click()}
              colorScheme="teal"
              variant="solid"
            >
              Cambiar
            </Button>
            {showUndo && (
              <Button
                size="sm"
                leftIcon={<Icon as={FaUndo} />}
                onClick={handleUndo}
                colorScheme="red"
                variant="solid"
              >
                Deshacer
              </Button>
            )}
            <Button
              size="sm"
              leftIcon={<Icon as={FaTrash} />}
              onClick={handleRemove}
              colorScheme="red"
              variant="solid"
            >
              Quitar
            </Button>
          </Box>
        </Box>
      ) : (
        <VStack align="stretch" spacing={2}>
          <Box
            border="2px dashed"
            borderColor={combinedError ? "red.400" : borderColor}
            borderRadius="md"
            bg={bgColor}
            p={6}
            textAlign="center"
            cursor="pointer"
            transition="border-color 0.2s"
            _hover={{
              borderColor: combinedError ? "red.400" : hoverBorderColor,
            }}
            onClick={() => inputRef.current?.click()}
          >
            <VStack spacing={2}>
              <Icon as={FaImage} boxSize={8} color={textColor} />
              <Text fontSize="sm" color={textColor}>
                Click para seleccionar una imagen
              </Text>
              <Text fontSize="xs" color={textColor}>
                Máximo 5 MB
              </Text>
            </VStack>
          </Box>
          {isCleared && existingUrl && (
            <Button
              size="sm"
              leftIcon={<Icon as={FaUndo} />}
              onClick={() => setIsCleared(false)}
              colorScheme="gray"
              variant="outline"
              alignSelf="flex-end"
            >
              Restaurar imagen
            </Button>
          )}
        </VStack>
      )}

      {combinedError && (
        <FormErrorMessage display="block">{combinedError}</FormErrorMessage>
      )}
    </VStack>
  );
};

export default ImageUpload;
