import React from "react";

const UploadPhoto:React.FC = () => {
  return (
    <label className="flex flex-row h-12 group self-end mb-4 lg:w-1/2 w-full cursor-pointer">
      <div className="w-12 h-12 bg-gray-200 group-hover:bg-blue-200 group-hover:text-blue-700 rounded-lg flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      </div>
      <span className="h-12 flex items-center px-3 font-semibold group-hover:text-blue-900">Upload Photo</span>
      <input type="file" className="hidden" />
    </label>
  )
}

export default UploadPhoto;