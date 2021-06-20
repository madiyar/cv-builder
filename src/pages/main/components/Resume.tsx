import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { context, IResume, IContext } from 'utils';
import { Card } from './Card/Card';

interface PropsTypes {
  data: IResume
};

interface IUseContext {
  remove: IContext['remove'],
  duplicate: IContext['duplicate'],
  save: IContext['save']
};

const Button = ({ onClick, children, className } : { onClick : any, children:any, className: string}) => (
  <button className={`mb-4 transform hover:scale-105 text-center text-white font-semibold w-full rounded py-2 shadow-md focus:outline-none focus:ring-4 transition ${className}`} onClick={onClick}>
    {children}
  </button>
)

const Resume:React.FC<PropsTypes> = ({ data }) => {
  // const [active, setShow] = useState<boolean>(false);
  const { remove, duplicate, save } : IUseContext = useContext<any>(context);
  const history = useHistory();

  const handleRename = (name : string) => {
    save({ ...data, name });
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
    <Card
      overlayStyle="p-5"
      title={data.name}
      date={data.date}
      onChange={handleRename}
      editable
    >
      {content}
    </Card>
  )
};

export default Resume;
