import React, { Fragment } from 'react';
import css from './SideDrawer.module.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
  const drawerClasses = [css.SideDrawer];

  drawerClasses.push(props.open ? css.Open : css.Close);

  return (
    <Fragment>
      <div className={css.Backdrop}>
        <Backdrop show={props.open} clicked={props.closed} />
      </div>
      <div className={drawerClasses.join(' ')}>
        <div className={css.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
