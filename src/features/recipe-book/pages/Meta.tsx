import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
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
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { FaPenToSquare, FaTrash } from "react-icons/fa6";

import useAxios from "../../../shared/hooks/axiosFetch";

import { API_BASE_URL } from "../../../shared/constants/environment";
import { HTTP_METHODS } from "../../../shared/constants/httpMethods";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";

const MESSAGES = {
  ERROR: {
    LOAD_METADATA: "Error al cargar metadatos",
    CRUD_OPERATION: "Error al realizar la operación",
    SAVE: "Error al guardar",
    DELETE_CONFLICT: "No se puede eliminar",
    EMPTY_NAME: "El nombre no puede estar vacío",
    CONFLICT_DETAIL: "Está siendo usado en al menos una receta.",
    UNKNOWN: "Error desconocido",
  },
  SUCCESS: {
    DELETED: "eliminado correctamente",
    CREATED: "creado correctamente",
    UPDATED: "actualizado correctamente",
  },
  LOADING: {
    INGREDIENTS: "Cargando ingredientes...",
    CATEGORIES: "Cargando categorías...",
    ORIGINS: "Cargando orígenes...",
  },
  NOT_FOUND: {
    INGREDIENTS: "No se encontraron ingredientes",
    CATEGORIES: "No se encontraron categorías",
    ORIGINS: "No se encontraron orígenes",
  },
};

const getEntityName = (type: MetaDataType) => {
  switch (type) {
    case "category":
      return "Categoría";
    case "origin":
      return "Origen";
    case "ingredient":
      return "Ingrediente";
    default:
      return "";
  }
};

const isAxiosError = (error: any): error is { response?: { data?: any } } => {
  return error && typeof error === "object" && "response" in error;
};

