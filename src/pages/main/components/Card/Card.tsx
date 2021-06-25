import React from "react";
import CardTitle from "./CardTitle"
import { format } from 'date-fns';
import './styles.scss';

const thumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

interface PropsTypes {
  img?: {
    src: string,
    alt: string
  },
  onChange?(arg0: string): void,
  editable?: boolean,
  title: string,
  date?: number
};

export const Card:React.FC<PropsTypes> = ({ children, img, onChange, editable, title, date }) => (
  <article className="card">
    <div className="card__image-wrapper">
      <img alt={img?.alt || 'thumbnail'} className="card__image" src={img?.src || thumbnail} />
      <div className={`card__overlay ${editable ? 'editable' : ''}`}>
        {children}
      </div>
    </div>
    
    <CardTitle editable={editable} onChange={onChange}>{title}</CardTitle>
    {date && <p className="mt-1">{format(date, 'dd/MM HH:ii:ss')}</p>}
  </article>
)