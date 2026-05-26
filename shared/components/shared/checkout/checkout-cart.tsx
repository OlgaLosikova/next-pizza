import React from 'react'
import WhiteBlock from '../white-block'
import { getCartItemsDetails } from '@/shared/lib/get-cart-items-details'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import CheckoutItem from '../checkout-item'

interface Props {
    items:CartStateItem[];
    onClickUpdateQuantity: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem:(id: number) => void;
    className?:string
}

const CheckoutCart:React.FC<Props> = ({items,onClickUpdateQuantity,removeCartItem,className}) => {
  return (
    <WhiteBlock title="1. Корзина">
                    {items.map(item => <CheckoutItem
                        onClickUpdateQuantity={(type) => onClickUpdateQuantity(item.id, item.quantity, type)}
                        onClickRemove={() => removeCartItem(item.id)} key={item.id}
                        details={getCartItemsDetails(item.type as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)}
                        price={item.price}
                        quantity={item.quantity}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        disabled={item.disabled}
                    />)
                    }
                </WhiteBlock>

  )
}
export default CheckoutCart