import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@/src/generated';
import React from 'react'
import ProductImage from './product-image';
import Title from './title';
import { Button } from '../ui/button';
import GroupVariants from './group-variants';
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import IngredientItem from './ingredient-item';
import { useSet } from 'react-use';
import { CalculatePizzaSize } from '@/shared/hooks/useCalcPizzaSize';
import { calcTotalPrice } from '@/shared/lib/calc-total-price';


interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAdd?: () => void;
}

const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items, onClickAdd }) => {
    const { getAvailableSizes,type, size, addPizzaType, addPizzaSize } = CalculatePizzaSize(items);

    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
    
    const total = calcTotalPrice(items, ingredients, type, size, selectedIngredients)
    const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
    const availableSizes = getAvailableSizes(type, items);

    return (
        <div className={cn(className, 'flex align-start flex-1 w-[1060px]')}>
            <ProductImage imageUrl={imageUrl} size={size} />
            <div className="w-[490px] p-7 bg-[#fcfcfc] ">
                <Title size='md' text={name} className="font-extrabold mb-1" />
                <p className='text-gray-400'>
                    {textDetails}
                </p>
                <GroupVariants className={cn(className, 'mb-3 mt-5')} items={availableSizes} selectedValue={size} onClick={(value) => addPizzaSize(value as PizzaSize)} />
                <GroupVariants items={pizzaTypes} selectedValue={type} onClick={(value) =>addPizzaType(value as PizzaType)} />
                <div className='bg-gray-50 p-5  rounded-md h-[420px] overflow-auto scrollbar'>
                    <div className='grid grid-cols-3 gap-4'>
                        {ingredients.map(ingredient => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                price={ingredient.price}
                                imageUrl={ingredient.imageUrl}

                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => addIngredient(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>
                <Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10' onClick={onClickAdd} >Добавить в корзину {total} ₽</Button>
            </div>
        </div>
    )
}
export default ChoosePizzaForm