'use server';

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormFields } from "@/shared/components/shared/checkout/schemas/checkout-form-schema";
import PayOrderEmailTemplate from "@/shared/components/shared/email-template/pay-order";
import { createPayment } from "@/shared/lib/create-payment";
import { sendEmail } from "@/shared/lib/email-send";
import { OrderStatus } from "@/src/generated";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormFields) {
    try {
        const cookieStore = cookies();
        const cartToken = (await cookieStore).get('cartToken')?.value;
        if (!cartToken) {
            throw new Error('Cart token is missing');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                cartItems: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        });

        // если корзина не найдена или она пустая, выбрасываем ошибку
        if (!userCart) {
            throw new Error('Cart not found');
        }
        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }
        // создаем заказ
        const order = await prisma.order.create({
            data: {
                items: JSON.stringify(userCart.cartItems),
                token: cartToken,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                fullName: `${data.firstName} ${data.lastName}`,
                phone: data.phone,
                address: data.address,
                email: data.email,
                paymentId: userCart.id.toString(),
            }
        });
        // очищаем корзину пользователя
        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data:{
                totalAmount:0,
            }
        });
        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        });
        const paymentData=await createPayment({
    amount: userCart.totalAmount,
    currency: "RUB"
        });
        if (!paymentData) {
            throw new Error('Payment creation failed');
        }
        await prisma.order.update({
            where: {
                id: order.id},
            data: {
                paymentId: paymentData.id,
            }
        });

        await sendEmail(data.email, `Оплатите заказ №${order.id}`, await PayOrderEmailTemplate({
    orderId: order.id,
    totalAmount: order.totalAmount,
    paymentUrl: 'https://localhost:3001/?paid'
}));
return 'https://localhost:3001/?paid';
    }
    catch (err) { 
        console.error('Error creating order:', err);
    }


}