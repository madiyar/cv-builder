import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';

interface Props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const Discard:React.FC<Props> = ({ open, setOpen }) => (
  <Modal
    size="mini"
    open={open}
    onClose={() => setOpen(false)}
  >
    <Modal.Header>Discard Changes</Modal.Header>
    <Modal.Content>
      <p>Changes will not be saved. Do you want to proceed?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button positive as={Link} to="/">
        Discard
      </Button>
      <Button negative onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);

export default Discard;
