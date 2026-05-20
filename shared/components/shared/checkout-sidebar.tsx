import React from 'react'
import WhiteBlock from './white-block'
import CheckoutItemDetails from './checkout-item-details'
import { Button } from '../ui/button';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

interface Props {
    totalAmount: number;

}
const VAT = 15;
const DELIVERY_PRICE = 250;
const CheckoutSidebar: React.FC<Props> = ({ totalAmount }) => {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
    return (
        <div className="w-[450px]">
            <WhiteBlock className="p-6 sticky top-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xl">Итого:</span>
                    <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
                </div>
                <CheckoutItemDetails title={<div className="items-center flex">
                    <Package size={16} className="mr-2 text-gray-300" />
                    Стоимость товаров:
                </div>} value={totalAmount} />
                <CheckoutItemDetails title={<div className="items-center flex">
                    <Percent size={16} className="mr-2 text-gray-300" />
                    Налоги:
                </div>} value={vatPrice} />
                <CheckoutItemDetails title={<div className="items-center flex">
                    <Truck size={16} className="mr-2 text-gray-300" />
                    Доставка:
                </div>} value={DELIVERY_PRICE} />
                <Button type="submit"
                    className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                    Перейти к оплате
                    <ArrowRight className="w-5 ml-2" />
                </Button>
            </WhiteBlock>
        </div>
    )
}
export default CheckoutSidebar