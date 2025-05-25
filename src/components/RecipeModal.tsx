import { useState } from "react";
import { FaPencilAlt, FaThumbtack, FaTrash } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import RecipeModalSkeleton from "./RecipeModalSkeleton";
import RecipeModalContent from "./RecipeModalContent";
import ConfirmationDeleteModal from "./ConfirmationDeleteModal";

import { Recipe } from "../types";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: Recipe | undefined;
};

function RecipeModal({ isOpen, onClose, loading, data }: Props) {
  const navigate = useNavigate();

  const {
    isOpen: isOpenDeleteConfirmation,
    onOpen: onOpenDeleteConfirmation,
    onClose: onCloseDeleteConfirmation,
  } = useDisclosure();

  const [isUnlocked, setIsUnlocked] = useState(true);

  const handleEdit = () => {
    navigate(`/recipes/update/${data?.id}`);
    onClose();
  };

  return (
    <>
      <Modal
        scrollBehavior="inside"
        size={"xl"}
        closeOnOverlayClick={isUnlocked}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          {loading ? (
            <RecipeModalSkeleton />
          ) : (
            data && <RecipeModalContent data={data} />
          )}
          <ModalFooter mt={4}>
            <Button
              isDisabled={!isUnlocked}
              variant="deleteButton"
              onClick={onOpenDeleteConfirmation}
            >
              <FaTrash color={useColorModeValue("#1A202C", "white")} />
            </Button>

            <Spacer />

            <Button
              isDisabled={!isUnlocked}
              variant="editButton"
              onClick={handleEdit}
            >
              <FaPencilAlt color={useColorModeValue("#1A202C", "white")} />
            </Button>

            <Button
              mx={4}
              backgroundColor={
                isUnlocked
                  ? useColorModeValue("gray.300", "#3C4658")
                  : "yellow.500"
              }
              _hover={
                isUnlocked
                  ? { backgroundColor: "yellow.500" }
                  : {
                      backgroundColor: useColorModeValue("gray.300", "#3C4658"),
                    }
              }
              onClick={() => setIsUnlocked(!isUnlocked)}
            >
              <FaThumbtack
                size={16}
                color={useColorModeValue("#1A202C", "white")}
              />
            </Button>

            <Button
              isDisabled={!isUnlocked}
              onClick={onClose}
              variant="greenButton"
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ConfirmationDeleteModal
        isOpen={isOpenDeleteConfirmation}
        onClose={onCloseDeleteConfirmation}
        onCloseModal={onClose}
        data={data}
      />
    </>
  );
}

export default RecipeModal;
