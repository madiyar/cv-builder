import React from 'react';
import { IContext } from 'utils';

interface PropsTypes {
  onClick: IContext["create"]
};

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="create-btn__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const CreateButton:React.FC<PropsTypes> = ({ onClick }) => (
  <button className="create-btn" onClick={onClick}>
    <PlusIcon />
    Create New
  </button>
);

export default CreateButton;
