'use client';
import React, { useEffect } from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import CartDrawerItem from './cart-drawer-item'
import { getCartItemsDetails } from '@/shared/lib/get-cart-items-details'
import { useCartStore } from '@/shared/store/cart'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import Image from 'next/image';
import Title from './title';
import { cn } from '@/shared/lib/utils';
import { VisuallyHidden } from 'radix-ui';


interface Props {
  className?: string
}

const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  const fetchCartItems = useCartStore(state => state.fetchCartItems);
  const totalAmount = useCartStore(state => state.totalAmount);
  const items = useCartStore(state => state.cartItems);
  const updateQuantity = useCartStore(state => state.updateItemQuantity);
  const removeCartItem = useCartStore(state => state.removeCartItem);
  useEffect(() => {
    fetchCartItems()
  }, [])
  const onClickUpdateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateQuantity(id, newQuantity)
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {!totalAmount && <div className='flex flex-col items-center justify-center w-72 mx-auto'>
            <Image src='/assets/images/empty-box.png' alt='empty cart' width={120} height={120} />
            <Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />
            <p className='text-center text-neutral-500 mb-5'>
              Добавьте хотя бы одну пиццу, чтобы совершить заказ
            </p>
            <SheetClose className='flex w-56 h-12 items-center justify-center border border-gray-300 rounded-md text-base'>
              <ArrowLeft className='w-5 mr-2' />
              Вернуться назад
            </SheetClose>
          </div>}
          {totalAmount > 0 && <>
            <SheetHeader>
              <SheetTitle>
                В корзине <span className='font-bold'>{items?.length} товара</span>
              </SheetTitle>
            </SheetHeader>



            <div className='mt-5 overflow-auto scrollbar flex-1'>
              {
                items?.map(item =>
                  <div className="mb-2" key={item.id}>
                    <CartDrawerItem disabled={item.disabled} id={item.id} quantity={item.quantity} details={item.type && item.pizzaSize ? getCartItemsDetails(item.type as PizzaType, item.pizzaSize as PizzaSize, item.ingredients) : ''} imageUrl={item.imageUrl} name={item.name} price={item.price} count={item.quantity}
                      onClickUpdateQuantity={(type) => onClickUpdateQuantity(item.id, item.quantity, type)} onClickRemove={() => removeCartItem(item.id)} />
                  </div>
                )
              }
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
          </>}
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default CartDrawer