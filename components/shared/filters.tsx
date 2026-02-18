'use client'
import React from 'react'
import Title from './title'
import { Input } from '../ui/input'
import { RangeSlider } from './range-slider'
import CheckboxFilterGroup from './checkbox-filter-group'
import { _ingredients } from '@/prisma/constants'
import { useIngredients, useFilters, useQueryFilters } from '@/hooks'

interface Props {
    className?: string;
}

const Filters: React.FC = (props: Props) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();
    useQueryFilters(filters)

    const items = ingredients.map(ingredient => ({
        text: ingredient.name,
        value: String(ingredient.id),
    }));

    const updateRangePrices=(prices:[number, number])=>{
filters.setPrices('priceFrom', prices[0])
filters.setPrices('priceTo', prices[1])
    }

    return (
        <div>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
            <CheckboxFilterGroup
                name='pizzaTypes'
                onClickChek={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
                items={
                    [
                        { text: 'Тонкое', value: '1' },
                        { text: 'Традиционное', value: '2' },
                    ]}
                className='mt-5'
                title='Тип теста' />
            <CheckboxFilterGroup
                name='sizes'
                onClickChek={filters.setSizes}
                selected={filters.sizes}
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
                    <Input type='number' placeholder='0' min={0} max={1000} value={String(filters.prices.priceFrom)} onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))} />
                    <Input type='number' placeholder='1000' min={100} max={1000} value={String(filters.prices.priceTo)} onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))} />
                </div>
                <RangeSlider step={10} min={100} max={1000} value={[
                    filters.prices.priceFrom || 0,
                    filters.prices.priceTo || 1000
                ]}
                    onValueChange={([priceFrom, priceTo]) => updateRangePrices([ priceFrom, priceTo ])}
                />
            </div>
            <CheckboxFilterGroup
                name='ingredients'
                onClickChek={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
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