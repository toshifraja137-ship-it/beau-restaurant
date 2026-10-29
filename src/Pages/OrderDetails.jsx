import { Link, useParams } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";

export default function OrderDetails() {
    const { orderId } = useParams();

    const { orders, cancelOrder } = useOrder();

    const order = orders.find((item) => item.orderId === orderId);

    if (!order) {
        return (
            <main className="order-details-page">
                <div className="container">
                    <section className="order-not-found">
                        <h1>Order not found</h1>

                        <p>
                            This order may have been deleted, or the order link is invalid.
                        </p>

                        <Link to="/orders" className="btn btn-primary">
                            Back to My Orders
                        </Link>
                    </section>
                </div>
            </main>
        );
    }

    const totalQuantity = order.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    function handleCancelOrder() {
        const shouldCancel = window.confirm(
            `Cancel order #${order.orderId}? This action cannot be undone.`
        );

        if (shouldCancel) {
            cancelOrder(order.orderId);
        }
    }

    return (
        <main className="order-details-page">
            <div className="container">
                <Link to="/orders" className="order-details-back-link">
                    ← Back to My Orders
                </Link>

                <section className="order-details-card">
                    <div className="order-details-header">
                        <div>
                            <p
                                className={`order-details-status ${order.status === "Cancelled"
                                    ? "order-details-status--cancelled"
                                    : ""
                                    }`}
                            >
                                {order.status || "Confirmed"}
                            </p>

                            <h1>Order #{order.orderId}</h1>

                            <p className="order-details-date">
                                Placed on {order.orderedAt}
                            </p>
                        </div>

                        <div className="order-details-header-right">
                            <p className="order-details-total-amount">
                                ₹{order.grandTotal}
                            </p>

                            <p className="order-details-total-label">
                                Total amount
                            </p>
                        </div>
                    </div>

                    <div className="order-details-grid">
                        <section className="order-details-section">
                            <h2>Ordered items</h2>

                            <div className="order-details-items">
                                {order.items.map((item) => (
                                    <div
                                        className="order-details-item"
                                        key={`${order.orderId}-${item.restaurantId}-${item.dish.id}`}
                                    >
                                        <img
                                            src={item.dish.image}
                                            alt={item.dish.name}
                                            className="order-details-item-image"
                                        />

                                        <div className="order-details-item-info">
                                            <h3>{item.dish.name}</h3>

                                            <p>
                                                ₹{item.dish.price} × {item.quantity}
                                            </p>
                                        </div>

                                        <strong>
                                            ₹{item.dish.price * item.quantity}
                                        </strong>
                                    </div>
                                ))}
                            </div>

                            <div className="order-details-bill">
                                <div className="order-details-bill-row">
                                    <span>Items ({totalQuantity})</span>
                                    <span>₹{order.subtotal}</span>
                                </div>

                                <div className="order-details-bill-row">
                                    <span>Delivery fee</span>
                                    <span>₹{order.deliveryFee}</span>
                                </div>

                                <div className="order-details-grand-total">
                                    <span>Total paid</span>
                                    <strong>₹{order.grandTotal}</strong>
                                </div>
                            </div>
                        </section>

                        <section className="order-details-section">
                            <h2>Delivery details</h2>

                            <div className="order-details-info-row">
                                <span>Name</span>
                                <strong>{order.customer.name}</strong>
                            </div>

                            <div className="order-details-info-row">
                                <span>Phone</span>
                                <strong>+91 {order.customer.phone}</strong>
                            </div>

                            <div className="order-details-info-row">
                                <span>Delivery address</span>
                                <strong>
                                    {order.customer.address}
                                    {order.customer.landmark
                                        ? `, Near ${order.customer.landmark}`
                                        : ""}
                                </strong>
                            </div>

                            {order.customer.instructions && (
                                <div className="order-details-info-row">
                                    <span>Instructions</span>
                                    <strong>{order.customer.instructions}</strong>
                                </div>
                            )}

                            <div className="order-details-info-row">
                                <span>Payment method</span>
                                <strong>{order.paymentMethod}</strong>
                            </div>

                            {order.status === "Cancelled" && order.cancelledAt && (
                                <div className="order-details-info-row">
                                    <span>Cancelled on</span>
                                    <strong>{order.cancelledAt}</strong>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="order-details-actions">
                        {order.status !== "Cancelled" && (
                            <button
                                type="button"
                                className="order-details-cancel-btn"
                                onClick={handleCancelOrder}
                            >
                                Cancel Order
                            </button>
                        )}

                        <Link to="/" className="btn btn-primary">
                            Order More Food
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}