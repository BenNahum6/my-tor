"use client";
import React, { useState } from 'react';
import {deleteTokenFromServer, signOut} from "@/app/lib/api";

export default function Bar ({ onImageUploadToggle, userData }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            {/* כפתור פתיחת ה-sidebar למובייל */}
                            <button
                                onClick={toggleSidebar} // כאן קוראים לפונקציה שתשנה את המצב
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded={dropdownOpen ? 'true' : 'false'}
                                        data-dropdown-toggle="dropdown-user"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        {userData && userData.imageURL ? (
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src={`${userData.imageURL}?t=${new Date().getTime()}`}
                                                alt="user photo"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-300" /> // תמונה ריקה במקום שגיאה
                                        )}
                                    </button>
                                    {dropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                                            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                                                <p className="font-medium">{userData.fullName}</p>
                                                <p className="text-xs text-gray-500">{userData.email}</p>
                                            </div>
                                            <hr className="border-t border-gray-300 my-1"/>

                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                                <li>
                                                    <button
                                                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        onClick={() => {
                                                            onImageUploadToggle(); // פעולה לפתיחת העלאת תמונה
                                                            setDropdownOpen(false); // סגירת ה-dropdown
                                                        }}
                                                    >
                                                        Change image
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        onClick={async () => {
                                                            await signOut();
                                                            setDropdownOpen(false); // סגירת ה-dropdown
                                                            window.location.reload();
                                                        }}>
                                                        Sign out
                                                    </button>

                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"*/}
                                {/*     stroke="currentColor" strokeLinecap ="round" stroke-linejoin="round" width="24"*/}
                                {/*     height="24" stroke-width="2">*/}
                                {/*    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>*/}
                                {/*    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>*/}
                                {/*    <path d="M10 12h4v4h-4z"></path>*/}
                                {/*</svg>*/}
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        {/* Schedule */}
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/*<svg xmlns="http://www.w3.org/2000/svg"*/}
                                {/*     width="24" height="24"*/}
                                {/*     viewBox="0 0 24 24"*/}
                                {/*     fill="none" stroke="currentColor"*/}
                                {/*     stroke-width="2"*/}
                                {/*     stroke-linecap="round" stroke-linejoin="round">*/}
                                {/*    <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"/>*/}
                                {/*    <path d="M18 14v4h4"/>*/}
                                {/*    <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>*/}
                                {/*    <path d="M15 3v4"/>*/}
                                {/*    <path d="M7 3v4"/>*/}
                                {/*    <path d="M3 11h16"/>*/}
                                {/*</svg>*/}


                                <span className="ms-3">Schedule</span>
                            </a>
                        </li>
                        {/* Contact */}
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/*<svg xmlns="http://www.w3.org/2000/svg"*/}
                                {/*     viewBox="0 0 24 24"*/}
                                {/*     fill="none"*/}
                                {/*     stroke="currentColor"*/}
                                {/*     stroke-linecap="round"*/}
                                {/*     stroke-linejoin="round"*/}
                                {/*     width="24" height="24"*/}
                                {/*     stroke-width="2">*/}
                                {/*    <path*/}
                                {/*        d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"/>*/}
                                {/*    <path d="M10 16h6"/>*/}
                                {/*    <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>*/}
                                {/*    <path d="M4 8h3"/>*/}
                                {/*    <path d="M4 12h3"/>*/}
                                {/*    <path d="M4 16h3"/>*/}
                                {/*</svg>*/}

                                <span className="ms-3">Contacts</span>
                            </a>
                        </li>
                        {/* תפריט Black List */}
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                {/*<svg xmlns="http://www.w3.org/2000/svg"*/}
                                {/*     viewBox="0 0 24 24"*/}
                                {/*     fill="none"*/}
                                {/*     stroke="currentColor"*/}
                                {/*     stroke-linecap="round"*/}
                                {/*     stroke-linejoin="round"*/}
                                {/*     width="24" height="24"*/}
                                {/*     stroke-width="2">*/}
                                {/*    <path*/}
                                {/*        d="M8 4h10a2 2 0 0 1 2 2v10m-.57 3.399c-.363 .37 -.87 .601 -1.43 .601h-10a2 2 0 0 1 -2 -2v-12"/>*/}
                                {/*    <path d="M10 16h6"/>*/}
                                {/*    <path d="M11 11a2 2 0 0 0 2 2m2 -2a2 2 0 0 0 -2 -2"/>*/}
                                {/*    <path d="M4 8h3"/>*/}
                                {/*    <path d="M4 12h3"/>*/}
                                {/*    <path d="M4 16h3"/>*/}
                                {/*    <path d="M3 3l18 18"/>*/}
                                {/*</svg>*/}

                                <span className="ms-3">Black List</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};