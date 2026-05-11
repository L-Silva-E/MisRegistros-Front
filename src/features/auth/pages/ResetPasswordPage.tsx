import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import { useToastContext } from "../../../shared/providers";
import { API_BASE_URL, API_KEY } from "../../../shared/constants/environment";
import ColorModeToggle from "../../../shared/components/ui/ColorModeToggle/ColorModeToggle";

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const TOKEN_ERROR_MAP: Record<string, string> = {
  expired: "El link de recuperación expiró. Solicita uno nuevo.",
  invalid: "El link de recuperación es inválido o ya fue utilizado.",
};

const parseTokenError = (detail: string): string | null => {
  if (detail.toLowerCase().includes("expired")) return TOKEN_ERROR_MAP.expired;
  if (detail.toLowerCase().includes("invalid")) return TOKEN_ERROR_MAP.invalid;
  return null;
};

const ResetPasswordPage = () => {
  const { showToast } = useToastContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [tokenError, setTokenError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (formData: ResetPasswordForm) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify({ token, newPassword: formData.newPassword }),
      });

      if (!response.ok) {
        const err = await response.json();
        const detail: string = err.details ?? "";
        const mapped = parseTokenError(detail);
        if (mapped) {
          setTokenError(mapped);
          return;
        }
        throw new Error(detail || "Error al restablecer la contraseña");
      }

      navigate("/login", {
        state: {
          successToast: {
            title: "Contraseña actualizada",
            description: "Tu contraseña fue restablecida correctamente.",
          },
        },
        replace: true,
      });
    } catch (err) {
      showToast({
        title: "Error",
        description: (err as Error).message,
        status: "error",
      });
    }
  };

  const bg = useColorModeValue("gray.100", "gray.900");

  const invalidTokenContent = (message: string) => (
    <VStack spacing={4}>
      <Text fontSize="sm" color="red.400" textAlign="center">
        {message}
      </Text>
      <Link as={RouterLink} to="/forgot-password" color="green.400" fontSize="sm">
        Solicitar un nuevo correo
      </Link>
    </VStack>
  );

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bg}>
      <ColorModeToggle position="fixed" top={4} right={4} />
      <Card maxW="md" w="full" mx={4}>
        <CardBody>
          <VStack spacing={6}>
            <HStack>
              <Image src="/icon.png" alt="MisRegistros" boxSize={8} />
              <Heading size="md">MisRegistros</Heading>
            </HStack>
            <Heading size="lg">Nueva contraseña</Heading>

            {!token ? (
              invalidTokenContent(TOKEN_ERROR_MAP.invalid)
            ) : tokenError ? (
              invalidTokenContent(tokenError)
            ) : (
              <>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Ingresa tu nueva contraseña. El link tiene una vigencia de 1
                  hora.
                </Text>
                <Box as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.newPassword}>
                      <FormLabel>Nueva contraseña</FormLabel>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...register("newPassword", {
                          required: "La contraseña es requerida",
                          minLength: {
                            value: 8,
                            message: "Mínimo 8 caracteres",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.newPassword?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.confirmPassword}>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword", {
                          required: "Confirma tu contraseña",
                          validate: (val) =>
                            val === watch("newPassword") ||
                            "Las contraseñas no coinciden",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.confirmPassword?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      w="full"
                      colorScheme="green"
                      isLoading={isSubmitting}
                    >
                      Restablecer contraseña
                    </Button>
                  </VStack>
                </Box>
              </>
            )}

            <Link as={RouterLink} to="/login" color="green.400" fontSize="sm">
              Volver al inicio de sesión
            </Link>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default ResetPasswordPage;
