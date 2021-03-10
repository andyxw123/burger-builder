import React from 'react';
import Button from '../../../UI/Button/Button';
import css from './SideDrawerToggle.module.css';

const drawerToggle = (props) => {
  return (
    <Button clicked={props.clicked}>
      <div className={css.DrawerToggle}>
        <div />
        <div />
        <div />
      </div>
    </Button>
  );
};

export default drawerToggle;
