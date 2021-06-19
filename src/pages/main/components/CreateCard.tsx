import React, { useContext } from 'react';
import { context, IContext } from 'utils';

const thumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

interface IUseContext {
  create: IContext['create'],
};

const CreateCard:React.FC = () => {
  const { create } : IUseContext = useContext<any>(context);

  const content = (
    <>
      <button
        className="
          mb-4 transform hover:scale-105 text-center 
          text-white font-semibold 
          rounded py-2 
          focus:outline-none 
          transition
          w-full
          flex
          items-center
          justify-center
          h-full
        "
        onClick={create}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </>
  );

  return (
    <article className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4">
      <div className="block relative h-80 rounded overflow-hidden shadow-lg">
        <img alt="ecommerce" className="absolute inset-0 object-cover object-center w-full h-full block" src={thumbnail} />
        <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 hover:bg-gray-600 hover:bg-opacity-50 flex flex-col justify-center">
          {content}
        </div>

      </div>
      <div className="mt-4">
        <h2
          className="text-gray-900 title-font text-lg font-medium"
        >
          Create New
        </h2>
      </div>
    </article>
  )
};

export default CreateCard;
