import React, { useState } from 'react';
import { useLocalStorage, IResume } from 'utils';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

export const AppContext = React.createContext({});

const Context:React.FC = ({ children }) => {
  const [store, setStore] = useLocalStorage<IResume[]>('store', []);
  const [query, setQuery] = useState<string>('');
  const history = useHistory();

  // create new resume draft
  const create = ({ name } : { name?:string}) : void => {
    const select = store.filter(item => item.name === `Draft ${format(Date.now(), 'dd/MM')}`);
    const newName = name || `Draft ${format(Date.now(), 'dd/MM')} ${select.length ? `№${select.length+1}` : ''}`
    const newResume : IResume = {
      id: `${Date.now()}${store.length}`,
      date: Date.now(),
      name: newName
    };
    setStore([ newResume, ...store ]);
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
    const originalName = data.name.split('copy-')[0].trim();
    const copies = store.filter(item => {
      const itemName = item.name.split('copy-')[0].trim();
      return itemName === originalName
    });
    const latestCopy = copies.reduce((acc, cur) => {
      const split = cur.name.split('copy-');
      if (split.length === 2 && +split[1] > acc) {
        return +split[1]
      } else {
        return acc;
      }
    }, 0);
    const name = `${originalName} copy-${latestCopy+1}`;
    setStore([
      {
        ...data,
        name,
        id: `${Date.now()}${store.length}`,
        date: Date.now()
      },
      ...store
    ]);
  };

  return (
    <AppContext.Provider value={{ store, remove, get, setStore, save, create, duplicate, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export default Context;
