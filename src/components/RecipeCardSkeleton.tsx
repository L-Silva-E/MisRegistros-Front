import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

type Props = {};

function RecipeCardSkeleton({}: Props) {
  return (
    <Card boxShadow="lg">
      <CardBody>
        <Skeleton mt={2} mx={2} height="300px" borderRadius="lg" />
        <SkeletonText mt={5} mx={2} noOfLines={1} skeletonHeight="5" />
        <SkeletonText mt={3} mx={2} noOfLines={1} skeletonHeight="4" />
      </CardBody>
      <CardFooter pt="0">
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Skeleton
            mt={1}
            mb={2}
            mx={2}
            height="40px"
            width="111px"
            borderRadius="lg"
          />
          <Skeleton
            mt={1}
            mb={2}
            mx={2}
            height="40px"
            width="61px"
            borderRadius="lg"
          />
        </Flex>
      </CardFooter>
    </Card>
  );
}

export default RecipeCardSkeleton;
