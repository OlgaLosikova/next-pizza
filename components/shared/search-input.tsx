'use client';
import { cn } from '@/lib/utils'
import { Api } from '@/services/api-client';
import { Product } from '@/src/generated';
import { Search } from 'lucide-react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use';

interface SearchInputProps {
    className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const ref = React.useRef<HTMLDivElement>(null);
    useClickAway(ref, () => {
        setFocused(false);
    });
    useDebounce(
        async () => {
            try {
                const response = await Api.products.search(searchValue);
                setProducts(response);
            } catch (err) {
                console.error('Error fetching search results:', err);
            }
        }, 250, [searchValue])

    const onClickItem = () => {
        setFocused(false);
        setSearchValue('');
        setProducts([]);
    }
    return (
        <>
            {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'></div>}

            <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder='Поиск пиццы...' className='w-full h-full pl-12 pr-4 rounded-2xl  bg-gray-100 outline-none'
                    onFocus={() => setFocused(true)} />

                <div className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', focused && 'visible opacity-100 top-12')}>
                    {products.map(item => (
                        <Link onClick={onClickItem} key={item.id} className='flex w-full items-center px-3 py-2 hover:bg-primary/10 cursor-pointer' href={`/product/${item.id}`}>
                            <img src={item.imageUrl} alt={item.name} className='w-10 h-10 object-cover rounded-md mx-3 my-2 inline-block' />
                            <span>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
export default SearchInput