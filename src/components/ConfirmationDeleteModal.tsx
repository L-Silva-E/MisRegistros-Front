import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import useAxios from "../hooks/axiosFetch";
import { API_BASE_URL } from "../constants/environment";
import { Recipe } from "../types";
import { refreshWindow } from "../utils/utilities";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseModal: () => void;
  data: Recipe | undefined;
};

function ConfirmationDeleteModal({
  isOpen,
  onClose,
  onCloseModal,
  data,
}: Props) {
  const toast = useToast();

  const { axiosFetch } = useAxios();

  const deleteRecipe = async () => {
    try {
      if (!data) {
        console.error("No recipe data to delete.");
        toast({
          position: "top",
          title: "Hubo un error.",
          description: `No se ha eliminado ninguna receta.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const url = `${API_BASE_URL}/recipe/${data.id}`;

      await axiosFetch("DELETE", url);
      console.log("Recipe deleted successfully", data);
      localStorage.setItem(
        "toast",
        JSON.stringify({
          title: "Receta eliminada.",
          description: `La receta "${data.name}" ha sido eliminada exitosamente.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      );
      onClose();
      onCloseModal();
      refreshWindow();
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Receta</ModalHeader>
          <ModalBody>
            <Text>¿Estás seguro de que quieres realizar esta acción?</Text>
          </ModalBody>

          <ModalFooter mt={4}>
            <Button colorScheme="gray" mr={4} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="redButton" onClick={deleteRecipe}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmationDeleteModal;
