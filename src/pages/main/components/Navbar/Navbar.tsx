import React from 'react';
import { useScrollSpy } from 'utils';

import Logo from './Logo';
import Searchbar from './Searchbar';
import CreateButton from './CreateButton';

import './styles.css';

const Navbar:React.FC<{ openModal(): void }> = ({ openModal }) => {
  const isOnTop = useScrollSpy();

  return (
    <nav className={`navbar ${!isOnTop ? 'scroll' : ''}`}>
      <Logo />
      <div className="right-menu">
        <Searchbar />
        <CreateButton openModal={openModal} />
      </div>
    </nav>
  )
};

export default Navbar;
