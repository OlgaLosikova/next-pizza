'use client'
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { useRouter } from 'next/navigation';
import ChooseProductForm from './choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';


interface Props {
    product: ProductWithRelations;
    className?: string;
}

const ChoseProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter();
    const isPizzaForm = !!product.items[0].pizzaType;
    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='p-0 w-[1060px] max-w-[1060px]  min-h-[500px] bg-white overflow-hidden'>
                <DialogTitle className="p-5 border-b">{product.name}</DialogTitle>
                {isPizzaForm ? 'Пицца' :
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                    />}
            </DialogContent>
        </Dialog>
    )
}
export default ChoseProductModal