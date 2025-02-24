"use client";
import React, { useState, useEffect } from "react";
import MainBord from "@/app/components/dashboard/panel/MainBord";
import Bar from "@/app/components/dashboard/panel/Bar";
import ImageUpload from "@/app/components/dashboard/panel/ImageUpload";
import { getAllAppointments, getConnectedUserData } from "@/app/lib/api";
import { todayAppointments } from "@/app/utils/helper";

export default function HomeScreen() {
    const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [appointmentsData, setAppointments] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // חדש: כדי להבטיח טעינה מלאה

    const onImageUploadToggle = () => {
        setIsImageUploadOpen(!isImageUploadOpen);
    };

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await getConnectedUserData();
                if (response.success) {
                    setUserData(response.data);
                } else {
                    console.error('Error fetching user data:', response.message);
                }

                const result = await getAllAppointments();
                if (result.success) {
                    const todayDateAppointments = todayAppointments(result.data);
                    setAppointments(todayDateAppointments); // עדכון הסטייט
                } else {
                    console.error('Failed to fetch appointments:', result.message);
                }

                setIsLoaded(true); // רק עכשיו הנתונים מוכנים
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoaded(true); // גם במקרה של כשלון נסמן שהטעינה הסתיימה
            }
        }

        fetchUserData();
    }, []);

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>טעינת נתונים...</p> {/* הצגת הודעה עד שיטענו הנתונים */}
            </div>
        );
    }

    return (
        <div className="App">
            <Bar onImageUploadToggle={onImageUploadToggle} userData={userData} />
            {appointmentsData && appointmentsData.length > 0 ? (
                <MainBord appointmentsData={appointmentsData} />
            ) : (
                <p>אין פגישות להציג</p> // אם אין פגישות
            )}
            {isImageUploadOpen && (
                <div className="absolute top-0 left-0 w-full z-10">
                    <ImageUpload onImageUploadToggle={onImageUploadToggle} />
                </div>
            )}
        </div>
    );
}
