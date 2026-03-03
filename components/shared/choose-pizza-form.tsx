import { cn } from '@/lib/utils';
import { Ingredient, ProductItem } from '@/src/generated';
import React from 'react'
import ProductImage from './product-image';
import Title from './title';
import { Button } from '../ui/button';

interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAdd?: () => void;
}

const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items, onClickAdd }) => {
    const textDetails = '30 см, 400 г, 12 кусочков';
    const total = '300';
    return (
        <div className={cn(className, 'flex flex-1 w-[1060px]')}>
            <ProductImage imageUrl={imageUrl} size={30} />
            <div className="w-[490px] p-7 bg-[#fcfcfc]">
                <Title size='md' text={name} className="font-extrabold mb-1" />
                <p className='text-gray-400'>
                    {textDetails}
                </p>
                <Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10' onClick={onClickAdd} >Добавить в корзину {total} ₽</Button>
            </div>

        </div>
    )
}
export default ChoosePizzaForm