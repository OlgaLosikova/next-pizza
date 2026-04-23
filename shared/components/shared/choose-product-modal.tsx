'use client'
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { useRouter } from 'next/navigation';
import ChooseProductForm from './choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import ChoosePizzaForm from './choose-pizza-form';
import { useCartStore } from '@/shared/store/cart';


interface Props {
    product: ProductWithRelations;
    className?: string;
}

const ChoseProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter();
    const firstItem=product.items[0];
    const isPizzaForm =Boolean(firstItem.pizzaType)
    const addCartItem=useCartStore(state=>state.addCartItem)

    const onAddProduct=()=>{
addCartItem({
    productItemId:firstItem.id
})
    }
    const onAddPizza=(productItemId:number,ingredients:number[])=>{
addCartItem({
    productItemId,
    ingredients
})
    }
    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='xl:max-w-6xl p-0 w-[1060px] min-h-[600px] bg-white overflow-hidden flex flex-col'>
                <DialogTitle/>
                {isPizzaForm ? 
                <ChoosePizzaForm imageUrl={product.imageUrl}
                        name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={onAddPizza}/> :
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        onSubmit={onAddProduct}
                        price={firstItem.price}
                    />}
            </DialogContent>
        </Dialog>
    )
}
export default ChoseProductModal