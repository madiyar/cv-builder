import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { context, IResume, IContext } from 'utils';
import { Button, Heading, EditIcon, TrashIcon, DuplicateIcon, Pane, Text } from 'evergreen-ui';

// const thumbnail = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

interface PropsTypes {
  data: IResume
};

interface IUseContext {
  remove: IContext['remove'],
  duplicate: IContext['duplicate']
};

const Resume:React.FC<PropsTypes> = ({ data }) => {
  // const [active, setShow] = useState<boolean>(false);
  const { remove, duplicate } : IUseContext = useContext<any>(context);
  const history = useHistory();

  const content = (
    <>
      <Button
        width="90%"
        marginBottom={8}
        appearance="primary"
        iconBefore={EditIcon}
        onClick={() => history.push(`/edit/${data.id}`)}
      >
        Edit
      </Button>
      <Button
        width="90%"
        marginBottom={8}
        iconBefore={DuplicateIcon}
        onClick={() => duplicate(data)}
      >
        Duplicate
      </Button>
      <Button
        width="90%"
        intent="danger"
        appearance="primary"
        iconBefore={TrashIcon}
        onClick={() => remove(data.id)}
      >
        Delete
      </Button>
    </>
  );

  return (
    <Pane border="default" flex="1">
      {content}
      <Pane>
        <Heading size={500}>{data?.name || 'Draft'}</Heading>
        <Text size={500}>Saved {new Date(data.date).toISOString()}</Text>
      </Pane>
    </Pane>
  )
};

export default Resume;
