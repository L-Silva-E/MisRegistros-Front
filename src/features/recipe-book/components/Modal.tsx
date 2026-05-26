import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaCopy,
  FaPenToSquare,
  FaThumbtack,
  FaXmark,
  FaTrash,
} from "react-icons/fa6";

import RecipeModalSkeleton from "./ModalSkeleton";
import RecipeModalContent from "./ModalContent";
import ConfirmationDeleteModal from "./DeleteModal";

import { useRecipeDuplicate } from "../hooks";
import { Recipe } from "../types";
import { useAuth } from "../../../features/auth/hooks/useAuth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: Recipe | undefined;
};

function RecipeModal({ isOpen, onClose, loading, data }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { duplicateRecipe, isLoading: isDuplicating } = useRecipeDuplicate();

  const {
    isOpen: isOpenDeleteConfirmation,
    onOpen: onOpenDeleteConfirmation,
    onClose: onCloseDeleteConfirmation,
  } = useDisclosure();

  const [isUnlocked, setIsUnlocked] = useState(true);
  const initialFocusRef = useRef<HTMLSpanElement>(null);

  const iconColor = useColorModeValue("#1A202C", "white");
  const pinUnlockedBg = useColorModeValue("gray.300", "#3C4658");
  const pinLockedBg = "yellow.500";
  const pinUnlockedHover = { backgroundColor: "yellow.500" };
  const pinLockedHover = {
    backgroundColor: useColorModeValue("gray.300", "#3C4658"),
  };

  const canManage =
    !!user && !!data && (user.role === "ADMIN" || user.id === data.idUser);

  const handleDuplicate = async () => {
    if (data) {
      await duplicateRecipe(data.id, data.name);
      onClose();
    }
  };

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
        initialFocusRef={initialFocusRef}
      >
        <ModalOverlay />
        <ModalContent>
          {loading ? (
            <RecipeModalSkeleton />
          ) : (
            data && <RecipeModalContent data={data} />
          )}
          <span
            ref={initialFocusRef}
            tabIndex={-1}
            style={{ outline: "none" }}
          />
          <ModalFooter
            backgroundColor={useColorModeValue("gray.200", "#232B3A")}
          >
            {canManage && (
              <Tooltip
                openDelay={500}
                label="Eliminar receta"
                hasArrow
                placement="top"
              >
                <Button
                  isDisabled={!isUnlocked}
                  variant="deleteButton"
                  onClick={onOpenDeleteConfirmation}
                >
                  <FaTrash color={iconColor} />
                </Button>
              </Tooltip>
            )}

            <Spacer />

            <Tooltip
              openDelay={500}
              label="Duplicar receta"
              hasArrow
              placement="top"
            >
              <Button
                // isDisabled={!isUnlocked} // TODO: Enable with fix
                isDisabled={true}
                variant="copyButton"
                onClick={handleDuplicate}
                isLoading={isDuplicating}
              >
                <FaCopy color={iconColor} />
              </Button>
            </Tooltip>

            {canManage && (
              <Tooltip
                openDelay={500}
                label="Editar receta"
                hasArrow
                placement="top"
              >
                <Button
                  ml={4}
                  isDisabled={!isUnlocked}
                  variant="editButton"
                  onClick={handleEdit}
                >
                  <FaPenToSquare color={iconColor} />
                </Button>
              </Tooltip>
            )}

            {canManage && (
              <Tooltip
                openDelay={500}
                label={isUnlocked ? "Fijar tarjeta" : "Liberar tarjeta"}
                hasArrow
                placement="top"
              >
                <Button
                  mx={4}
                  backgroundColor={isUnlocked ? pinUnlockedBg : pinLockedBg}
                  _hover={isUnlocked ? pinUnlockedHover : pinLockedHover}
                  onClick={() => setIsUnlocked(!isUnlocked)}
                >
                  <FaThumbtack size={16} color={iconColor} />
                </Button>
              </Tooltip>
            )}

            <Tooltip openDelay={500} label="Cerrar" hasArrow placement="top">
              <Button
                isDisabled={!isUnlocked}
                onClick={onClose}
                variant="redButton"
              >
                <FaXmark size={16} color={iconColor} />
              </Button>
            </Tooltip>
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
