import { Link } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";

export default function OrderConfirmation() {
    const { latestOrder } = useOrder();

    if (!latestOrder) {
        return (
            <main className="container confirmation-page">
                <section className="confirmation-card">
                    <h1>No recent order found</h1>

                    <p className="confirmation-text">
                        Your order details will appear here after you complete checkout.
                    </p>

                    <Link to="/" className="btn btn-primary">
                        Explore restaurants
                    </Link>
                </section>
            </main>
        );
    }

    const totalQuantity = latestOrder.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <main className="confirmation-page">
            <div className="container">
                <section className="confirmation-card">
                    <div className="confirmation-icon">✓</div>

                    <p className="confirmation-label">ORDER CONFIRMED</p>

                    <h1>Thanks, {latestOrder.customer.name}!</h1>

                    <p className="confirmation-text">
                        Your food is being prepared and will arrive in approximately
                        <strong> 30–40 minutes.</strong>
                    </p>

                    <div className="delivery-status">
                        <div className="delivery-status__item delivery-status__item--complete">
                            <div className="delivery-status__dot">✓</div>
                            <p>Order placed</p>
                        </div>

                        <div className="delivery-status__line delivery-status__line--active" />

                        <div className="delivery-status__item delivery-status__item--active">
                            <div className="delivery-status__dot">2</div>
                            <p>Preparing food</p>
                        </div>

                        <div className="delivery-status__line" />

                        <div className="delivery-status__item">
                            <div className="delivery-status__dot">3</div>
                            <p>Out for delivery</p>
                        </div>
                    </div>

                    <div className="confirmation-order-id">
                        <span>Order ID</span>
                        <strong>#{latestOrder.orderId}</strong>
                    </div>

                    <div className="confirmation-grid">
                        <section className="confirmation-box">
                            <h2>Order summary</h2>

                            <div className="confirmed-items">
                                {latestOrder.items.map((item) => (
                                    <div
                                        className="confirmed-item"
                                        key={`${item.restaurantId}-${item.dish.id}`}
                                    >
                                        <div>
                                            <p className="confirmed-item__name">
                                                {item.dish.name}
                                            </p>

                                            <p className="confirmed-item__meta">
                                                ₹{item.dish.price} × {item.quantity}
                                            </p>
                                        </div>

                                        <strong>₹{item.dish.price * item.quantity}</strong>
                                    </div>
                                ))}
                            </div>

                            <div className="confirmed-bill-row">
                                <span>Items ({totalQuantity})</span>
                                <span>₹{latestOrder.subtotal}</span>
                            </div>

                            <div className="confirmed-bill-row">
                                <span>Delivery fee</span>
                                <span>₹{latestOrder.deliveryFee}</span>
                            </div>

                            <div className="confirmed-total-row">
                                <span>Total paid</span>
                                <strong>₹{latestOrder.grandTotal}</strong>
                            </div>
                        </section>

                        <section className="confirmation-box">
                            <h2>Delivery details</h2>

                            <div className="detail-group">
                                <span>Delivering to</span>
                                <strong>{latestOrder.customer.name}</strong>
                            </div>

                            <div className="detail-group">
                                <span>Phone</span>
                                <strong>+91 {latestOrder.customer.phone}</strong>
                            </div>

                            <div className="detail-group">
                                <span>Address</span>
                                <strong>
                                    {latestOrder.customer.address}
                                    {latestOrder.customer.landmark
                                        ? `, Near ${latestOrder.customer.landmark}`
                                        : ""}
                                </strong>
                            </div>

                            {latestOrder.customer.instructions && (
                                <div className="detail-group">
                                    <span>Delivery instructions</span>
                                    <strong>{latestOrder.customer.instructions}</strong>
                                </div>
                            )}

                            <div className="detail-group">
                                <span>Payment</span>
                                <strong>{latestOrder.paymentMethod}</strong>
                            </div>

                            <div className="detail-group">
                                <span>Placed on</span>
                                <strong>{latestOrder.orderedAt}</strong>
                            </div>
                        </section>
                    </div>

                    <p className="confirmation-help">
                        Need help with this order? Call us at <strong>+91 98765 43210</strong>.
                    </p>

                    <Link to="/" className="btn btn-primary confirmation-home-btn">
                        Order more food
                    </Link>
                </section>
            </div>
        </main>
    );
}