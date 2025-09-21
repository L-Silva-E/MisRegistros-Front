import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

import useAxios from "../../../shared/hooks/axiosFetch";

import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";

const getErrorMessage = (error: any): string => {
  if (error?.response?.data) {
    const responseData = error.response.data;

    if (
      responseData.data?.validations &&
      responseData.data.validations.length > 0
    ) {
      if (responseData.data.validations.length === 1) {
        return responseData.data.validations[0].message;
      } else {
        return responseData.data.validations
          .map((validation: any) => validation.message)
          .join(". ");
      }
    }

    if (responseData.validations && responseData.validations.length > 0) {
      if (responseData.validations.length === 1) {
        return responseData.validations[0].message;
      } else {
        return responseData.validations
          .map((validation: any) => validation.message)
          .join(". ");
      }
    }

    if (responseData.data?.details) return responseData.data.details;
    if (responseData.details) return responseData.details;
    if (responseData.data?.error) return responseData.data.error;
    if (responseData.message) return responseData.message;
    if (responseData.error) return responseData.error;
  }

  return error?.message || "Error desconocido";
};

interface Category {
  id: number;
  name: string;
  usageCount?: number;
}

interface Origin {
  id: number;
  name: string;
  usageCount?: number;
}

interface Ingredient {
  id: number;
  name: string;
  unit: string;
  usageCount?: number;
}

interface MetadataWithUsage {
  categories: Category[];
  origins: Origin[];
  ingredients: Ingredient[];
}

type MetaDataItem = Category | Origin | Ingredient;
type MetaDataType = "category" | "origin" | "ingredient";

