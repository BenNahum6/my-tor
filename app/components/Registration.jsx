import React, { useState, useEffect } from 'react';
import { formatDate } from "@/app/utils/helper";
import { fetchResetAppointment, fetchSetAppointment } from "@/app/lib/api";

const Registration = ({ slug, date, time, onClose, onTimeout }) => {
    const formattedDate = formatDate(date);
    const timeInSec = 3 * 60; // הזמן שנותר מוצג למשתמש.
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [timer, setTimer] = useState(null); // ניהול טיימר
    const [timeLeft, setTimeLeft] = useState(timeInSec);
    const [isTimeExpired, setIsTimeExpired] = useState(false);

    // סטייט להודעות שגיאה
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    // Detect system theme (dark or light)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleThemeChange = (e) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleThemeChange);

        // התחל את הטיימר כשהמשתמש נכנס לטופס
        const timeoutId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timeoutId);
                    setIsTimeExpired(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        setTimer(timeoutId);

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
            clearInterval(timeoutId); // עצירת הטיימר אם הרכיב לא נמצא
        };
    }, []);

    const stopTimer = () => {
        clearInterval(timer);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;
        const newErrors = { firstName: '', lastName: '', phone: '' };

        if (timeLeft <= 0) {
            setErrors({ ...newErrors, global: 'הזמן עבר, הטופס לא יכול להישלח.' });
            return;
        }

        // בדיקת שדות חובה
        if (!formData.firstName || !formData.lastName || !formData.phone) {
            valid = false;
            if (!formData.firstName) newErrors.firstName = 'שדה חובה';
            if (!formData.lastName) newErrors.lastName = 'שדה חובה';
            if (!formData.phone) newErrors.phone = 'שדה חובה';
        }

        // בדיקת תקינות השדות
        const nameRegex = /^[a-zA-Z]+$/;
        const phoneRegex = /^05\d{8}$/; // תבנית 05XXXXXXXX

        if (!nameRegex.test(formData.firstName)) {
            valid = false;
            newErrors.firstName = 'שם פרטי יכול להכיל רק אותיות';
        }

        if (!nameRegex.test(formData.lastName)) {
            valid = false;
            newErrors.lastName = 'שם משפחה יכול להכיל רק אותיות';
        }

        if (!phoneRegex.test(formData.phone)) {
            valid = false;
            newErrors.phone = 'מספר הטלפון חייב להכיל 10 ספרות בתבנית נכונה';
        }

        if (!valid) {
            setErrors(newErrors); // עדכון ההודעות אם יש שגיאות
            return;
        }

        const data = await fetchSetAppointment(slug, date, time, formData.firstName, formData.lastName, formData.phone);

        stopTimer(); // אם המשתמש הגיש את הנתונים, נעצור את הטיימר
        onClose(); // סגירת המודל אחרי שליחת הנתונים
    };

    /* Handles exit from form */
    const handleExit = async () => {
        // אם הזמן לא עבר, שולחים בקשה לאיפוס התור
        if (!isTimeExpired) {
            await fetchResetAppointment(slug, date, time);
        }

        window.location.reload();

        onClose();
    };

    const formatTimeLeft = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div
            className={`p-6 rounded-lg shadow-lg max-w-md mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} relative`}
        >
            <button
                onClick={handleExit} // קריאה לפונקציה לשחרור התור אם המשתמש יצא
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
                    {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
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
                    {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
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
                    {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                </div>
                <button
                    type="submit"
                    disabled={timeLeft <= 0} // מניעה מהשליחה אחרי 3 דקות
                    className={`w-full py-2 rounded ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'} ${timeLeft <= 0 ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={handleExit}
                    className={`w-full py-2 rounded mt-2 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                >
                    Close
                </button>
            </form>
            {/* הצגת זמן נותר */}
            <div className="flex justify-center mt-4 text-lg font-medium">
                {isTimeExpired ? (
                    <p className="text-red-500">The time has expired. Please choose a new appointment.</p>
                ) : (
                    <p>Time left: {formatTimeLeft(timeLeft)}</p>
                )}
            </div>
        </div>
    );
};

export default Registration;
