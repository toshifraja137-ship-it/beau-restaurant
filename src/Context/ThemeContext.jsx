import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function getInitialTheme() {
    const savedTheme = localStorage.getItem("foodie-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    return systemPrefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("foodie-theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((previousTheme) =>
            previousTheme === "light" ? "dark" : "light"
        );
    }

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}