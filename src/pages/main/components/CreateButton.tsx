import React from 'react';
import { Button } from 'semantic-ui-react';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
};

const CreateButton:React.FC<ButtonProps> = ({ onClick }) => (
  <Button
    content="Create New"
    onClick={onClick}
    labelPosition="left"
    icon="add"
    size="large"
    primary
  />
);

export default CreateButton;
