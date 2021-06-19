import React from 'react';
import { context, IContext } from 'utils';
import { CreateCard, Navbar, Resume } from './components';

const Main:React.FC = () => {
  const { store } : { store: IContext['store'] } = React.useContext<any>(context);

  return (
    <main className="max-w-6xl mx-auto">
      <Navbar />
      <section className="container mx-auto">
        <div className="flex flex-wrap">
          {store.map((cv: any) => <Resume key={cv.id} data={cv} />)}
          {!store.length && (
            <CreateCard />
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
