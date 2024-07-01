import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";
import { Category } from "../types";

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (i: Category) => void;
};

const selectedProps = {
  bgColor: "green.200",
  color: "green.800",
  fontWeight: "bold",
};

function SideNav({
  loading,
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return loading ? (
    <SkeletonText mt="2" noOfLines={10} spacing="5" skeletonHeight="4" />
  ) : (
    <>
      <Heading color="green.500" fontSize={14} fontWeight="bold" mb={4}>
        Categories
      </Heading>
      <VStack align="stretch">
        {categories.map((i) => (
          <Link
            onClick={() => setSelectedCategory(i)}
            px={2}
            py={1}
            borderRadius={5}
            key={i.name}
            _hover={{ textDecoration: "none" }}
            {...(selectedCategory.name === i.name && selectedProps)}
          >
            {i.name == "Otro" ? "Todas" : i.name}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
