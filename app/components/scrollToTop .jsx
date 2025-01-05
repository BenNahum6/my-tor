'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import fetchAppointments from '../lib/fetchAppointments'
export default function ScrollToTop() {
  const linkRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault(); // Prevent default link behavior
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    };

    const link = linkRef.current;
    link?.addEventListener('click', handleClick);

    // Cleanup listener on component unmount
    return () => link?.removeEventListener('click', handleClick);
  }, []);


  return (
      <div>
        <Link href="/" ref={linkRef} className="btn btn-ghost text-xl">
          MyAppointment
        </Link>
      </div>
  );
}
