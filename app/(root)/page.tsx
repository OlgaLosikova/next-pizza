import Container from "@/shared/components/shared/container"
import Title from "@/shared/components/shared/title"
import TopBar from "@/shared/components/shared/top-bar"
import Filters from "@/shared/components/shared/filters"
import PropductsGroupList from "@/shared/components/shared/propducts-group-list"
import { Suspense } from "react"
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas"
export default async function Home({searchParams}:{searchParams:Promise<GetSearchParams>}) {
const categories = await findPizzas(await searchParams)
    return (
        <><Container className="mt-10"><Title text="Все пиццы" size='lg' className="font-extrabold" />
        </Container>
            <TopBar items={categories.filter(item=>!!item.products.length)} />
            <Container className=" mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/*фильтрация */}
                    <div className="w-[250px]">
                        <Suspense fallback={<div>Загрузка фильтров...</div>}>
                            <Filters />
                        </Suspense>
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
