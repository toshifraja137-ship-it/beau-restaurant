
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function getSavedUser() {
    try {
        const saved = localStorage.getItem("foodie-user");
        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getSavedUser);

    function login(email, name) {
        const fakeUser = { email, name };
        setUser(fakeUser);
        localStorage.setItem("foodie-user", JSON.stringify(fakeUser));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("foodie-user");
    }

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
