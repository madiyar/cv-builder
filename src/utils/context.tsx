import React from 'react';
import { useLocalStorage } from 'utils';
import { useHistory } from 'react-router-dom';

export const AppContext = React.createContext({});

const Context:React.FC = ({ children }) => {
  const [store, setStore] = useLocalStorage<any[]>('store', []);
  const history = useHistory();

  // delete resume
  const remove = (id : string) => {
    setStore(store.filter(cv => cv.id !== id));
  };

  // get resume
  const get = (id: string) => {
    return store.find(cv => cv.id === id)
  };

  // update resume
  const save = (data: any) => {
    setStore(store.map(cv => cv.id === data.id ? ({ ...cv, ...data }) : cv))
  };

  // create new resume draft
  const create = () => {
    const newResume = {
      id: `${Date.now()}${store.length}`,
      date: Date.now()
    };
    setStore([ ...store, newResume ]);
    history.push(`/edit/${newResume.id}`);
  };

  // duplicate resume
  const duplicate = (data: any) => {
    setStore([ ...store, {
      ...data,
      id: `${Date.now()}${store.length}`,
      date: Date.now()
    } ]);
  };

  return (
    <AppContext.Provider value={{ store, remove, get, setStore, save, create, duplicate }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
