import { Container, SkeletonText } from "@chakra-ui/react";

type Props = {};

function RecipeModelSkeleton({}: Props) {
  return (
    <Container>
      <SkeletonText
        spacing="4"
        mt="4"
        mb="4"
        noOfLines={1}
        skeletonHeight={8}
      />
      <SkeletonText
        spacing="4"
        borderRadius={10}
        noOfLines={1}
        skeletonHeight={300}
      />
      <SkeletonText spacing="4" mt="4" noOfLines={5} />
    </Container>
  );
}

export default RecipeModelSkeleton;
