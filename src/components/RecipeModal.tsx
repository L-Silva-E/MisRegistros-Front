import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

import RecipeModalSkeleton from "./RecipeModalSkeleton";
import RecipeModalContent from "./RecipeModalContent";

import { Recipe } from "../types";
import { useState } from "react";
import { FaPencilAlt, FaThumbtack, FaTrash } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: Recipe | undefined;
};

function RecipeModal({ isOpen, onClose, loading, data }: Props) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <>
      <Modal
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
            <Button variant="deleteButton">
              <FaTrash color={useColorModeValue("#1A202C", "white")} />
            </Button>

            <Spacer />

            <Button variant="editButton">
              <FaPencilAlt color={useColorModeValue("#1A202C", "white")} />
            </Button>
            <Button
              mx={4}
              backgroundColor={
                isUnlocked
                  ? useColorModeValue("gray.300", "gray.600")
                  : "yellow.500"
              }
              _hover={
                isUnlocked
                  ? { backgroundColor: "yellow.500" }
                  : {
                      backgroundColor: useColorModeValue(
                        "gray.300",
                        "gray.600"
                      ),
                    }
              }
              onClick={() => setIsUnlocked(!isUnlocked)}
            >
              <FaThumbtack
                size={16}
                color={useColorModeValue("#1A202C", "white")}
              />
            </Button>
            <Button isDisabled={!isUnlocked} onClick={onClose} variant="greenButton">
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModal;
