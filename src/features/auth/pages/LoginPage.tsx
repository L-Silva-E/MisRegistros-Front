import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
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

import { useAuth } from "../hooks/useAuth";
import { useToastContext } from "../../../shared/providers";
import { LoginPayload } from "../types";
import { API_BASE_URL, API_KEY } from "../../../shared/constants/environment";

const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToastContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();

  const onSubmit = async (formData: LoginPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.details ?? "Credenciales inválidas");
      }

      const {
        data: { token, user },
      } = await response.json();
      login(token, user);
      navigate(from, { replace: true });
    } catch (err) {
      showToast({
        title: "Error al iniciar sesión",
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
            <Heading size="lg">Iniciar sesión</Heading>
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
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "La contraseña es requerida",
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
                  Iniciar sesión
                </Button>
              </VStack>
            </Box>
            <VStack spacing={1}>
              <Text fontSize="sm">
                ¿No tienes cuenta?{" "}
                <Link as={RouterLink} to="/register" color="green.400">
                  Regístrate
                </Link>
              </Text>
              <Link
                as={RouterLink}
                to="/forgot-password"
                color="gray.400"
                fontSize="sm"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default LoginPage;
