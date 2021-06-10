import React from 'react';
import { AppContext } from 'utils';
import { Card, Container } from 'semantic-ui-react'
import { Navbar, Resume } from './components';

const Main = () => {
  const { store } = React.useContext<any>(AppContext);

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
