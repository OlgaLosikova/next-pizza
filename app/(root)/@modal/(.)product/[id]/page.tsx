import ChoseProductModal from "@/shared/components/shared/choose-product-modal"
import Container from "@/shared/components/shared/container"
import GroupVariants from "@/shared/components/shared/group-variants"
import PizzaImage from "@/shared/components/shared/product-image"
import Title from "@/shared/components/shared/title"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"


export default async function ProductModalPage({ params }: { params: { id: string } }) {
        const { id } = await params
        const product = await prisma.product.findFirst({
                where: { id: Number(id) },
                include: {
                        ingredients: true,
                        items: true
                }
        })
        if (!product) {
                return notFound()
        }


        return (
                <ChoseProductModal product={product} />)
}