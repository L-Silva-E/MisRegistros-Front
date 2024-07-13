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
  created_at?: string;
  updated_at?: string;
};

export type Origin = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
};

export type Ingredient = {
  quantity: number;
  ingredient: {
    name: string;
    unit: string;
  };
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
  created_at?: string;
  updated_at?: string;
  category?: Category;
  origin?: Category;
  ingredients: Ingredient[];
  steps: Step[];
};

export type RecipeDetail = {
  [key: string]: string;
};
