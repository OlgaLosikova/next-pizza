'use client';
import React, { ChangeEvent, useState } from 'react'
import FilterCheckbox, { FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

interface Props {
    title: string;
    items: FilterCheckboxProps[];
    defaultItems?: FilterCheckboxProps[];
    limit?: number;
    searchInputPlaceholder?: string;
    onClickChek?: (id: string) => void;
    defaultValue?: string[];
    className?: string
    loading?: boolean;
    selected?: Set<string>
    name?:string
}

const CheckboxFilterGroup: React.FC<Props> = ({ title,
    items,
    defaultItems,
    limit,
    searchInputPlaceholder = 'Search...',
    onClickChek,
    defaultValue, className, loading, selected,name }) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    if (loading) {
        return <div className={className}>
            <p className='font-bold mb-3'>
                {title}
            </p>

            {
                ...Array(limit).fill(0).map((_, i) => <Skeleton key={i} className='h-6 mb-5 rounded-[8px]' />)

            }
            <Skeleton className='w-28 h-6 mb-5 rounded-[8px]' />
        </div>;
    }
    const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems||items).slice(0, limit);

    return (
        <div className='mb-5'>
            <p className='font-bold mb-3'>
                {title}
            </p>
            {showAll && <div className='mb-5'>
                <Input placeholder={searchInputPlaceholder} value={searchValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} className='bg-gray-50 border-none' />
            </div>}
            <div className='flex flex-col gap-4 max-h96 pr-2 overflow-auto scrollbar'>
                {list.map((item, i) =>
                    <FilterCheckbox name={item.name} value={item.value} endAdornment={item.checked} text={item.text} key={i} checked={selected?.has(item.value)} onCheckedChange={() => onClickChek?.(item.value)} />)}
            </div>
            {limit&&items.length > limit && (
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