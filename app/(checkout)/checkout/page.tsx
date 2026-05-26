'use client';
import CheckoutSidebar from "@/shared/components/shared/checkout-sidebar";
import Container from "@/shared/components/shared/container";
import Title from "@/shared/components/shared/title";
import { useCart } from "@/shared/hooks";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import CheckoutCart from "@/shared/components/shared/checkout/checkout-cart";
import CheckoutPersonalForm from "@/shared/components/shared/checkout/checkout-personal-form";
import CheckoutAddressForm from "@/shared/components/shared/checkout/checkout-address-form";
import { CheckoutFormFields, checkoutFormSchema } from "@/shared/components/shared/checkout/schemas/checkout-form-schema";

export default function CheckoutPage() {
    const { updateItemQuantity, totalAmount, removeCartItem, cartItems, loading } = useCart();
    const methods = useForm<CheckoutFormFields>(
        {
            resolver: zodResolver(checkoutFormSchema),
            defaultValues: {
                email: '',
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                comment: ''
            }
        }
    )
    const onClickUpdateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity)
    };
    const onSubmitHandler = (data: CheckoutFormFields) => {
console.log(data);
    }

    return <Container className="mt-10">
        <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                <div className="flex gap-10">
                    {/* Левая ч */}
                    <div className="flex flex-col gap-10 flex-1 mb-20">
                        <CheckoutCart onClickUpdateQuantity={onClickUpdateQuantity} items={cartItems} removeCartItem={removeCartItem} />
                        <CheckoutPersonalForm />
                        <CheckoutAddressForm />
                    </div>
                    {/* Правая ч */}
                    <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                </div>

            </form>

        </FormProvider>
    </Container>
}