import Container from "@/components/shared/container"
import GroupVariants from "@/components/shared/group-variants"
import PizzaImage from "@/components/shared/product-image"
import Title from "@/components/shared/title"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const product = await prisma.product.findFirst({
        where: { id: Number(id) }
    })
    if (!product) {
        notFound()
    }

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <PizzaImage size={40} imageUrl={product.imageUrl} />
                <div className="w-[490px] p-7 bg-[#fcfcfc]">
                    <Title size='md' text={product.name} className="font-extrabold mb-1" />
                    <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, sint quisquam asperiores cumque eum, tempore inventore alias minima delectus temporibus minus nam debitis dolore vel odit magnam sit animi quam?</p>
                    <GroupVariants
                        selectedValue="20"
                        items={
                            [
                                {
                                    name: 'Маленькая',
                                    value: '20'
                                },
                                {
                                    name: 'Средняя',
                                    value: '30',
                                    disabled: true
                                },
                                {
                                    name: 'Большая',
                                    value: '40'
                                }
                            ]
                        } />
                </div>

            </div>

        </Container>)
}