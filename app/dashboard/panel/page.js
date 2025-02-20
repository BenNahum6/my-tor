// "use client";
// import React, {useState} from "react";
// import MainBord from "@/app/components/dashboard/panel/MainBord";
// import Bar from "@/app/components/dashboard/panel/Bar";
// import ImageUpload from "@/app/components/dashboard/panel/ImageUpload";
// import {getUserData} from "@/app/lib/api";
//
// export default function HomeScreen() {
//     const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
//
//     const onImageUploadToggle = () => {
//         setIsImageUploadOpen(!isImageUploadOpen);  // משנה את ה-state
//     };
//
//     async function fetchUserData() {
//         const response = await getUserData(); // כאן תעשה קריאה ל-API שיביא את נתוני המשתמש
//         console.log('response: ',response);
//         return response;
//     }
//
//     return (
//         <div className="App">
//             <Bar onImageUploadToggle={onImageUploadToggle}/> {/* מעביר את הפונקציה כ-prop */}
//             <MainBord/>
//             {isImageUploadOpen && (
//                 <div className="absolute top-0 left-0 w-full z-10">
//                     <ImageUpload onImageUploadToggle={onImageUploadToggle}/> {/* מציג את ImageUpload מעל MainBord */}
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";
import React, { useState, useEffect } from "react";
import MainBord from "@/app/components/dashboard/panel/MainBord";
import Bar from "@/app/components/dashboard/panel/Bar";
import ImageUpload from "@/app/components/dashboard/panel/ImageUpload";
import { getUserData } from "@/app/lib/api";

export default function HomeScreen() {
    const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    const onImageUploadToggle = () => {
        setIsImageUploadOpen(!isImageUploadOpen);  // משנה את ה-state
    };

    // Retrieve user data
    async function fetchUserData() {
        const response = await getUserData();
        if (response.success) {
            setUserData(response.data);
        } else {
            console.error('Error fetching user data:', response.message);
        }
    }

    // Calling fetchUserData when the page loads (in a development environment this happens twice, this is a React behavior)
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="App">
            <Bar onImageUploadToggle={onImageUploadToggle} userData={userData} />
            <MainBord />
            {isImageUploadOpen && (
                <div className="absolute top-0 left-0 w-full z-10">
                    <ImageUpload onImageUploadToggle={onImageUploadToggle} />
                </div>
            )}
        </div>
    );
}
