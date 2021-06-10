import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import Discard from './components/Discard';

const Edit:React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button circular icon='times' size="huge" onClick={() => setOpen(true)} />
      <Discard open={open} setOpen={setOpen} />
    </>
  );
}

export default Edit;
