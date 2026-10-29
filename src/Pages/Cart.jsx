import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import CartItem from "../Components/CartItem";

export default function Cart() {
    const { cartItems, total } = useCart();
    const navigate = useNavigate();

    const deliveryFee = cartItems.length > 0 ? 40 : 0;
    const grandTotal = total + deliveryFee;

    function handlePlaceOrder() {
        navigate("/checkout");
    }

    if (cartItems.length === 0) {
        return (
            <section className="page-section">
                <div className="cart-empty">
                    <h1>Your cart is empty</h1>

                    <p>
                        Add something tasty from a restaurant to continue.
                    </p>

                    <Link to="/" className="btn-primary">
                        Explore restaurants
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="page-section">
            <div className="cart-page">
                <h1 className="cart-title">Your cart</h1>

                <div className="cart-layout">
                    <div className="cart-box">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <aside className="bill-box">
                        <h2>Bill details</h2>

                        <div className="bill-row">
                            <span>Item total</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="bill-row">
                            <span>Delivery fee</span>
                            <span>₹{deliveryFee}</span>
                        </div>

                        <div className="total-row">
                            <span>Grand total</span>
                            <span>₹{grandTotal}</span>
                        </div>

                        <button
                            type="button"
                            className="btn-primary order-button"
                            onClick={handlePlaceOrder}
                        >
                            Place order
                        </button>
                    </aside>
                </div>
            </div>
        </section>
    );
}