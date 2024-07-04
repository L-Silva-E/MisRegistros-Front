import {
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { SearchForm } from "../types";

type Props = {
  onSubmit: (data: SearchForm) => void;
};

function Header({ onSubmit }: Props) {
  const { register, formState, handleSubmit } = useForm<SearchForm>();
  return (
    <Container mt="1" maxW="3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" color="gray.500">
            <FaSearch />
          </InputLeftElement>
          <Input
            mr="2"
            {...register("search", { required: false })}
            type="text"
            placeholder="Nombre de la Receta"
            borderColor="gray.600"
          />
          <Button type="submit" bgColor="green.600" color="green.100">
            Buscar
          </Button>
        </InputGroup>
      </form>
    </Container>
  );
}

export default Header;
