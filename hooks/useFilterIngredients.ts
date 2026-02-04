import { Api } from "@/services/api-client"
import { Ingredient } from "@/src/generated"
import { useEffect, useState } from "react"

interface ReturnIngredientProps {
    ingredients: Ingredient[]
}
export const useFilterIngredients = (): ReturnIngredientProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients);
                return ingredients;
            }
            catch (err) {
                console.error('Error fetching ingredients:', err);
            }
        }
        fetchIngredients();
    }, [])

    return {ingredients};
}