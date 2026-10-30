import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favoriteIds, setFavoriteIds] = useState(() => {
        const savedFavorites = localStorage.getItem("foodie-favorites");

        if (!savedFavorites) {
            return [];
        }

        try {
            return JSON.parse(savedFavorites);
        } catch (error) {
            console.error("Could not read favorite restaurants:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            "foodie-favorites",
            JSON.stringify(favoriteIds)
        );
    }, [favoriteIds]);

    function toggleFavorite(restaurantId) {
        setFavoriteIds((previousFavoriteIds) => {
            const isAlreadyFavorite = previousFavoriteIds.includes(restaurantId);

            if (isAlreadyFavorite) {
                return previousFavoriteIds.filter(
                    (id) => id !== restaurantId
                );
            }

            return [...previousFavoriteIds, restaurantId];
        });
    }

    function isFavorite(restaurantId) {
        return favoriteIds.includes(restaurantId);
    }

    const value = {
        favoriteIds,
        toggleFavorite,
        isFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider"
        );
    }

    return context;
}