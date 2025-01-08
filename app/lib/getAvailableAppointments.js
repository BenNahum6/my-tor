import { supabase } from '../../lib/supabase';

// פונקציה לקבלת שעות פנויות בתאריך מסוים
const getAvailableAppointments = async (date) => {
    try {
        // חיפוש בדאטה בייס לפי תאריך ו-available: true
        const { data, error } = await supabase
            .from('calendar')
            .select('time') // רק את השדה של הזמן
            .eq('date', date)  // חיפוש לפי תאריך
            .eq('available', true); // חיפוש לפי הערך available

        if (error) {
            console.error('Error fetching available appointments:', error.message);
            return [];
        }

        // אם מצאנו תורים זמינים, מחזירים את רשימת השעות
        if (data.length > 0) {
            console.log(`Found available appointments for ${date}:`, data);
            return data.map(appointment => appointment.time); // מחזירים את רשימת השעות
        } else {
            console.log(`No available appointments for ${date}`);
            return []; // אם לא מצאנו שום תור זמין
        }
    } catch (err) {
        console.error('Unexpected error while fetching available appointments:', err.message);
        return [];
    }
};

//
const date = '2025-01-10'; // תאריך לדוגמה
const availableAppointments = await getAvailableAppointments(date);
console.log('Available appointments:', availableAppointments);
