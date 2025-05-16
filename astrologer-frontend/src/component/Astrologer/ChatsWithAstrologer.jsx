// ChatsWithAstrologer.jsx
import React, { useState } from "react";
import AstrologerList from "./AstrologerList";

const ChatsWithAstrologer = () => {  

  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

  };
 
  return (

    <div className="p-5 mt-16">
      <div className="flex justify-between items-center mb-4">

        <div className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md">
          Chat with Astrologer
        </div>  

        <div className="relative flex items-center rounded-md shadow-sm">

          <input
            type="text"
            placeholder="Search name..."
            className="border border-gray-300 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <div className="bg-yellow-400 text-black rounded-r-md p-2">

            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

          </div>

        </div>

      </div>
      <AstrologerList searchTerm={searchTerm} />
    </div>
    
  );
};

export default ChatsWithAstrologer;