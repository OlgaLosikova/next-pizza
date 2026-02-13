'use client'
import React, { useEffect, useState } from 'react'
import Title from './title'
import FilterCheckbox from './filter-checkbox'
import { Input } from '../ui/input'
import { RangeSlider } from './range-slider'
import CheckboxFilterGroup from './checkbox-filter-group'
import { _ingredients } from '@/prisma/constants'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'
import { useSet } from 'react-use'
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    className?: string;
}
interface PriceProps {
    priceFrom?: number;
    priceTo?: number
}
interface QueryFilters extends PriceProps{
    pizzaTypes:string,
    sizes:string,
    ingredients:string
}
const Filters: React.FC = (props: Props) => {
    const router=useRouter();
    const searchParams=useSearchParams() as unknown as Map<keyof QueryFilters, string>
    const { ingredients, loading, toggle, selectedIds:selectedIngredients} = useFilterIngredients(searchParams.get('ingredients')?searchParams.get('ingredients')?.split(','):[]);
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get('sizes')?searchParams.get('sizes')?.split(','):[]))
    const [pizzaTypes, { toggle: toggleTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes')?searchParams.get('pizzaTypes')?.split(','):[]))
    const [prices, setPrice] = useState<PriceProps>({ 
        priceFrom:Number(searchParams.get('priceFrom'))||undefined,
        priceTo:Number(searchParams.get('priceTo'))||undefined
     });
    const { priceFrom, priceTo } = prices;
    const items = ingredients.map(ingredient => ({
        text: ingredient.name,
        value: String(ingredient.id),
    }));
    const setPriceHandler = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value
        })
    }

    useEffect(()=>{
    const filters={
        ...prices,
        pizzaTypes:Array.from(pizzaTypes),
        sizes:Array.from(sizes),
        ingredients:Array.from(selectedIngredients)
    }
  const query=qs.stringify(filters,{arrayFormat:'comma'});
  router.push(`?${query}`, {scroll:false})
    },[prices,pizzaTypes, sizes,selectedIngredients])
    return (
        <div>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
            <CheckboxFilterGroup
                name='pizzaTypes'
                onClickChek={toggleTypes}
                selected={pizzaTypes}
                items={
                    [
                        { text: 'Тонкое', value: '1' },
                        { text: 'Традиционное', value: '2' },
                    ]}
                className='mt-5'
                title='Тип теста' />
            <CheckboxFilterGroup
                name='sizes'
                onClickChek={toggleSizes}
                selected={sizes}
                items={
                    [
                        { text: '20 см', value: '20' },
                        { text: '30 см', value: '30' },
                        { text: '40 см', value: '40' }
                    ]}
                className='mt-5'
                title='Размеры' />
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={1000} value={String(priceFrom)} onChange={(e) => setPriceHandler('priceFrom', Number(e.target.value))} />
                    <Input type='number' placeholder='1000' min={100} max={1000} value={String(priceTo)} onChange={(e) => setPriceHandler('priceTo', Number(e.target.value))} />
                </div>
                <RangeSlider step={10} min={100} max={1000} value={[
                    priceFrom||0,
                    priceTo||1000
                ]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
                />
            </div>
            <CheckboxFilterGroup
                name='ingredients'
                onClickChek={toggle}
                selected={selectedIngredients}
                loading={loading}
                limit={6}
                defaultItems={
                    items.slice(0, 6)
                }
                items={items}
                className='mt-5'
                title='Ингредиенты' />
        </div>
    )
}

export default Filters