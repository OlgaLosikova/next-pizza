'use client'
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import ProductForm from './product-form';


interface Props {
    product: ProductWithRelations;
    className?: string;
}

const ChoseProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter();

    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='xl:max-w-6xl p-0 w-[1060px] min-h-[600px] bg-white overflow-hidden flex flex-col'>
                <DialogTitle />
               <ProductForm product={product} onSubmit={()=>router.back()}/>
            </DialogContent>
        </Dialog>
    )
}
export default ChoseProductModal