import React, { useState } from 'react';
import { IconButton, CrossIcon } from 'evergreen-ui';
import Discard from './components/Discard';

const Edit:React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton icon={CrossIcon} size="large" onClick={() => setOpen(true)} />
      <Discard open={open} setOpen={setOpen} />
    </>
  );
}

export default Edit;
