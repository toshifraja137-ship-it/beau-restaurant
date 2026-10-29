import { Link } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";

export default function Orders() {
    const { orders, cancelOrder, deleteOrder } = useOrder();

    if (orders.length === 0) {
        return (
            <main className="orders-page">
                <div className="container">
                    <section className="orders-empty">
                        <div className="orders-empty__icon">🍽️</div>

                        <h1>No orders yet</h1>

                        <p>
                            Your completed food orders will appear here.
                        </p>

                        <Link to="/" className="btn btn-primary">
                            Explore restaurants
                        </Link>
                    </section>
                </div>
            </main>
        );
    }

    return (
        <main className="orders-page">
            <div className="container">
                <div className="orders-page__heading">
                    <div>
                        <p className="orders-page__eyebrow">ORDER HISTORY</p>
                        <h1>My Orders</h1>
                        <p>You have placed {orders.length} order(s).</p>
                    </div>

                    <Link to="/" className="btn btn-primary">
                        Order food
                    </Link>
                </div>

                <section className="orders-list">
                    {orders.map((order) => {
                        const totalQuantity = order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                        );

                        function handleCancel() {
                            const isConfirmed = window.confirm(
                                `Cancel order #${order.orderId}? This action cannot be undone.`
                            );

                            if (isConfirmed) {
                                cancelOrder(order.orderId);
                            }
                        }

                        function handleDelete() {
                            const isConfirmed = window.confirm(
                                `Delete order #${order.orderId} from your order history?`
                            );

                            if (isConfirmed) {
                                deleteOrder(order.orderId);
                            }
                        }

                        return (
                            <article className="order-card" key={order.orderId}>
                                <div className="order-card__top">
                                    <div>
                                        <p className="order-card__status">
                                            {order.status || "Confirmed"}
                                        </p>

                                        <h2>Order #{order.orderId}</h2>

                                        <p className="order-card__date">
                                            {order.orderedAt}
                                        </p>
                                    </div>

                                    <p className="order-card__total">
                                        ₹{order.grandTotal}
                                    </p>
                                </div>

                                <div className="order-card__items">
                                    {order.items.map((item) => (
                                        <div
                                            className="order-card__item"
                                            key={`${order.orderId}-${item.restaurantId}-${item.dish.id}`}
                                        >
                                            <span>
                                                {item.quantity} × {item.dish.name}
                                            </span>

                                            <strong>
                                                ₹{item.dish.price * item.quantity}
                                            </strong>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-card__bottom">
                                    <div>
                                        <p>
                                            <strong>{totalQuantity}</strong> item(s) ·{" "}
                                            {order.paymentMethod}
                                        </p>

                                        <p className="order-card__address">
                                            Delivering to: {order.customer.address}
                                        </p>
                                    </div>

                                    <div className="order-card__actions">
                                        {order.status !== "Cancelled" && (
                                            <button
                                                type="button"
                                                className="order-card__cancel-btn"
                                                onClick={handleCancel}
                                            >
                                                Cancel order
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            className="order-card__delete-btn"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}