import React from 'react';
import { context } from 'utils';
import { Grid, Header } from 'semantic-ui-react'
import CreateButton from './CreateButton';

const Navbar:React.FC = () => {
  const { create } = React.useContext<any>(context);

  return (
    <Grid columns='equal' padded>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Header as="h1">Resumes</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <CreateButton onClick={create} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default Navbar;
