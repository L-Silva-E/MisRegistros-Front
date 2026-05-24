import { useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

import { useAuth } from "../hooks/useAuth";
import { useAvatarManagement } from "../hooks/useAvatarManagement";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AvatarUpload() {
  const { user } = useAuth();
  const { uploading, deleting, uploadAvatar, deleteAvatar } =
    useAvatarManagement();
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const isLoading = uploading || deleting;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({
        status: "error",
        description: "Solo se permiten imágenes en formato JPG, PNG o WebP",
        isClosable: true,
      });
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      toast({
        status: "error",
        description: "El archivo no puede superar los 5 MB",
        isClosable: true,
      });
      return;
    }

    const result = await uploadAvatar(file);
    toast({
      status: result.success ? "success" : "error",
      description: result.success
        ? "Foto de perfil actualizada"
        : (result.message ?? "Error al subir la foto"),
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    const result = await deleteAvatar();
    toast({
      status: result.success ? "success" : "error",
      description: result.success
        ? "Foto de perfil eliminada"
        : (result.message ?? "Error al eliminar la foto"),
      isClosable: true,
    });
  };

  if (!user) return null;

  return (
    <VStack spacing={2}>
      <Box position="relative" display="inline-block">
        <Avatar
          src={user.avatar ?? undefined}
          name={user.username}
          size="xl"
          backgroundColor="green.800"
          color="green.50"
        />
        <IconButton
          aria-label="Cambiar foto de perfil"
          icon={uploading ? <Spinner size="xs" /> : <FiCamera />}
          size="xs"
          borderRadius="full"
          position="absolute"
          bottom={0}
          right={0}
          onClick={() => inputRef.current?.click()}
          isDisabled={isLoading}
          _hover={{ bg: "gray.600" }}
        />
        <Input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          display="none"
          onChange={handleFileChange}
        />
      </Box>

      {user.avatar && (
        <Button
          variant="link"
          size="xs"
          color="red.400"
          leftIcon={<FiTrash2 />}
          onClick={handleDelete}
          isLoading={deleting}
          isDisabled={uploading}
        >
          Eliminar foto
        </Button>
      )}
    </VStack>
  );
}

export default AvatarUpload;
