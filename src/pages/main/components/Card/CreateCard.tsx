import React, { useContext } from 'react';
import { context, IContext } from 'utils';
import { Card } from './Card';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

interface ContextTypes {
  create(): IContext['create'],
};

const CreateCard:React.FC = () => {
  const { create } : ContextTypes = useContext<any>(context);

  return (
    <Card title="Create New">
      <button
        className="card__plus-btn"
        onClick={create}
      >
        <PlusIcon />
      </button>
    </Card>
  )
};

export default CreateCard;
