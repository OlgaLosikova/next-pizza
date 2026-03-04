import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number
}
export interface QueryFilters extends PriceProps {
    pizzaTypes: string,
    sizes: string,
    ingredients: string
}
export interface FiltersTypes {
    prices: PriceProps,
    pizzaTypes: Set<string>,
    sizes: Set<string>,
    selectedIngredients: Set<string>
}
interface ReturnProps extends FiltersTypes {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}
export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    //фильтр ингредиентов
    const [selectedIngredients, { toggle: setSelectedIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')))
    //фильтр размеров
    const [sizes, { toggle: setSizes }] = useSet(new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []))
    //фильтр типов теста
    const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []))
    //фильтр цен
    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    });
    const updatePrices = (name: keyof PriceProps, value: number) => {
        setPrices(prev=>({
            ...prev,
            [name]: value
        }))
    }
    return {
        selectedIngredients,
        sizes,
        pizzaTypes,
        prices,
        setPrices: updatePrices,
        setSelectedIngredients,
        setPizzaTypes,
        setSizes
    }
}