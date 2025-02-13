"use client";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/app/utils/helper";
import { fetchSignIn, validateToken } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function SignIn({ toggleSignUp }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email Validation
        const emailError = validateEmail(email);
        if (!emailError) {
            setError("Please enter a valid email address.");
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
            console.log("login: ");
            // Attempting to connect
            const logIn = await fetchSignIn(email, password);

            if (logIn.success) {
                // If the user selected Remember me, we will save the JWT in a cookie.
                if (rememberMe) {
                    document.cookie = `jwt=${logIn.data.session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; httpOnly; SameSite=Strict`;
                    document.cookie = `email=${email}; path=/; max-age=${60 * 60 * 24 * 7}; secure; httpOnly`;
                } else {
                    // If "Remember me" was not selected, we save the token in sessionStorage
                    sessionStorage.setItem('jwt', logIn.data.session.access_token);
                    sessionStorage.setItem('email', email);
                }

                // Check token validity before proceeding
                try {
                    const token = rememberMe
                        ? document.cookie.includes('jwt')
                            ? logIn.data.session.access_token  // Take token from response if 'remember me' is checked
                            : null // Do not send token from sessionStorage if cookies were set
                        : sessionStorage.getItem('jwt');

                    // Validate token
                    const data = await validateToken(token);

                    if (data?.data?.user?.role?.toLowerCase() === 'authenticated') {
                        router.push(`/dashboard/panel`);
                    } else {
                        setError("Invalid token or session expired.");
                    }
                } catch (error) {
                    setError("Invalid token or session expired.");
                }
            } else {
                setError(logIn.message || "Invalid email or password.");
            }

        } catch (error) {
            setError("There was an issue with the login process. Please try again.");
        }
    };

    return (
        <>
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
                <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                    Sign In
                </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
                Dont have an account?
                <a
                    className="text-indigo-600 hover:text-indigo-400 font-medium ml-2"
                    onClick={() => toggleSignUp(true)}
                >
                    Account activation
                </a>
            </div>
        </>
    );
}
