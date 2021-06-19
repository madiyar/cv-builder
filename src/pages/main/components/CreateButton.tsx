import React from 'react';
import { IContext } from 'utils';

interface PropsTypes {
  onClick: IContext["create"]
};

const CreateButton:React.FC<PropsTypes> = ({ onClick }) => (
  <button
    className="
      bg-blue-500
      hover:bg-blue-600
      py-2 px-5
      rounded
      text-white
      font-semibold
      flex
      items-center
      shadow-md
      focus:outline-none
      focus:ring-4
      focus:shadow-lg
      focus:ring-blue-100
      transition
    "
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
    Create New
  </button>
);

export default CreateButton;
