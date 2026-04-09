
import { create } from "zustand"
import { Api } from "../services/api-client"
import { CartStateItem, getCartDetails } from "../lib/get-cart-details"


export interface CartState {
    loading: boolean,
    error: boolean,
    totalAmount: number,
    cartItems: CartStateItem[],
    fetchCartItems: () => Promise<void>,
    updateItemQuantity: (id: number, quantity: number) => Promise<void>,
    addCartItem: (values: any) => Promise<void>,
    removeCartItem: (id: number) => Promise<void>
}
export const useCartStore = create<CartState>((set, get) => ({
    loading: false,
    error: false,
    totalAmount: 0,
    cartItems: [],
    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchCart();
            set(getCartDetails(data));
        }
        catch (err) {
            console.log(err);
            set({ error: true })
        }
        finally {
            set({ loading: false })
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => { },
    addCartItem: async (values: any) => { },
    removeCartItem: async (id: number) => { }
}))