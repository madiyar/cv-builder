import React from 'react';
import { Grid, Button, Progress } from 'semantic-ui-react';

const App = () => {
  return (
    <Grid columns='equal'>
      <Grid.Column>
        <Progress progress='value' value={35} />
        <Button>Click Here</Button>
      </Grid.Column>
      <Grid.Column>

      </Grid.Column>
    </Grid>
  );
};

export default App;
