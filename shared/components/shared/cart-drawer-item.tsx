
import React from 'react';
import CountButton from './count-button';
import { cn } from '@/shared/lib/utils';
import CartItemDetailsImage from './cart-items-details/cart-item-details-image';
import { CartItemProps } from './cart-items-details/cart-item-details.types';
import CartItemInfo from './cart-items-details/cart-item-info';
import CartItemDetailsPrice from './cart-items-details/cart-item-details-price';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
  className?: string;
  count:number

}

 const CartDrawerItem: React.FC<Props> = ({id, quantity,details, imageUrl, name, price, count, className }) => {
  return (
    <div className={cn('flex bg-white h-36 p-5 gap-6', className)}>
      <CartItemDetailsImage src={imageUrl}/>

      <div className='flex-1'>
        <CartItemInfo details={details} name={name}/>
<hr className='my-3'/>

        <div className="flex items-center justify-between">
          <CountButton onClick={()=>console.log('Count button clicked')} value={quantity} />

          
        </div>
        <div className="flex items-center gap-3">
          <CartItemDetailsPrice value={price} />
          <Trash2Icon size={16} className='text-gray-400 cursor-pointer hover:text-gray-600'/>
        </div>
      </div>
    </div>
  );
};
export default CartDrawerItem