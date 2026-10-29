import { createContext, useContext, useRef, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState({
        message: "",
        type: "success",
        isVisible: false,
    });

    const timeoutRef = useRef(null);

    function showToast(message, type = "success") {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setToast({
            message,
            type,
            isVisible: true,
        });

        timeoutRef.current = setTimeout(() => {
            setToast((previousToast) => ({
                ...previousToast,
                isVisible: false,
            }));
        }, 3000);
    }

    function hideToast() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setToast((previousToast) => ({
            ...previousToast,
            isVisible: false,
        }));
    }

    const value = {
        showToast,
        hideToast,
    };

    return (
        <ToastContext.Provider value={value}>
            {children}

            <div
                className={
                    toast.isVisible
                        ? `toast toast--visible toast--${toast.type}`
                        : "toast"
                }
                role="status"
                aria-live="polite"
                aria-atomic="true"
            >
                <span className="toast__icon">
                    {toast.type === "success" ? "✓" : "!"}
                </span>

                <p className="toast__message">{toast.message}</p>

                <button
                    type="button"
                    className="toast__close-btn"
                    onClick={hideToast}
                    aria-label="Close notification"
                >
                    ×
                </button>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}