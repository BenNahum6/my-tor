import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req) {
        try {
                // Accepting the [date] sent on request
                const { date } = await req.json();

                // Calling Supabase to find available appointments on this [date]
                const { data, error } = await supabase
                    .from('calendar')
                    .select('date, available') // Select the fields you need.
                    .eq('date', date) // Search for meetings on this [date]
                    .eq('available', true); // Available meetings

                // If there is an error calling Supabase
                if (error) {
                        console.error('Error fetching available appointments:', error);
                        return NextResponse.json(
                            { success: false, error: 'Error fetching meetings' },
                            { status: 500 }
                        );
                }

                // If available appointments are found, return the data.
                if (data && data.length > 0) {
                        return NextResponse.json({
                                success: true,
                                appointments: data.map(appointment => ({
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

