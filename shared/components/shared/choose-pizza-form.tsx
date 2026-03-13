import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@/src/generated';
import React, { useEffect, useState } from 'react'
import ProductImage from './product-image';
import Title from './title';
import { Button } from '../ui/button';
import GroupVariants from './group-variants';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import IngredientItem from './ingredient-item';
import { useSet } from 'react-use';

interface Props {
    className?: string;
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAdd?: () => void;
}

const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items, onClickAdd }) => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
    const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;
    const ingredientsPrice = ingredients.filter(ingredient => selectedIngredients.has(ingredient.id)).reduce((acc, item) => acc + item.price, 0)
    const total = pizzaPrice + ingredientsPrice;
    const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
    const handleClickAddType = (value: PizzaType) => {
        setType(value as PizzaType);
        calculateSize(value)
    }
    const handleClickAddSize = (value: PizzaSize) => setSize(value as PizzaSize);
const getAvailableSizes=(type: PizzaType, items:ProductItem[])=>{
        const availablePizzas = items.filter(item => item.pizzaType === type);

    return pizzaSizes.map(item => ({
        name: item.name,
        value: item.value,
        disabled: !(availablePizzas.some(p => p.size === item.value))
    }));
}
const availableSizes=getAvailableSizes(type, items);

    const calculateSize = (type: PizzaType) => {
const sizes=getAvailableSizes(type, items);
        const availableSize = sizes.find(item => !item.disabled);
        if (availableSize) setSize(availableSize.value as PizzaSize)
    }

    return (
        <div className={cn(className, 'flex align-start flex-1 w-[1060px]')}>
            <ProductImage imageUrl={imageUrl} size={size} />
            <div className="w-[490px] p-7 bg-[#fcfcfc] ">
                <Title size='md' text={name} className="font-extrabold mb-1" />
                <p className='text-gray-400'>
                    {textDetails}
                </p>
                <GroupVariants className={cn(className, 'mb-3 mt-5')} items={availableSizes} selectedValue={size} onClick={(value) => handleClickAddSize(value as PizzaSize)} />
                <GroupVariants items={pizzaTypes} selectedValue={type} onClick={(value) => handleClickAddType(value as PizzaType)} />
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