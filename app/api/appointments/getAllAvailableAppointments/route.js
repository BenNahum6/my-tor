import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req) {

        try {
                // Accepting the [date] sent on request
                const { date } = await req.json();

                // Calling Supabase to find available appointments on this [date]
                const { data, error } = await supabase
                    .from('calendar')
                    .select('date, time, available')
                    .eq('date', date)
                    .eq('available', true);

                console.log('API - Data received from Supabase:', data); // הוספת לוג לבדיקת הנתונים שהתקבלו

                if (error) {
                        console.error('Error fetching available appointments:', error);
                        return NextResponse.json(
                            { success: false, error: 'Error fetching meetings' },
                            { status: 500 }
                        );
                }

                // If available appointments are found, return the data.
                if (data && data.length > 0) {
                        // סינון הנתונים כך שיחזרו רק אלה ש-available הם true
                        const availableAppointments = data.filter(appointment => appointment.available === true);

                        return NextResponse.json({
                                success: true,
                                appointments: availableAppointments.map(appointment => ({
                                        time: appointment.time,
                                        available: appointment.available,
                                })),
                        });
                }

                // If there are no appointments available on this [date]
                return NextResponse.json({
                        success: true,
                        appointments: [], // No appointments available
                });

        } catch (error) {
                console.error('API route error:', error);
                return NextResponse.json(
                    { success: false, error: 'Error processing the request' },
                    { status: 500 }
                );
        }
}

