import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'utils';
import { Main, Edit } from 'pages';

const App:React.FC = () => (
  <BrowserRouter>
    <Provider>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </Provider>
  </BrowserRouter>
);

export default App;
