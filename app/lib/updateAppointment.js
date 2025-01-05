import { supabase } from './supabase';

/*Updates an existing appointment in the calendar table*/
export const updateAppointment = async () => {
    try {
        const { data, error } = await supabase
            .from('calendar') // Table name
            .update({ date: newAppointment.date, time: newAppointment.time }) // עדכון רק את התאריך והשעה
            .eq('firstName', newAppointment.firstName) // חיפוש לפי שם פרטי
            .eq('lastName', newAppointment.lastName) // חיפוש לפי שם משפחה
            .eq('phoneNumber', newAppointment.phoneNumber); // חיפוש לפי מספר טלפון

        if (error) {
            console.error('Error updating appointment:', error.message); // הצגת הודעת השגיאה עם פרטים
            return;
        }

        console.log('Appointment updated successfully:', data); // הצגת הודעת הצלחה עם הנתונים המעודכנים
    } catch (err) {
        console.error('Unexpected error:', err.message); // טיפול בשגיאות לא צפויות
    }
};

const newAppointment = {
    firstName: 'shay',
    lastName: 'lip',
    phoneNumber: '05',
    date: '2031-11-11',
    time: '11:30'
};
