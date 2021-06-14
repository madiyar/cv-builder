import React from 'react';
import { Button, PlusIcon } from 'evergreen-ui';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
};

const CreateButton:React.FC<ButtonProps> = ({ onClick }) => (
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
