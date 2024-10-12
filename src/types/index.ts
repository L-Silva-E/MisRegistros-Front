export type SearchForm = {
  search: string;
};

export type Feature = {
  id: number;
  name: string;
};

export type Category = {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Origin = {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Ingredient = {
  quantity: number;
  ingredient: {
    id: string;
    name: string;
    unit: string;
  };
};

export type IngredientDetail = {
  id: number;
  name: string;
  unit: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Step = {
  number: number;
  instruction: string;
};

export type Recipe = {
  id?: number;
  idCategory: number;
  idOrigin: number;
  name: string;
  description: string;
  score: number;
  thumbnail: string;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  origin?: Category;
  ingredients: Ingredient[];
  steps: Step[];
};

export type RecipeDetail = {
  [key: string]: string;
};
