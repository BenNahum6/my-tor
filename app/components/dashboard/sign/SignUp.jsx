import { useState } from "react";
import {validateEmail, validateFullName, validatePassword} from "@/app/utils/helper";
import {fetchSignUp} from "@/app/lib/api";

export default function SignUp({ toggleSignUp }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email Validation
        const emailError = validateEmail(email);
        if (!emailError) {
            setError("Please enter a valid email address.");
            return;
        }

        // Full name validation
        const nameError = validateFullName(username);
        if (!nameError) {
            setError("Full name must contain at least 2 letters and can be entered with spaces and without symbols.");
            return;
        }

        // Password validation
        const passwordRegex = validatePassword(password);
        if (!passwordRegex) {
            setError("Password must be at least 10 characters long, include at least one uppercase letter, one number, and one special character.");
            return;
        }

        setError(""); // If all tests pass, we will clear the error.

        try {
            // Attempting to connect
            const logIn = await fetchSignUp(email, username, password);

            if (logIn.success) {
                alert('Account activated successfully !');
                toggleSignUp(false);
            } else {
                // הצגת שגיאה ב-Popup
                setError(logIn.message || "Invalid details.");
            }

        } catch (error) {
            setError("There was an issue with the login process. Please try again.");
            // alert("There was an issue with the login process. Please try again.");
        }

    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Activate account</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900"
                        placeholder="John Doe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="mt-10">
                    <input
                        type="submit"
                        value="Activate"
                        className="py-3 bg-green-500 text-white w-full rounded hover:bg-green-600"
                    />
                </div>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?
                <a
                    className="text-green-600 hover:text-green-400 font-medium ml-2"
                    onClick={() => toggleSignUp(false)}
                >
                    Sign in
                </a>
            </div>
        </>
    );
}
