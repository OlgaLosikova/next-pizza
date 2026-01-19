'use client';
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category';
import Link from 'next/link';
import React from 'react'
interface Props {
    className?:string
}

const cats=['Пиццы','Комбо','Закуски', 'Коктейли','Кофе','Напитки','Десерты','Мерч'];
const Categories:React.FC<Props>=({className})=> {
  const categoryActiveId=useCategoryStore((state)=>state.activateId)
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {cats.map((item, i)=>(<Link href={`/#${item}`} className={cn('flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId===i+1&&'bg-white shadow-md shadow-gray-200 text-primary'
        )} key={item}><button>{item}</button></Link>))}
    </div>
  )
}

export default Categories