import Container from "@/components/shared/container"
import Title from "@/components/shared/title"
import TopBar from "@/components/shared/top-bar"
import Filters from "@/components/shared/filters"
import PropductsGroupList from "@/components/shared/propducts-group-list"
import { prisma } from "@/prisma/prisma-client"
export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true
                }
            }
        }
    })
    return (
        <><Container className="mt-10"><Title text="Все пиццы" size='lg' className="font-extrabold" />
        </Container>
            <TopBar items={categories.filter(item=>!!item.products.length)} />
            <Container className=" mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/*фильтрация */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/*список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map(item => (
                                item.products.length > 0 && <PropductsGroupList key={item.id} categoryId={item.id} products={item.products} title={item.name} />
                            ))}
                        </div>
                    </div>
                </div>

            </Container>
        </>)



}
