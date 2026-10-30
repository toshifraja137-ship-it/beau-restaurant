import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Navbar from "./Components/Navbar";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import RestaurantDetail from "./Pages/RestaurantDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Confirmation from "./Pages/Confirmation";
import Orders from "./Pages/Orders";
import OrderDetails from "./Pages/OrderDetails";
import Favorites from "./Pages/Favorites";
import Signup from "./Pages/Signup";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/:id"
          element={
            <ProtectedRoute>
              <RestaurantDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}