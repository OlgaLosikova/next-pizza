'use client';
import React from 'react';
import CountButton from './count-button';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';



interface CartItemProps {
  id:number
  imageUrl?: string;
  name?: string;
  price?: number;
  className?: string;
  details?:string;
  quantity?:number;
  disabled?:boolean;
  onClickUpdateQuantity?:(type:'plus' | 'minus')=>void;
onClickRemove?:()=>void;
}

const CheckoutItem: React.FC<CartItemProps> = ({ imageUrl, name, price, quantity, className, details, id, onClickRemove, disabled,onClickUpdateQuantity }) => {
  return (
    <div className={cn('flex bg-white h-36 p-5 gap-6',
    {
      'opacity-50 pointer-events-none' : disabled,
    }, className)}>
      <img className="w-[65px] h-[65px]" src={imageUrl} alt="Logo" />
      <div>
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-400">{details}</p>
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton className='mr-2' onClick={onClickUpdateQuantity} value={quantity} />
          <h2 className="font-bold">{price} ₽</h2>
        </div>
        
      </div>
      <button type="button" className='ml-auto' onClick={onClickRemove}>
        <X />
      </button>
    </div>
  );
};
export default CheckoutItem