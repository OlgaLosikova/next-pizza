import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server"

export  async function  PATCH (req:NextRequest, {params}:{params:{id:string}}) {
    try {
        const id=Number(params.id);
        const boby=await req.json();
              const token = req.cookies.get('cartToken')?.value;
              if (!token) return NextResponse.json({error:'Токен не найден'});
              const cartItem=await prisma.cartItem.findFirst({
                where:{
                    id
                }
              });
              if (!cartItem) return NextResponse.json({error:'Товар не найден'});
    }
    catch (err) {
        console.log('[CART PATCH] server err',err)
        return NextResponse.json ({message:'Не удалось обновить корзину'}, {status:500})
    }
}