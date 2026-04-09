import { Cart, CartItem, Ingredient, Product, ProductItem } from "@/src/generated";
export type CartItemDTO=CartItem & {
    productItem:ProductItem & {
        product:Product
    },
    ingredients:Ingredient[]
}
export interface CartDTO extends Cart {
cartItems:CartItemDTO[]
}