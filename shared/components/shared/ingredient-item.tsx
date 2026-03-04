import { cn } from '@/shared/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'

interface Props {
    className?: string,
    name: string,
    price: number,
    active?: boolean,
    onClick?: () => void,
    imageUrl: string
}

const IngredientItem: React.FC<Props> = ({ className, name, price, active, onClick, imageUrl }) => {
    return (
        <div onClick={onClick} className={cn('flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white', { 'border border-primary': active }, className)}>
            {active && <CircleCheck className='absolute top-2 right-2 text-primary'/>}
            <img src={imageUrl} alt={name} width={110} height={110}  />
            <p className='text-sm font-medium'>{name}</p>
            <p className='text-sm text-gray-500'>{price} ₽</p>
        </div>
    )
}
export default IngredientItem