import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import Header from "./Header";
import SideNav from "./SideNav";

const RootLayout = () => {
  return (
    <Box h="100vh" overflow="hidden">
      <Header />
      <Flex h="calc(100vh - 64px)">
        <SideNav />
        <Box
          flex="1"
          overflowY="auto"
          p={8}
          css={{
            scrollbarGutter: "stable",
          }}
        >
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default RootLayout;
