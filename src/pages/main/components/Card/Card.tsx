import React from "react";
import { CardTitle } from "./CardTitle"
import { format } from 'date-fns';

const thumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

interface PropsTypes {
  img?: {
    src: string,
    alt: string
  } | undefined,
  overlayStyle?: string,
  title: {
    edit?: boolean,
    setEdit?(arg0: boolean): void,
    text: string
  },
  date?: number
};

export const Card:React.FC<PropsTypes> = ({ img, overlayStyle, children, title, date }) => (
  <article className="lg:w-1/4 md:w-1/2 p-4 w-full mb-4">
    <div className="block relative h-80 rounded overflow-hidden shadow-lg">
      <img alt={img?.alt || 'thumbnail'} className="absolute inset-0 object-cover object-center w-full h-full block" src={img?.src || thumbnail} />
      <div className={`opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 hover:bg-gray-600 hover:bg-opacity-50 flex flex-col justify-center ${overlayStyle}`}>
        {children}
      </div>
    </div>
    
    <CardTitle className="flex items-center group" edit={title.edit} setEdit={title.setEdit}>{title.text}</CardTitle>
    {date && <p className="mt-1">{format(date, 'dd/MM HH:ii:ss')}</p>}
  </article>
)