'use client';
import React, { useRef } from 'react'
import Title from './title';
import { cn } from '@/shared/lib/utils';
import ProductCard from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

type Props = {
    className?: string;
    categoryId: number;
    products: ProductWithRelations[];
    listClassName?: string;
    title: string

}
const PropductsGroupList: React.FC<Props> = ({ className,
    categoryId,
    products,
    listClassName,
    title }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const intersectionTitle = useRef<HTMLDivElement>(null);

    const intersection = useIntersection(intersectionTitle as React.RefObject<HTMLElement>, { threshold: 0.4, })
  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);
    return (
        <div id={title} ref={intersectionTitle}>
            <Title text={title} size='lg' className='font-extrabold mb-5' />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {
                    products.map((product, i) => (<ProductCard ingredients={product.ingredients} price={product.items[0].price} imgUrl={product.imageUrl} key={product.id}
                        id={product.id}
                        name={product.name}
                    />))
                }
            </div>
        </div>
    )
}

export default PropductsGroupList