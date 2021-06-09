import React, { useState } from 'react';
import { Card, Dimmer, Image, Container, Grid, Header, Button } from 'semantic-ui-react'

const image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnHifwAGMgK4RoxAtgAAAABJRU5ErkJggg==";

const Resume = () => {
  const [active, setShow] = useState(false);

  const content = (
    <>
      <Button primary fluid style={{ marginBottom: 8 }}>Edit</Button>
      <Button color="red" fluid>Delete</Button>
    </>
  );

  return (
    <Card>
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        size='medium'
        src={image}
      />
      <Card.Content>
        <Card.Header>Madiyar Bolatov CV</Card.Header>
        <Card.Meta>Saved 08/06/21</Card.Meta>
      </Card.Content>
    </Card>
  )
};

const Main = () => (
  <Container>
    <Grid columns='equal' padded>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header as="h1">Resumes</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button content="Create New" primary icon="add" labelPosition="left" size="large" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Card.Group itemsPerRow={4} stackable style={{ marginTop: 16 }}>
      {[1,2,3,4,5,6].map(i => <Resume key={i} />)}
    </Card.Group>
  </Container>
);

export default Main;
