import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { SearchForm } from "../types";

type Props = {
  onSubmit: (data: SearchForm) => void;
};

function Header({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<SearchForm>();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center" position="relative">
      <Button
        onClick={toggleColorMode}
        position="absolute"
        right="4"
        variant="themeToggle"
      >
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </Button>

      <Box flex="1" textAlign="center">
        <Container mt="1" maxW="3xl" display="inline-block">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.500">
                <FaSearch />
              </InputLeftElement>
              <Input
                {...register("search", { required: false })}
                type="text"
                placeholder="Nombre de la Receta"
              />
              <Button type="submit" variant="greenButton" ml="2">
                Buscar
              </Button>
            </InputGroup>
          </form>
        </Container>
      </Box>
    </Flex>
  );
}

export default Header;
