import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalAmount =(item:CartItemDTO)=>{
const ingredientsPrice= item.ingredients.reduce((acc, current)=>acc+current.price,0);
return (ingredientsPrice+item.productItem.price)*item.quantity
}