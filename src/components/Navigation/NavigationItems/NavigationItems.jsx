import React from 'react';
import css from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return (
        <ul className={css.NavigationItems}>
            <NavigationItem link='/burger-builder'>Build My Burger</NavigationItem>
            <NavigationItem link='/orders'>My Orders</NavigationItem>
        </ul>
    )
}

export default navigationItems;
