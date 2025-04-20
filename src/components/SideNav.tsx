import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Heading,
  Link,
  SkeletonText,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useAxios from "../hooks/axiosFetch";
import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { Feature } from "../types";
import { parseRoutes } from "../constants/routes";

type Props = {};

const url = `${API_BASE_URL}/feature?isActive=true`;
const defaultFeature = { id: 0, name: "Inicio" };

function SideNav({}: Props) {
  const location = useLocation();
  const [selectedFeature, setSelectedFeature] = useState<Feature>(() => {
    const currentPath = location.pathname;
    const matchingRoute = parseRoutes.find((route) =>
      currentPath.startsWith(`/${route.route}`)
    );
    return matchingRoute ? { id: 1, name: matchingRoute.name } : defaultFeature;
  });

  const {
    loading: loadingFeatures,
    data: dataFeatures,
    axiosFetch: axiosFetchFeature,
  } = useAxios<Feature[]>();

  useEffect(() => {
    axiosFetchFeature(HTTP_METHODS.GET, url);
  }, []);

  const getRouteForFeature = (featureName: string) => {
    const routeConfig = parseRoutes.find((route) => route.name === featureName);
    return routeConfig ? `/${routeConfig.route}` : "/";
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "#181B25")}
      p={4}
      height="100vh"
      width="200px"
      boxShadow="xl"
    >
      <Heading fontSize={16} fontWeight="bold" mt={4} ml={2}>
        Módulos
      </Heading>
      <Divider
        my={4}
        borderColor={useColorModeValue("green.600", "green.600")}
      />

      {loadingFeatures ? (
        <SkeletonText mt="2" noOfLines={8} spacing="2" skeletonHeight="8" />
      ) : (
        <VStack align="stretch">
          <Link
            px={2}
            py={1}
            borderRadius={5}
            as={RouterLink}
            to="/"
            onClick={() => setSelectedFeature(defaultFeature)}
            variant={selectedFeature.name === "Inicio" ? "selected" : ""}
            key={defaultFeature.id}
          >
            Inicio
          </Link>
          {dataFeatures?.map((feature) => (
            <Link
              px={2}
              py={1}
              borderRadius={5}
              as={RouterLink}
              to={getRouteForFeature(feature.name)}
              onClick={() => setSelectedFeature(feature)}
              variant={selectedFeature.name === feature.name ? "selected" : ""}
              key={feature.id}
            >
              {feature.name}
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default SideNav;
