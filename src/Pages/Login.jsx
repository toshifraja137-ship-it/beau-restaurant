import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email.trim() || !name.trim()) return;
        login(email.trim(), name.trim());
        navigate("/");
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <h1>Welcome back</h1>
                <p className="auth-subtitle">Sign in to continue</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <label>
                        <span>Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                        />
                    </label>

                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </label>

                    <button type="submit" className="btn-primary auth-button">
                        Continue
                    </button>
                </form>

                
                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/signup">Sign up</Link>
</p>

            </div>
        </section>
    );
}