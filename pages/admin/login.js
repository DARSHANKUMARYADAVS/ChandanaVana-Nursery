import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Admin credentials declared here (avoid using hardcoded credentials in production)
    const credentials = {
        adminUsername: "admin",
        adminPassword: "password",
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === credentials.adminUsername && password === credentials.adminPassword) {
            localStorage.setItem("isAdmin", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="login-container">
            <h2>🔑 Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={error ? "input-error" : ""}
                    />
                </div>

                <div className="input-group password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={error ? "input-error" : ""}
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "👁️" : "🙈"}
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="login-button">Login</button>
            </form>

            <style jsx>{`
                .login-container {
                    max-width: 400px;
                    margin: 50px auto;
                    padding: 20px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                h2 {
                    margin-bottom: 20px;
                }

                .input-group {
                    margin-bottom: 15px;
                }

                input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 16px;
                }

                .input-error {
                    border-color: red;
                }

                .password-group {
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .toggle-password {
                    position: absolute;
                    right: 10px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 16px;
                }

                .error-message {
                    color: red;
                    margin-bottom: 10px;
                }

                .login-button {
                    width: 100%;
                    padding: 10px;
                    background: #136f19;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                }

                .login-button:hover {
                    background: #0e5c14;
                }
            `}</style>
        </div>
    );
}
