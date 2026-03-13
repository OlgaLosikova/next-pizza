import { cn } from '@/shared/lib/utils';
import { Ingredient, Product } from '@/src/generated';
import React from 'react'
import ProductCard from './product-card';
import ProductImage from './product-image';
import Title from './title';
import { Button } from '../ui/button';

interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    onClickAddCart?: () => void;

}

const ChooseProductForm: React.FC<Props> = ({ className, imageUrl, name, onClickAddCart }) => {
    const textDetails = '30 см, 400 г, 12 кусочков';
    const total = '300';
    return (
        <div className={cn(className, 'flex align-start flex-1 w-[1060px]')}>
            <div className='flex items-center justify-center flex-1 relative w-full'>
                <img
                    src={imageUrl} alt={name} className='w-[350px] h-[350px] relative left-2 top-2 transition-all z-10 duration-300' />
            </div>
            <div className="w-[490px] p-7 bg-[#fcfcfc] p-7">
                <Title size='md' text={name} className="font-extrabold mb-1" />
                <p className='text-gray-400'>
                    {textDetails}
                </p>
                <Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10' onClick={onClickAddCart} >Добавить в корзину {total} ₽</Button>
            </div>

        </div>
    )
}
export default ChooseProductForm