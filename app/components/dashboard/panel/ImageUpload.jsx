import React, { useState } from 'react';
import {uploadImage} from '@/app/lib/api';

export default function ImageUpload ({ onImageUploadToggle }) {
    const [image, setImage] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [preview, setPreview] = useState(null); // שמירה של ה-URL של התמונה
    const [uploadStatus, setUploadStatus] = useState(null); // State to track upload result

    // פונקציה להעלאת קובץ על ידי בחירה
    const handleFileChange = (file) => {
        if (file) {
            setImage(file); // שמירת הקובץ עצמו
            setPreview(URL.createObjectURL(file)); // יצירת URL מקומי
            setIsImageSelected(true);
        }
    };

    // פונקציות לגרירת קובץ
    const handleDragOver = (e) => {
        e.preventDefault(); // מאפשר גרירה
    };

    const handleDrop = (e) => {
        e.preventDefault(); // מונע את ברירת המחדל של הדפדפן
        const file = e.dataTransfer.files[0]; // מקבל את הקובץ מהגרירה
        handleFileChange(file); // מפעיל את הפונקציה לעיבוד התמונה
    };

    const handleUpload = async () => {
        const result = await uploadImage(image); // Assuming uploadImage returns success status

        if (result.success) {
            localStorage.setItem("profileImageUrl", result.data.url);
            setUploadStatus({ success: true, message: 'The image was uploaded successfully!' });
        } else {
            setUploadStatus({ success: false, message: result.message });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative p-8 rounded-lg shadow-lg w-full max-w-lg bg-[#1e293b]">
                {/* Close button */}
                <button
                    onClick={onImageUploadToggle}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold text-center mb-4 text-white">Upload Your Image</h2>

                {/* Upload content */}
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#3b82f6] border-dashed rounded-lg cursor-pointer bg-[#1f2937] hover:bg-[#374151]"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-[#3b82f6]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-white">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-white">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e.target.files[0])} // טיפלנו גם כאן בלחיצה
                    />
                </label>

                {/* Show the image if selected */}
                {isImageSelected && (
                    <div className="mt-4 text-center">
                        <p className="text-sm font-semibold text-white">Image Selected:</p>
                        <img
                            src={preview}
                            alt="Uploaded"
                            className="mt-2 max-w-xs max-h-32 mx-auto rounded-md border border-[#3b82f6]"
                        />
                        {/* Button to upload the image */}
                        <button
                            onClick={handleUpload}
                            className="mt-3 bg-blue-500 text-white py-1.5 px-3 rounded-full hover:bg-blue-700 text-sm"
                        >
                            Upload
                        </button>
                    </div>
                )}

                {/* Display upload status */}
                {uploadStatus && (
                    <div className={`mt-4 text-center ${uploadStatus.success ? 'text-green-500' : 'text-red-500'}`}>
                        <p className="text-sm font-semibold">{uploadStatus.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};