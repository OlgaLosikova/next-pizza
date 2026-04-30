import { cn } from '@/shared/lib/utils';
import React from 'react'
import Title from './title';
import { Button } from '../ui/button';

interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    onSubmit?: () => void;
    price: number;
    loading: boolean;
}
/*
Форма выбора продукта (не пиццы)
*/
const ChooseProductForm: React.FC<Props> = ({ className, imageUrl, name, onSubmit, price, loading }) => {
    return (
        <div className={cn(className, 'flex align-start flex-1 w-[1060px]')}>
            <div className='flex items-center justify-center flex-1 relative w-full'>
                <img
                    src={imageUrl} alt={name} className='w-[350px] h-[350px] relative left-2 top-2 transition-all z-10 duration-300' />
            </div>
            <div className="w-[490px] p-7 bg-[#fcfcfc] p-7">
                <Title size='md' text={name} className="font-extrabold mb-1" />
                <Button loading={loading} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10' onClick={onSubmit} >Добавить в корзину {price} ₽</Button>
            </div>

        </div>
    )
}
export default ChooseProductForm