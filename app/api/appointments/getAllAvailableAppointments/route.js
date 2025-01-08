import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req) {
        try {
                // קבלת התאריך שנשלח בבקשה
                const { date } = await req.json();
                console.log('sent date:', date);

                // קריאה ל-Supabase כדי למצוא את הפגישות הזמינות בתאריך הזה
                const { data, error } = await supabase
                    .from('calendar') // שם הטבלה שלך
                    .select('date, available') // בחר את השדות שאתה צריך
                    .eq('date', date) // חפש את הפגישות בתאריך הזה
                    .eq('available', true); // הפגישות שזמינות

                // אם יש שגיאה בקריאה ל-Supabase
                if (error) {
                        console.error('שגיאה בהבאת פגישות זמין:', error);
                        return NextResponse.json(
                            { success: false, error: 'שגיאה בהבאת פגישות' },
                            { status: 500 }
                        );
                }

                // אם נמצאו פגישות זמינות, החזר את הנתונים
                if (data && data.length > 0) {
                        return NextResponse.json({
                                success: true,
                                appointments: data.map(appointment => ({
                                        time: appointment.time,
                                        available: appointment.available,
                                })),
                        });
                }

                // אם אין פגישות זמינות בתאריך זה
                return NextResponse.json({
                        success: true,
                        appointments: [], // אין פגישות זמינות
                });

        } catch (error) {
                console.error('שגיאה ב-API route:', error);
                return NextResponse.json(
                    { success: false, error: 'שגיאה בעיבוד הבקשה' },
                    { status: 500 }
                );
        }
}

