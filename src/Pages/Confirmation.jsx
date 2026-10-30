import { Link, useNavigate } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";

export default function Confirmation() {
    const { lastOrder } = useOrder();
    const navigate = useNavigate();

    if (!lastOrder) {
        return (
            <section className="page-section">
                <div className="confirmation-card">
                    <h1>No order found</h1>
                    <p>It looks like there is no recent order to display.</p>
                    <Link to="/" className="btn-primary">
                        Back to home
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="page-section">
            <div className="confirmation-card">
                <div className="confirmation-icon">✅</div>

                <h1>Order confirmed!</h1>

                <p className="confirmation-text">
                    Your order {lastOrder.orderId || lastOrder.id} has been placed successfully.
                </p>

                <div className="confirmation-details">
                    <div className="confirmation-row">
                        <span>Restaurant</span>
                        <strong>{lastOrder.restaurantName || "Selected Restaurant"}</strong>
                    </div>
                    <div className="confirmation-row">
                        <span>Amount</span>
                        <strong>₹{lastOrder.grandTotal || lastOrder.total}</strong>
                    </div>
                    <div className="confirmation-row">
                        <span>Address</span>
                        <strong>{lastOrder.customer?.address || lastOrder.address}</strong>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <Link to="/orders" className="btn-primary">
                        View orders
                    </Link>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        Back to home
                    </button>
                </div>
            </div>
        </section>
    );
}