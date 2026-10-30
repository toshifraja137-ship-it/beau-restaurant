import { Link } from "react-router-dom";
import { useFavorites } from "../Context/FavoritesContext";

export default function RestaurantCard({ restaurant }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(restaurant.id);

    function handleFavoriteClick(event) {
        event.preventDefault();
        event.stopPropagation();

        toggleFavorite(restaurant.id);
    }

    return (
        <article className="restaurant-card">
            <button
                type="button"
                className={
                    favorite
                        ? "restaurant-card__favorite restaurant-card__favorite--active"
                        : "restaurant-card__favorite"
                }
                onClick={handleFavoriteClick}
                aria-label={
                    favorite
                        ? `Remove ${restaurant.name} from favorites`
                        : `Add ${restaurant.name} to favorites`
                }
                aria-pressed={favorite}
            >
                {favorite ? "♥" : "♡"}
            </button>

            <Link
                to={`/restaurant/${restaurant.id}`}
                className="restaurant-card__link"
            >
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="restaurant-card__image"
                />

                <div className="restaurant-card__content">
                    <div className="restaurant-card__title-row">
                        <h3 className="restaurant-card__name">
                            {restaurant.name}
                        </h3>

                        <span className="restaurant-card__rating">
                            ★ {restaurant.rating}
                        </span>
                    </div>

                    <p className="restaurant-card__cuisine">
                        {restaurant.cuisine}
                    </p>

                    <p className="restaurant-card__time">
                        {restaurant.time}
                    </p>
                </div>
            </Link>
        </article>
    );
}

