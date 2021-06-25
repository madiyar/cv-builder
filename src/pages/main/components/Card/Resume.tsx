import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { context, IResume, IContext } from 'utils';
import { Card } from './Card';

interface PropsTypes {
  data: IResume
};

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const DuplicateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

interface ContextTypes {
  remove: IContext['remove'],
  duplicate: IContext['duplicate'],
  save: IContext['save']
};

const Resume:React.FC<PropsTypes> = ({ data }) => {
  const { remove, duplicate, save } : ContextTypes = useContext<any>(context);
  const history = useHistory();

  const buttons = [
    { name: 'Edit', onClick: () => history.push(`/edit/${data.id}`), className: 'edit-btn', icon: <PencilIcon /> },
    { name: 'Duplicate', onClick: () => duplicate(data), className: 'duplicate-btn', icon: <DuplicateIcon /> },
    { name: 'Delete', onClick: () => remove(data.id), className: 'delete-btn', icon: <TrashIcon /> }
  ];

  const handleRename = (name : string) => save({ ...data, name });

  return (
    <Card
      title={data.name}
      date={data.date}
      onChange={handleRename}
      editable
    >
      {buttons.map(({ name, icon, ...rest }) => <button {...rest} key={name}>{icon} {name}</button>)}
    </Card>
  )
};

export default Resume;
