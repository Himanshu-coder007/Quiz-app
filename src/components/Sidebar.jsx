import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isMobileOpen, onClose }) => {
  return (
    <>
      {/* Desktop Sidebar (always visible on md+) */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 fixed h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          </div>
          <nav className="p-2">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard/home"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/quizes"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Quizes
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:hidden`}
      >
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/dashboard/home"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/quizes"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Quizes
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;