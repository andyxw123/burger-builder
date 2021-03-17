import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './NavigationItem.module.css';

const navigationItem = (props) => {
  // The css module will transform the active class name so need to
  // specifically set activeClassName on the <NavLink>
  return (
    <li className={css.NavigationItem}>
      <NavLink exact to={props.link} activeClassName={css.active}>{props.children}</NavLink>
    </li>
  );
};

export default navigationItem;
