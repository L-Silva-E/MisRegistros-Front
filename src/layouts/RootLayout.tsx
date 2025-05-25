import { Box, Flex, useToast } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import { useEffect } from "react";

const RootLayout = () => {
  const toast = useToast();

  useEffect(() => {
    const toastData = localStorage.getItem("toast");

    if (toastData) {
      const { title, description, status, duration, isClosable } =
        JSON.parse(toastData);

      toast({
        position: "top",
        title,
        description,
        status,
        duration,
        isClosable,
      });

      localStorage.removeItem("toast");
    }
  }, [toast]);

  return (
    <Box h="100vh" overflow="hidden">
      <Header />
      <Flex h="calc(100vh - 64px)">
        <SideNav />
        <Box flex="1" overflowY="auto">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default RootLayout;
