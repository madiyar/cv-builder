import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useLocalStorage } from './hooks';
import { Main, Edit } from './pages';

export const AppContext = React.createContext({});

const App = () => {
  const [store, setStore] = useLocalStorage<any[]>('store', []);

  const deleteResume = (id : string) => {
    setStore(store.filter(cv => cv.id !== id));
  };

  const getResume = (id: string) => {
    return store.find(cv => cv.id === id)
  };

  const saveResume = (data: any) => {
    setStore(store.map(cv => cv.id === data.id ? ({ ...cv, ...data }) : cv))
  };

  return (
    <AppContext.Provider value={{ store, deleteResume, getResume, setStore, saveResume }}>
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
