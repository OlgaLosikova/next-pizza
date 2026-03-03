import { Ingredient, Product, ProductItem } from "@/src/generated";

export type ProductWithRelations=Product&{items:ProductItem[]; ingredients:Ingredient[]}