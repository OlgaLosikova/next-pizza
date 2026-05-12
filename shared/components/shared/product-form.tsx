'use client'
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store/cart';
import React from 'react'
import toast from 'react-hot-toast';
import ChoosePizzaForm from './choose-pizza-form';
import ChooseProductForm from './choose-product-form';

interface Props {
    product: ProductWithRelations
    onSubmit?:VoidFunction
}

const ProductForm: React.FC<Props> = ({ product, onSubmit }) => {
    const addCartItem = useCartStore(state => state.addCartItem);
    const loading = useCartStore(state => state.loading);
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);
    const onSubmitProduct = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;
            await addCartItem({
                productItemId: itemId,
                ingredients
            })
            toast.success('Товар добавлен в корзину');
            onSubmit?.()

        } catch (err) {
            toast.error('Не удалось добавить товар в корзину')
            console.error(err)
        }
    }

    if (isPizzaForm) return <ChoosePizzaForm
        imageUrl={product.imageUrl}
        loading={loading}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={(productItemId?: number, ingredients?: number[]) => onSubmitProduct(productItemId, ingredients)} />
    else return <ChooseProductForm
        loading={loading}
        imageUrl={product.imageUrl}
        name={product.name}
        onSubmit={() => onSubmitProduct()}
        price={firstItem.price}
    />

}
export default ProductForm