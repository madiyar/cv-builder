import React from 'react';
import { Button, PlusIcon } from 'evergreen-ui';
import { IContext } from 'utils';

interface PropsTypes {
  onClick: IContext["create"]
};

const CreateButton:React.FC<PropsTypes> = ({ onClick }) => (
  <Button
    appearance="primary"
    size="large"
    iconBefore={PlusIcon}
    onClick={onClick}
  >
    Create New
  </Button>
);

export default CreateButton;
