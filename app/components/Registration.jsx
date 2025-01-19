import React, { useState, useEffect } from 'react';
import { formatDate } from "@/app/lib/utils";

const Registration = ({ date, time, onClose }) => {
    const formattedDate = formatDate(date);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Detect system theme (dark or light)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleThemeChange = (e) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleThemeChange);

        return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.phone) {
            alert('All fields are required!');
            return;
        }

        console.log('Form submitted:', formData);
        // TODO: Add your form submission logic here
        onClose(); // Close the modal after submission
    };

    return (
        <div
            className={`p-6 rounded-lg shadow-lg max-w-md mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} relative`}
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
                &times; {/* icon "X" */}
            </button>
            <h3 className="text-xl font-bold mb-4">Registration Form</h3>
            <p className="mb-2">Selected Date: {formattedDate}</p>
            <p className="mb-4">Selected Time: {time}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className={`w-full py-2 rounded mt-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                >
                    Close
                </button>
            </form>
        </div>
    );
};

export default Registration;
