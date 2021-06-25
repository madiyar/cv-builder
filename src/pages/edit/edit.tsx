import CardTitle from 'pages/main/components/Card/CardTitle';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { context, IResume, useScrollSpy } from 'utils';
import Input from './components/Input';

import './styles.scss';

interface ContextTypes {
  get(id: string): IResume 
};

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Edit:React.FC = () => {
  const history = useHistory();
  const ref = useRef(null);
  const isOnTop = useScrollSpy(ref);
  const { id } : { id : string } = useParams();
  const { get } : ContextTypes = React.useContext<any>(context);
  const [data, setData] = useState<IResume | null>(null);

  useEffect(() => {
    const res = get(id);
    if (!!res) {
      setData(res);
    }
  }, [id, get]);

  return (
    <main className="edit">
      <div className="form" ref={ref}>
        <section className={`header ${!isOnTop ? 'scroll' : ''}`}>
          <div className="title">
            {data?.name && (
              <CardTitle editable>{data.name}</CardTitle>
            )}
          </div>
          <div className="relative pt-2">
            <div className="overflow-hidden h-1 mb-4 text-xs flex rounded bg-green-200">
              <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-2">Personal Details</h2>
          <div className="form-control">
            <Input label="First Name" />
            <Input label="Last Name" />
          </div>
        </section>
        {JSON.stringify(data)}
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati ab sequi asperiores nulla nesciunt! Nulla blanditiis maiores, necessitatibus, voluptatibus modi dicta explicabo et, voluptatem culpa ea repudiandae cum iusto.</div>
      </div>
      <div className="preview">
        <button onClick={() => history.push('/')} className="bg-gray-700 p-4 text-white rounded-full focus:outline-none hover:bg-gray-800 transition">
          <CloseIcon />
        </button>
      </div>
    </main>
  );
}

export default Edit;
