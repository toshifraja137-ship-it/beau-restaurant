import { Link } from "react-router-dom";
import { restaurants } from "../Data/mockData";
import { useFavorites } from "../Context/FavoritesContext";
import RestaurantCard from "../Components/RestaurantCard";

export default function Favorites() {
    const { favoriteIds } = useFavorites();

    const favoriteRestaurants = restaurants.filter((restaurant) =>
        favoriteIds.includes(restaurant.id)
    );

    console.log(
        "Favorite restaurant IDs:",
        favoriteRestaurants.map((restaurant) => restaurant.id)
    );

    if (favoriteRestaurants.length === 0) {
        return (
            <main className="favorites-page">
                <div className="container">
                    <section className="favorites-empty">
                        <div className="favorites-empty__icon">♡</div>

                        <h1>No favorite restaurants yet</h1>

                        <p>
                            Tap the heart icon on any restaurant to save it here.
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
        <main className="favorites-page">
            <div className="container">
                <section className="favorites-header">
                    <div>
                        <p className="favorites-header__eyebrow">
                            SAVED RESTAURANTS
                        </p>

                        <h1>My Favorites</h1>

                        <p>
                            {favoriteRestaurants.length} favorite restaurant
                            {favoriteRestaurants.length !== 1 ? "s" : ""}.
                        </p>
                    </div>

                    <Link to="/" className="btn btn-primary">
                        Explore more
                    </Link>
                </section>

                <section className="restaurant-grid">
                    {favoriteRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </section>
            </div>
        </main>
    );
}