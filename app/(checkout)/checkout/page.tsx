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
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";

export default function CheckoutPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const [url, setUrl] = React.useState<string>('');
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
    const onSubmitHandler = async (data: CheckoutFormFields) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);
            toast.success('Заказ успешно создан. Переход на оплату...', {
                icon: '✅'
            });
            setUrl(url||'');
        } catch (error) {
            console.log(error);
            setSubmitting(false);
            toast.error('Ошибка при создании заказа', {
                icon: '❌'
            })
        } finally {
            setSubmitting(false);
        }}
        React.useEffect(() => {
            if (url) {
                window.location.href = url;
            }
        }, [url])
        return <Container className="mt-10">
            <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
                    <div className="flex gap-10">
                        {/* Левая ч */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart onClickUpdateQuantity={onClickUpdateQuantity} items={cartItems} removeCartItem={removeCartItem} loading={loading} />
                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ''} />
                            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ''} />
                        </div>
                        {/* Правая ч */}
                        <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                    </div>

                </form>

            </FormProvider>
        </Container>
    }