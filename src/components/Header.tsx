import React from 'react';
import { Mic } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Mic className="h-8 w-8 text-blue-600" />
            <div className="ml-2">
              <h1 className="text-xl font-bold text-gray-900">Hire ANA</h1>
              <p className="text-sm text-gray-500">ANA AI SDR Implementation Requirements</p>
            </div>
          </div>
          <div className="hidden md:block">
            <a 
              href="https://aivoiceagents.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Visit aivoiceagents.ca
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;