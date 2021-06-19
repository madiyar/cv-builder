import React from 'react';
import { context, IContext } from 'utils';
import { Pane, Heading } from 'evergreen-ui';
import CreateButton from './CreateButton';

interface ICreate {
  create: IContext["create"]
};

const Navbar:React.FC = () => {
  const { create } : ICreate = React.useContext<any>(context);

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
