'use client';

import Link from 'next/link';
import { useCallback } from 'react';

const role = 'Brothers';
let names = ['Bibi','Itamar', 'Kahana', 'Michael'];

export default function Navbar() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-base-100 z-50">
      <div className="navbar flex justify-between items-center px-4 py-2">
        <div className="flex-1">
          <Link href="../" className="btn btn-ghost text-xl" onClick={scrollToTop}>
            MyAppointment
          </Link>
        </div>
        <div className="flex-none relative">
          <ul className="menu menu-horizontal px-1">
            <li className="relative">
              <details>
                <summary>{role}</summary>
                <ul className="absolute bg-base-100 rounded-t-none p-2 mt-1 shadow-lg">
                  {names.map((name) => (
                    <li key={name}>
                      <Link href={`./${name}`} className="hover:underline">
                      {name}
                    </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}