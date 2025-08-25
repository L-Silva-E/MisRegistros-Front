import { Container, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

type Props = {};

function RecipeModalSkeleton({}: Props) {
  return (
    <Container>
      <SkeletonText mt={6} mx={-4} noOfLines={1} skeletonHeight={8} />
      <SkeletonText
        mt={8}
        mx={-4}
        noOfLines={4}
        skeletonHeight={4}
        spacing={1}
      />
      <HStack ml={-4} mt={3}>
        <Skeleton height="26px" width="60px" borderRadius="lg" />
        <Skeleton height="26px" width="100px" borderRadius="lg" />
        <Skeleton height="26px" width="100px" borderRadius="lg" />
        <Skeleton height="26px" width="100px" borderRadius="lg" />
        <Skeleton height="26px" width="60px" borderRadius="lg" />
      </HStack>
      <Skeleton mt={4} mx={-4} height="300px" borderRadius="lg" />
      <SkeletonText
        mt={5}
        mx={-4}
        width="150px"
        noOfLines={1}
        skeletonHeight={6}
      />
      <Skeleton mt={4} mx={-4} height="210px" borderRadius="lg" />
    </Container>
  );
}

export default RecipeModalSkeleton;
