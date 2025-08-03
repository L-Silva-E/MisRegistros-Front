import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Recipe,
  Category,
  Origin,
  IngredientDetail,
} from "../../../../features/recipe-book/types";

export interface RecipeFormData {
  name: string;
  description: string;
  thumbnail?: string;
  score: string;
  time: string;
  servings: number;
  steps: string;
  selectedCategory?: Category;
  selectedOrigin?: Origin;
  ingredients?: IngredientFormData[];
}

export interface BasicInfoSectionProps {
  register: UseFormRegister<RecipeFormData>;
  errors?: FieldErrors<RecipeFormData>;
}

export interface MetadataSectionProps {
  register: UseFormRegister<RecipeFormData>;
  setValue: UseFormSetValue<RecipeFormData>;
  watch: UseFormWatch<RecipeFormData>;
  errors?: FieldErrors<RecipeFormData>;
  categories: Category[];
  origins: Origin[];
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  selectedOrigin: Origin;
  setSelectedOrigin: (origin: Origin) => void;
  isLoadingCategories?: boolean;
  isLoadingOrigins?: boolean;
}

export interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (data: RecipeFormSubmissionData) => Promise<void>;
}

export interface RecipeFormButtonsProps {
  submitButtonText?: string;
  cancelAction?: () => void;
  isLoading?: boolean;
  formId?: string;
}

export interface IngredientsSectionProps {
  ingredients: IngredientFormData[];
  setIngredients: (ingredients: IngredientFormData[]) => void;
  availableIngredients: IngredientDetail[];
  isLoadingIngredients?: boolean;
}

export interface StepsSectionProps {
  register: UseFormRegister<RecipeFormData>;
  errors?: FieldErrors<RecipeFormData>;
}

export interface IngredientFormData {
  id: string;
  quantity: string;
}

export interface RecipeFormSubmissionData extends RecipeFormData {
  selectedCategory: Category;
  selectedOrigin: Origin;
  ingredients: IngredientFormData[];
}