const getErrorMessage = (error: any): string => {
  if (isAxiosError(error) && error.response?.data) {
    const responseData = error.response.data;

    if (responseData.error === "Conflict" && responseData.details) {
      return MESSAGES.ERROR.CONFLICT_DETAIL;
    }

    const validations =
      responseData.data?.validations || responseData.validations;
    if (validations && validations.length > 0) {
      return validations.length === 1
        ? validations[0].message
        : validations.map((v: any) => v.message).join(". ");
    }

    return (
      responseData.data?.details ||
      responseData.details ||
      responseData.data?.error ||
      responseData.message ||
      responseData.error ||
      MESSAGES.ERROR.UNKNOWN
    );
  }

  return error?.message || MESSAGES.ERROR.UNKNOWN;
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

const useMetadataOperations = () => {
  const toast = useToast();
  const deleteContextRef = useRef<{
    type: MetaDataType;
    itemName: string;
  } | null>(null);

  const saveContextRef = useRef<{
    type: MetaDataType;
    isEditing: boolean;
  } | null>(null);

  const {
    loading: loadingMetadata,
    data: metadataData,
    error: metadataError,
    axiosFetch: fetchMetadata,
  } = useAxios<MetadataWithUsage>();

  const {
    loading: loadingCrud,
    data: crudData,
    error: crudError,
    axiosFetch: performCrudOperation,
  } = useAxios<any>();

  const {
    loading: loadingSave,
    data: saveData,
    error: saveError,
    axiosFetch: performSaveOperation,
  } = useAxios<any>();

  const refreshMetadata = useCallback(() => {
    fetchMetadata(HTTP_METHODS.GET, `${API_BASE_URL}/metadata/usage-count`);
  }, [fetchMetadata]);

  useEffect(() => {
    if (crudError) {
      const errorMessage = getErrorMessage(crudError);
      const isConflictError =
        isAxiosError(crudError) &&
        crudError?.response?.data?.error === "Conflict";

      toast({
        title: isConflictError
          ? MESSAGES.ERROR.DELETE_CONFLICT
          : MESSAGES.ERROR.CRUD_OPERATION,
        description: errorMessage,
        status: "error",
        duration: isConflictError ? 6000 : 5000,
        isClosable: true,
      });

      deleteContextRef.current = null;
    }
  }, [crudError, toast]);

  useEffect(() => {
    if (deleteContextRef.current && crudData !== undefined && !crudError) {
      refreshMetadata();

      toast({
        title: "Éxito",
        description: `${getEntityName(deleteContextRef.current.type)} ${
          MESSAGES.SUCCESS.DELETED
        }`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      deleteContextRef.current = null;
    }
  }, [crudData, crudError, refreshMetadata, toast]);

  useEffect(() => {
    if (saveError) {
      toast({
        title: MESSAGES.ERROR.SAVE,
        description: getErrorMessage(saveError),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [saveError, toast]);

  useEffect(() => {
    if (metadataError) {
      toast({
        title: MESSAGES.ERROR.LOAD_METADATA,
        description: getErrorMessage(metadataError),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [metadataError, toast]);

  return {
    // Estados
    loadingMetadata,
    loadingCrud,
    loadingSave,
    metadataData,
    saveData,
    saveError,
    // Funciones
    refreshMetadata,
    performCrudOperation,
    performSaveOperation,
    deleteContextRef,
    saveContextRef,
  };
};

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
        {type === "ingredient"
          ? MESSAGES.LOADING.INGREDIENTS
          : type === "category"
            ? MESSAGES.LOADING.CATEGORIES
            : MESSAGES.LOADING.ORIGINS}
      </Text>
    );
  }

  if (data.length === 0) {
    return (
      <Text>
        {type === "ingredient"
          ? MESSAGES.NOT_FOUND.INGREDIENTS
          : type === "category"
            ? MESSAGES.NOT_FOUND.CATEGORIES
            : MESSAGES.NOT_FOUND.ORIGINS}
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
              <Th width="50px" fontSize={10} textAlign="center">
                Unidad
              </Th>
            )}
            <Th width="50px" textAlign="center">
              Usos
            </Th>
            <Th width="50px" textAlign="center">
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
  const handleEdit = useCallback(() => {
    onEdit(item, type);
  }, [item, type, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(item.id, type);
  }, [item.id, type, onDelete]);

  const usageCount = "usageCount" in item ? item.usageCount || 0 : 0;

  return (
    <Tr>
      <Td>{item.name}</Td>
      {type === "ingredient" && "unit" in item && (
        <Td textAlign="center">{item.unit}</Td>
      )}
      <Td textAlign="center">{usageCount}</Td>
      <Td>
        <Flex gap={2} justifyContent="center">
          <Button
            variant="editButton"
            size="sm"
            height="25px"
            onClick={handleEdit}
          >
            <FaPenToSquare color={iconColor} />
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
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<MetaDataItem | null>(null);
  const [currentType, setCurrentType] = useState<MetaDataType>("category");

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
    loadingMetadata,
    loadingCrud,
    loadingSave,
    metadataData,
    saveData,
    saveError,
    refreshMetadata,
    performCrudOperation,
    performSaveOperation,
    deleteContextRef,
    saveContextRef,
  } = useMetadataOperations();

  useEffect(() => {
    refreshMetadata();
  }, [refreshMetadata]);

  useEffect(() => {
    if (metadataData) {
      setCategories(metadataData.categories || []);
      setOrigins(metadataData.origins || []);
      setIngredients(metadataData.ingredients || []);
    }
  }, [metadataData]);

  useEffect(() => {
    if (saveContextRef.current && saveData !== undefined && !saveError) {
      const { type, isEditing: wasEditing } = saveContextRef.current;
      saveContextRef.current = null;
      refreshMetadata();

      toast({
        title: "Éxito",
        description: `${getEntityName(type)} ${
          wasEditing ? MESSAGES.SUCCESS.UPDATED : MESSAGES.SUCCESS.CREATED
        }`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    }
  }, [saveData, saveError, refreshMetadata, toast, onClose]);

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
    [onOpen],
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
    [onOpen],
  );

  const handleDelete = useCallback(
    async (id: number, type: MetaDataType) => {
      const endpoint =
        type === "category"
          ? "category"
          : type === "origin"
            ? "origin"
            : "ingredient";

      let itemName = "";
      if (type === "category") {
        itemName = categories.find((c) => c.id === id)?.name || "";
      } else if (type === "origin") {
        itemName = origins.find((o) => o.id === id)?.name || "";
      } else {
        itemName = ingredients.find((i) => i.id === id)?.name || "";
      }

      deleteContextRef.current = { type, itemName };

      await performCrudOperation(
        HTTP_METHODS.DELETE,
        `${API_BASE_URL}/${endpoint}/${id}`,
      );
    },
    [performCrudOperation, categories, origins, ingredients],
  );

  const handleSave = async () => {
    if (!itemName.trim()) {
      toast({
        title: "Error",
        description: MESSAGES.ERROR.EMPTY_NAME,
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

    saveContextRef.current = { type: currentType, isEditing };
    await performSaveOperation(method, url, data);
  };

  const modalTitle = useMemo(() => {
    const action = isEditing ? "Editar" : "Crear";
    return `${action} ${getEntityName(currentType)}`;
  }, [isEditing, currentType]);

  return (
    <Box height="100%">
      <Flex mb={4} justify="space-between" align="center">
        <Heading size="lg">Administrar listas</Heading>

        <Tooltip
          openDelay={500}
          label="Volver al recetario"
          hasArrow
          placement="top"
        >
          <Button onClick={() => navigate("/recipes")} variant="redButton">
            <FaArrowLeft />
          </Button>
        </Tooltip>
      </Flex>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} height="calc(100% - 60px)">
        {/* Ingredientes */}
        <GridItem height="100%" overflow="hidden">
          <Card height="100%" display="flex" flexDirection="column">
            <CardHeader mb={-4}>
              <Flex justify="space-between" align="center">
                <Heading size="md" mx={2}>
                  Ingredientes
                </Heading>
                <Tag>{ingredients.length}</Tag>
                <Spacer />
                <Tooltip
                  openDelay={500}
                  hasArrow
                  placement="top"
                  label="Crear ingrediente"
                  aria-label="Create Ingredient"
                >
                  <IconButton
                    px={4}
                    aria-label="Create Ingredient"
                    icon={<FaPlus />}
                    variant="greenButton"
                    onClick={() => handleAddNew("ingredient")}
                    isLoading={loadingMetadata}
                  />
                </Tooltip>
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
                <Tag>{categories.length}</Tag>
                <Spacer />
                <Tooltip
                  openDelay={500}
                  hasArrow
                  placement="top"
                  label="Crear categoría"
                  aria-label="Create Category"
                >
                  <IconButton
                    px={4}
                    aria-label="Create Category"
                    icon={<FaPlus />}
                    variant="greenButton"
                    onClick={() => handleAddNew("category")}
                    isLoading={loadingMetadata}
                  />
                </Tooltip>
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
                <Tag>{origins.length}</Tag>
                <Spacer />
                <Tooltip
                  openDelay={500}
                  hasArrow
                  placement="top"
                  label="Crear origen"
                  aria-label="Create Origin"
                >
                  <IconButton
                    px={4}
                    aria-label="Create Origin"
                    icon={<FaPlus />}
                    variant="greenButton"
                    onClick={() => handleAddNew("origin")}
                    isLoading={loadingMetadata}
                  />
                </Tooltip>
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
            <Button
              mr={3}
              variant="greenButton"
              onClick={handleSave}
              isLoading={loadingSave}
            >
              Guardar
            </Button>
            <Button variant="redButton" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RecipeMetaPage;
