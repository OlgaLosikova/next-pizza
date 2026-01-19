'use client';
import React, { ChangeEvent, useState } from 'react'
import FilterCheckbox, { FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui/input';

interface Props {
    title: string;
    items: FilterCheckboxProps[];
    defaultItems: FilterCheckboxProps[];
    limit: number;
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
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

    return (
        <div>
            <p className='font-bold mb-3'>
                {title}
            </p>
            {showAll && <div className='mb-5'>
                <Input placeholder={searchInputPlaceholder} value={searchValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} className='bg-gray-50 border-none' />
            </div>}
            <div className='flex flex-col gap-4 max-h96 pr-2 overflow-auto scrollbar'>
                {list.map((item, i) => <FilterCheckbox value={item.value} endAdornment={item.checked} text={item.text} key={i} checked={false} onCheckedChange={(ids) => console.log(ids)} />)}
            </div>
            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    )
}
export default CheckboxFilterGroup;