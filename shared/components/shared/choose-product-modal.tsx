'use client'
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { useRouter } from 'next/navigation';
import ChooseProductForm from './choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import ChoosePizzaForm from './choose-pizza-form';


interface Props {
    product: ProductWithRelations;
    className?: string;
}

const ChoseProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter();
    const isPizzaForm = !!product.items[0].pizzaType;
    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='xl:max-w-6xl p-0 w-[1060px] min-h-[600px] bg-white overflow-hidden flex flex-col'>
                {isPizzaForm ? 
                <ChoosePizzaForm imageUrl={product.imageUrl}
                        name={product.name} ingredients={product.ingredients} items={product.items}/> :
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                    />}
            </DialogContent>
        </Dialog>
    )
}
export default ChoseProductModal