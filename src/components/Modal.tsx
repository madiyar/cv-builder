import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import './styles.css';

interface PropsTypes {
  title?: string,
  isOpen: boolean,
  handleClose(): void
};

const Modal:React.FC<PropsTypes> = ({ children, title, isOpen, handleClose }) => {

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="dialog"
        onClose={handleClose}
      >
        <div className="dialog-container">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="dialog-backdrop" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="dialog-body">
              {title && (
                <Dialog.Title
                  as="h3"
                  className="dialog-title"
                >
                  <div className="flex-1">{title}</div>
                  <div className="dialog-title__close-btn" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </Dialog.Title>
              )}
              <div className="mt-2">
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
};

export default Modal;
