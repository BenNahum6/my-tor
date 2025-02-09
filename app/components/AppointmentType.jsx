'use client';
import React, { useState } from 'react';
import {useParams, useRouter} from 'next/navigation';
import { formatDate } from '../utils/helper';

const serviceOptions = [
    { name: "Haircut", price: 80, duration: 30 },
    { name: "Haircut & Beard", price: 100, duration: 30 },
    { name: "Shaving", price: 30, duration: 15 },
    { name: "Hair Color", price: 80, duration: 60 }
];

const PresentsAppointments = ({ date }) => {
    const [selectedService, setSelectedService] = useState(null);
    const router = useRouter();
    const formattedDate = formatDate(date);
    const params = useParams();
    const slug = params.slug;
    console.log("slug: ", slug)

    const handleServiceClick = (service) => {
        setSelectedService(service);
        router.push(`/pages/${slug}/calendar`);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-900 dark:text-gray-100">
                Available Services for {formattedDate}
            </h2>
            {serviceOptions.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {serviceOptions.map((service, index) => (
                        <li
                            key={index}
                            className="flex flex-col justify-center items-center p-4 border-2 border-gray-300 rounded-lg shadow-lg hover:bg-blue-200 cursor-pointer transition-all duration-300 dark:border-gray-700 dark:hover:bg-blue-700"
                            onClick={() => handleServiceClick(service)}
                        >
                            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                {service.name}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {service.duration} min | {service.price} ₪
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">No available services.</p>
            )}
        </div>
    );
};

export default PresentsAppointments;