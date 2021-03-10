import React from 'react';
import css from './Toolbar.module.css';
import Logo from './../../Logo/Logo';
import NavigationItems from './../../Navigation/NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';

const toolbar = (props) => (
  <header className={css.Toolbar}>
    <SideDrawerToggle clicked={props.toggleSideDrawer} />
    <div className={css.Logo}>
      <Logo />
    </div>
    <nav className={css.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
