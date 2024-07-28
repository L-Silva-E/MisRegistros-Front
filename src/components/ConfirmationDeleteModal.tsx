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
import useDeleteDataAxios from "../hooks/deleteDataAxios";
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

  const { deleteData } = useDeleteDataAxios<any>();

  const deleteRecipe = () => {
    try {
      if (!data) {
        console.error("No recipe data to delete.");
        toast({
          position: "top",
          title: "Hubo un error.",
          description: `No se ha eliminado ninguna receta.`,
          status: "error",
          duration: 10000,
          isClosable: true,
        });
        return;
      }

      const url = `${API_BASE_URL}/recipe/${data.id}`;

      deleteData(url);
      console.log("Recipe deleted successfully", data);
      onClose();
      onCloseModal();
      toast({
        position: "top",
        title: "Receta eliminada.",
        description: `La receta "${data.name}" ha sido eliminada exitosamente.`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
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
