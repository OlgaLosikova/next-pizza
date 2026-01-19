'use client';
import React, {  Ref, useEffect, useRef } from 'react'
import Title from './title';
import { cn } from '@/lib/utils';
import ProductCard from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

type Props = {
    className?: string;
    categoryId: number;
    products: any[];
    listClassName?:string;
    title: string

}
const PropductsGroupList:React.FC<Props> = ({    className,
    categoryId,
    products,
    listClassName,
    title}) => {
        const setActiveCategoryId=useCategoryStore((state)=>state.setActivateId)
        const intersectionTitle=useRef<HTMLDivElement>(null);
       const intersection= useIntersection(intersectionTitle as React.RefObject<HTMLElement>, {threshold:0.4,})
useEffect(()=>{
    console.log(title, categoryId);
    setActiveCategoryId(categoryId)
},[intersection?.isIntersecting])
  return (
    <div id={title} ref={intersectionTitle}>
        <Title text={title} size='lg' className='font-extrabold mb-5' />
        <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
            {
                products.map((product, i)=>(<ProductCard price={product.items[0].price} imgUrl={product.imgUrl} key={product.id}
                id={product.id}
                name={product.name}
                />))
            }
        </div>
    </div>
  )
}

export default PropductsGroupList