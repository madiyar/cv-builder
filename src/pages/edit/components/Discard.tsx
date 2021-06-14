import React from 'react';
import { Dialog } from 'evergreen-ui';
import { useHistory } from 'react-router-dom';

interface Props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const Discard:React.FC<Props> = ({ open, setOpen }) => {
  const history = useHistory();

  return (
    <Dialog
      isShown={open}
      title="Discard Changes"
      onCloseComplete={() => setOpen(false)}
      preventBodyScrolling
      confirmLabel="Discard"
      onConfirm={() => history.push('/')}
    >
      <p>Changes will not be saved. Do you want to proceed?</p>
    </Dialog>
  )
};

export default Discard;
