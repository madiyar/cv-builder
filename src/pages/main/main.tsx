import React, { useState } from 'react';
import { useEffect } from 'react';
import { context, IContext, IResume } from 'utils';
import { CreateCard, Navbar, Resume } from './components';

interface ContextTypes {
  store: IContext['store'],
  query: string 
};

const Main:React.FC = () => {
  const { store, query } : ContextTypes = React.useContext<any>(context);
  const [list, setList] = useState<IResume[]>(store || []);

  useEffect(() => {
    setList(store.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())));
  }, [query, store]);

  return (
    <main className="max-w-6xl mx-auto">
      <Navbar />
      <section className="container mx-auto">
        <div className="flex flex-wrap">
          {list.map((cv: any) => <Resume key={cv.id} data={cv} />)}
          {!store.length && (
            <CreateCard />
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
