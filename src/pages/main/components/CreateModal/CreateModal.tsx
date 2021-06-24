import React, { useState } from 'react';
import { context, IContext } from 'utils';
import { Modal } from 'components';

interface ContextTypes {
  create: IContext["create"]
};

interface PropsTypes {
  isOpen: boolean,
  closeModal(): void
}

const CreateModal:React.FC<PropsTypes> = ({ isOpen, closeModal }) => {
  const { create } : ContextTypes = React.useContext<any>(context);
  const [name, setName] = useState<string>('');

  const handleCreate = () => {
    create({ name });
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Create New Resume"
      handleClose={closeModal}
    >
      <div className="flex flex-col items-center">
        <h2 className="font-semibold mb-2 text-md">Select template</h2>
        <div className="flex flex-row w-full mb-4 px-3 relative gap-3">
          <button className="absolute -mt-3 left-0 bg-gray-400 p-1 shadow-md top-1/2 text-white focus:outline-none rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {[1,2,3].map(x => <div key={x} className="h-48 w-full bg-gray-200 rounded-md hover:border-gray-400 border-2"></div>)}
          <button className="absolute -mt-3 right-0 bg-gray-400 p-1 shadow-md top-1/2 text-white focus:outline-none rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <input
          placeholder="Enter name"
          maxLength={32}
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-md outline-none focus:ring-4 focus:border-blue-400 focus:ring-blue-100"
        />
        <label className="px-3 py-2 bg-blue-100 hover:bg-blue-200 cursor-pointer inline-block mt-3 text-center font-semibold rounded-md">
          import JSON resume
          <input type="file" className="hidden" accept=".json" />
        </label>

        <div className="mt-4 flex space-x-3 justify-center">
          <button
            type="button"
            className="dialog-btn bg-green-200 hover:bg-green-300 text-green-900"
            onClick={handleCreate}
          >
            Create
          </button>
          <button
            type="button"
            className="dialog-btn"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
