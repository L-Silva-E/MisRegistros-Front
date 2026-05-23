import { Grid, GridItem, VStack } from "@chakra-ui/react";

import { useRecipeForm } from "./useRecipeForm";
import BasicInfoSection from "./sections/BasicInfoSection";
import MetadataSection from "./sections/MetadataSection";
import StepsSection from "./sections/StepsSection";
import IngredientsSection from "./sections/IngredientsSection";
import {
  RecipeFormProps,
  RecipeFormData,
  RecipeFormSubmissionData,
} from "./types";

const RecipeForm = ({ initialData, onSubmit }: RecipeFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    thumbnailFile,
    setThumbnailFile,
    existingThumbnailUrl,
    selectedCategory,
    setSelectedCategory,
    selectedOrigin,
    setSelectedOrigin,
    categories,
    origins,
    isLoadingCategories,
    isLoadingOrigins,
    ingredients,
    setIngredients,
    availableIngredients,
    isLoadingIngredients,
  } = useRecipeForm(initialData);

  const handleFormSubmit = async (data: RecipeFormData) => {
    const formDataWithMetadata: RecipeFormSubmissionData = {
      ...data,
      selectedCategory,
      selectedOrigin,
      ingredients,
      thumbnailFile,
    };
    await onSubmit(formDataWithMetadata);
  };

  return (
    <form id="recipe-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <VStack align="stretch" spacing={6}>
            <BasicInfoSection
              register={register}
              errors={errors}
              thumbnailFile={thumbnailFile}
              setThumbnailFile={setThumbnailFile}
              existingThumbnailUrl={existingThumbnailUrl}
            />

            <MetadataSection
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              categories={categories}
              origins={origins}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedOrigin={selectedOrigin}
              setSelectedOrigin={setSelectedOrigin}
              isLoadingCategories={isLoadingCategories}
              isLoadingOrigins={isLoadingOrigins}
            />

            <StepsSection register={register} errors={errors} />
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="stretch" spacing={4}>
            <IngredientsSection
              ingredients={ingredients}
              setIngredients={setIngredients}
              availableIngredients={availableIngredients}
              isLoadingIngredients={isLoadingIngredients}
            />
          </VStack>
        </GridItem>
      </Grid>
    </form>
  );
};

export default RecipeForm;
