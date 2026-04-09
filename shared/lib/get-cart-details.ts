import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";

interface ReturnProps {
    cartItems:CartStateItem[],
    totalAmount:number
}
export type CartStateItem= {
    id: number,
    name:string,
    imageUrl:string,
    quantity: number
    ingredients: Array<{name:string, price:number}>,
    price:number,
    pizzaSize?:number|null,
    type?:number|null,

}

export const getCartDetails=(data:CartDTO):ReturnProps=>{
    const mapItems=data.cartItems?.map(item=>({
        id:item.id,
        quantity:item.quantity,
        name:item.productItem.product.name,
        imageUrl:item.productItem.product.imageUrl,
        price:calcCartItemTotalAmount(item),
        pizzaSize:item.productItem.size,
        type:item.productItem.pizzaType,
        ingredients:item.ingredients.map(ingredient=>({
            name:ingredient.name,
            price:ingredient.price
        }))
    }))
    return {
       totalAmount: data.totalAmount,
   cartItems: mapItems ?? []
    }
}