import React from "react";

interface PropsTypes {
  label: string
};

const Input:React.FC<PropsTypes> = ({ label }) => {
  return (
    <label className="text-md font-semibold flex flex-col gap-1 text-gray-500 mb-4 w-full md:w-1/2">
      <span>{label}</span>
      <input className="bg-gray-200 h-12 focus:outline-none focus:ring-4 p-3 px-5 focus:ring-blue-200 focus:shadow-sm  focus:bg-gray-50 rounded-lg" />
    </label>
  )
}

export default Input;