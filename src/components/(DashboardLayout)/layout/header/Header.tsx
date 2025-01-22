import React from 'react';
import Link from 'next/link';
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  return (
    <header className="sticky top-0 bg-white shadow-none backdrop-blur-md z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden block text-gray-700"
        >
          <IconMenu width="20" height="20" />
        </button>

        {/* Centered Text */}
        <div className="flex-grow flex justify-center">
          <h6 className="font-bold text-xl text-blue-600">FANTASTIC 2K25</h6>
        </div>

        {/* Notifications and Profile */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Notifications Icon with Badge */}
          <button
            aria-label="show 11 new notifications"
            className="relative text-gray-700"
          >
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
            <IconBellRinging size="21" stroke="1.5" />
          </button>

          {/* Login Button and Profile */}
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              <Link href="/signin">Login</Link>
            </button>
            <Profile />
          </div>
        </div>

        {/* Mobile Login Button and Profile */}
        <div className="lg:hidden flex items-center space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Link href="/signin">Login</Link>
          </button>
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
