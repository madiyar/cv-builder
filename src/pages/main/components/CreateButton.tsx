import React from 'react';
import { Button } from 'semantic-ui-react';

const CreateButton = ({ onClick } : { onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
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
