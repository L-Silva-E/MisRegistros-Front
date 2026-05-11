import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
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
import { FiCheckCircle } from "react-icons/fi";

import { useToastContext } from "../../../shared/providers";
import { ForgotPasswordPayload } from "../types";
import { API_BASE_URL, API_KEY } from "../../../shared/constants/environment";
import ColorModeToggle from "../../../shared/components/ui/ColorModeToggle/ColorModeToggle";

const ForgotPasswordPage = () => {
  const { showToast } = useToastContext();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordPayload>();

  const onSubmit = async (formData: ForgotPasswordPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        const description = err.validations
          ? err.validations.map((v: { message: string }) => v.message).join(", ")
          : err.details ?? "Error al procesar la solicitud";
        throw new Error(description);
      }

      setSubmitted(true);
    } catch (err) {
      showToast({
        title: "Error",
        description: (err as Error).message,
        status: "error",
      });
    }
  };

  const bg = useColorModeValue("gray.100", "gray.900");
  const iconColor = useColorModeValue("#276749", "#68D391");

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

            {submitted ? (
              <>
                <FiCheckCircle size={48} color={iconColor} />
                <Heading size="md" textAlign="center">
                  Revisa tu correo
                </Heading>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Si existe una cuenta con ese email, recibirás un link para
                  restablecer tu contraseña en los próximos minutos.
                </Text>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                >
                  ¿No recibiste el correo? Intentar de nuevo
                </Button>
              </>
            ) : (
              <>
                <Heading size="lg">Recuperar contraseña</Heading>
                <Text fontSize="sm" color="gray.400" textAlign="center">
                  Ingresa tu email y te enviaremos un link para recuperar tu
                  contraseña.
                </Text>
                <Box as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={4}>
                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        {...register("email", {
                          required: "El email es requerido",
                        })}
                      />
                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      type="submit"
                      w="full"
                      colorScheme="green"
                      isLoading={isSubmitting}
                    >
                      Enviar link de recuperación
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

export default ForgotPasswordPage;
