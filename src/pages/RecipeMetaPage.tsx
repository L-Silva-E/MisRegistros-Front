import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useColorModeValue,
  useToast,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { API_BASE_URL } from "../constants/environment";
import { HTTP_METHODS } from "../constants/httpMethods";
import useAxios from "../hooks/axiosFetch";

interface Category {
  id: number;
  name: string;
}

interface Origin {
  id: number;
  name: string;
}

interface Ingredient {
  id: number;
  name: string;
  unit: string;
}

// Tipo union para los items
type MetaDataItem = Category | Origin | Ingredient;
type MetaDataType = "category" | "origin" | "ingredient";

// Componente optimizado para cada tabla
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
      // position="relative"
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

// Componente optimizado para cada fila
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

  return (
    <Tr>
      <Td>{item.name}</Td>
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

  const [itemUnit, setItemUnit] = useState("kg");
  const availableUnits = [
    "kg",
    "g",
    "l",
    "ml",
    "unidad",
    "cucharada",
    "cucharadita",
    "taza",
  ];

  const [itemName, setItemName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const {
    loading: loadingCategories,
    data: categoriesData,
    error: categoriesError,
    axiosFetch: axiosFetchCategories,
  } = useAxios<Category[]>();

  const {
    loading: loadingOrigins,
    data: originsData,
    error: originsError,
    axiosFetch: axiosFetchOrigins,
  } = useAxios<Origin[]>();

  const {
    loading: loadingIngredients,
    data: ingredientsData,
    error: ingredientsError,
    axiosFetch: axiosFetchIngredients,
  } = useAxios<Ingredient[]>();

  const {
    loading: loadingCrud,
    error: crudError,
    axiosFetch: performCrudOperation,
  } = useAxios<any>();

  useEffect(() => {
    axiosFetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
    axiosFetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
    axiosFetchIngredients(HTTP_METHODS.GET, `${API_BASE_URL}/ingredient`);
  }, []);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (originsData) {
      setOrigins(originsData);
    }
  }, [originsData]);

  useEffect(() => {
    if (ingredientsData) {
      setIngredients(ingredientsData);
    }
  }, [ingredientsData]);

  useEffect(() => {
    if (categoriesError) {
      toast({
        title: "Error al cargar categorías",
        description: categoriesError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [categoriesError, toast]);

  useEffect(() => {
    if (originsError) {
      toast({
        title: "Error al cargar orígenes",
        description: originsError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [originsError, toast]);

  useEffect(() => {
    if (ingredientsError) {
      toast({
        title: "Error al cargar ingredientes",
        description: ingredientsError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [ingredientsError, toast]);

  useEffect(() => {
    if (crudError) {
      toast({
        title: "Error al realizar la operación",
        description: crudError.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [crudError, toast]);

  const handleAddNew = useCallback(
    (type: MetaDataType) => {
      setIsEditing(false);
      setCurrentType(type);
      setCurrentItem(null);
      setItemName("");

      if (type === "ingredient") {
        setItemUnit("kg");
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

      // Refrescar datos
      if (type === "category") {
        axiosFetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
      } else if (type === "origin") {
        axiosFetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
      } else {
        axiosFetchIngredients(HTTP_METHODS.GET, `${API_BASE_URL}/ingredient`);
      }

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
    [
      performCrudOperation,
      axiosFetchCategories,
      axiosFetchOrigins,
      axiosFetchIngredients,
      toast,
    ]
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

    await performCrudOperation(method, url, data);

    if (currentType === "category") {
      axiosFetchCategories(HTTP_METHODS.GET, `${API_BASE_URL}/category`);
    } else if (currentType === "origin") {
      axiosFetchOrigins(HTTP_METHODS.GET, `${API_BASE_URL}/origin`);
    } else {
      axiosFetchIngredients(HTTP_METHODS.GET, `${API_BASE_URL}/ingredient`);
    }

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
    <Box p={5} height="100%">
      <Heading mb={4} ml={2}>
        Administrar
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} height="calc(100% - 60px)">
        {/* Ingredientes */}
        <GridItem height="100%" overflow="hidden">
          <Card height="100%" display="flex" flexDirection="column">
            <CardHeader mb={-4}>
              <Flex justify="space-between" align="center">
                <Heading size="md" ml={2}>
                  Ingredientes
                </Heading>
                <Button
                  variant="greenButton"
                  onClick={() => handleAddNew("ingredient")}
                  isLoading={loadingIngredients}
                >
                  Agregar
                </Button>
              </Flex>
            </CardHeader>
            <CardBody overflowY="auto" height="calc(100% - 60px)" px={2}>
              <DataTable
                data={ingredients}
                type="ingredient"
                loading={loadingIngredients}
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
                <Heading size="md" ml={2}>
                  Categorías
                </Heading>
                <Button
                  variant="greenButton"
                  onClick={() => handleAddNew("category")}
                  isLoading={loadingCategories}
                >
                  Agregar
                </Button>
              </Flex>
            </CardHeader>
            <CardBody overflowY="auto" height="calc(100% - 60px)" px={2}>
              <DataTable
                data={categories}
                type="category"
                loading={loadingCategories}
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
                <Heading size="md" ml={2}>
                  Orígen
                </Heading>
                <Button
                  variant="greenButton"
                  onClick={() => handleAddNew("origin")}
                  isLoading={loadingOrigins}
                >
                  Agregar
                </Button>
              </Flex>
            </CardHeader>
            <CardBody overflowY="auto" height="calc(100% - 60px)" px={2}>
              <DataTable
                data={origins}
                type="origin"
                loading={loadingOrigins}
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
              isLoading={loadingCrud}
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
