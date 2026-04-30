'use client'
import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { useRouter } from 'next/navigation';
import ChooseProductForm from './choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import ChoosePizzaForm from './choose-pizza-form';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';


interface Props {
    product: ProductWithRelations;
    className?: string;
}

const ChoseProductModal: React.FC<Props> = ({ className, product }) => {
    const router = useRouter();
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType)
    const addCartItem = useCartStore(state => state.addCartItem);
    const loading = useCartStore(state => state.loading);

    const onSubmitProduct = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;
            await addCartItem({
                productItemId: itemId,
                ingredients
            })
            toast.success('Товар добавлен в корзину');
            router.back();
        } catch (err) {
            toast.error('Не удалось добавить товар в корзину')
            console.error(err)
        }
    }
    return (
        <Dialog open={!!product} onOpenChange={() => router.back()}>
            <DialogContent className='xl:max-w-6xl p-0 w-[1060px] min-h-[600px] bg-white overflow-hidden flex flex-col'>
                <DialogTitle />
                {isPizzaForm ?
                    <ChoosePizzaForm imageUrl={product.imageUrl}
                        loading={loading} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={(productItemId?: number, ingredients?: number[]) => onSubmitProduct(productItemId, ingredients)} /> :
                    <ChooseProductForm
                        loading={loading}
                        imageUrl={product.imageUrl}
                        name={product.name}
                        onSubmit={() => onSubmitProduct()}
                        price={firstItem.price}
                    />}
            </DialogContent>
        </Dialog>
    )
}
export default ChoseProductModal