import { useEffect, useState } from "react";
import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";

import useAxios from "../hooks/axiosFetch";

import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import { Feature } from "../types";

type Props = {};

const dataFeatureDefault = { id: 1, name: "Libro de Recetas" };

const url = `${API_BASE_URL}/feature?isActive=true`;

function SideNav({}: Props) {
  const [selectedFeature, setSelectedFeature] =
    useState<Feature>(dataFeatureDefault);

  const {
    loading: loadingFeatures,
    data: dataFeatures,
    axiosFetch: axiosFetchFeature,
  } = useAxios<Feature[]>();

  useEffect(() => {
    axiosFetchFeature(HTTP_METHODS.GET, url);
  }, []);

  return loadingFeatures ? (
    <SkeletonText mt="2" noOfLines={10} spacing="5" skeletonHeight="4" />
  ) : (
    <>
      <Heading fontSize={14} fontWeight="bold" mb={4}>
        Módulo
      </Heading>
      <VStack align="stretch">
        {dataFeatures?.map((feature) => (
          <Link
            onClick={() => setSelectedFeature(feature)}
            px={2}
            py={1}
            borderRadius={5}
            key={feature.id}
            variant={selectedFeature.name === feature.name ? "selected" : ""}
          >
            {feature.name}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
