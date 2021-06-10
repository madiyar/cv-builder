import React, { useContext } from 'react';
import { Card, Container } from 'semantic-ui-react'
import { AppContext } from '../../App';
import { Navbar, Resume } from './components';

const Main = () => {
  const { store } = useContext<any>(AppContext);

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
