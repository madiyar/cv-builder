import React from 'react';
import { context } from 'utils';
import { Pane, Heading } from 'evergreen-ui';
import CreateButton from './CreateButton';

const Navbar:React.FC = () => {
  const { create } = React.useContext<any>(context);

  return (
    <Pane display="flex" paddingY={16}>
      <Pane flex={1} alignItems="center" display="flex">
        <Heading size={900}>Resumes</Heading>
      </Pane>
      <Pane>
        <CreateButton onClick={create} />
      </Pane>
    </Pane>
  )
};

export default Navbar;
