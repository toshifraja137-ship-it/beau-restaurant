import { useState } from "react";
import { restaurants } from "../Data/mockData";
import RestaurantCard from "../Components/RestaurantCard";

const cuisines = [
    "All",
    "Japanese",
    "Italian",
    "American",
    "Indian",
    "Asian",
    "Mexican",
];

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCuisine, setSelectedCuisine] = useState("All");
    const [sortBy, setSortBy] = useState("recommended");

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const searchableText = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();

        const matchesSearch = searchableText.includes(
            searchTerm.trim().toLowerCase()
        );

        const matchesCuisine =
            selectedCuisine === "All" ||
            restaurant.cuisine
                .toLowerCase()
                .includes(selectedCuisine.toLowerCase());

        return matchesSearch && matchesCuisine;
    });

    const visibleRestaurants = [...filteredRestaurants].sort(
        (firstRestaurant, secondRestaurant) => {
            if (sortBy === "rating") {
                return secondRestaurant.rating - firstRestaurant.rating;
            }

            if (sortBy === "deliveryTime") {
                const firstTime = Number.parseInt(firstRestaurant.time, 10);
                const secondTime = Number.parseInt(secondRestaurant.time, 10);

                return firstTime - secondTime;
            }

            return 0;
        }
    );

    function handleClearFilters() {
        setSearchTerm("");
        setSelectedCuisine("All");
        setSortBy("recommended");
    }

    return (
        <main className="home-page">
            <div className="container">
                <section className="home-hero">
                    <p className="home-eyebrow">WELCOME TO BEAU</p>

                    <h1 className="home-title">
                        Discover food you’ll love
                    </h1>

                    <p className="home-subtitle">
                        Browse local restaurants, explore menus, and order your favourite
                        dishes.
                    </p>
                </section>

                <section className="restaurant-controls">
                    <div className="restaurant-search-wrapper">
                        <span className="restaurant-search-icon">⌕</span>

                        <input
                            className="restaurant-search"
                            type="search"
                            placeholder="Search restaurant or cuisine..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            aria-label="Search restaurants or cuisines"
                        />
                    </div>

                    <div className="restaurant-sort-wrapper">
                        <label htmlFor="restaurant-sort">
                            Sort by:
                        </label>

                        <select
                            id="restaurant-sort"
                            className="restaurant-sort"
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                        >
                            <option value="recommended">Recommended</option>
                            <option value="rating">Rating: High to Low</option>
                            <option value="deliveryTime">Delivery Time: Fastest</option>
                        </select>
                    </div>
                </section>

                <section className="cuisine-filter-section">
                    <p className="cuisine-filter-label">Browse by cuisine</p>

                    <div className="cuisine-chips">
                        {cuisines.map((cuisine) => (
                            <button
                                key={cuisine}
                                type="button"
                                className={
                                    selectedCuisine === cuisine
                                        ? "cuisine-chip cuisine-chip--active"
                                        : "cuisine-chip"
                                }
                                onClick={() => setSelectedCuisine(cuisine)}
                            >
                                {cuisine}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="restaurant-results-header">
                    <p className="restaurant-result-count">
                        {visibleRestaurants.length} restaurant
                        {visibleRestaurants.length !== 1 ? "s" : ""} found
                    </p>

                    {(searchTerm || selectedCuisine !== "All" || sortBy !== "recommended") && (
                        <button
                            type="button"
                            className="clear-filters-btn"
                            onClick={handleClearFilters}
                        >
                            Clear filters
                        </button>
                    )}
                </section>

                {visibleRestaurants.length === 0 ? (
                    <section className="restaurant-empty">
                        <div className="restaurant-empty__icon">🍽️</div>

                        <h2>No restaurants found</h2>

                        <p>
                            We could not find any restaurants matching
                            {searchTerm ? ` “${searchTerm}”` : " your filters"}.
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleClearFilters}
                        >
                            Clear filters
                        </button>
                    </section>
                ) : (
                    <section className="restaurant-grid">
                        {visibleRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                            />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}