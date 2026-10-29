
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useFavorites } from "../Context/FavoritesContext";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
    const { favoriteIds } = useFavorites();
    const { cartItems } = useCart();
    const count = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const { theme, toggleTheme } = useTheme();
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    if (!isLoggedIn) {
        return null;
    }

    function handleLogout() {
        setMenuOpen(false);
        logout();
        navigate("/", { replace: true });
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="navbar">
            <div className="container navbar-inner">

                <Link
                    to="/"
                    className="brand"
                    onClick={closeMenu}
                    aria-label="BEAU home"
                >
                    <span className="brand-mark">B</span>
                    <span className="brand-name">BEAU</span>
                    <span className="brand-tagline">
                        FOOD, MADE BETTER
                    </span>
                </Link>

                <button
                    type="button"
                    className="mobile-menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                <nav
                    id="main-navigation"
                    className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}
                    aria-label="Main navigation"
                >
                    <Link
                        to="/orders"
                        className="nav-item"
                        onClick={closeMenu}
                    >
                        My Orders
                    </Link>

                    <Link
                        to="/favorites"
                        className="nav-item"
                        onClick={closeMenu}
                    >
                        Favorites
                        {favoriteIds.length > 0 && (
                            <span className="nav-badge">
                                {favoriteIds.length}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/cart"
                        className="nav-cart"
                        onClick={closeMenu}
                    >
                        <span aria-hidden="true">🛒</span>
                        <span>Cart</span>
                        {count > 0 && (
                            <span className="nav-badge">
                                {count}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={
                            theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                        title={
                            theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                    >
                        {theme === "light" ? "☾" : "☀"}
                    </button>

                    <div className="nav-account">
                        <span className="nav-avatar" aria-hidden="true">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                        <span className="navbar-user">
                            {user?.name || "User"}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="nav-logout"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}
