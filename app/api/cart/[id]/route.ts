import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string; }>}) {
    try {
        const { id } =  await params
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get('cartToken')?.value;
        if (!token) return NextResponse.json({ error: 'Токен не найден' });
        const cartItem = await prisma.cartItem.findFirst({
            where: { id: Number(id) }
        });
        if (!cartItem) return NextResponse.json({ error: 'Товар не найден' });
        await prisma.cartItem.update({
            where: { id: Number(id) },
            data: {
                quantity: data.quantity
            }
        });
        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart)
    }
    catch (err) {
        console.log('[CART PATCH] server err', err)
        return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 })
    }
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string; }> })  {
    try {
        const { id } =  await params;
        const token = req.cookies.get('cartToken')?.value;
        if (!token) return NextResponse.json({ error: 'Токен не найден' });
        const cartItem = await prisma.cartItem.findFirst({
            where: { id: Number(id) }
        });
        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' })
        }
        await prisma.cartItem.delete({
            where: { id: Number(id) }
        });
        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart)
    }
    catch (err) {
        console.log('[CART DELETE] server err', err)
        return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 })
    }

}