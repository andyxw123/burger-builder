import React, { Fragment } from 'react';
import css from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

  const authOnlyItems = (
    <Fragment>
      <NavigationItem link='/orders'>My Orders</NavigationItem>
      <NavigationItem link='/logout'>Sign out</NavigationItem>
    </Fragment>
  );

  const unAuthOnlyItems = (
    <Fragment>
      <NavigationItem link='/auth'>Sign in</NavigationItem>
    </Fragment>
  );

  const navItems = props.isAuth ? authOnlyItems : unAuthOnlyItems;

  return (
    <ul className={css.NavigationItems}>
        <NavigationItem link='/burger-builder'>Build My Burger</NavigationItem>
        {navItems}
    </ul>
  );
};

export default navigationItems;
