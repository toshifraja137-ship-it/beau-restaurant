import { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("foodie-cart");

        if (!savedCart) {
            return [];
        }

        try {
            return JSON.parse(savedCart);
        } catch (error) {
            console.error("Could not read saved cart:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("foodie-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(dish, restaurantId) {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item.dish.id === dish.id && item.restaurantId === restaurantId
            );
            if (existing) {
                return prev.map((item) =>
                    item.dish.id === dish.id && item.restaurantId === restaurantId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { dish, quantity: 1, restaurantId }];
        });
    }

    function increaseQuantity(dishId, restaurantId) {
        setCartItems((prev) =>
            prev.map((item) =>
                item.dish.id === dishId && item.restaurantId === restaurantId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function decreaseQuantity(dishId, restaurantId) {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.dish.id === dishId && item.restaurantId === restaurantId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const total = cartItems.reduce(
        (sum, item) => sum + item.dish.price * item.quantity,
        0
    );

    const value = {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}