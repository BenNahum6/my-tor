"use client";
import React, {useState} from "react";
import MainBord from "@/app/components/dashboard/panel/MainBord";
import Bar from "@/app/components/dashboard/panel/Bar";
import ImageUpload from "@/app/components/dashboard/panel/ImageUpload";

export default function HomeScreen() {
    const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(null); // 🔹 כאן נשמור את ה-URL

    const onImageUploadToggle = () => {
        setIsImageUploadOpen(!isImageUploadOpen);  // משנה את ה-state
    };

    return (
        <div className="App">
            <Bar onImageUploadToggle={onImageUploadToggle}/> {/* מעביר את הפונקציה כ-prop */}
            <MainBord/>
            {isImageUploadOpen && (
                <div className="absolute top-0 left-0 w-full z-10">
                    <ImageUpload onImageUploadToggle={onImageUploadToggle}/> {/* מציג את ImageUpload מעל MainBord */}
                </div>
            )}
        </div>
    );
}

