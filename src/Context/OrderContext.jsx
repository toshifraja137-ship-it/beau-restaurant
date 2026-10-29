
import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("foodie-orders");

        if (!savedOrders) {
            return [];
        }

        try {
            return JSON.parse(savedOrders);
        } catch (error) {
            console.error("Could not read saved orders:", error);
            return [];
        }
    });

    const [lastOrder, setLastOrder] = useState(null);

    useEffect(() => {
        localStorage.setItem("foodie-orders", JSON.stringify(orders));
    }, [orders]);

    function placeOrder(orderData) {
        const newOrder = {
            ...orderData,
            id: orderData.orderId || `FOOD${Date.now().toString().slice(-7)}`,
        };

        setOrders((prev) => [newOrder, ...prev]);
        setLastOrder(newOrder);
    }

    function cancelOrder(orderId) {
        setOrders((prev) =>
            prev.map((order) =>
                order.orderId === orderId
                    ? { ...order, status: "Cancelled" }
                    : order
            )
        );
    }

    function deleteOrder(orderId) {
        setOrders((prev) =>
            prev.filter((order) => order.orderId !== orderId)
        );

        setLastOrder((prev) =>
            prev?.orderId === orderId ? null : prev
        );
    }

    const value = {
        orders,
        lastOrder,
        placeOrder,
        cancelOrder,
        deleteOrder,
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error("useOrder must be used within OrderProvider");
    }

    return context;
}
