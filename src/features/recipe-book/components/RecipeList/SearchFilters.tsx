import { memo } from "react";
import { useForm } from "react-hook-form";
import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

import { Category, Origin } from "../../types";
import { SearchForm } from "../../../../shared/types/searchForm";

interface SearchFiltersProps {
  filterRecipe: SearchForm;
  selectedCategory: Category;
  selectedOrigin: Origin;
  sortBy: string;
  sortDirection: "asc" | "desc";
  categories: Category[];
  origins: Origin[];
  loadingCategories: boolean;
  loadingOrigins: boolean;
  defaultCategory: Category;
  defaultOrigin: Origin;
  onSearchSubmit: (data: SearchForm) => void;
  onCategoryChange: (category: Category) => void;
  onOriginChange: (origin: Origin) => void;
  onSortChange: (sortBy: string) => void;
  onSortDirectionToggle: () => void;
}

const SearchFilters = memo(
  ({
    filterRecipe,
    selectedCategory,
    selectedOrigin,
    sortBy,
    sortDirection,
    categories,
    origins,
    loadingCategories,
    loadingOrigins,
    defaultCategory,
    defaultOrigin,
    onSearchSubmit,
    onCategoryChange,
    onOriginChange,
    onSortChange,
    onSortDirectionToggle,
  }: SearchFiltersProps) => {
    const { register, handleSubmit } = useForm<SearchForm>();

    return (
      <HStack mt="4" mb="8" gap="25px">
        <form onSubmit={handleSubmit(onSearchSubmit)}>
          {/* //TODO: Solucionar problema con el fondo cuando tiene texto */}
          <InputGroup
            backgroundColor={filterRecipe.searchText ? "green.800" : "inherit"}
          >
            <InputLeftElement pointerEvents="none" color="gray.500">
              <FaSearch />
            </InputLeftElement>
            <Input
              type="text"
              width="250px"
              placeholder="Nombre de la Receta"
              autoComplete="off"
              {...register("searchText", { required: false })}
            />
          </InputGroup>
        </form>

        <Select
          placeholder="Categoría"
          value={selectedCategory.name || ""}
          onChange={(e) =>
            onCategoryChange(
              categories?.find(
                (category) => category.name === e.target.value
              ) || defaultCategory
            )
          }
          variant={selectedCategory.id === 0 ? "" : "selected"}
        >
          {loadingCategories && (
            <option value="emptyCategory">Cargando...</option>
          )}
          {!loadingCategories &&
            categories?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </Select>

        <Select
          placeholder="Origen"
          value={selectedOrigin.name || ""}
          onChange={(e) =>
            onOriginChange(
              origins?.find((origin) => origin.name === e.target.value) ||
                defaultOrigin
            )
          }
          variant={selectedOrigin.id === 0 ? "" : "selected"}
        >
          {loadingOrigins && <option value="emptyOrigin">Cargando...</option>}
          {!loadingOrigins &&
            origins?.map((origin) => (
              <option key={origin.id} value={origin.name}>
                {origin.name}
              </option>
            ))}
        </Select>

        <Select
          placeholder="Orden"
          value={sortBy}
          variant={sortBy === "" ? "" : "selected"}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="id">Id</option>
          <option value="name">Nombre</option>
          <option value="score">Mejor Valoradas</option>
          <option value="createdAt">Fecha Creación</option>
        </Select>

        <IconButton
          aria-label="Toggle sort direction"
          ml={-5}
          backgroundColor={
            sortDirection === "asc"
              ? "inherit"
              : useColorModeValue("green.50", "green.800")
          }
          borderColor={
            sortDirection === "asc"
              ? useColorModeValue("blackAlpha.400", "whiteAlpha.400")
              : useColorModeValue("green.200", "green.700")
          }
          borderWidth={2}
          icon={
            sortDirection === "asc" ? (
              <FaSortAlphaDown
                size={24}
                color={useColorModeValue("#48BB78", "#38A169")}
              />
            ) : (
              <FaSortAlphaDownAlt
                size={24}
                color={useColorModeValue("#2F855A", "#9AE6B4")}
              />
            )
          }
          _hover={{
            borderColor: useColorModeValue("green.500", "green.400"),
          }}
          onClick={onSortDirectionToggle}
        />
      </HStack>
    );
  }
);

SearchFilters.displayName = "SearchFilters";

export { SearchFilters };
