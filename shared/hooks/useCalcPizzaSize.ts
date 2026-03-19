import { ProductItem } from "@/src/generated";
import { PizzaSize, pizzaSizes, PizzaType } from "../constants/pizza";
import { useState } from "react";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
    type: PizzaType;
    size: PizzaSize;
    addPizzaType: (value: PizzaType) => void;
    getAvailableSizes: (type: PizzaType, items: ProductItem[]) => Variant[]
    addPizzaSize: (value: PizzaSize) => void;
}

export const CalculatePizzaSize = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const getAvailableSizes = (type: PizzaType, items: ProductItem[]) => {
        const filtredPizzasByType = items.filter(item => item.pizzaType === type);

        return pizzaSizes.map(item => ({
            name: item.name,
            value: item.value,
            disabled: !(filtredPizzasByType.some(p => p.size === item.value))
        }));
    }
    const addPizzaType = (value: PizzaType) => {
        setType(value as PizzaType);
        calculateSize(value)
    }
    const addPizzaSize = (value: PizzaSize) => setSize(value as PizzaSize);
    const calculateSize = (type: PizzaType) => {
        const sizes = getAvailableSizes(type, items);
        const availableSize = sizes.find(item => !item.disabled);
        if (availableSize) setSize(availableSize.value as PizzaSize)
    }
    return { type, size, addPizzaType, getAvailableSizes, addPizzaSize }
}