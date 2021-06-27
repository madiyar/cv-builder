import React from "react";
import { Disclosure, Transition } from '@headlessui/react'

interface PropsTypes {
  title: string,
  defaultOpen?: boolean
};

const Section:React.FC<PropsTypes> = ({ title, defaultOpen, children }) => {
  return (
    <Disclosure as="section" defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="cursor-pointer text-xl font-bold mb-2 inline-flex items-center" as="h2">
            {title}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 z-0 mt-1 ml-2 text-gray-400 ${open ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel>
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export default Section;