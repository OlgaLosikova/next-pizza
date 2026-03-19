import { Ingredient, ProductItem } from "@/src/generated";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const calcTotalPrice = (items: ProductItem[], ingredients: Ingredient[], type: PizzaType, size: PizzaSize, selectedIngredients: Set<number>) => {
    const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;
    const ingredientsPrice = ingredients.filter(ingredient => selectedIngredients.has(ingredient.id)).reduce((acc, item) => acc + item.price, 0)
    return pizzaPrice + ingredientsPrice;
}