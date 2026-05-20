'use client';
import { Textarea } from "@/components/ui/textarea";
import CheckoutItem from "@/shared/components/shared/checkout-item";
import CheckoutSidebar from "@/shared/components/shared/checkout-sidebar";
import Container from "@/shared/components/shared/container";
import Title from "@/shared/components/shared/title";
import WhiteBlock from "@/shared/components/shared/white-block";
import { Input } from "@/shared/components/ui/input";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useCart } from "@/shared/hooks";
import { getCartItemsDetails } from "@/shared/lib/get-cart-items-details";

export default function CheckoutPage() {
    const { updateItemQuantity, totalAmount, removeCartItem, cartItems } = useCart();
    const onClickUpdateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    }

    return <Container className="mt-10">
        <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
        <div className="flex gap-10">
            {/* Левая ч */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
                <WhiteBlock title="1. Корзина">
                    {cartItems.map(item => <CheckoutItem
                        onClickUpdateQuantity={(type) => onClickUpdateQuantity(item.id, item.quantity, type)}
                        onClickRemove={() => removeCartItem(item.id)} key={item.id}
                        details={getCartItemsDetails(item.type as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)}
                        price={item.price}
                        quantity={item.quantity}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        disabled={item.disabled}
                    />)
                    }
                </WhiteBlock>
                <WhiteBlock title="2. Персональные данные">
                    <div className="grid grid-cols-2 gap-5">
                        <Input name='firstName' className="text-base" placeholder="Имя" />
                        <Input name='lastName' className="text-base" placeholder="Фамилия" />
                        <Input name='email' className="text-base" placeholder="Email" />
                        <Input name='phone' className="text-base" placeholder="Телефон" />
                    </div>
                </WhiteBlock>
                <WhiteBlock title="3. Адрес доставки">
                    <div className="flex flex-col gap-5">
                        <Input name='address' className="text-base" placeholder="Введите адрес" />
                        <Textarea placeholder="Комментарий к заказу" className="text-base" rows={5} />
                    </div>
                </WhiteBlock>
            </div>
            {/* Правая ч */}
            <CheckoutSidebar totalAmount={totalAmount} />
        </div>
    </Container>
}