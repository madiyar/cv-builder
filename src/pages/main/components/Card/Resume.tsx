import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { context, IResume, IContext } from 'utils';
import { Card } from './Card';

interface PropsTypes {
  data: IResume
};

interface IUseContext {
  remove: IContext['remove'],
  duplicate: IContext['duplicate'],
  save: IContext['save']
};

const Resume:React.FC<PropsTypes> = ({ data }) => {
  const { remove, duplicate, save } : IUseContext = useContext<any>(context);
  const history = useHistory();

  const buttons = [
    { name: 'Edit', onClick: () => history.push(`/edit/${data.id}`), className: 'resume__edit-btn' },
    { name: 'Duplicate', onClick: () => duplicate(data), className: 'resume__duplicate-btn' },
    { name: 'Delete', onClick: () => remove(data.id), className: 'resume__delete-btn' }
  ];

  const handleRename = (name : string) => {
    save({ ...data, name });
  }

  return (
    <Card
      title={data.name}
      date={data.date}
      onChange={handleRename}
      editable
    >
      {buttons.map(({ name, ...rest }) => <button {...rest}>{name}</button>)}
    </Card>
  )
};

export default Resume;
