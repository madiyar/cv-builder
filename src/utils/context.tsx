import React from 'react';
import { useLocalStorage, IResume } from 'utils';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

export const AppContext = React.createContext({});

const Context:React.FC = ({ children }) => {
  const [store, setStore] = useLocalStorage<IResume[]>('store', []);
  const history = useHistory();

  // create new resume draft
  const create = () : void => {
    const newResume : IResume = {
      id: `${Date.now()}${store.length}`,
      date: Date.now(),
      name: `Draft ${format(Date.now(), 'dd/MM')}`
    };
    setStore([ ...store, newResume ]);
    history.push(`/edit/${newResume.id}`);
  };

  // get resume
  const get = (id: string) : IResume | undefined => store.find(cv => cv.id === id);

  // update resume
  const save = (data: IResume) : void => setStore(store.map(cv => cv.id === data.id ? ({ ...cv, ...data }) : cv));

  // delete resume
  const remove = (id : string) : void => setStore(store.filter(cv => cv.id !== id));

  // duplicate resume
  const duplicate = (data: IResume) : void => {
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
