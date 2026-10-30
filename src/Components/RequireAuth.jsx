import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function RequireAuth({ children }) {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate("/login", { replace: true });
        }
    }, [isLoggedIn, loading, navigate]);

    if (loading || !isLoggedIn) {
        return null;
    }

    return children;
}