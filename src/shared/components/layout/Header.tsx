import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import ColorModeToggle from "../ui/ColorModeToggle/ColorModeToggle";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../features/auth/hooks/useAuth";
import ProfileModal from "../../../features/auth/components/ProfileModal";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Flex
        alignItems="center"
        bg={useColorModeValue("gray.200", "gray.900")}
        py={2}
        boxShadow="xl"
      >
        <Box p={2}>
          <HStack ml="4">
            <Box
              bg={useColorModeValue("gray.300", "gray.700")}
              borderRadius="full"
              borderWidth={2}
              borderColor={useColorModeValue("gray.400", "gray.600")}
              p={2}
              mr={-2}
              my={-2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src="/icon.png" alt="MisRegistros Icon" boxSize={8} />
            </Box>
            <Heading ml="2" size="md">
              MisRegistros
            </Heading>
          </HStack>
        </Box>
        <Spacer />
        <HStack align="center" gap="16px" mr="4">
          <ColorModeToggle />
          {isAuthenticated && user && (
            <Menu>
              <MenuButton>
                <Avatar
                  name={user.username}
                  backgroundColor="green.800"
                  color="green.50"
                  size="sm"
                  cursor="pointer"
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  isDisabled
                  _disabled={{ opacity: 1, cursor: "default" }}
                >
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold" fontSize="sm">
                      {user.username}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {user.email}
                    </Text>
                  </VStack>
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiUser />} onClick={onOpen}>
                  Mi perfil
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={handleLogout}
                  color="red.400"
                >
                  Cerrar sesión
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>

      <ProfileModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Header;
