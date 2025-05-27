import { Category } from "./category";
import { Ingredient } from "./ingredient";
import { Step } from "./step";

export type Recipe = {
  id: number;
  idCategory: number;
  idOrigin: number;
  name: string;
  description: string;
  thumbnail: string;
  score: number;
  time: number;
  servings: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  origin: Category;
  ingredients: Ingredient[];
  steps: Step[];
};

export type RecipeDetail = {
  [key: string]: string;
};
