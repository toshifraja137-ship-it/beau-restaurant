import { useCart } from "../Context/CartContext";

export default function CartItem({ item }) {
    const { increaseQuantity, decreaseQuantity } = useCart();

    const { dish, quantity, restaurantId } = item;
    const itemTotal = dish.price * quantity;

    return (
        <article className="cart-item">
            <img
                src={dish.image}
                alt={dish.name}
                className="cart-item__image"
            />

            <div className="cart-item__details">
                <h3 className="cart-item__name">{dish.name}</h3>
                <p className="cart-item__price-label">₹{dish.price} each</p>
            </div>

            <div className="cart-item__actions">
                <div className="cart-item__quantity-box">
                    <button
                        type="button"
                        className="cart-item__quantity-button"
                        onClick={() => decreaseQuantity(dish.id, restaurantId)}
                        aria-label={`Decrease quantity of ${dish.name}`}
                    >
                        −
                    </button>

                    <span className="cart-item__quantity">{quantity}</span>

                    <button
                        type="button"
                        className="cart-item__quantity-button"
                        onClick={() => increaseQuantity(dish.id, restaurantId)}
                        aria-label={`Increase quantity of ${dish.name}`}
                    >
                        +
                    </button>
                </div>

                <p className="cart-item__total">₹{itemTotal}</p>
            </div>
        </article>
    );
}