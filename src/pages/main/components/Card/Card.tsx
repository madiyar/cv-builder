import React from "react";
import { CardTitle } from "./CardTitle"
import { format } from 'date-fns';
import './styles.css';

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
  <article className="card">
    <div className="card__image-wrapper">
      <img alt={img?.alt || 'thumbnail'} className="card__image" src={img?.src || thumbnail} />
      <div className={`card__overlay ${overlayStyle}`}>
        {children}
      </div>
    </div>
    
    <CardTitle edit={title.edit} setEdit={title.setEdit}>{title.text}</CardTitle>
    {date && <p className="mt-1">{format(date, 'dd/MM HH:ii:ss')}</p>}
  </article>
)