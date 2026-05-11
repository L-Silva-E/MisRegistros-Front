import { useEffect } from "react";
import {
  Avatar,
  Badge,
  Divider,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiCalendar, FiClock, FiMail } from "react-icons/fi";

import useAxios from "../../../shared/hooks/axiosFetch";
import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";
import { User } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "Nunca";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("es", { month: "long" });
  const year = date.getFullYear();
  return `${String(day).padStart(2, "0")} / ${month.charAt(0).toUpperCase() + month.slice(1)} / ${year}`;
};

function ProfileModal({ isOpen, onClose }: Props) {
  const { data: profile, loading, axiosFetch } = useAxios<User>();

  useEffect(() => {
    if (isOpen) {
      axiosFetch(HTTP_METHODS.GET, `${API_BASE_URL}/user/me`);
    }
  }, [isOpen]);

  const isLoading = loading || !profile;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mi perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoading ? (
            <VStack spacing={4} align="stretch">
              <Flex justify="center">
                <SkeletonCircle size="20" />
              </Flex>
              <Skeleton height="24px" mx="auto" w="40%" />
              <Skeleton height="16px" mx="auto" w="20%" />
              <Divider />
              <Skeleton height="16px" />
              <Skeleton height="16px" />
              <Skeleton height="16px" />
            </VStack>
          ) : (
            <VStack spacing={5} align="stretch">
              <Flex justify="center">
                <Avatar
                  name={profile.username}
                  size="xl"
                  backgroundColor="green.800"
                  color="green.50"
                />
              </Flex>

              <VStack spacing={1} align="center">
                <Heading size="md">{profile.username}</Heading>
                <Badge
                  colorScheme={profile.role === "ADMIN" ? "green" : "gray"}
                  fontSize="xs"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                >
                  {profile.role}
                </Badge>
              </VStack>

              <Divider />

              <VStack spacing={3} align="stretch">
                <HStack spacing={3}>
                  <FiMail size={14} />
                  <Text fontSize="sm" color="gray.400" minW="28">
                    Email
                  </Text>
                  <Text fontSize="sm">{profile.email}</Text>
                </HStack>
                <HStack spacing={3}>
                  <FiClock size={14} />
                  <Text fontSize="sm" color="gray.400" minW="28">
                    Último acceso
                  </Text>
                  <Text fontSize="sm">{formatDate(profile.lastLoginAt)}</Text>
                </HStack>
                <HStack spacing={3}>
                  <FiCalendar size={14} />
                  <Text fontSize="sm" color="gray.400" minW="28">
                    Miembro desde
                  </Text>
                  <Text fontSize="sm">{formatDate(profile.createdAt)}</Text>
                </HStack>
              </VStack>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ProfileModal;
