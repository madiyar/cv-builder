import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useLocalStorage, AppContext } from 'utils';
import { Main, Edit } from 'pages';

const App = () => {
  const [store, setStore] = useLocalStorage<any[]>('store', []);
  const history = useHistory();

  const deleteResume = (id : string) => {
    setStore(store.filter(cv => cv.id !== id));
  };

  const getResume = (id: string) => {
    return store.find(cv => cv.id === id)
  };

  const saveResume = (data: any) => {
    setStore(store.map(cv => cv.id === data.id ? ({ ...cv, ...data }) : cv))
  };

  const createResume = () => {
    const newResume = {
      id: `${Date.now()}${store.length}`,
      date: Date.now()
    };
    setStore([ ...store, newResume ]);
    history.push(`/edit/${newResume.id}`);
  };

  return (
    <AppContext.Provider value={{ store, deleteResume, getResume, setStore, saveResume, createResume }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
