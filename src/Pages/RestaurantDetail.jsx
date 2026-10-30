import { Link, useParams } from "react-router-dom";
import { restaurants } from "../Data/mockData";
import DishCard from "../Components/DishCard";

export default function RestaurantDetail() {
    const { id } = useParams();

    const restaurant = restaurants.find(
        (item) => item.id === Number(id)
    );

    if (!restaurant) {
        return (
            <main className="container" style={styles.page}>
                <h1>Restaurant not found</h1>
                <Link to="/" style={styles.backLink}>
                    ← Back to restaurants
                </Link>
            </main>
        );
    }

    return (
        <main className="container" style={styles.page}>
            <Link to="/" style={styles.backLink}>
                ← Back to restaurants
            </Link>

            <section style={styles.hero}>
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={styles.restaurantImage}
                />

                <div>
                    <h1 style={styles.name}>{restaurant.name}</h1>
                    <p style={styles.cuisine}>{restaurant.cuisine}</p>

                    <div style={styles.meta}>
                        <span style={styles.rating}>★ {restaurant.rating}</span>
                        <span>{restaurant.time}</span>
                    </div>
                </div>
            </section>

            <section style={styles.menuSection}>
                <h2 style={styles.menuTitle}>Recommended dishes</h2>

                {restaurant.dishes.map((dish) => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        restaurantId={restaurant.id}
                    />
                ))}
            </section>
        </main>
    );
}

const styles = {
    page: {
        padding: "2rem 0 3rem",
    },
    backLink: {
        display: "inline-block",
        color: "#e63946",
        fontWeight: 700,
        marginBottom: "1.25rem",
    },

    hero: {
        display: "flex",
        gap: "1.25rem",
        alignItems: "center",
        background: "var(--bg-surface)",
        color: "var(--text-main)",
        padding: "1rem",
        borderRadius: "12px",
        boxShadow: "0 5px 16px var(--shadow-color)",
        border: "1px solid var(--border-color)",
        marginBottom: "2rem",
    },

    cuisine: {
        color: "var(--text-secondary)",
        marginBottom: "0.75rem",
    },

    meta: {
        display: "flex",
        alignItems: "center",
        gap: "0.85rem",
        color: "var(--text-secondary)",
        fontSize: "0.95rem",
    },
    restaurantImage: {
        width: "170px",
        height: "130px",
        objectFit: "cover",
        borderRadius: "10px",
    },
    name: {
        fontSize: "1.8rem",
        marginBottom: "0.35rem",
    },

    rating: {
        background: "#198754",
        color: "#fff",
        borderRadius: "5px",
        padding: "0.2rem 0.45rem",
        fontWeight: 700,
    },
    menuSection: {
        maxWidth: "760px",
    },
    menuTitle: {
        fontSize: "1.4rem",
        marginBottom: "1rem",
    },
};