'use client';
import React from 'react'
import FilterCheckbox, { FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui/input';

interface Props {
    title: string;
    items: FilterCheckboxProps[];
    defaultItems?: FilterCheckboxProps[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string
}

const CheckboxFilterGroup: React.FC<Props> = ({ title,
    items,
    defaultItems,
    limit,
    searchInputPlaceholder = 'Search...',
    onChange,
    defaultValue, className }) => {
    return (
        <div>
            <p className='font-bold mb-3'>
                {title}
            </p>
            <div className='mb-5'>
                <Input placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
            </div>
            <div className='flex flex-col gap-4 max-h96 pr-2 overflow-auto scrollbar'>
                {items.map((item, i) => <FilterCheckbox value={item.value} endAdornment={item.checked} text={item.text} key={i} checked={false} onCheckedChange={(ids) => console.log(ids)} />)}
            </div>
        </div>
    )
}
export default CheckboxFilterGroup;