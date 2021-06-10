import React from 'react';
import { AppContext } from '../../../App';
import { Grid, Header } from 'semantic-ui-react'
import CreateButton from './CreateButton';

const Navbar = () => {
  const { createResume } = React.useContext<any>(AppContext);

  return (
    <Grid columns='equal' padded>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header as="h1">Resumes</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <CreateButton onClick={createResume} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default Navbar;
