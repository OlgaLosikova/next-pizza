import Container from "@/components/shared/container"
import Title from "@/components/shared/title"
import Categories from "@/components/shared/categories"
import SortPopup from "@/components/shared/sort-popup"
import TopBar from "@/components/shared/top-bar"
import Filters from "@/components/shared/filters"
import ProductCard from "@/components/shared/product-card"
import PropductsGroupList from "@/components/shared/propducts-group-list"



export default function Home() {

    return (
        <><Container className="mt-10"><Title text="Все пиццы" size='lg' className="font-extrabold" />
        </Container>
            <TopBar />
            <Container className=" mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/*фильтрация */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/*список товаров */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <PropductsGroupList categoryId={0} products={[
                                {
                                    id: 1,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                },
                                {
                                    id: 2,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                }, {
                                    id: 3,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                }
                            ]} title={"Пиццы"} />
                            <PropductsGroupList categoryId={1} products={[
                                {
                                    id: 4,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                },
                                {
                                    id: 5,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                }, {
                                    id: 6,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                }
                            ]} title={"Pfdnhfr"} />
                                                        <PropductsGroupList categoryId={2} products={[
                                {
                                    id: 4,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                },
                                {
                                    id: 5,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                }, {
                                    id: 6,
                                    name: 'Чизбургер-пицца',
                                    imgUrl: 'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/12/olivetta-main_image-12632-96679.jpg?w=1920',
                                    price: 550,
                                    items: [{ price: 550 }]
                                }
                            ]} title={"ква"} />
                        </div>
                    </div>
                </div>

            </Container>
        </>)



}
