import { useCart } from "../Context/CartContext";
import { useToast } from "../Context/ToastContext";

export default function DishCard({ dish, restaurantId }) {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    function handleAddToCart() {
        addToCart(dish, restaurantId);

        showToast(`${dish.name} added to cart`, "success");
    }

    return (
        <article className="dish-card">
            <div className="dish-card__content">
                <div className="dish-card__top">
                    <span className="dish-card__veg-icon">●</span>

                    <h3 className="dish-card__name">{dish.name}</h3>
                </div>

                <p className="dish-card__description">
                    {dish.description}
                </p>

                <p className="dish-card__price">
                    ₹{dish.price}
                </p>
            </div>

            <div className="dish-card__image-box">
                <img
                    className="dish-card__image"
                    src={dish.image}
                    alt={dish.name}
                />

                <button
                    type="button"
                    className="dish-card__add-btn"
                    onClick={handleAddToCart}
                >
                    ADD
                </button>
            </div>
        </article>
    );
}