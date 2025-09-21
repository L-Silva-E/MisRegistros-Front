import {
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Wrap,
  WrapItem,
  BoxProps,
} from "@chakra-ui/react";
import { TagData, RecipeTagsProps } from "./types";

const RecipeTags = ({
  tags,
  size = "md",
  spacing = 3,
  wrap = false,
  ...boxProps
}: RecipeTagsProps & BoxProps) => {
  const renderTag = (tag: TagData, index: number) => (
    <Tag key={index} colorScheme={tag.colorScheme || "gray"} size={size}>
      <TagLeftIcon boxSize={tag.iconSize || "16px"} as={tag.icon} />
      <TagLabel mr="2px" my="5px">
        {tag.label}
      </TagLabel>
    </Tag>
  );

  if (wrap) {
    return (
      <Wrap spacing={spacing} {...boxProps}>
        {tags.map((tag, index) => (
          <WrapItem key={index}>{renderTag(tag, index)}</WrapItem>
        ))}
      </Wrap>
    );
  }

  return (
    <HStack spacing={spacing} {...boxProps}>
      {tags.map(renderTag)}
    </HStack>
  );
};

export default RecipeTags;
