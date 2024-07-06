import { Heading, Link, SkeletonText, VStack } from "@chakra-ui/react";
import { Category } from "../types";

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (i: Category) => void;
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
      <Heading fontSize={14} fontWeight="bold" mb={4}>
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
            variant={selectedCategory.name === i.name ? "selected" : ""}
          >
            {i.name == "Otro" ? "Todas" : i.name}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
