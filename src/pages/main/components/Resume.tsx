import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { context, IResume, IContext } from 'utils';
import { format } from 'date-fns';

const thumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

interface PropsTypes {
  data: IResume
};

interface IUseContext {
  remove: IContext['remove'],
  duplicate: IContext['duplicate']
};

const Button = ({ onClick, children, className } : { onClick : any, children:any, className: string}) => (
  <button className={`mb-4 transform hover:scale-105 text-center text-white font-semibold w-full rounded py-2 shadow-md focus:outline-none focus:ring-4 transition ${className}`} onClick={onClick}>
    {children}
  </button>
)

const Resume:React.FC<PropsTypes> = ({ data }) => {
  // const [active, setShow] = useState<boolean>(false);
  const { remove, duplicate } : IUseContext = useContext<any>(context);
  const history = useHistory();
  const [edit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = () => {
    setEdit(true);
    inputRef.current!?.focus();
  }

  const content = (
    <>
      <Button
        onClick={() => history.push(`/edit/${data.id}`)}
        className="bg-blue-600 focus:ring-opacity-30"
      >
        Edit
      </Button>
      <Button
        onClick={() => duplicate(data)}
        className="bg-gray-200 text-gray-900 focus:ring-gray-700 focus:ring-opacity-30"
      >
        Duplicate
      </Button>
      <Button
        onClick={() => remove(data.id)}
        className="bg-red-700 focus:ring-red-700 focus:ring-opacity-30"
      >
        Delete
      </Button>
    </>
  );

  return (
    <article className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4">
      <div className="block relative h-80 rounded overflow-hidden shadow-lg">
        <img alt="ecommerce" className="absolute inset-0 object-cover object-center w-full h-full block" src={thumbnail} />
        <div className="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 hover:bg-white-600 hover:bg-opacity-50 p-5 flex flex-col justify-center">
          {content}
        </div>

      </div>
      <div className="mt-4">
        {edit ? (
          <input value={data.name} ref={inputRef} className="text-gray-900 title-font text-lg font-medium" onBlur={() => setEdit(false)} />
        ) : (
          <h2
            className="text-gray-900 title-font text-lg font-medium flex items-center group"
            onDoubleClick={handleEdit}
            title="Double click!"
          >
            {data.name}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-400 group-hover:opacity-100 opacity-0 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </h2>
        )}
        <p className="mt-1">{format(data.date, 'dd/MM HH:ii:ss')}</p>
      </div>
    </article>
  )
};

export default Resume;