const DataTable = React.memo<{
  data: MetaDataItem[];
  type: MetaDataType;
  loading: boolean;
  onEdit: (item: MetaDataItem, type: MetaDataType) => void;
  onDelete: (id: number, type: MetaDataType) => void;
  loadingCrud: boolean;
}>(({ data, type, loading, onEdit, onDelete, loadingCrud }) => {
  const bgColor = useColorModeValue("green.200", "green.800");
  const iconColor = useColorModeValue("#1A202C", "white");

  if (loading) {
    return (
      <Text>
        Cargando{" "}
        {type === "ingredient"
          ? "ingredientes"
          : type === "category"
          ? "categorías"
          : "orígenes"}
        ...
      </Text>
    );
  }

  if (data.length === 0) {
    return (
      <Text>
        No se encontraron{" "}
        {type === "ingredient"
          ? "ingredientes"
          : type === "category"
          ? "categorías"
          : "orígenes"}
      </Text>
    );
  }

  return (
    <TableContainer
      borderRadius="md"
      width="100%"
      overflowY="auto"
      maxHeight="100%"
    >
      <Table size="sm">
        <Thead
          position="sticky"
          top={0}
          zIndex={10}
          bg={bgColor}
          minHeight="60px"
        >
          <Tr>
            <Th>Nombre</Th>
            {type === "ingredient" && (
              <Th width="100px" textAlign="center">
                Unidad
              </Th>
            )}
            <Th width="100px" textAlign="center">
              Acción
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              type={type}
              onEdit={onEdit}
              onDelete={onDelete}
              loadingCrud={loadingCrud}
              iconColor={iconColor}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

const TableRow = React.memo<{
  item: MetaDataItem;
  type: MetaDataType;
  onEdit: (item: MetaDataItem, type: MetaDataType) => void;
  onDelete: (id: number, type: MetaDataType) => void;
  loadingCrud: boolean;
  iconColor: string;
}>(({ item, type, onEdit, onDelete, loadingCrud, iconColor }) => {
  const countTextColor = useColorModeValue("gray.500", "gray.400");

  const handleEdit = useCallback(() => {
    onEdit(item, type);
  }, [item, type, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(item.id, type);
  }, [item.id, type, onDelete]);

  const usageCount = "usageCount" in item ? item.usageCount || 0 : 0;

  return (
    <Tr>
      <Td>
        {item.name}{" "}
        <Text
          as="sub"
          sx={{
            color: countTextColor + " !important",
            fontSize: "xs",
          }}
          fontWeight="normal"
        >
          ({usageCount})
        </Text>
      </Td>
      {type === "ingredient" && "unit" in item && (
        <Td textAlign="center">{item.unit}</Td>
      )}
      <Td>
        <Flex gap={2} justifyContent="right">
          <Button
            variant="editButton"
            size="sm"
            height="25px"
            onClick={handleEdit}
          >
            <FaPencilAlt color={iconColor} />
          </Button>
          <Button
            variant="deleteButton"
            size="sm"
            height="25px"
            onClick={handleDelete}
            isLoading={loadingCrud}
          >
            <FaTrash color={iconColor} />
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
});

const RecipeMetaPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<MetaDataItem | null>(null);
  const [currentType, setCurrentType] = useState<MetaDataType>("category");

  const countTextColor = useColorModeValue("gray.500", "gray.400");

  const [itemUnit, setItemUnit] = useState("");
  const availableUnits = [
    "mg",
    "g",
    "kg",
    "ml",
    "cl",
    "l",
    "u",
    "tsp",
    "tbsp",
    "cup",
    "pinch",
  ];

  const [itemName, setItemName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const {
    loading: loadingMetadata,
    data: metadataData,
    error: metadataError,
    axiosFetch: axiosFetchMetadata,
  } = useAxios<MetadataWithUsage>();

  const {
    loading: loadingCrud,
    error: crudError,
    axiosFetch: performCrudOperation,
  } = useAxios<any>();

  const {
    loading: loadingSave,
    data: saveData,
    error: saveError,
    axiosFetch: performSaveOperation,
  } = useAxios<any>();

  useEffect(() => {
    axiosFetchMetadata(
      HTTP_METHODS.GET,
      `${API_BASE_URL}/metadata/usage-count`
    );
  }, []);

  useEffect(() => {
    if (metadataData) {
      setCategories(metadataData.categories || []);
      setOrigins(metadataData.origins || []);
      setIngredients(metadataData.ingredients || []);
    }
  }, [metadataData]);

  useEffect(() => {
    if (metadataError) {
      toast({
        title: "Error al cargar metadatos",
        description: getErrorMessage(metadataError),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [metadataError, toast]);

  useEffect(() => {
    if (crudError) {
      toast({
        title: "Error al realizar la operación",
        description: getErrorMessage(crudError),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [crudError, toast]);

  useEffect(() => {
    if (saveError) {
      toast({
        title: "Error al guardar",
        description: getErrorMessage(saveError),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [saveError, toast]);

  useEffect(() => {
    if (saveData !== undefined && !saveError) {
      axiosFetchMetadata(
        HTTP_METHODS.GET,
        `${API_BASE_URL}/metadata/usage-count`
      );

      toast({
        title: "Éxito",
        description: `${
          currentType === "category"
            ? "Categoría"
            : currentType === "origin"
            ? "Origen"
            : "Ingrediente"
        } ${isEditing ? "actualizado" : "creado"} correctamente`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    }
  }, [
    saveData,
    saveError,
    currentType,
    isEditing,
    axiosFetchMetadata,
    toast,
    onClose,
  ]);

  const handleAddNew = useCallback(
    (type: MetaDataType) => {
      setIsEditing(false);
      setCurrentType(type);
      setCurrentItem(null);
      setItemName("");

      if (type === "ingredient") {
        setItemUnit("u");
      }

      onOpen();
    },
    [onOpen]
  );

  const handleEdit = useCallback(
    (item: MetaDataItem, type: MetaDataType) => {
      setIsEditing(true);
      setCurrentType(type);
      setCurrentItem(item);
      setItemName(item.name);

      if (type === "ingredient" && "unit" in item) {
        setItemUnit(item.unit);
      }

      onOpen();
    },
    [onOpen]
  );

  const handleDelete = useCallback(
    async (id: number, type: MetaDataType) => {
      const endpoint =
        type === "category"
          ? "category"
          : type === "origin"
          ? "origin"
          : "ingredient";

      await performCrudOperation(
        HTTP_METHODS.DELETE,
        `${API_BASE_URL}/${endpoint}/${id}`
      );

      axiosFetchMetadata(
        HTTP_METHODS.GET,
        `${API_BASE_URL}/metadata/usage-count`
      );

      toast({
        title: "Éxito",
        description: `${
          type === "category"
            ? "Categoría"
            : type === "origin"
            ? "Origen"
            : "Ingrediente"
        } eliminado correctamente`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [performCrudOperation, axiosFetchMetadata, toast]
  );

  const handleSave = async () => {
    if (!itemName.trim()) {
      toast({
        title: "Error",
        description: "El nombre no puede estar vacío",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const endpoint =
      currentType === "category"
        ? "category"
        : currentType === "origin"
        ? "origin"
        : "ingredient";

    const method = isEditing ? HTTP_METHODS.PATCH : HTTP_METHODS.POST;

    const url = isEditing
      ? `${API_BASE_URL}/${endpoint}/${currentItem?.id}`
      : `${API_BASE_URL}/${endpoint}`;

    const data =
      currentType === "ingredient"
        ? { name: itemName, unit: itemUnit }
        : { name: itemName };

    await performSaveOperation(method, url, data);
  };

  const modalTitle = useMemo(() => {
    const action = isEditing ? "Editar" : "Crear";
    const entityType =
      currentType === "category"
        ? "Categoría"
        : currentType === "origin"
        ? "Origen"
        : "Ingrediente";
    return `${action} ${entityType}`;
  }, [isEditing, currentType]);

  return (
    <Box height="100%">
      <Heading mb={4} size="lg">
        Administrar
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} height="calc(100% - 60px)">
        {/* Ingredientes */}
        <GridItem height="100%" overflow="hidden">
          <Card height="100%" display="flex" flexDirection="column">
            <CardHeader mb={-4}>
              <Flex justify="space-between" align="center">
                <Heading size="md" mx={2}>
                  Ingredientes
                </Heading>
                <Text
                  as="sub"
                  sx={{
                    color: countTextColor + " !important",
                    fontSize: "sm",
                  }}
                >
                  ({ingredients.length})
                </Text>
                <Spacer />
                <Button
                  variant="greenButton"
                  onClick={() => handleAddNew("ingredient")}
                  isLoading={loadingMetadata}
                >
                  Agregar
                </Button>
              </Flex>
            </CardHeader>
            <CardBody overflowY="auto" height="calc(100% - 60px)" px={2}>
              <DataTable
                data={ingredients}
                type="ingredient"
                loading={loadingMetadata}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loadingCrud={loadingCrud}
              />
            </CardBody>
          </Card>
        </GridItem>

        {/* Categorías */}
        <GridItem height="100%" mb={7} overflow="hidden">
          <Card height="100%" display="flex" flexDirection="column">
            <CardHeader mb={-4}>
              <Flex justify="space-between" align="center">
                <Heading size="md" mx={2}>
                  Categorías
                </Heading>
                <Text
                  as="sub"
                  sx={{
                    color: countTextColor + " !important",
                    fontSize: "sm",
                  }}
                >
                  ({categories.length})
                </Text>
                <Spacer />
                <Button
                  variant="greenButton"
                  onClick={() => handleAddNew("category")}
                  isLoading={loadingMetadata}
                >
                  Agregar
                </Button>
              </Flex>
            </CardHeader>
            <CardBody overflowY="auto" height="calc(100% - 60px)" px={2}>
              <DataTable
                data={categories}
                type="category"
                loading={loadingMetadata}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loadingCrud={loadingCrud}
              />
            </CardBody>
          </Card>
        </GridItem>

        {/* Orígenes */}
        <GridItem height="100%" overflow="hidden">
          <Card height="100%" display="flex" flexDirection="column">
            <CardHeader mb={-4}>
              <Flex justify="space-between" align="center">
                <Heading size="md" mx={2}>
                  Orígen
                </Heading>
                <Text
                  as="sub"
                  sx={{
                    color: countTextColor + " !important",
                    fontSize: "sm",
                  }}
                >
                  ({origins.length})
                </Text>
                <Spacer />
                <Button
                  variant="greenButton"
                  onClick={() => handleAddNew("origin")}
                  isLoading={loadingMetadata}
                >
                  Agregar
                </Button>
              </Flex>
            </CardHeader>
            <CardBody overflowY="auto" height="calc(100% - 60px)" px={2}>
              <DataTable
                data={origins}
                type="origin"
                loading={loadingMetadata}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loadingCrud={loadingCrud}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Modal optimizado */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={currentType === "ingredient" ? 4 : 0}>
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Ingrese nombre"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </FormControl>

            {currentType === "ingredient" && (
              <FormControl>
                <FormLabel>Unidad</FormLabel>
                <Select
                  value={itemUnit}
                  onChange={(e) => setItemUnit(e.target.value)}
                >
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="redButton" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="greenButton"
              onClick={handleSave}
              isLoading={loadingSave}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RecipeMetaPage;
