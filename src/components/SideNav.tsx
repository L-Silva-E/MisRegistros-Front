import { useState } from "react";
import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";

import getDataAxios from "../hooks/getDataAxios";

import { API_BASE_URL } from "../constants/environment";
import { Feature } from "../types";

type Props = {};

const dataFeatureDefault = { id: 1, name: "Libro de Recetas" };

const url = `${API_BASE_URL}/feature?isActive=true`;

function SideNav({}: Props) {
  const [selectedFeature, setSelectedFeature] =
    useState<Feature>(dataFeatureDefault);

  const { loading: loadingFeatures, data: dataFeatures } =
    getDataAxios<Feature>(url);

  return loadingFeatures ? (
    <SkeletonText mt="2" noOfLines={10} spacing="5" skeletonHeight="4" />
  ) : (
    <>
      <Heading fontSize={14} fontWeight="bold" mb={4}>
        Módulo
      </Heading>
      <VStack align="stretch">
        {dataFeatures.map((feature) => (
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
