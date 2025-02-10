"use client";
import { useState } from "react";
import SignIn from "./sign/SignIn";
import SignUp from "./sign/SignUp";

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);  // יצירת ה-state

    const toggleSignUp = () => setIsSignUp(!isSignUp);  // פונקציה להחלפת הערך של isSignUp

    return (
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            {!isSignUp ? <SignIn toggleSignUp={toggleSignUp} /> : <SignUp toggleSignUp={toggleSignUp} />}
        </div>
    );
}
