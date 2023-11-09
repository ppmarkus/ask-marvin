"use client";
import React, { useState } from "react";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col h-full ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <h2 className="mb-4 font-bold text-lg">Personal Settings</h2>
        <div>
          <div className="flex items-center justify-start">
            <label htmlFor="toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input id="toggle" type="checkbox" className="sr-only" checked={isDarkMode} onChange={toggleDarkMode} />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isDarkMode ? "transform translate-x-6" : ""}`}></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">Dark Mode</div>
            </label>
          </div>
        </div>
      </div>
      <div className="grow ">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="mb-4 font-bold text-lg">All Settings</h2>
          {/* Add all other settings components here */}
        </div>
      </div>
    </div>
  );
}
