import React from 'react';
import { context } from 'utils';
import { Pane } from 'evergreen-ui';
import { Navbar, Resume } from './components';
import style from './main.module.css';

const Main:React.FC = () => {
  const { store } = React.useContext<any>(context);

  return (
    <Pane className={style.container}>
      <Navbar />
      <Pane display="flex" flexWrap="wrap">
        {store.map((cv: any) => <Resume key={cv.id} data={cv} />)}
      </Pane>
    </Pane>
  );
};

export default Main;
