import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

type Props = {};

function RecipeCardSkeleton({}: Props) {
  return (
    <Card boxShadow="lg" bgColor="gray.500">
      <CardBody>
        <Skeleton height="200px" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="4" />
      </CardBody>
    </Card>
  );
}

export default RecipeCardSkeleton;
