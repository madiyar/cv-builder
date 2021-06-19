import React from 'react';
import { context, IContext } from 'utils';
import Searchbar from './Searchbar';
import CreateButton from './CreateButton';

interface ICreate {
  create: IContext["create"]
};

const Navbar:React.FC = () => {
  const { create } : ICreate = React.useContext<any>(context);

  return (
    <nav className="flex py-5 items-center px-3 sticky top-0 z-50 bg-white">
      <h1 className="flex-1 text-3xl font-semibold">Resumes</h1>
      <Searchbar />
      <CreateButton onClick={create} />
    </nav>
  )
};

export default Navbar;
