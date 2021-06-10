import React from 'react';
import { context } from 'utils';
import { Card, Container } from 'semantic-ui-react'
import { Navbar, Resume } from './components';

const Main:React.FC = () => {
  const { store } = React.useContext<any>(context);

  return (
    <Container>
      <Navbar />
      <Card.Group itemsPerRow={4} stackable style={{ marginTop: 16 }}>
        {store.map((cv: any) => <Resume key={cv.id} data={cv} />)}
      </Card.Group>
    </Container>
  );
};

export default Main;
