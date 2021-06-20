import React from 'react';
import { context, IContext } from 'utils';

import Logo from './Logo';
import Searchbar from './Searchbar';
import CreateButton from './CreateButton';

import './styles.css';
import { useEffect } from 'react';
import { useState } from 'react';

interface ICreate {
  create: IContext["create"]
};

const Navbar:React.FC = () => {
  const { create } : ICreate = React.useContext<any>(context);
  const [isOnTop, setIsOnTop] = useState<boolean>(true);

  const handleScroll = () => {
    setIsOnTop(!(window.pageYOffset > 0));
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${!isOnTop ? 'scroll' : ''}`}>
      <Logo />
      <div className="right-menu">
        <Searchbar />
        <CreateButton onClick={create} />
      </div>
    </nav>
  )
};

export default Navbar;
