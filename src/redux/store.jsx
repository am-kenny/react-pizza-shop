import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.jsx";
import menuReducer from "./slices/menuSlice.jsx";

const CART_STORAGE_KEY = "pizza-shop-cart";

const loadCartState = () => {
    try {
        const serializedState = localStorage.getItem(CART_STORAGE_KEY);
        if (!serializedState) return undefined;
        const parsed = JSON.parse(serializedState);
        if (!parsed || typeof parsed !== "object") return undefined;

        // Basic shape validation
        if (!Array.isArray(parsed.items) || typeof parsed.totalPrice !== "number") {
            return undefined;
        }

        return {
            cart: parsed,
        };
    } catch {
        return undefined;
    }
};

const saveCartState = (state) => {
    try {
        const cartState = state.cart;
        if (!cartState) return;

        const serializedState = JSON.stringify({
            items: cartState.items ?? [],
            totalPrice: cartState.totalPrice ?? 0,
        });
        localStorage.setItem(CART_STORAGE_KEY, serializedState);
    } catch {
        // Ignore write errors
    }
};

const preloadedState = typeof window !== "undefined" ? loadCartState() : undefined;

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
    },
    preloadedState,
});

if (typeof window !== "undefined") {
    store.subscribe(() => {
        saveCartState(store.getState());
    });
}