// Navbar.js

import ScrollToTop from "./scrollToTop ";

//TODO put in DB
const role = 'Brothers';
const names = ['Bibi', 'Itamar', 'Kahana', 'Michael'];

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-base-100 z-50">
      <div className="navbar flex justify-between items-center px-4 py-2">
        <div className="flex-1">
          <ScrollToTop />
        </div>
        <div className="flex-none relative">
          <ul className="menu menu-horizontal px-1">
            <li className="relative">
              <details>
                <summary>{role}</summary>
                <ul className="absolute bg-base-100 rounded-t-none p-2 mt-1 shadow-lg">
                  {names.map((name) => (
                    <li key={name}>
                      <a href={`/pages/${name}`} className="hover:underline">
                        {name}
                      </a>
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
