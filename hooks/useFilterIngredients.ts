
import { Api } from '@/services/api-client';
import { Ingredient } from '@/src/generated';
import React from 'react';
import { useSet } from 'react-use';

export const useFilterIngredients = (ingredientsIds:string[]=[]) => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);
const [selectedIds, {toggle}]=useSet(new Set<string>(ingredientsIds))

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);
const setSelectedIngredients=(ids:string[])=>{
  ids.forEach(id=>selectedIds.add(id)
  )
}
  return {
    ingredients,
    loading,
    selectedIds,toggle,setSelectedIngredients
  };
};