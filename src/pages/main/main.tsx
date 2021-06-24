import React, { useState } from 'react';
import { useEffect } from 'react';
import { context, IContext, IResume } from 'utils';
import { CreateCard, Navbar, Resume, CreateModal } from './components';

interface ContextTypes {
  store: IContext['store'],
  query: string 
};

const Main:React.FC = () => {
  const { store, query } : ContextTypes = React.useContext<any>(context);
  const [list, setList] = useState<IResume[]>(store || []);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    setList(store.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())));
  }, [query, store]);

  return (
    <main className="max-w-6xl mx-auto">
      <Navbar openModal={openModal} />
      <section className="container mx-auto">
        <div className="flex flex-wrap">
          {list.map((cv: any) => <Resume key={cv.id} data={cv} />)}
          {!store.length && (
            <CreateCard openModal={openModal} />
          )}
        </div>
      </section>
      <CreateModal isOpen={isOpen} closeModal={closeModal} />
    </main>
  );
};

export default Main;
