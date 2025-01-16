'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import usePathname and useRouter
import Link from 'next/link'; // Import Link from Next.js

export default function ScrollToTop() {
  const pathname = usePathname(); // usePathname hook
  const router = useRouter(); // useRouter hook
  const linkRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault(); // Prevent default link behavior

      // If we are not on the main page, we will go to it.
      if (pathname !== '/') {
        router.push('/');
      } else {
        // If we are already on the main page, we will scroll up
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
      }
    };

    const link = linkRef.current;
    link?.addEventListener('click', handleClick);

    // Cleanup listener on component unmount
    return () => link?.removeEventListener('click', handleClick);
  }, [pathname, router]);

  return (
      <div>
        <Link href="/" ref={linkRef} className="btn btn-ghost text-xl">
          MyAppointment
        </Link>
      </div>
  );
}
