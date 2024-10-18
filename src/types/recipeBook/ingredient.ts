export type IngredientDetail = {
  id: number;
  name: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

export type Ingredient = {
  quantity: number;
  ingredient: {
    id: string;
    name: string;
    unit: string;
  };
};
