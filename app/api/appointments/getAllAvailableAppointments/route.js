import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// Set runtime as Edge
export const runtime = 'edge';

export async function POST(req) {
        try {
                // Receives the data sent in the request (date)
                const { slug, date } = await req.json();

                // Request to DB to find available appointments
                const { data, error } = await supabase
                    .from(slug)
                    .select('date, time, available, locked')
                    .eq('date', date)
                    .eq('available', true)
                    .eq('locked', false);

                // console.log('API - Data received from Supabase:', data);

                if (error) {
                        console.error('Error fetching available appointments:', error);
                        return NextResponse.json(
                            { success: false, error: 'Error fetching meetings' },
                            { status: 500 }
                        );
                }

                // If available appointments are found, the data is returned.
                if (data && data.length > 0) {
                        const availableAppointments = data
                            .map(appointment => ({
                                    time: appointment.time,
                                    available: appointment.available,
                            }))
                            // Sort appointments by time in ascending order
                            .sort((a, b) => {
                                    const timeA = a.time.split(':').map(Number); // Split 'HH:mm' into [HH, mm]
                                    const timeB = b.time.split(':').map(Number);

                                    // Compare hours first, then minutes
                                    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
                            });

                        // Returning data with correct cache headers
                        const response = NextResponse.json({
                                success: true,
                                appointments: availableAppointments,
                        });

                        // Setting cache headers that will prevent data from being saved
                        response.headers.set('Cache-Control', 'no-store, must-revalidate');
                        response.headers.set('Pragma', 'no-cache');
                        response.headers.set('Expires', '0');

                        return response;
                }
                // If there are no appointments available
                return NextResponse.json({
                        success: true,
                        appointments: [],
                });

        } catch (error) {
                console.error('API route error:', error);
                return NextResponse.json(
                    { success: false, error: 'Error processing the request' },
                    { status: 500 }
                );
        }
}
