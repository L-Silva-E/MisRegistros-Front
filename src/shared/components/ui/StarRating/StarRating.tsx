import { useState } from "react";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa6";

import { StarRatingProps } from "./types";

const StarRating = ({ value, onChange }: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);
  const emptyColor = useColorModeValue("gray.300", "gray.600");

  const active = hovered || value;

  return (
    <Flex gap={1} onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          as={star <= active ? FaStar : FaRegStar}
          boxSize={6}
          color={star <= active ? "yellow.400" : emptyColor}
          cursor="pointer"
          transition="color 0.15s"
          onMouseEnter={() => setHovered(star)}
          onClick={() => onChange(star)}
        />
      ))}
    </Flex>
  );
};

export default StarRating;
