import { useState } from "react";
import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";

import getDataAxios from "../hooks/getDataAxios";

import { API_BASE_URL } from "../constants/environment";
import { Feature } from "../types";

type Props = {};

const dataFeaturesTemp = [
  { id: 1, name: "Libro de Recetas" },
  { id: 2, name: "Apuntes" },
  { id: 3, name: "Recordatorios" },
  { id: 4, name: "Ideas para Desarrollar" },
];

const url = `${API_BASE_URL}/feature`;

function SideNav({}: Props) {
  const [selectedFeature, setSelectedFeature] = useState<Feature>(
    dataFeaturesTemp[0]
  );

  const {
    loading: loadingFeatures,
    // data: dataFeatures TODO: Uncomment this line, and use this instead of dataFeaturesTemp
  } = getDataAxios<Feature>(url);

  return loadingFeatures ? (
    <SkeletonText mt="2" noOfLines={10} spacing="5" skeletonHeight="4" />
  ) : (
    <>
      <Heading fontSize={14} fontWeight="bold" mb={4}>
        Selección
      </Heading>
      <VStack align="stretch">
        {dataFeaturesTemp.map((feature) => (
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
