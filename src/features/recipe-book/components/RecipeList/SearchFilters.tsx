import { memo } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaMagnifyingGlass,
  FaArrowDownAZ,
  FaArrowDownZA,
  FaXmark,
  FaUser,
} from "react-icons/fa6";

import { Category, Origin } from "../../types";
import { SearchForm } from "../../../../shared/types/searchForm";

interface SearchFiltersProps {
  filterRecipe: SearchForm;
  selectedCategory: Category;
  selectedOrigin: Origin;
  sortBy: string;
  sortDirection: "asc" | "desc";
  onlyMine: boolean;
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
  onToggleOnlyMine: () => void;
  onClearFilters: () => void;
}

const SearchFilters = memo(
  ({
    filterRecipe,
    selectedCategory,
    selectedOrigin,
    sortBy,
    sortDirection,
    onlyMine,
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
    onToggleOnlyMine,
    onClearFilters,
  }: SearchFiltersProps) => {
    const { register, handleSubmit } = useForm<SearchForm>();

    const handleSearchSubmit = (data: SearchForm) => {
      onSearchSubmit(data);
      const input = document.querySelector(
        'input[placeholder="Nombre de la Receta"]',
      ) as HTMLInputElement;
      input?.blur();
    };

    const handleIconClick = () => {
      handleSubmit(handleSearchSubmit)();
    };

    const hasActiveFilters = !!(
      filterRecipe.searchText ||
      selectedCategory.id !== 0 ||
      selectedOrigin.id !== 0 ||
      sortBy !== "" ||
      onlyMine
    );

    const handleClearFilters = () => {
      const input = document.querySelector(
        'input[placeholder="Nombre de la Receta"]',
      ) as HTMLInputElement;
      if (input) {
        input.value = "";
      }

      onClearFilters();
    };

    return (
      <HStack mb={8} gap={6}>
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
          <InputGroup
            _hover={{
              "& .chakra-input": {
                borderColor: "green.500",
              },
              "& .chakra-input__left-element": {
                color: "green.500",
              },
            }}
          >
            <InputLeftElement
              pointerEvents="auto"
              color={
                filterRecipe.searchText
                  ? useColorModeValue("#48BB78", "#38A169")
                  : "gray.500"
              }
              cursor="pointer"
              onClick={handleIconClick}
            >
              <Tooltip
                openDelay={500}
                label="Buscar receta"
                hasArrow
                placement="top"
              >
                <Box display="flex">
                  <FaMagnifyingGlass />
                </Box>
              </Tooltip>
            </InputLeftElement>
            <Input
              type="text"
              width="250px"
              placeholder="Nombre de la Receta"
              autoComplete="off"
              {...register("searchText", { required: false })}
              variant={filterRecipe.searchText ? "filtered" : ""}
            />
          </InputGroup>
        </form>

        <Select
          placeholder="Categoría"
          value={selectedCategory.name || ""}
          onChange={(e) =>
            onCategoryChange(
              categories?.find(
                (category) => category.name === e.target.value,
              ) || defaultCategory,
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
                defaultOrigin,
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

        <Tooltip
          openDelay={500}
          hasArrow
          placement="top"
          label={sortDirection === "asc" ? "Ascendente" : "Descendente"}
          aria-label="My recipes tooltip"
        >
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
                <FaArrowDownAZ
                  size={24}
                  color={useColorModeValue("#48BB78", "#38A169")}
                />
              ) : (
                <FaArrowDownZA
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
        </Tooltip>

        <Tooltip
          openDelay={500}
          hasArrow
          placement="top"
          label={
            onlyMine ? "Mostrar todas las recetas" : "Mostrar solo mis recetas"
          }
          aria-label="My recipes tooltip"
        >
          <IconButton
            aria-label="My recipes"
            backgroundColor={
              onlyMine ? useColorModeValue("green.50", "green.800") : "inherit"
            }
            borderColor={
              onlyMine
                ? useColorModeValue("green.200", "green.700")
                : useColorModeValue("blackAlpha.400", "whiteAlpha.400")
            }
            borderWidth={2}
            icon={
              <FaUser
                size={16}
                color={
                  onlyMine
                    ? useColorModeValue("#2F855A", "#9AE6B4")
                    : useColorModeValue("#48BB78", "#38A169")
                }
              />
            }
            _hover={{
              borderColor: useColorModeValue("green.500", "green.400"),
            }}
            onClick={onToggleOnlyMine}
          />
        </Tooltip>

        <Tooltip
          openDelay={500}
          hasArrow
          placement="top"
          label="Limpiar filtros"
          aria-label="Clear filters tooltip"
        >
          <IconButton
            aria-label="Clean filters"
            icon={<FaXmark size={16} />}
            variant="deleteButtonOutline"
            isDisabled={!hasActiveFilters}
            onClick={handleClearFilters}
          />
        </Tooltip>
      </HStack>
    );
  },
);

SearchFilters.displayName = "SearchFilters";

export { SearchFilters };
