import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
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

const ForgotPasswordPage = () => {
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
            <Heading size="lg">Recuperar contraseña</Heading>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              Ingresa tu email y te enviaremos un link para recuperar tu
              contraseña.
            </Text>
            <VStack w="full" spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="tu@email.com" isDisabled />
              </FormControl>
              <Button w="full" colorScheme="green" isDisabled>
                Enviar link de recuperación
              </Button>
              <Text fontSize="xs" color="gray.500" textAlign="center">
                Esta funcionalidad estará disponible próximamente.
              </Text>
            </VStack>
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
