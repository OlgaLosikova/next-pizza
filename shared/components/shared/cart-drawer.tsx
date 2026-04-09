'use client';
import React, { useEffect } from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import CartDrawerItem from './cart-drawer-item'
import { getCartItemsDetails } from '@/shared/lib/get-cart-items-details'
import { useCartStore } from '@/shared/store/cart'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'


interface Props {
  className?: string
}

const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
const fetchCartItems = useCartStore(state => state.fetchCartItems);
const totalAmount = useCartStore(state => state.totalAmount);
const items = useCartStore(state => state.cartItems);
  useEffect(()=>{
   fetchCartItems()
  },[])

  return (

    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
          <SheetTitle>
            В корзине <span className='font-bold'>{items?.length} товара</span>
          </SheetTitle>
        </SheetHeader>
        <div className='mt-5 overflow-auto scrollbar flex-1'>
          <div className="mb-2">
            {
              items?.map(item=>
            <CartDrawerItem key={item.id} id={item.id} quantity={item.quantity} details={item.type && item.pizzaSize?getCartItemsDetails(item.type as PizzaType, item.pizzaSize as PizzaSize,item.ingredients):''} imageUrl={item.imageUrl} name={item.name} price={item.price} count={item.quantity} />
              )
            }

          </div>
        </div>
        <SheetFooter className='bg-white p-8'>
          <div className='w-full'>
            <div className='flex mb-4'>
              <span className='flex flex-1 text-lg text-neutral-500'>Итого:</span>
              <span className='font-bold text-xl'>{totalAmount} ₽</span>
            </div>

            <Link href={'/cart'}>
              <Button
                type='submit'
                className='w-full h-12 text-base'
              >
                Оформить заказ
                <ArrowRight className='w-5 ml-2' />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export default CartDrawer