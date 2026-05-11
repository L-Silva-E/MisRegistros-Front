import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
import { RegisterPayload } from "../types";
import { API_BASE_URL, API_KEY } from "../../../shared/constants/environment";

const RegisterPage = () => {
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>();

  const onSubmit = async (formData: RegisterPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
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
          ? err.validations.join(", ")
          : (err.details ?? "Error al registrar usuario");
        throw new Error(description);
      }

      localStorage.setItem(
        "toast",
        JSON.stringify({
          title: "Registro exitoso",
          description: "Tu cuenta fue creada. Puedes iniciar sesión.",
          status: "success",
          duration: 4000,
          isClosable: true,
        }),
      );
      navigate("/login");
    } catch (err) {
      showToast({
        title: "Error al registrar",
        description: (err as Error).message,
        status: "error",
      });
    }
  };

  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bg}>
      <Card maxW="md" w="full" mx={4}>
        <CardBody>
          <VStack spacing={6}>
            <HStack>
              <Image src="/icon.png" alt="MisRegistros" boxSize={8} />
              <Heading size="md">MisRegistros</Heading>
            </HStack>
            <Heading size="lg">Crear cuenta</Heading>
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
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel>Usuario</FormLabel>
                  <Input
                    placeholder="nombre de usuario"
                    {...register("username", {
                      required: "El usuario es requerido",
                      minLength: { value: 3, message: "Mínimo 3 caracteres" },
                      maxLength: { value: 30, message: "Máximo 30 caracteres" },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  w="full"
                  colorScheme="green"
                  isLoading={isSubmitting}
                >
                  Crear cuenta
                </Button>
              </VStack>
            </Box>
            <Text fontSize="sm">
              ¿Ya tienes cuenta?{" "}
              <Link as={RouterLink} to="/login" color="green.400">
                Iniciar sesión
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default RegisterPage;
