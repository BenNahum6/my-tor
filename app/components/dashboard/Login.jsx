"use client";
import { useState, useEffect } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(""); // למעקב אחרי שגיאות
    const [showPassword, setShowPassword] = useState(false); // מצבים להראות/להסתיר סיסמה

    /* Loads the values from localStorage if any */
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);

        // בדיקת אימייל עם ביטוי רגולרי
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // בדיקת סיסמה: לפחות 10 תווים, אות גדולה, תו מיוחד, וכוללת אותיות ומספרים
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{10,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 10 characters long, include at least one uppercase letter, one number, and one special character.");
            return;
        }

        // בדיקת התאמה למערכת (לדוגמה, אימייל וסיסמה נכונים)
        const validUsers = [
            { email: "user@example.com", password: "Password123!" },
            { email: "admin@example.com", password: "Admin123!" }
        ];

        const user = validUsers.find(user => user.email === email && user.password === password);
        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        setError(""); // איפוס שגיאות אם כל הבדיקות עברו

        if (rememberMe) {
            // שומר את המידע ב-localStorage אם "זכור אותי" נבחר
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
        } else {
            // מסיר את המידע אם "זכור אותי" לא נבחר
            localStorage.removeItem("email");
            localStorage.removeItem("password");
        }
    };

    return (
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2 text-gray-600"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                    Sign In
                </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Sign up
                </a>
            </div>
        </div>
    );
}
