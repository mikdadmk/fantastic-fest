'use client'; // Mark this as a client component

import { useState, useEffect } from 'react';

export default function AdminWelcomeMessage({ username }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide after 5 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, []);

  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-600 ">
            Welcome 🎉, {username}!
          </h2>
          <p className="text-center text-gray-600 mb-6">This is the admin page.</p>
        </div>
      </div>
    )
  );
}
