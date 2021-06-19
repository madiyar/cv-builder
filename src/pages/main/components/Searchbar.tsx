import React from 'react';

const Searchbar:React.FC = () => (
  <div className="h-10 rounded mr-2 border-2 px-3 shadow-sm flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400 transform -scale-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input placeholder="Search..." className="py-1 px-2 outline-none" />
  </div>
);

export default Searchbar;
