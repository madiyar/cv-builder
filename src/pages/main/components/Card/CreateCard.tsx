import React, { useContext } from 'react';
import { context, IContext } from 'utils';
import { Card } from './Card';

interface IUseContext {
  create: IContext['create'],
};

const CreateCard:React.FC = () => {
  const { create } : IUseContext = useContext<any>(context);

  return (
    <Card title={{ text: "Create New" }}>
      <button
        className="
          mb-4 py-2
          
          w-full
          h-full
          flex
          items-center
          justify-center

          text-center 
          font-semibold 
          text-white

          rounded 
          transform
          transition
          hover:scale-105
          focus:outline-none 
        "
        onClick={create}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </Card>
  )
};

export default CreateCard;
