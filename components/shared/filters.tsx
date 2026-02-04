'use client'
import React from 'react'
import Title from './title'
import FilterCheckbox from './filter-checkbox'
import { Input } from '../ui/input'
import { RangeSlider } from './range-slider'
import CheckboxFilterGroup from './checkbox-filter-group'
import { _ingredients } from '@/prisma/constants'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'

interface Props {
    className?: string
}

const Filters: React.FC = (props: Props) => {
    const { ingredients } = useFilterIngredients();
    const items = ingredients.map(ingredient => ({
        text: ingredient.name,
        value: String(ingredient.id),
    }));
    return (
        <div>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
            <div className='flex flex-col gap-4'>
                <FilterCheckbox text='Можно собирать' value='1' />
                <FilterCheckbox text='Новинки' value='2' />
            </div>
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} />
                    <Input type='number' placeholder='1000' min={100} max={1000} />
                </div>
                <RangeSlider step={5} min={0} max={5000} value={[0, 5000]} />
            </div>
            <CheckboxFilterGroup
                limit={6}
                defaultItems={
                    items.slice(0, 6)
                }
                items={
                    items
                } className='mt-5' title='Ингредиенты' />
        </div>
    )
}

export default Filters