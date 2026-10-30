import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useOrder } from "../Context/OrderContext";

export default function Checkout() {
    const { cartItems, total, clearCart } = useCart();
    const { placeOrder } = useOrder();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [landmark, setLandmark] = useState("");
    const [instructions, setInstructions] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const [errors, setErrors] = useState({});

    const deliveryFee = cartItems.length > 0 ? 40 : 0;
    const grandTotal = total + deliveryFee;

    if (cartItems.length === 0) {
        return (
            <main className="container checkout-page">
                <section className="checkout-empty">
                    <h1>Your cart is empty</h1>
                    <p>Add food before moving to checkout.</p>

                    <Link to="/" className="btn btn-primary">
                        Explore restaurants
                    </Link>
                </section>
            </main>
        );
    }

    function validateForm() {
        const newErrors = {};

        if (name.trim().length < 2) {
            newErrors.name = "Please enter your full name.";
        }

        const cleanPhone = phone.replace(/\D/g, "");

        if (cleanPhone.length !== 10) {
            newErrors.phone = "Enter a valid 10-digit phone number.";
        }

        if (address.trim().length < 10) {
            newErrors.address = "Please enter your complete delivery address.";
        }

        if (paymentMethod === "card") {
            const cleanCardNumber = cardNumber.replace(/\s/g, "");

            if (cardName.trim().length < 2) {
                newErrors.cardName = "Please enter the name on the card.";
            }

            if (cleanCardNumber.length < 12 || cleanCardNumber.length > 19) {
                newErrors.cardNumber = "Enter a valid card number.";
            }

            const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

            if (!expiryPattern.test(expiry)) {
                newErrors.expiry = "Use MM/YY format, for example 08/28.";
            }

            if (!/^\d{3,4}$/.test(cvv)) {
                newErrors.cvv = "CVV must contain 3 or 4 digits.";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const orderData = {
            orderId: `FOOD${Date.now().toString().slice(-7)}`,
            customer: {
                name: name.trim(),
                phone: phone.replace(/\D/g, ""),
                address: address.trim(),
            },
            items: cartItems,
            subtotal: total,
            deliveryFee: deliveryFee,
            grandTotal: grandTotal,
            paymentMethod: paymentMethod,
            status: "Confirmed",
            orderedAt: new Date().toLocaleString("en-IN"),
        };

        placeOrder(orderData);
        clearCart();

        navigate("/order-confirmation");
    }

    return (
        <main className="checkout-page">
            <div className="container">
                <Link to="/cart" className="checkout-back-link">
                    ← Back to cart
                </Link>

                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-layout">
                    <form className="checkout-form-card" onSubmit={handleSubmit} noValidate>
                        <section className="checkout-section">
                            <h2>Delivery details</h2>

                            <div className="form-group">
                                <label htmlFor="name">Full name</label>
                                <input
                                    id="name"
                                    className={errors.name ? "form-input input-error" : "form-input"}
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    autoComplete="name"
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />
                                {errors.name && (
                                    <p id="name-error" className="field-error">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone number</label>
                                <input
                                    id="phone"
                                    className={errors.phone ? "form-input input-error" : "form-input"}
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="10-digit mobile number"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    autoComplete="tel"
                                    aria-invalid={Boolean(errors.phone)}
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="field-error">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Delivery address</label>
                                <textarea
                                    id="address"
                                    className={errors.address ? "form-textarea input-error" : "form-textarea"}
                                    placeholder="House/flat number, street, area, city"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    autoComplete="street-address"
                                    rows="4"
                                    aria-invalid={Boolean(errors.address)}
                                    aria-describedby={errors.address ? "address-error" : undefined}
                                />
                                {errors.address && (
                                    <p id="address-error" className="field-error">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="landmark">Landmark (optional)</label>
                                <input
                                    id="landmark"
                                    className="form-input"
                                    type="text"
                                    placeholder="Near a school, shop, temple, etc."
                                    value={landmark}
                                    onChange={(event) => setLandmark(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="instructions">
                                    Delivery instructions (optional)
                                </label>
                                <textarea
                                    id="instructions"
                                    className="form-textarea"
                                    placeholder="Example: Please call when you arrive."
                                    value={instructions}
                                    onChange={(event) => setInstructions(event.target.value)}
                                    rows="3"
                                />
                            </div>
                        </section>

                        <section className="checkout-section">
                            <h2>Payment method</h2>

                            <div className="payment-options">
                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={paymentMethod === "cod"}
                                        onChange={(event) => setPaymentMethod(event.target.value)}
                                    />
                                    <span>
                                        <strong>Cash on Delivery</strong>
                                        <small>Pay when your order arrives.</small>
                                    </span>
                                </label>

                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="upi"
                                        checked={paymentMethod === "upi"}
                                        onChange={(event) => setPaymentMethod(event.target.value)}
                                    />
                                    <span>
                                        <strong>UPI (Demo)</strong>
                                        <small>This is a frontend-only demo payment option.</small>
                                    </span>
                                </label>

                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={(event) => setPaymentMethod(event.target.value)}
                                    />
                                    <span>
                                        <strong>Credit / Debit Card (Demo)</strong>
                                        <small>Card details are not saved by this app.</small>
                                    </span>
                                </label>
                            </div>

                            {paymentMethod === "card" && (
                                <div className="card-details">
                                    <p className="demo-warning">
                                        Demo only: do not enter a real card number or real CVV.
                                    </p>

                                    <div className="form-group">
                                        <label htmlFor="cardName">Name on card</label>
                                        <input
                                            id="cardName"
                                            className={
                                                errors.cardName ? "form-input input-error" : "form-input"
                                            }
                                            type="text"
                                            placeholder="Name written on card"
                                            value={cardName}
                                            onChange={(event) => setCardName(event.target.value)}
                                            autoComplete="cc-name"
                                            aria-invalid={Boolean(errors.cardName)}
                                        />
                                        {errors.cardName && (
                                            <p className="field-error">{errors.cardName}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card number</label>
                                        <input
                                            id="cardNumber"
                                            className={
                                                errors.cardNumber
                                                    ? "form-input input-error"
                                                    : "form-input"
                                            }
                                            type="tel"
                                            inputMode="numeric"
                                            placeholder="Use dummy digits only"
                                            value={cardNumber}
                                            onChange={(event) => setCardNumber(event.target.value)}
                                            autoComplete="cc-number"
                                            aria-invalid={Boolean(errors.cardNumber)}
                                        />
                                        {errors.cardNumber && (
                                            <p className="field-error">{errors.cardNumber}</p>
                                        )}
                                    </div>

                                    <div className="card-row">
                                        <div className="form-group">
                                            <label htmlFor="expiry">Expiry</label>
                                            <input
                                                id="expiry"
                                                className={
                                                    errors.expiry ? "form-input input-error" : "form-input"
                                                }
                                                type="text"
                                                placeholder="MM/YY"
                                                value={expiry}
                                                onChange={(event) => setExpiry(event.target.value)}
                                                autoComplete="cc-exp"
                                                aria-invalid={Boolean(errors.expiry)}
                                            />
                                            {errors.expiry && (
                                                <p className="field-error">{errors.expiry}</p>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="cvv">CVV</label>
                                            <input
                                                id="cvv"
                                                className={
                                                    errors.cvv ? "form-input input-error" : "form-input"
                                                }
                                                type="password"
                                                inputMode="numeric"
                                                placeholder="Demo only"
                                                value={cvv}
                                                onChange={(event) => setCvv(event.target.value)}
                                                autoComplete="cc-csc"
                                                aria-invalid={Boolean(errors.cvv)}
                                            />
                                            {errors.cvv && (
                                                <p className="field-error">{errors.cvv}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        <button type="submit" className="btn btn-primary confirm-order-btn">
                            Confirm order • ₹{grandTotal}
                        </button>
                    </form>

                    <aside className="checkout-summary-card">
                        <h2>Order summary</h2>

                        <div className="checkout-items">
                            {cartItems.map((item) => (
                                <div
                                    className="checkout-item"
                                    key={`${item.restaurantId}-${item.dish.id}`}
                                >
                                    <div>
                                        <p className="checkout-item-name">{item.dish.name}</p>
                                        <p className="checkout-item-quantity">
                                            ₹{item.dish.price} × {item.quantity}
                                        </p>
                                    </div>

                                    <strong>₹{item.dish.price * item.quantity}</strong>
                                </div>
                            ))}
                        </div>

                        <div className="checkout-bill-row">
                            <span>Item total</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="checkout-bill-row">
                            <span>Delivery fee</span>
                            <span>₹{deliveryFee}</span>
                        </div>

                        <div className="checkout-grand-total">
                            <span>To pay</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}