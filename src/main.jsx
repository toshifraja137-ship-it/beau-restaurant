import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { OrderProvider } from "./Context/OrderContext";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { ToastProvider } from "./Context/ToastContext";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { AuthProvider } from "./Context/AuthContext";
import App from "./App.jsx";
import "./CSS/App.css";
import "./CSS/OrderDetails.css";
import "./CSS/FavoritesContext.css"
import "./CSS/Favorites.css";
import "./CSS/Toast.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <OrderProvider>
              <FavoritesProvider>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </FavoritesProvider>
            </OrderProvider>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);